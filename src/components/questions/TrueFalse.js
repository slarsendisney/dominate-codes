import * as React from "react"

const TrueFalse = ({ question, onSubmit }) => {
  return (
    <div className="flex flex-col pb-2">
      <h2 className="text-2xl font-bold mb-2">{question}</h2>
      <ul>
        {[true, false].map((option, i) => {
          return (
            <li key={option+i}>
              <button
                className="w-full bg-indigo-100 hover:bg-indigo-200 p-2 border-2 border-indigo-800 rounded-md mb-2 cursor"
                onClick={() => onSubmit(option)}
              >
                {option}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TrueFalse