// TypingField
// handles the dynamic elements of the text displayed to the user 
// and the logic of a typing test. mainly through the typing-game-hook
function TypingField({text, handleKey, charsState, currIndex, }){

    return (
      <>
      <div> 
        <p
          className='outline-none px-10'
          onKeyDown={(e) => {
            handleKey(e.key);
            e.preventDefault();
          }}
          tabIndex={0}
        >
          { 
            text.split("").map((char, index) => {
            let state = charsState[index];
            let color = state === 0 ? "white" : state === 1 ? "silver" : "red"; {/* sets the color of the curr character based on its state from the hook*/}
            return (
              <span
                key={char + index}
                style={{ color }}
                className={currIndex + 1 === index ? "text-2xl" : "text-2xl"}
              >
                {char}
              </span>
            );
            })
          }
        </p>
        </div>
      </>
    )
}

export default TypingField;