import { Link } from "gatsby"
import * as React from "react"
// import MapData from "../../server/map-data.json"
// import MapPreview from "../components/game/MapPreview"

const Index = () => {
  return (
    <div className="py-8 md:py-24 lg:py-36 h-full flex flex-col items-center justify-center text-gray-800 space-y-8 relative">
      <h1 className="text-7xl font-bold">
        <span class="text-indigo-800">
          <span class="opacity-50">&lt;</span>Dominate.codes
          <span class="opacity-50">/&gt;</span>
        </span>
      </h1>
      <p className="text-2xl text-center text-gray-600 max-w-2xl mx-auto">
        The fast paced way to improve your computer science knowledge and dominate
        that next coding interview.
      </p>
      <Link to="/game" className="primary-btn text-3xl rounded-full">
        <p className="px-3">Play Now</p>
      </Link>
    </div>
  )
}

export default Index
