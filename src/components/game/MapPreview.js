import React from "react"
import { createGrid } from "./GameMap"


const MapPreview = ({ dimensions: {width, height}, omissions }) => {
  const grid = createGrid(width, height)
  const circleStyles = {height:4, width:4}
  return (
    <div>
      <div className="flex flex-col space-y-1">
        {grid.map((columns, x) => (
          <div key={`column_${x}`} className="flex space-x-1">
            {columns.map((_, y) => (
              <>
                {omissions?.[x]?.[y] ? (
                  <div style={circleStyles} />
                ) : (
                  <div style={circleStyles} className={`bg-gray-600`} />
                )}
              </>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MapPreview
