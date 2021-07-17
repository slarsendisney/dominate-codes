import React from "react"
import MapData from "../../../server/map-data.json"
import { useGame } from "../../context/game-context"
import MapPreview from "./MapPreview"

const ChooseMap = ({reset, submit}) => {
  const { createRoom } = useGame()
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-left w-full p-6 h-screen overflow-y-scroll  pb-16">
         <div className="col-span-1 sm:col-span-2 md:col-span-4">
              <button className="primary-btn rounded" onClick={reset}>Back</button>
            </div>
      {Object.keys(MapData).map(category => {
        return (
          <>
            <div className="col-span-1 sm:col-span-2 md:col-span-4">
              <p className="uppercase text-xs text-gray-400">{category}</p>
            </div>
            {Object.keys(MapData[category]).map(map => {
              return (
                <button
                  onClick={() => {
                    createRoom(category, map)
                    submit()
                  }}
                  className="p-2 w-full border-indigo-600 border-4 opacity-50 hover:opacity-100 rounded-lg flex items-center justify-center overflow-x-hidden"
                >
                  <MapPreview {...MapData[category][map]} />
                </button>
              )
            })}
          </>
        )
      })}
    </div>
  )
}
export default ChooseMap
