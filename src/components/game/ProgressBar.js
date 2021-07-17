import * as React from "react"
import { m as motion, useAnimation } from "framer-motion"

// need a prop to make it either left or right
/**
 * Progress Bar for a Player
 * @param  {String} primaryColor Hex tag for the primary colour
 * @param  {String} lightColor Hex tag for the secondary colour
 * @return {Number}      The total of the two numbers
 */
const ProgressBar = ({ primaryColor, lightColor, progress }) => {
 
  const transition = {
    duration: 0.5,
    type:"spring",
    bounce: 0.25
  };

  const variants = {
    enter: {
      opacity: 1,
      x: 0,
      width: 0
    },
    animate: (progress) =>  ({
      opacity: 1,
      x: 0,
      width: `${progress}%`
      // x: [0, progress],
    })
  };
  return (
      <div className="overflow-hidden h-8 mb-4 text-xs flex rounded w-full" style={{ backgroundColor: lightColor }}>
        <motion.div 
          intial="enter"
          variants={variants}
          transition={transition}
          animate="animate"
          custom={progress}
          className="shadow-none h-8 flex flex-col text-center whitespace-nowrap text-white justify-center" 
          style={{ backgroundColor: primaryColor }}
        >
          <p className="font-bold">{progress}%</p>
        </motion.div>
      </div>

  )
}

export default ProgressBar