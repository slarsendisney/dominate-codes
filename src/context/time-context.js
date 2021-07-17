import React, { useContext, useState, useEffect } from "react"
import { useGame } from "./game-context"

const TimeContext = React.createContext()

export const TimeProvider = ({ ...props }) => {
    const [timedOut, setTimedOut] = useState({})
    const { gameState } = useGame()

    useEffect(() => {
        const intervalId = setInterval(() => {
          if(gameState && gameState.gameStart){
          const newTimedOut = { ...timedOut }
          Object.keys(newTimedOut).forEach(y => {
            Object.keys(newTimedOut[y]).forEach(x => {
              if (newTimedOut[y][x] > 0) {
                newTimedOut[y][x] = newTimedOut[y][x] - 1
              } else {
                delete newTimedOut[y][x]
              }
            })
          })
          setTimedOut(newTimedOut)
        }
        }, 1000)
      return () => clearInterval(intervalId)
    }, [timedOut])

    const addTimeout = (x, y) => {
      const newTimedOut = { ...timedOut }
      if (newTimedOut[y]) {
        newTimedOut[y][x] = 9
      } else {
        newTimedOut[y] = {
          [x]: 9,
        }
      }
      setTimedOut(newTimedOut)
    }

  return <TimeContext.Provider value={{ timedOut, addTimeout }} {...props} />
}

export const useTime = () => useContext(TimeContext)

export default TimeContext
