import * as React from "react"

const HelpMenu = ({ closeFunc }) => {
    const SpecialSituations = [
        {
            title: "Falling Knife",
            desc: "A stock is categorised as a ‘falling knife’ or steep underperformance if it underperforms the benchmark index by more than 20% within 5 days or less."
        },
        {
            title: "Death By 1000 Cuts",
            desc: "Stock underforms the benchmark index by at least 5% from the entry price, over a period of 12 months or more"
        },
        {
            title: "Underwater",
            desc: "A stock is categorised as being underwater if the stock underperforms the benchmark index by at least 5% from the entry price, over a period of 12 months or more"
        },
        {
            title: "Round Trip",
            desc: "Stock outperforms the benchmark index by at least 30% from the entry price over a period of 3 months or more and subsequenty outperformance falls below 30% prior to sell"    
        }
    ]
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
                    <button onClick={() => closeFunc(false)}>
                        close
                    </button>
                </div>
              </div>
              <div className="p-5 px-8">
                Enter Sam's help menu from the home screen
              </div>
            </div>
          </div>
          <p></p>
        </div>
    )
}

export default HelpMenu