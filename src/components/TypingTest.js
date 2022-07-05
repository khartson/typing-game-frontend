import { useEffect, useState } from 'react'; 
import { generate } from '../utilities/utils';
import TypingField from './TypingField';
import { wpmCalculator } from '../utilities/utils';
import useTypingGame, { PhaseType } from 'react-typing-game-hook'; 
import UserRecords from './UserRecords'; 

function TypingTest({ user, onCompletion, onStarredTest }) {
    const lengths = [10, 25, 50, 100];
    const [text, setText] = useState('');
    const [selected, setSelected] = useState(false);

    const handleKey = (key) => {
    if (key === "Escape") {
      resetTyping();
    } else if (key === "Backspace") {
      deleteTyping(false);
    } else if (key.length === 1) {
      insertTyping(key);
    }
    };

    const [enabledButton, setEnabled] = useState(0);

    function handleClick(e) {
        if (phase !== PhaseType.Started) {
            setEnabled(parseInt(e.target.id));
            setText(generate(parseInt(e.target.value)))
            setSelected(true);
        }
    }

    const {
    states: {
      charsState,
      length,
      currIndex,
      correctChar,
      errorChar,
      phase,
      startTime,
      endTime
    },
      actions: { insertTyping, resetTyping, deleteTyping }
    } = useTypingGame(text);

    useEffect(() =>{
        if (phase === PhaseType.Ended) {
            setSelected(false); 
        
            fetch('http://localhost:9292/tests', {
              method: "POST",
              headers: {
                "Content-Type": 'application/json',
              },
              body: JSON.stringify({
                text: text,
                wpm: wpmCalculator({length, startTime, endTime, correctChar}),
                errorChar: errorChar,
                length: length,
                user_id: user['id'],
                starred: false
              })
            }).then((r)=>r.json())
            .then((res)=>onCompletion(res));
      }
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
        <UserRecords onStarredTest={onStarredTest} tests={user['tests']}/>
        </>
    )
}

export default TypingTest;