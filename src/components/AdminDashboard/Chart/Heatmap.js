import React from 'react'

export default function Heatmap() {
  return (
    <div className="w-full relative bg-transparent rounded-md  flex flex-col justify-between">
              <div className="flex items-start justify-start ">
                <input
                  type="date"
                  className="border border-gray-300 rounded-md px-4 py-2 mr-2"
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="date"
                  className="border border-gray-300 rounded-md px-4 py-2"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <div className="w-full relative bg-transparent rounded-md  flex justify-between">

                <div className="w-full bg-white border border-gray-200 rounded-md flex p-10 justify-between">
                  <WorldMaps mapDataCount={mapData} />
                  <div className="w-1/2 max-h-80 overflow-y-scroll">
                    <Fillbar mapDataCount={mapData} />
                  </div>
                </div>
              </div>
            </div>
  )
}
