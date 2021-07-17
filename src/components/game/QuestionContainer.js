import React, { useState } from "react"
import { useGame } from "../../context/game-context"
import { m as motion } from "framer-motion"
// will receive question
// Question object
// switch case based on question type

const QuestionContainer = ({ activeEvent, reset }) => {
  const {
    question: { question, id, type, params : { options, answer} },
    position,
  } = activeEvent
  const { submitVictory, submitPenalty, currentPlayerColor, addTimeout } = useGame()
  const [timeStart, setTimeStart] = useState()
  const [state, setState] = useState("unanswered")
  const variants = {
    unanswered: {
      backgroundColor: "#fff",
      borderColor: "#4F46E5",
    },
    VICTORY: {
      backgroundColor: currentPlayerColor.light,
      borderColor: currentPlayerColor.lighter,
    },
    DEFEAT: {
      backgroundColor: "#F87171",
      borderColor: "#FCA5A5",
    },
  }
  React.useEffect(() => {
    setTimeStart(new Date())
  }, [])

  const onSubmit = result => {
    const timeStop = new Date()
    if (result === answer) {
      // send server update with timestamp by sending start time and end time
      setState("VICTORY")
      setTimeout(() => reset(), 400)
      setTimeout(() => submitVictory(id, timeStart, timeStop, position), 500)
    } else {
      //trigger pentaly
      setState("DEFEAT")
      setTimeout(() => {
        reset()
        addTimeout(...position)
      }, 400)
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
        <motion.div
          transition={{
            duration: 0.1,
            type: "spring",
            bounce: 0.25,
          }}
          initial="unanswered"
          animate={state}
          variants={variants}
          className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl border-4 transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div className="relative px-4 pt-5 pb-6 sm:p-6 sm:pb-4">
            {state === "VICTORY" ? (
              <div className="flex flex-col pb-2 text-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-32 w-32 m-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            ) : state === "DEFEAT" ? (
              <div className="flex flex-col pb-2 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-32 w-32 m-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            ) : (
              <>
                <div className="absolute z-30 bottom-0 left-0 -mb-3">
                  <button
                    onClick={reset}
                    className="rounded-full px-2 py-1  bg-white border-indigo-600 border-4 -mb-8 mx-4"
                  >
                    <div className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                    </div>
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
        </motion.div>
      </div>
    </div>
  )
}

export default QuestionContainer
