import React from "react"

const Tutorial = () => {
  return (
    <div className="p-4 flex flex-col space-y-4">
      <h2 className="text-center md:text-2xl font-bold">How to play</h2>
      <p>Dominate the board by answering questions and claiming territory before the time is up. </p>
      <div className="flex space-x-2 items-center">
        <div className="h-5 w-5 bg-indigo-600 rounded-full" />
        <p><span className="font-bold">Events:</span> Click on these and answer a question.</p>
      </div>
      <div className="flex space-x-2 items-center">
        <div className="h-5 w-5 bg-gray-300 rounded-full" />
        <p><span className="font-bold">Unclaimed:</span> Territory not controlled by a player.</p>
      </div>
      <p className="text-center">Territory controlled by a player will become their color:</p>
      <div className="flex space-x-2 items-center justify-center">
        <div className="h-5 w-5 bg-green-500 rounded-full" />
        <div className="h-5 w-5 bg-yellow-500 rounded-full" />
        <div className="h-5 w-5 bg-blue-500 rounded-full" />
        <div className="h-5 w-5 bg-pink-500 rounded-full" />
      </div>
      <p className="text-gray-600 text-xs text-center">Be careful! Territory can be stolen back with events!</p>
      <div>
      
      </div>
    </div>
  )
}
export default Tutorial
