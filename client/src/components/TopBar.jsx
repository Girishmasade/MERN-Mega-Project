import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import Search from "./Search";
import { FaDotCircle } from "react-icons/fa";
import { Avatar, AvatarImage } from "./ui/avatar";

const TopBar = () => {
  const [verified, setVerified] = useState(false);
  const [hover, setHover] = useState(false); 

  const Navigation = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Blog", path: "/blog" },
  ];

  return (
    <div className="bg-red-500 text-white p-4 px-12">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-black">Logo</h1>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          {Navigation.map((nav, index) => (
            <Link to={nav.path} key={index}>
              <Button className="bg-transparent text-xl">{nav.label}</Button>
            </Link>
          ))}
        </div>

        <div className="flex space-x-4 items-center">
          <Search />

         
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="relative"
          >
            {verified ? (
              <FaDotCircle className="text-green-500 text-3xl cursor-pointer" />
            ) : (
              <FaDotCircle className="text-red-200 text-3xl cursor-pointer" />
            )}

           
            {hover && (
              <span className="absolute top-full left-1/2 w-32 text-center font-semibold transform -translate-x-1/2 mt-1 bg-white text-black px-2 py-1 rounded-md shadow-lg text-sm">
                {verified ? "Verified" : "Not Verified"}
              </span>
            )}
          </div>

          {/* User Avatar */}
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
