import { useEffect, useState } from 'react'; 
import { generate } from '../utilities/utils';
import TypingField from './TypingField';
import { wpmCalculator } from '../utilities/utils';
import useTypingGame, { PhaseType } from 'react-typing-game-hook'; 
import UserRecords from './UserRecords'; 

// Typing Test
// main component that displays all fields/options related to the typing test
// prompts user to select a test length(10, 25, 50, 100) words and displays test,
// as well as user results
function TypingTest({ user, onCompletion, onStarredTest, onDeleteTest }) {

    // length of test
    const lengths = [10, 25, 50, 100]; 
    // text of test that is sent to backend
    const [text, setText] = useState('');
    // switch when selected displays either prompt to select test
    // or the test itself
    const [selected, setSelected] = useState(false);
    // highlights the button that has been set to enabled (the selected 
    // test length)
    const [enabledButton, setEnabled] = useState(0)


    // handleKey 
    // handles the keypress logic of the typing game, passed down 
    // to typing field component
    // has to be declared in this component as the typing game
    // logic deelcared in the typing-game-hook lives here and is sent
    // to the backend
    const handleKey = (key) => {
    if (key === "Escape") {
      resetTyping();
    } else if (key === "Backspace") {
      deleteTyping(false);
    } else if (key.length === 1) {
      insertTyping(key);
    }
    };

    // handles click of the test length options
    // highlights the selected button (also deselects the prior highlighted option)
    // as well as generates a test of the selected length
    function handleClick(e) {
        if (phase !== PhaseType.Started) {
            setEnabled(parseInt(e.target.id));
            setText(generate(parseInt(e.target.value)))
            setSelected(true);
        }
    }

    // states of the react-typing-game hook
    // handles almost all of the internal logic of the typing test
    // taken from the react-typing-game-hook docs
    const {
    states: {
      charsState,  // state of 'input' chars
      length,      // length of text (chars)
      currIndex,   // current index of input
      correctChar, // # correct chars
      errorChar,   // # incorrect chars
      phase,       // not started, started, ended
      startTime,   // used to calculate wpm/time of test
      endTime      // 
    },
      actions: { insertTyping, resetTyping, deleteTyping }
    } = useTypingGame(text);

    // monitors the phase of the test
    // upon the test ending, the information from the typing game hook
    // (stored via state) is sent in a post request to the database,
    // with the userid appended so that the test is associated with the 
    // currently logged in user profile
    //
    // NOTE: some other state variables are excluded from the dependency array
    // however, including them breaks the test by resetting the test and 
    // rerendering the component. React will give a warning, but this 
    // will not affect the performance of the application
    useEffect(() =>{
        if (phase === PhaseType.Ended) { // test has ended 
            setSelected(false);          // reset the TypingField component
        
            fetch('http://localhost:9292/tests', {
              method: "POST",
              headers: {
                "Content-Type": 'application/json',
              },
              body: JSON.stringify({    // info captured from react-typing-game-hook 
                text: text,             // creates a backend db record for test
                wpm: wpmCalculator({length, startTime, endTime, correctChar}),
                errorChar: errorChar,
                length: length,
                user_id: user['id'],
                starred: false
              })
            }).then((r)=>r.json())
            .then((res)=>onCompletion(res)); // updates the completed test to be displayed to the
      }                                      // user via state 
    }, [phase])
    
    return(
        <>
            <span className='text-lg'>Logged in as: {user['username']}</span>
            <div className='flex gap-4'>
                <span>test length:</span>
                {lengths.map((length)=>{
                    return (<button
                            id={length}
                            className={enabledButton===length?'text-highlight':''}
                            onClick={handleClick} 
                            value={length} key={length}
                            >
                            {length}
                            </button>)
                })}
            </div>
            {selected? <TypingField text={text} handleKey={handleKey} charsState={charsState} currIndex={currIndex}/>:'select a test length to begin'}
        <h2>
            { phase === PhaseType.Ended? `wpm: ${wpmCalculator({length, startTime, endTime, correctChar})} errors: ${errorChar}` : ''}
        </h2>
        <UserRecords onDeleteTest={onDeleteTest} onStarredTest={onStarredTest} tests={user['tests']}/>
        </>
    )
}

export default TypingTest;