import * as React from "react"

import Tutorial from "../game/Tutorial"
import X from "../../assets/X"

import useSound from 'use-sound';
import popSfx from '../../assets/sounds/pop.mp3';

const HelpMenu = ({ closeFunc }) => {
    const [playPop] = useSound(popSfx);

    return (
        <div className="fixed top-0 left-0 z-10 w-screen h-screen">
          <div className="absolute z-10 w-full h-full bg-black opacity-75" />
          <div className="absolute z-20 flex items-center justify-center w-full h-full">
            <div className="w-full max-w-2xl text-gray-800 bg-white rounded">
              <div className="flex p-3 border-b">
                <div className="flex-intial">
                  <h4 className="font-bold text-xl">Help</h4>
                </div>
                <div className="flex-grow flex flex-row-reverse">
                    <button onClick={() => {
                        playPop()
                        closeFunc(false)
                      }}
                    >
                        <X className="w-8 h-8 text-indigo-400 hover:text-indigo-600"/>
                    </button>
                </div>
              </div>
              <Tutorial />
            </div>
          </div>
          <p></p>
        </div>
    )
}

export default HelpMenu