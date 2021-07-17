import * as React from "react"
import { useGame } from "../../context/game-context"
import ProgressBar from "./ProgressBar"

function getProgress(occupied, dimensions, players) {
  const intial = {}
  players.forEach(id => (intial[id] = { count: 0 }))
  const playerProgress = Object.keys(occupied).reduce((acc, x) => {
    Object.keys(occupied[x]).map(y => {
      const user = occupied[x][y]
      if (acc[user]) {
        acc[user].count += 1
      }
    })
    return acc
  }, intial)

  Object.keys(playerProgress).map(key => {
    playerProgress[key] = {
      ...playerProgress[key],
      progress:
        (playerProgress[key].count * 100) /
        (dimensions.width * dimensions.height),
    }
  })

  return playerProgress
}

const GameProgress = () => {
  const { countdown, players, colors, dimensions, occupied } = useGame()

  const progress = React.useMemo(
    () => getProgress(occupied, dimensions, players),
    [occupied, dimensions, players]
  )

  if (!colors) {
    return <></>
  }

  return (
    <div className="absolute top-0 left-0 w-full mt-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-4">
          <p className="text-2xl font-bold">{countdown}</p>
        </div>
        <div className="align-right flex flex-col space-y-1 items-center">
          {players.map((player, i) => (
            <ProgressBar
              primaryColor={colors[i].primary}
              lightColor={colors[i].light}
              progress={progress[player].progress}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default GameProgress
