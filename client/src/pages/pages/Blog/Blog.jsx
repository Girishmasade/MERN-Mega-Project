import React from 'react';
import GetBlog from '../../../utils/blog/GetBlog';
import { BlogData } from '../../assets/BlogData';

const Blog = () => {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Blog Heading */}
      <div className="flex flex-col items-center text-center mb-6">
        <h1 className="text-red-600 text-3xl font-bold underline">Blog</h1>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-col-6 gap-6">
        {BlogData.map((blog) => (
          <GetBlog key={blog.id} id={blog.id} img={blog.img} title={blog.title} date={blog.date} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
