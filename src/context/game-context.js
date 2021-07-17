import React, { useState, useContext, useEffect, useMemo } from "react"
import io from "socket.io-client"
const GameContext = React.createContext()

const socket = io("http://localhost:3000/")

export const GameProvider = ({ ...props }) => {
  const [gameState, setGameState] = useState()
  const [countdown, setCountdown] = useState("...")
  const [gameActive, setGameActive] = useState(false)
  const [room, setRoom] = useState()

  const startGame = () => {
    socket.emit("game-start", {
      room,
    })
  }

  const joinRoom = roomToJoin => {
    socket.emit("join-room", {
      room: roomToJoin,
    })
  }

  const createRoom = (category, map) => {
    socket.emit("create-room", {
      category,
      map,
    })
  }

  const submitVictory = (id, timeStart, timeStop, position) => {
    socket.emit("question-victory", {
      room,
      id,
      timeStart,
      timeStop,
      position
    })
  }

  const submitPenalty = (id, timeStart, timeStop, position) => {
    socket.emit("question-penalty", {
      room,
      id,
      timeStart,
      timeStop,
      position
    })
  }

  useEffect(() => {
    socket.on("counter", data => {
      setCountdown(data)
    })
    socket.on("gameState", data => {
      const newGameState = { ...data }
      setGameState(newGameState)
    })
    socket.on("join-room", data => {
      setRoom(data.room)
    })
  }, [socket])

  const {
    dimensions,
    occupied,
    events,
    gameStart,
    gameEnd,
    counter,
    owner,
    players,
    colors,
    omissions
  } = gameState || {}

  return (
    <GameContext.Provider
      value={{
        countdown,
        room,
        joinRoom,
        createRoom,
        startGame,
        gameState,
        dimensions,
        occupied,
        events,
        gameStart,
        gameEnd,
        counter,
        roomOwner: owner === socket.id,
        owner,
        players,
        socketID: socket.id,
        omissions,
        submitVictory,
        submitPenalty,
        colors
      }}
      {...props}
    />
  )
}

export const useGame = () => useContext(GameContext)

export default GameContext
