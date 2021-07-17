import * as React from "react"
import { useGame } from "../../context/game-context"
import ProgressBar from "./ProgressBar"
import Clock from "../../assets/Clock"

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

function getCountdownTime(countdown) {
  if(typeof countdown === "string") {
    return "--:--"
  }

  var minutes = parseInt(countdown / 60, 10);
  var seconds = parseInt(countdown % 60, 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return minutes + ":" + seconds;
}

const GameProgress = () => {
  const { countdown, players, colors, dimensions, possibleCaptureCount, occupied } = useGame()

  const countdownTime = getCountdownTime(countdown)

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
    <div className="w-full relative">
      <div className="absolute inset-y-0 left-0">
        <div className="flex item-center m-4 space-x-1">
          <Clock className="m-auto w-6 h-6"/><p className="text-2xl font-bold">{countdownTime}</p>
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 w-64 mt-4 mr-4">
        <div className="align-right flex flex-col space-y-1 items-center">
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
