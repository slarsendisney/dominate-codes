import { Link } from "gatsby"
import * as React from "react"
// import MapData from "../../server/map-data.json"
// import MapPreview from "../components/game/MapPreview"

const Index = () => {
  return (
    <div className="py-8 md:py-24 lg:py-36 h-screen flex flex-col items-center justify-center text-gray-800 space-y-4 md:space-y-8 relative">
      <h1 className="text-4xl md:text-7xl font-bold">
        <span class="text-indigo-800">
          <span class="opacity-50">&lt;</span>Dominate.codes
          <span class="opacity-50">/&gt;</span>
        </span>
      </h1>
      <p className="text-lg md:text-2xl text-center text-gray-600 max-w-3xl mx-auto">
        The fast-paced way to improve your computer science knowledge and
        dominate your next coding interview.
      </p>
      <Link to="/game" className="primary-btn text-lg md:text-3xl rounded-full ">
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
    </div>
  )
}

export default Index
