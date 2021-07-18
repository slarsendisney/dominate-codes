import * as React from "react"

import bronzeTrophy from "../assets/bronzeTrophy.svg"
import silverTrophy from "../assets/silverTrophy.svg"
import goldTrophy from "../assets/goldTrophy.svg"
const Leaderboard = ({ playerRanking }) => {

  const topPlayers = playerRanking.slice(0, 2)
  const otherPlayers = playerRanking.slice(3)

  return (
    <div className="max-w-7xl mx-auto mt-8">
      {/* Top 3 */}
      <div className="flex flex-col md:flex-row justify-between space-x-6">
        <div className="order-3 md:order-1 bg-white shadow rounded-md border-2 border-indigo-600 w-full h-full p-5 text-center">
          <img src={bronzeTrophy} className="w-5/12 mx-auto" />
          <p className="font-bold text-xl my-2">3rd</p>
          <p>{topPlayers[2]}</p>
        </div>
        <div className="order-1 md:order-2 bg-white shadow rounded-md border-2 border-indigo-600 w-full h-full p-5 text-center">
          <img src={goldTrophy} className="w-5/12 mx-auto" />
          <p className="font-bold text-xl my-2">1st</p>
          <p>{topPlayers[0]}</p>
        </div>
        <div className="order-2 md:order-3 bg-white shadow rounded-md border-2 border-indigo-600 w-full h-full p-5 text-center">
          <img src={silverTrophy} className="w-5/12 mx-auto"/>
          <p className="font-bold text-xl my-2">2nd</p>
          <p>{topPlayers[1]}</p>
        </div>
      </div>

      {/* remainder */}
      {otherPlayers.map((player, i) => (
        <div className="w-full bg-white shadow rounded-md border-2 border-indigo-600 p-5 my-4">
          <p>{`${i+4}. ${player}`}</p>
        </div>
      ))}
    </div>
  )
}

export default Leaderboard