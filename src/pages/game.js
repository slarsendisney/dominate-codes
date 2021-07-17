import * as React from "react"
import Game from "../components/game/Game"
import { GameProvider } from "../context/game-context"
import { AuthProvider } from "../context/auth-context"

const GamePage = ({ location }) => {
  const params = new URLSearchParams(location.search)
  const code = params.get("code")
  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <AuthProvider>
        <GameProvider>
          <Game code={code} />
          {/* <Toasts /> */}
        </GameProvider>
      </AuthProvider>
    </div>
  )
}

export default GamePage
