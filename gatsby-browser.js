import "./src/style/tailwind.css"
import React from "react"
import { LazyMotion, domAnimation } from "framer-motion"
import "firebase/auth"

export const wrapRootElement = ({ element }) => {
  return (
    <LazyMotion strict features={domAnimation}>
      {element}
    </LazyMotion>
  )
}
