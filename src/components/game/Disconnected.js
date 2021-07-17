import React, { useState } from "react"
import { Link } from "gatsby"
import { useGame } from "../../context/game-context"

const Disconnected = () => {
  const { startGame, roomOwner, room, players, socketID, owner, resetGameState } =
    useGame()

  return (
    <div className="max-w-4xl h-full flex flex-col items-center justify-center ">
      <div className="relative ">
        <div className="shadow-md border w-full bg-white rounded p-4 flex flex-col relative space-y-4 z-20">
          <div>
            <p className="text-sm text-center uppercase text-gray-400">
              Oh No :( You've disconnected...
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={resetGameState} className="secondary-btn rounded text-center">
              New Game
            </button>
          </div>
        </div>
        <div className="mt-1 text-gray-400 text-center">
          Like the game? Tweet us!
        </div>
      </div>
    </div>
  )
}

export default Disconnected
