import * as React from "react"
import Game from "../components/game/Game"
import { GameProvider } from "../context/game-context"

const GamePage = ({location}) => {
  const params = new URLSearchParams(location.search);
  const code = params.get("code");
  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <GameProvider>
        <Game code={code}/>
        {/* <Toasts /> */}
      </GameProvider>
    </div>
  )
}

export default GamePage
