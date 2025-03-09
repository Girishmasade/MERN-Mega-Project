import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai"; // Import from react-icons

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      {/* Trigger Button */}
      <Dialog>
        <DialogTrigger asChild>
          <button className="pt-[5px]">
          <AiOutlineSearch className="text-white text-3xl" /> 
          </button>
        </DialogTrigger>
        {/* Full-Screen Search Dialog */}
        <DialogContent className="flex flex-col bg-black/50 backdrop-blur-lg p-6 w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Search</h2>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <AiOutlineClose className="w-6 h-6 text-white" />
              </Button>
            </DialogTrigger>
          </div>

          {/* Search Input Field with Icon */}
          <div className="relative w-full max-w-md mx-auto mt-6">
            <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/80 backdrop-blur-md rounded-lg p-3 pl-10 focus:outline-none"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Search;
