import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/auth-context"
import { useGame } from "../../context/game-context"
import Header from "../Header"

const Join = ({ code, createTime }) => {
  const [roomId, setRoomId] = useState()
  const {name} = useAuth()
  const { joinRoom } = useGame()
  useEffect(() => {
    if (code) {
      joinRoom(code)
    }
  }, [])
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
        <div className="shadow-md border bg-white rounded p-4 flex flex-col space-y-4 relative z-20">
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
            <button className="primary-btn rounded w-full" onClick={createTime}>
              Create a Game
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Join
