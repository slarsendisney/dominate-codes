import * as React from "react"
import { useGame } from "../../context/game-context"
import ProgressBar from "./ProgressBar"

function getProgress(occupied, possibleCaptureCount, players) {
  const intial = {}
  players.forEach(({socket}) => (intial[socket] = { count: 0 }))
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
        possibleCaptureCount,
    }
  })

  return playerProgress
}

function compare(a, b) {
  const progressA = a.progress;
  const progressB = b.progress;

  let comparison = 0;
  if (progressA < progressB) {
    comparison = 1;
  } else if (progressA > progressB) {
    comparison = -1;
  }
  return comparison;
}

const GameProgress = () => {
  const { players, colors, dimensions, possibleCaptureCount, occupied } = useGame()

  const progress = React.useMemo(
    () => getProgress(occupied, possibleCaptureCount, players),
    [occupied, dimensions, players]
  )

  let playersWithColors = React.useMemo(()=> {
    return players.reduce((acc, {name, socket}, i) => {
      acc.push({uid:name, ...colors[i], ...progress[socket]})
      return acc
    }, []).sort(compare)
  }, [colors, players])

  if (!colors) {
    return <></>
  }

  return (
    <div className="w-full">
      <div className="mt-4 mr-4 mx-auto">
        <div className="align-right flex flex-col space-y-1 items-center justify-center">
          {playersWithColors.map((player, i) => (
            <ProgressBar
              primaryColor={player.primary}
              lighterColor={player.lighter}
              player={player.uid}
              progress={player.progress}
              ranking={i+1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default GameProgress
