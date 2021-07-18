import * as React from "react"
import { m as motion, useAnimation } from "framer-motion"

// need a prop to make it either left or right
/**
 * Progress Bar for a Player
 * @param  {String} primaryColor Hex tag for the primary colour
 * @param  {String} lightColor Hex tag for the secondary colour
 * @return {Number}      The total of the two numbers
 */

function round(num, decimalPlaces = 2) {
  num = Math.round(num + "e" + decimalPlaces)
  return Number(num + "e" + -decimalPlaces)
}
const ProgressBar = ({ primaryColor, lighterColor, player, progress, ranking, }) => {
  const transition = {
    duration: 0.5,
    type: "spring",
    bounce: 0.25,
  }

  const variants = {
    enter: {
      opacity: 1,
      x: 0,
      width: 0,
    },
    animate: progress => ({
      opacity: 1,
      x: 0,
      width: `${progress}%`,
      // x: [0, progress],
    }),
  }
  return (
    <div
      className="overflow-hidden h-5 text-xs flex rounded w-full"
      style={{ backgroundColor: lighterColor }}
    >
      <motion.div
        intial="enter"
        variants={variants}
        transition={transition}
        animate="animate"
        custom={progress}
        className="shadow-none h-5 flex flex-col text-center whitespace-nowrap text-white justify-center"
        style={{ backgroundColor: primaryColor }}
      >
        <p className="pl-2 font-bold text-black">{`${ranking} - ${round(progress, 1)}% ${player}`}</p>
      </motion.div>
    </div>
  )
}

export default ProgressBar
