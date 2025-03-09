import React from 'react'
import { Link } from "react-router-dom";

const Allblogs = () => {
  return (
    <div>
       <div className="container mx-auto px-4 py-8 flex flex-col justify-center items-center">
   <Link to={`/blog/${id}`}>
   <div
        className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
        key={id}
      >
        {/* Image */}
        <img
          src={img}
          alt={title} transition-transform transform 
          className="w-full h-52 object-cover rounded-t-lg  hover:scale-105 transition-transform duration-500 ease-in-out"
        />

        {/* Content */}
        <div className="p-5 text-center flex flex-col justify-center items-center gap-5">
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
   </Link>
    </div>
    </div>
  )
}

export default Allblogs
