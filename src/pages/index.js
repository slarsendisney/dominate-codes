import { Link } from "gatsby"
import * as React from "react"
import QuestionContainer from "../components/game/QuestionContainer"

const Index = () => {
  return (
    <>
      <h1>Home Page</h1>
      <Link to="/game" className="primary-btn">
        Play
      </Link>
    </>
  )
}

export default Index
