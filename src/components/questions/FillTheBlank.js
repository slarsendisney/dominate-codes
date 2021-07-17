import * as React from "react"

// auto focus on input in fill the blank
// check the answer every time they type until they get it right (no submit button)
const FillTheBlank = ({ phraseStart, phraseEnd, onSubmit }) => {
  const [answer, setAnswer] = React.useState("");
  const inputRef = React.useRef(null);
  const wrapperRef = React.useRef();
  const handleChange = (e) => {
    setAnswer(e.target.value)
  }

  const handleSubmit = (e) => {
    onSubmit(answer)
  }
  
  return (
    <>
    <div ref={wrapperRef} className="pb-3">
      <p>
        {phraseStart}
        <input
          type="text"
          ref={inputRef}
          value={answer}
          onChange={handleChange}
          className="border-b-2 border-indigo-600 mx-1"
        />
        {phraseEnd}
      </p>
    </div>
    <div className="absolute z-30 bottom-0 right-0 -mb-3"> 

    <button
      onClick={handleSubmit}
      className="rounded-full px-2 py-1 primary-btn -mb-8 mx-4"
    >
    <div className="flex items-center space-x-2">
      Submit
    </div>
  </button>
  </div>
  </>
  );
}

export default FillTheBlank