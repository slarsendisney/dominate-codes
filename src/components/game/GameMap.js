import React, { useRef, useEffect, useState, useMemo } from "react"
import { m as motion, useAnimation } from "framer-motion"
import { useGame } from "../../context/game-context"
import { useTime } from "../../context/time-context"
import generatePreview from "../../../utils/generatePreview"

import horizontal_bar from "../../assets/horizontal_bar.svg"
import large_square from "../../assets/large_square.svg"
import vertical_bar from "../../assets/vertical_bar.svg"
import left_boot from "../../assets/left_boot.svg"
import short_horizontal_bar from "../../assets/short_horizontal_bar.svg"
import short_vertical_bar from "../../assets/short_vertical_bar.svg"

import useSound from 'use-sound';
import biteSfx from '../../assets/sounds/bite.mp3';

const circleSize = "h-4 w-4 md:h-6 md:w-6"

const itemVariants = {
  visible: {
    opacity: 1,
    scale: 1,
    backgroundColor: "#D1D5DB",
  },
  hidden: {
    opacity: 0,
    scale: 1,
  },
  event: {
    opacity: [0.5, 1],
    scale: [1, 1.05, 1.05, 1.05, 1.05, 1],
    backgroundColor: "#A78BFA",
  },
  preview: {
    opacity: 1,
    backgroundColor: "#C4B5FD",
  },
  timedOut: {
    opacity: 1,
    backgroundColor: "#F87171",
  },
}

function fullVariants(players, colors) {
  let variants = itemVariants
  players.forEach(({socket}, i) => {
    variants[socket] = {
      opacity: 1,
      backgroundColor: colors[i].primary,
    }
    variants[`${socket}-light`] = {
      opacity: 1,
      backgroundColor: colors[i].light,
    }
    variants[`${socket}-dark`] = {
      opacity: 1,
      backgroundColor: colors[i].dark,
    }
  })
  return variants
}

export function createGrid(width, height) {
  let filledGrid = new Array(height).fill(new Array(width).fill(true))
  return filledGrid
}

const GameMap = ({ delayPerPixel = 0.0008, activateEvent }) => {
  const {
    dimensions: { width, height },
    events,
    occupied,
    players,
    socketID,
    colors,
    omissions
  } = useGame()
  const { timedOut } = useTime()
  const [eventPreview, setEventPreview] = useState()
  const grid = createGrid(width, height)
  const originOffset = useRef({ top: 0, left: 0 })
  const controls = useAnimation()
  useEffect(() => {
    controls.start("visible")
  }, [delayPerPixel])

  const eventsDict = useMemo(() => {
    const dict = {}
    events.map(({ position: [x, y], ...otherstuff }) => {
      if (!dict[x]) {
        dict[x] = { [y]: { position: [x, y], ...otherstuff } }
      } else {
        dict[x][y] = { position: [x, y], ...otherstuff }
      }
    })
    return dict
  }, [events])

  const previewDict = useMemo(() => {
    if (eventPreview) {
      const {
        shape,
        position: [x, y],
      } = eventPreview
      return generatePreview(shape, { height, width }, x, y)
    }
    return {}
  }, [eventPreview])
  const variants = fullVariants(players, colors)
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div
        initial="hidden"
        animate={controls}
        className="flex flex-col space-y-1 md:space-y-2"
      >
        {grid.map((columns, x) => (
          <motion.div
            key={`column_${x}`}
            initial="hidden"
            animate={controls}
            className="flex space-x-1 md:space-x-2"
          >
            {columns.map((_, y) => (
              <>
                {omissions?.[x]?.[y] ? (
                  <div className={`${circleSize}`} />
                ) : (
                  <GridItem
                    key={`row_${y}`}
                    i={y}
                    timedOut={timedOut?.[y]?.[x]}
                    socketID={socketID}
                    variants={variants}
                    originIndex={40}
                    delayPerPixel={delayPerPixel}
                    originOffset={originOffset}
                    event={eventsDict?.[x]?.[y]}
                    preview={previewDict?.[x]?.[y]}
                    occupied={occupied?.[x]?.[y]}
                    activateEvent={activateEvent}
                    socketID={socketID}
                    setEventPreview={setEventPreview}
                  />
                )}
              </>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const Shape = ({ shape }) => {
  switch (shape) {
    case "horizontal_bar":
      return <img className="h-full mx-auto" src={horizontal_bar} />
    case "vertical_bar":
      return <img className="h-full mx-auto" src={vertical_bar} />
    case "large_square":
      return <img className="h-full mx-auto" src={large_square} />
    case "left_boot":
      return <img className="h-full mx-auto" src={left_boot} />
    case "short_horizontal_bar":
      return <img className="h-full mx-auto" src={short_horizontal_bar} />
    case "short_vertical_bar":
      return <img className="h-full mx-auto" src={short_vertical_bar} />
    default:
      return <div />
  }
}

// const BoopButton = () => {
//   return <button onClick={play}>Boop!</button>;
// };

const GridItem = ({
  event,
  activateEvent,
  setEventPreview,
  preview,
  occupied,
  variants,
  socketID,
  timedOut,
}) => {
  const [play] = useSound(biteSfx);
  const [active, setActive] = useState(false)
  return (
    <>
      {event && event.progress !== "complete" ? (
        <motion.button
          onClick={() => !timedOut && activateEvent(event)}
          onHoverStart={() => {
            if (!timedOut) {
              setActive(true)
              play()
              setEventPreview(event)
            }
          }}
          onHoverEnd={() => {
            setActive(false)
            setEventPreview(false)
          }}
          // whileHover={{ scale: 1.1, backgroundColor: "#8B5CF6" }}
          className={`${circleSize} rounded-full`}
          initial="hidden"
          animate={
            timedOut ? "timedOut" : active ? `${socketID}-dark` : "event"
          }
          variants={variants}
          transition={{
            ease: "linear",
            duration: active || timedOut ? 0.1 : 1,
          }}
        >
          {timedOut ? (
            <p className="font-bold cursor-not-allowed" style={{ fontSize: 14 }}>
              {timedOut}
            </p>
          ) : (
            <div className="h-3 w-3 m-auto">
              <Shape shape={event.shape} />
            </div>
          )}
        </motion.button>
      ) : (
        <motion.div
          className={`${circleSize} rounded-full`}
          initial="hidden"
          animate={
            preview ? `${socketID}-light` : occupied ? `${occupied}` : "visible"
          }
          variants={variants}
          transition={{
            ease: "linear",
            duration: 0.2,
          }}
        ></motion.div>
      )}
    </>
  )
}

export default GameMap
