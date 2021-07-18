import React, { useState } from "react"
import { useGame } from "../../context/game-context"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { m as motion } from "framer-motion"
import Header from "../Header"
import Tutorial from "./Tutorial"

const Lobby = () => {
  const { startGame, roomOwner, room, players, socketID, owner } = useGame()
  const PlayerItem = ({ playerID, index }) => (
    <div className="flex space-x-2">
      <div className="flex items-center justify-center rounded h-6 w-6 bg-indigo-600 text-white">
        {index + 1}
      </div>
      <p>
        {playerID}{" "}
        <span className="text-indigo-500 font-semibold">
          {playerID === socketID ? "(You!)" : ""}
          {playerID === owner ? "(Owner)" : ""}
        </span>
      </p>
    </div>
  )
  return (
    <div className="max-w-4xl flex flex-col items-center justify-center ">
      <Header />
      <div className="relative ">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", duration: 0.8, bounce: 0.5 }}
          className="md:shadow-md md:border w-full bg-white rounded p-4 flex flex-col  relative z-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="md:border-r-2 p-4">
          {roomOwner ? (
            <div className="space-y-4">
              <p className="text-gray-400 uppercase text-xs text-center ">
                Your room code is
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="font-bold text-2xl md:col-span-2 text-center">
                  {room}
                </p>
                <CopyToClipboard text={room}>
                  <button className="secondary-btn rounded w-full">
                    Copy Code
                  </button>
                </CopyToClipboard>
                <CopyToClipboard text={`https://dominate.codes/game?code=${room}`}>
                  <button className="secondary-btn rounded w-full">
                    Copy URL
                  </button>
                </CopyToClipboard>
              </div>
              <p className="text-sm">
                Share this code with your friends so they can join the game.
              </p>
              <p className="text-gray-400 uppercase text-xs text-center ">
                People in Lobby
              </p>
              <div className="flex flex-col space-y-2">
                {players &&
                  players.map(({ name }, i) => (
                    <div key={name}>
                      <PlayerItem playerID={name} index={i} />
                    </div>
                  ))}
              </div>
              <button
                className="primary-btn rounded w-full"
                onClick={startGame}
              >
                Start Game
              </button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-gray-400 uppercase text-xs text-center">
                People in Lobby
              </p>
              <div className="flex flex-col space-y-2">
                {players &&
                  players.map(({ name }, i) => (
                    <div key={name}>
                      <PlayerItem playerID={name} index={i} />
                    </div>
                  ))}
              </div>
              <div className="primary-btn rounded w-full flex items-center justify-center space-x-2">
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
                <p>Waiting for game start...</p>
              </div>
              <p className="text-xs text-gray-400 max-w-lg">
                Psst! Nudge the room owner if this is taking too long.
              </p>
            </div>
          )}
          </div>
          <Tutorial />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Lobby
