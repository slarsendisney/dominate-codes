import * as React from "react"
import Game from "../components/game/Game"
import { GameProvider } from "../context/game-context"
import { AuthProvider } from "../context/auth-context"
import { TimeProvider } from "../context/time-context"

const GamePage = ({ location }) => {
  const params = new URLSearchParams(location.search)
  const code = params.get("code")
  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <AuthProvider>
        <GameProvider>
          <TimeProvider>
          <Game code={code} />
          </TimeProvider>
          {/* <Toasts /> */}
        </GameProvider>
      </AuthProvider>
    </div>
  )
}

export default GamePage
