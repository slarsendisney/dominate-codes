import { Link } from "gatsby"
import * as React from "react"
import Header from "../components/Header"

import "../style/bubbles.css"

// import MapData from "../../server/map-data.json"
// import MapPreview from "../components/game/MapPreview"
import LevelUp from "../assets/LevelUp.svg"
const Index = () => {
  return (
    <div className="relative">
    <div className="py-8 md:py-24 lg:py-36 h-screen flex flex-col items-center justify-center text-gray-800 space-y-4 md:space-y-8 relative z-30">
      <Header />
      <h1 className="text-4xl md:text-7xl font-bold">
        <span class="text-indigo-800">
          <span class="opacity-50">&lt;</span>Dominate.codes
          <span class="opacity-50">/&gt;</span>
        </span>
      </h1>
      <p className="text-lg md:text-2xl text-center text-gray-600 max-w-3xl mx-auto">
        The fastest way to improve your computer science knowledge. <br/>
        <span className="font-semibold">Dominate your next coding interview.</span>
      </p>
      <Link
        to="/game"
        className="primary-btn text-lg md:text-3xl rounded-full "
      >
        <p className="px-3">Play Now</p>
      </Link>
      <div className="flex space-x-4 text-center pt-8">
        <div>
          <p className="text-xl md:text-3xl font-bold">124</p>
          <p>Active Players</p>
        </div>
        <div className="h-16 bg-gray-200 my-auto" style={{ width: 2 }} />
        <div>
          <p className="text-xl md:text-3xl font-bold">31</p>
          <p>Current Games</p>
        </div>
        <div className="h-16 bg-gray-200 my-auto" style={{ width: 2 }} />
        <div>
          <p className="text-xl md:text-3xl font-bold">1054</p>
          <p>Games Played</p>
        </div>
      </div>
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

export default Index
