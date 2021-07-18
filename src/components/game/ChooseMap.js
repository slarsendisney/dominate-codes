import React from "react"
import MapData from "../../../server/map-data.json"
import { useAuth } from "../../context/auth-context"
import { useGame } from "../../context/game-context"
import Header from "../Header"
import MapPreview from "./MapPreview"

const ChooseMap = ({submit}) => {
  const { createRoom } = useGame()
  const {name} = useAuth()
  return (
    <div className="">
    <Header/>
    <div className="h-full w-full pt-8 md:pt-16 px-12 md:px-24">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 text-left w-full">
      {Object.keys(MapData).map(category => {
        return (
          <>
            <div className="col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-5">
              <p className="uppercase text-xs text-gray-400">{category}</p>
            </div>
            {Object.keys(MapData[category]).map(map => {
              return (
                <button
                  onClick={() => {
                    createRoom(category, map, name)
                    submit()
                  }}
                  className="p-2 h-48 md:h-auto w-full border-indigo-500 bg-indigo-700 border-4 opacity-50 hover:opacity-100 rounded-lg flex items-center justify-center overflow-hidden"
                >
                  <MapPreview {...MapData[category][map]} />
                </button>
              )
            })}
          </>
        )
      })}
    </div>
    </div>
    </div>
  )
}
export default ChooseMap
