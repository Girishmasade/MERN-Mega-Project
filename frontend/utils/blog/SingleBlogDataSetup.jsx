import React from 'react'

const SingleBlogDataSetup = ({id, img, title,  paragraph1, paragraph2, paragraph3}) => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col justify-center items-center">
      <div className="" key={id}>
        {/* Image */}
        <img
          src={img}
          alt={title}
          className="w-full h-52 object-cover rounded-t-lg  hover:scale-105 transition-transform duration-500 ease-in-out"
        />

        {/* Content */}
        <div className="p-5 text-center flex flex-col justify-center items-center gap-5">
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
          <p className="text-sm text-gray-500">{paragraph1}</p>
          <p className="text-sm text-gray-500">{paragraph2}</p>
          <p className="text-sm text-gray-500">{paragraph3}</p>
        </div>
      </div>
    </div>
  )
}

export default SingleBlogDataSetup
