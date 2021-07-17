import React, { useState } from "react"
import { Link } from "gatsby"
import { useGame } from "../../context/game-context"
import FinalProgress from "./FinalProgress"

const GameOver = () => {
  const {
    startGame,
    roomOwner,
    room,
    players,
    socketID,
    owner,
    resetGameState,
    winner
  } = useGame()

  return (
    <div className="max-w-4xl h-full flex flex-col items-center justify-center ">
      <div className="relative ">
        <div className="shadow-md border w-full bg-white rounded p-4 flex flex-col relative space-y-4 z-20">
          <div>
            <p className="text-sm text-center uppercase text-gray-400">
              Time's Up!
            </p>
            <p className="text-2xl text-center font-bold">{winner} wins!</p>
          </div>
          <div className="w-80">
            <h4>Summary:</h4>
            <FinalProgress />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={resetGameState}
              className="secondary-btn rounded text-center"
            >
              New Game
            </button>
            <button
              className={`rounded ${
                roomOwner ? "primary-btn" : "default-btn cursor-not-allowed"
              }`}
              disabled={!roomOwner}
              onClick={() => startGame()}
            >
              Rematch
            </button>
          </div>
          {!roomOwner && <p className="text-xs text-gray-400 max-w-lg">
            Only the room owner can start a rematch.
          </p>}
        </div>
        <div className="mt-1 text-gray-400 text-center">
          Like the game? Tweet us!
        </div>
      </div>
    </div>
  )
}

export default GameOver
