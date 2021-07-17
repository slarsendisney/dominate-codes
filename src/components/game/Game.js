import React, { useState } from "react"
import { useGame } from "../../context/game-context"
import GameMap from "./GameMap"
import GameProgress from "./GameProgress"
import Join from "./Join"
import Lobby from "./Lobby"
import ChooseMap from "./ChooseMap"
import QuestionContainer from "./QuestionContainer"

const Game = ({ code }) => {
  const { room, gameStart, gameEnd } = useGame()
  const [event, setEvent] = useState(false)
  const [create, setCreate] = useState(false)
  const [createSubmitted, setCreateSubmitted] = useState(false)
  if (create) {
    return (
      <ChooseMap
        reset={() => setCreate(false)}
        submit={() => {
          setCreateSubmitted(true)
          setCreate(false)
        }}
      />
    )
  }
  if (createSubmitted && !room) {
    return <p>Loading</p>
  }

  if (!room) {
    return <Join code={code} createTime={() => setCreate(true)} />
  }

  if (!gameStart) {
    return <Lobby />
  }

  if (gameEnd) {
    return <p>GAME OVER BIATCHESSSS</p>
  }
  const activateEvent = activeEvent => {
    setEvent(activeEvent)
  }

  const resetQuestionContainer = () => {
    setEvent(false)
  }

  return (
    <div className="relative w-full">
      {event && (
        <QuestionContainer activeEvent={event} reset={resetQuestionContainer} />
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
