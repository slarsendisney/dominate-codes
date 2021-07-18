import * as React from "react"
import Game from "../components/game/Game"
import { GameProvider } from "../context/game-context"
import { AuthProvider } from "../context/auth-context"
import { TimeProvider } from "../context/time-context"
import SEO from "../components/SEO"

const GamePage = ({ location }) => {
  const params = new URLSearchParams(location.search)
  const code = params.get("code")
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen relative overflow-y-scroll pt-16 pb-32 md:py-0">
      <SEO />
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
