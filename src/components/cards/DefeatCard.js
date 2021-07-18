import * as React from "react"

import useSound from 'use-sound';
import plungeSfx from '../../assets/sounds/disable-sound.mp3';

const DefeatCard = () => {
  const [play] = useSound(plungeSfx);
  play()

  return (
    <div className="flex flex-col pb-2 text-white">
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
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  )
}

export default DefeatCard