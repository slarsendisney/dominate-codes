import React, { useState } from "react"
import { useGame } from "../../context/game-context"
import GameMap from "./GameMap"
import GameProgress from "./GameProgress"
import Join from "./Join"
import Lobby from "./Lobby"
import QuestionContainer from "./QuestionContainer"

const Game = ({ code }) => {
  const { room, gameStart, gameState, gameEnd } = useGame()
  const [event, setEvent] = useState(false)

  if (!room) {
    return <Join code={code} />
  }

  if (!gameStart) {
    return <Lobby />
  }

  if (gameEnd) {
    return <p>GAME OVER BIATCHESSSS</p>
  }
  const activateEvent = (activeEvent) => {
    setEvent(activeEvent)
  }

  const resetQuestionContainer = () => {
    setEvent(false)
  }

  return (
    <div className="relative w-full">
      {event && (
        <QuestionContainer
          activeEvent={event}
          reset={resetQuestionContainer}
        />
      )}
      <GameProgress />
      <GameMap activateEvent={activateEvent} />
      {/* <div className="absolute bottom-0 left-0 h-48 bg-gray-100 rounded m-2 p-2 overflow-y-scroll">
        {JSON.stringify(gameState, null, "\t")}
      </div> */}
    </div>
  )
}

export default Game
