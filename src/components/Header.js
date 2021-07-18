import * as React from "react"
import { Link } from "gatsby"
import { useAuth } from "../context/auth-context"
import Logo from "../assets/logo.svg"

const Header = () => {
  const { user, logout } = useAuth() || {}
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-16 p-4">
        <Link to="/" className="hover:underline cursor-pointer text-indigo-600 hover:text-indigo-800">
          <div className="h-14 w-14">
          <svg
           
            viewBox="0 0 104 149"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Dominate</title>
            <g
              id="Page-1"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <g
                id="Artboard"
                transform="translate(-441.000000, -165.000000)"
                fill="currentColor"
                fill-rule="nonzero"
              >
                <g id="power" transform="translate(441.000000, 165.000000)">
                  <path
                    d="M31.5494436,0.0865383418 C62.1224733,16.5564102 71.0473313,33.096609 73.5045142,48.586752 C74.2012009,52.9834062 80.4568405,53.2016626 81.4491646,48.8632099 C82.4911653,44.299226 82.1725069,40.1972178 81.8126532,37.859449 C81.7132995,37.203467 82.5032815,36.7912052 82.9830865,37.250756 C98.6773144,52.2570972 94.5444488,72.8495903 89.7997103,85.3168818 C88.5650605,88.5592023 92.5416261,91.2740697 95.1127026,88.9447884 C97.9769931,86.3523874 100.538376,83.4277514 102.724155,80.2472703 C103.109453,79.6846537 103.990307,79.9477742 104,80.6267942 L101.769391,104.303978 C99.94125,123.704576 87.0551024,139.601396 69.7013509,145.989827 L69.7,119.108873 L70.775,116.94701 L71.0332018,116.414648 C72.9731229,112.31308 74,107.755154 74,103.197227 L74,103.197227 L74,96.9711752 L52.2418881,96.9711752 L52.5091261,97.2382479 C55.1488026,99.9435956 56.8,103.680141 56.8,107.780488 L56.8,107.780488 L56.8,114.266075 L52.5,114.266075 L52.5,107.780488 L52.4962568,107.492678 C52.3443472,101.659013 47.58807,96.9711752 41.75,96.9711752 L41.75,96.9711752 L41.75,92.6474501 L46.05,92.6474501 L46.2817489,92.6433661 C49.7426851,92.5211856 52.5,89.6728698 52.5,86.1618625 L52.5,86.1618625 L52.5,84 L31,84 L31,97.9654068 L31.0042548,98.4729314 C31.1346163,106.249925 34.2549724,113.782292 39.6,119.367846 L39.6,119.367846 L39.5999701,148.052461 C37.7266452,147.677326 35.8915737,147.195755 34.1011337,146.614197 C26.6096327,144.185488 19.898421,140.00709 14.4569959,134.561593 C5.53456133,125.63248 0.0155920834,113.297355 0.0155920834,99.6720914 C-0.350319724,87.2630017 5.8108127,64.1193336 9.37542451,52.1855579 C9.59957607,51.4422733 10.686407,51.5647396 10.7409303,52.3407624 C11.5842239,65.233654 28.5688367,66.8548141 32.3600232,55.5176055 C41.2982089,28.8139331 32.1407185,8.00924615 30.5401569,0.852860875 C30.4080891,0.267206077 31.022385,-0.199620073 31.5494436,0.0865383418 Z M74,79 L67,79 L67,92 L74,92 L74,79 Z M63,75 L56,75 L56,92 L63,92 L63,75 Z M52,75 L45,75 L45,79 L52,79 L52,75 Z M42,75 L35,75 L35,79 L42,79 L42,75 Z"
                    id="Combined-Shape"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
          </div>
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 w-full  p-4 z-30">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {user && user.email && (
            <div className="pr-1 pl-3 py-1 mb-5 md:mb-0 bg-indigo-100 inline-block rounded-full">
              <div className="flex items-center space-x-1">
                <p>{user.name || user.displayName || user.email}</p>
                <button
                  className="bg-indigo-400 hover:bg-indigo-600 p-1 rounded-full text-white"
                  onClick={logout}
                >
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
          <p className="text-xl font-bold ">
            View the {` `}
            <a
              href="/"
              className="hover:underline cursor-pointer text-indigo-600"
            >
              devpost submission.
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default Header
