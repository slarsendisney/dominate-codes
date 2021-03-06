import { Link } from "gatsby"
import * as React from "react"
import Header from "../components/Header"

import "../style/bubbles.css"
import Logo from "../assets/logo.svg"
import LevelUp from "../assets/LevelUp.svg"
import SEO from "../components/SEO"

const APIURL = process.env.GATSBY_LOCAL_SOCKET
  ? "http://localhost:3000/stats"
  : "https://dominate-be.onrender.com/stats"

const Index = () => {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch(APIURL)
      .then(response => response.json())
      .then(res => {
        setData(res)
        setLoading(false)
      })
  }, [])

  return (
    <>
    
    <SEO title="Home"/>
    <div className="relative h-full py-32 md:py-0 lg:py-0">
    <Header />
      <div className="px-2  h-screen flex flex-col items-center justify-center text-gray-800 space-y-4 md:space-y-8 relative z-20">
        
        <img src={Logo} className="h-32" />
        <h1 className="text-4xl md:text-7xl font-bold">
          <span class="text-indigo-800">
            <span class="opacity-50">&lt;</span>Dominate.codes
            <span class="opacity-50">/&gt;</span>
          </span>
        </h1>
        <p className="text-lg md:text-2xl text-center text-gray-600 max-w-3xl mx-auto">
          The fastest way to improve your computer science knowledge. <br />
          <span className="font-semibold">
            Dominate your next coding interview.
          </span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <Link
            to="/game"
            className="primary-btn text-lg md:text-2xl font-bold rounded-full "
          >
            <p className="px-3">Play Now</p>
          </Link>
          <Link
            to="/leaderboard"
            className="secondary-btn text-lg md:text-2xl font-bold rounded-full "
          >
            <p className="px-3">View Leaderboard</p>
          </Link>
        </div>
        <div className="flex space-x-4 text-center pt-8">
          <div>
            <p className="text-xl md:text-3xl font-bold">{loading? "..." : data.online}</p>
            <p>Active Players</p>
          </div>
          <div className="h-16 bg-gray-200 my-auto" style={{ width: 2 }} />
          <div>
            <p className="text-xl md:text-3xl font-bold">{loading? "..." : data.activeRooms}</p>
            <p>Current Games</p>
          </div>
          <div className="h-16 bg-gray-200 my-auto" style={{ width: 2 }} />
          <div>
            <p className="text-xl md:text-3xl font-bold">{loading? "..." : data.gamesPlayed}</p>
            <p>Games Played</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-xs uppercase text-gray-400">Built for the</p>
          <a
            href="https://www.showcode.io/level-up-hack/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={LevelUp} className="h-24" />
          </a>
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
    </>
  )
}

export default Index
