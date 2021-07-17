import React, { useState, useContext, useEffect, useMemo } from "react"
import io from "socket.io-client"
const GameContext = React.createContext()
const socketURL = process.env.GATSBY_LOCAL_SOCKET
  ? "http://localhost:3000/"
  : "https://dominate-be.onrender.com"
const socket = io(socketURL)

export const GameProvider = ({ ...props }) => {
  const [gameState, setGameState] = useState()
  const [countdown, setCountdown] = useState("...")
  const [disconnected, setDisconnected] = useState(false)
  const [room, setRoom] = useState()

  const startGame = () => {
    socket.emit("game-start", {
      room,
    })
  }

  const joinRoom = (roomToJoin, name) => {
    socket.emit("join-room", {
      room: roomToJoin,
      name,
    })
  }

  const createRoom = (category, map, name) => {
    socket.emit("create-room", {
      category,
      map,
      name
    })
  }

  const submitVictory = (id, timeStart, timeStop, position) => {
    socket.emit("question-victory", {
      room,
      id,
      timeStart,
      timeStop,
      position,
    })
  }

  const submitPenalty = (id, timeStart, timeStop, position) => {
    socket.emit("question-penalty", {
      room,
      id,
      timeStart,
      timeStop,
      position,
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

    socket.on("connect", () => {
      setDisconnected(false)
    });

    socket.on("disconnect", () => {
      setDisconnected(true)
    });

  }, [socket])

  const resetGameState = () => {
    setGameState(undefined)
    setRoom(undefined)
  }

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
    omissions,
    winner,
  } = gameState || {}

  const currentPlayerColor = useMemo(() => {
    if ((socket, colors, players)) {
      return colors[players.findIndex(user => socket.id)]
    }
    return {
      dark: "#6D28D9",
      light: "#C4B5FD",
      primary: "#8B5CF6",
    }
  }, [socket, colors, players])
  const possibleCaptureCount = useMemo(() => {
    if (dimensions) {
      const { height, width } = dimensions
      const totalNodes = height * width

      const ommissionCount = Object.keys(omissions).reduce((acc, cur) => {
        Object.keys(omissions[cur]).forEach(item => acc++)
        return acc
      }, 0)
      return totalNodes - ommissionCount
    }
    return 100
  }, [omissions, dimensions])

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
        possibleCaptureCount,
        roomOwner: owner === socket.id,
        owner,
        players,
        socketID: socket.id,
        omissions,
        submitVictory,
        submitPenalty,
        colors,
        currentPlayerColor,
        resetGameState,
        disconnected,
        winner
      }}
      {...props}
    />
  )
}

export const useGame = () => useContext(GameContext)

export default GameContext
