import * as React from "react"

// auto focus on input in fill the blank
// check the answer every time they type until they get it right (no submit button)
const FillTheBlank = ({ phraseStart, phraseEnd }) => {
  const [answer, setAnswer] = useState("");
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    // handle the submit logic to compare the answer here like in MCQ
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {`${phraseStart}`}
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        {`${phraseEnd}`}
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default FillTheBlank