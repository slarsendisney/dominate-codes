import * as React from "react"
import { Link } from "gatsby"
import { useAuth } from "../context/auth-context"

const Header = () => {
  const { user, logout } = useAuth() || {}
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-16 p-4">
        <h1 className="text-xl font-bold ">
          <span class="text-indigo-800">
            <span class="opacity-50">&lt;</span>
            <Link to="/" className="hover:underline cursor-pointer">
              Dominate.codes
            </Link>
            <span class="opacity-50"> /&gt;</span>
          </span>
        </h1>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-8">
        {user && user.email && (
          <div className="pr-1 pl-3 py-1 bg-indigo-100 inline-block rounded-full">
            <div className="flex items-center space-x-1">
              <p>{user.name || user.displayName || user.email}</p>
              <button className="bg-indigo-400 hover:bg-indigo-600 p-1 rounded-full text-white" onClick={logout}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Header
