import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/auth-context"
import { useGame } from "../../context/game-context"
import Header from "../Header"
import { m as motion } from "framer-motion"

const Join = ({ code, createTime }) => {
  const [roomId, setRoomId] = useState()
  const [loading, setLoading] = useState()
  const { name } = useAuth()
  const { joinRoom } = useGame()
  useEffect(() => {
    if (code) {
      joinRoom(code, name)
    }
  }, [code])
  return (
    <div className="max-w-4xl h-full flex flex-col items-center justify-center ">
      <h1 className="text-4xl font-bold mb-4">
        <span class="text-indigo-800">
          <span class="opacity-50">&lt;</span>Join.Create.
          <span class="opacity-50"> /&gt;</span>
        </span>
      </h1>
      {/* header */}
      <Header />
      <div className="relative">
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", duration: 0.8, bounce: 0.5 }}
          className="shadow-md border bg-white rounded p-4 flex flex-col space-y-4 relative z-20"
        >
          <div>
            <div className="flex space-x-2 border-b pb-4">
              <input
                className="rounded px-4 py-2 border text-gray-800 border-gray-200 bg-white"
                placeholder="angry_crimson"
                onChange={e => setRoomId(e.target.value)}
                value={roomId}
              />
              <button
                className="primary-btn rounded"
                onClick={() => joinRoom(roomId, name)}
              >
                Join
              </button>
            </div>
            <div className="h-4 -mt-3 text-center">
              <p className="bg-white inline-block px-2 text-xs">OR</p>
            </div>
          </div>
          <div>
            <button
              className="primary-btn rounded w-full flex items-center justify-center"
              onClick={() => {
                setLoading(true)
                setTimeout(() => createTime(), 50)
              }}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <p>Create a Game</p>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Join
