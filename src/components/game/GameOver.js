import React, { useState } from "react"
import { useGame } from "../../context/game-context"
import FinalProgress from "./FinalProgress"
import { m as motion } from "framer-motion"

// Sound Integration
import useSound from 'use-sound';
import dunDunDunSfx from '../../assets/sounds/dun-dun-dun.mp3';
import fanfareSfx from '../../assets/sounds/fanfare.mp3';

import { useAuth } from "../../context/auth-context"

const GameOver = () => {
  const {
    startGame,
    roomOwner,
    resetGameState,
    winner,
  } = useGame()

  const { user } = useAuth() || {}

  const [playWinnerSound] = useSound(dunDunDunSfx);
  const [playLoserSound] = useSound(fanfareSfx);

  if (winner === user) {
    playWinnerSound()
  } else {
    playLoserSound()
  }

  return (
    <div className="max-w-4xl h-full flex flex-col items-center justify-center ">
      <div className="relative ">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", duration: 0.8, bounce: 0.5 }}
          className="shadow-md border w-full bg-white rounded p-4 flex flex-col relative space-y-4 z-20"
        >
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
          {!roomOwner && (
            <p className="text-xs text-gray-400 max-w-lg">
              Only the room owner can start a rematch.
            </p>
          )}
        </motion.div>
        <div className="mt-2 text-gray-600 text-center">
          Like the game?{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://twitter.com/intent/tweet?url=&text=I%20just%20played%20https%3A%2F%2Fdominate.codes%20by%20%40samlarsendisney%20%26%20%40yannispanagis%20%23dominatecodes`}
            className="text-indigo-600 hover:underline"
          >
            Tweet us!
          </a>
        </div>
      </div>
    </div>
  )
}

export default GameOver
