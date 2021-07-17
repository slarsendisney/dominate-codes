
import React, { useState } from "react"
import { useGame } from "../../context/game-context"

// will receive question
// Question object
// switch case based on question type
const QuestionContainer = ({ activeEvent, reset }) => {
  const {
    question: { question, id, type, options, answer },
    position,
  } = activeEvent
  const { submitVictory, submitPenalty } = useGame()
  const [timeStart, setTimeStart] = useState()
  const [state, setState] = useState("unanswered")
  React.useEffect(() => {
    setTimeStart(new Date())
  }, [])

  const onSubmit = result => {
    const timeStop = new Date()
    if (result === answer) {
      // send server update with timestamp by sending start time and end time

      setState("VICTORY")
      setTimeout(() => reset(), 300)
      setTimeout(() => submitVictory(id, timeStart, timeStop, position), 500)
    } else {
      //trigger pentaly
      setState("DEFEAT")
      setTimeout(() => reset(), 300)
      setTimeout(() => submitPenalty(id, timeStart, timeStop, position), 500)
    }
  }

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl border-indigo-600 border-4 transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="relative px-4 pt-5 pb-6 sm:p-6 sm:pb-4">
            {state === "VICTORY" ? (
              <div className="flex flex-col pb-2">
                <h2 className="text-2xl font-bold mb-2">SUCCESS</h2>
              </div>
            ) : state === "DEFEAT" ? (
              <div className="flex flex-col pb-2">
                <h2 className="text-2xl font-bold mb-2">DEFEAT</h2>
              </div>
            ) : (
              <>
                <div className="absolute z-30 bottom-0 left-0 -mb-3">
                  <button
                    onClick={reset}
                    className="rounded-full px-2 py-1  bg-white border-indigo-600 border-4 -mb-6 mx-4"
                  >
                    <p>{`<- Back`}</p>
                  </button>
                </div>
                <div className="flex flex-col pb-2">
                  <h2 className="text-2xl font-bold mb-2">{question}</h2>
                  <ul>
                    {options.map(option => {
                      return (
                        <li key={option}>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionContainer
