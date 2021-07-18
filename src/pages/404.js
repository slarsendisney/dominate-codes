import * as React from "react"

import "../style/bubbles.css"
import Header from "../components/Header"
import LevelUp from "../assets/LevelUp.svg"
import SEO from "../components/SEO"

import { Link } from "gatsby"

const FourOhFour = () => {
  return (
    <div className="relative">
      <SEO title="Oops!"/>
    <div className="py-8 md:py-24 lg:py-36 h-screen flex flex-col items-center justify-center text-gray-800 space-y-4 md:space-y-8 relative z-30">
      <Header />
      <h1 className="text-8xl text-center font-bold text-indigo-800">404 Page Not Found</h1>
      <h2 className="text-4xl text-center font-bold text-indigo-500">
        Oh no...it looks like you're lost. <br/> Why not bubble back up to the <Link className="underline" to="/">home page</Link>?
      </h2>
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="text-xs uppercase text-gray-400">Built for the</p>
          <img src={LevelUp} className="h-24" />
          <p className="text-xs uppercase text-gray-400">Hackathon</p>
        </div>
      </div>
      <div className="absolute bottom-0 z-0 bubbles">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div> 
      </div>
    </div>
  )
}

export default FourOhFour