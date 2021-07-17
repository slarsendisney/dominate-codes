import * as React from "react"
import { Link } from "gatsby"

const Header = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-16 my-4">
      <h1 className="text-xl font-bold pb-8 pl-8">
        <span class="text-indigo-800">
          <span class="opacity-50">&lt;</span><Link to="/" className="hover:underline cursor-pointer">Dominate.codes</Link>
          <span class="opacity-50"> /&gt;</span>
        </span>
      </h1>
    </div>
  )
}

export default Header