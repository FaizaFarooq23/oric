import React from 'react'
import Link from 'next/link'

export default function Breadcrum({pageName}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <h2 className="text-2xl font-semibold text-black">
      {pageName}
    </h2>

    <nav>
      <ol className="flex items-center gap-2">
        <li>
          <Link className=" text-gray-600" href={"/dashboard"}>
            Dashboard /
          </Link>
        </li>
        <li className="font-medium text-blue-900">{pageName}</li>
      </ol>
    </nav>
  </div>
  )
}
