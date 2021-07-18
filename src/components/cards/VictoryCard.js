import * as React from "react"

import useSound from 'use-sound';
import fanfareSfx from '../../assets/sounds/rising-pops.mp3';

const VictoryCard = () => {
  const [play] = useSound(fanfareSfx);

  play()
  return (
    <div className="flex flex-col pb-2 text-center text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-32 w-32 m-auto"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  )
}

export default VictoryCard