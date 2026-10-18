

import React from "react";
import { Bell, ChevronDown, Menu, UserRound } from "lucide-react";
import { FiMoon } from "react-icons/fi";

const Header = ({ parentTitle = "", currTitle = "Create Complaint", toggleSidebar }) => {
  return (
    <header className="w-full px-2 pt-1">

      <div className="  h-14 lg:h-18   bg-[#fffef6] rounded-sm  border border-[#dacbe1] flex items-center 
        justify-between px-3 lg:px-5 "
      >

        <button
          onClick={toggleSidebar}
          className=" md:hidden p-2 bg-[#4F95C3] rounded-md text-white"
        >
          <Menu size={22} />
        </button>

        {/* Breadcrumb */}
        <div className="md:text-sm hidden sm:block ">

          <span className="text-[#61197b] font-medium text-xl">
            {currTitle}
          </span>

        </div>


        {/* Right Section */}
        <div className="flex items-center gap-1">


          <button
            className="  relative  px-2  py-2.5 sm:py-2 lg:py-2.5  rounded-lg flex items-center justify-center 
              cursor-pointer hover:bg-[#f3eee1] transition-all duration-200
            "
          >
            <FiMoon className="text-[#6d5c75] w-3 h-3 lg:w-5 lg:h-5" />
          </button>
          {/* Notification */}
          <button
            className="
              relative
              px-2
              py-2.5 sm:py-2 lg:py-2.5
              rounded-lg 
              flex
              items-center
              justify-center 
              cursor-pointer
              hover:bg-[#f3eee1]
              transition-all duration-200
            "
          >
            <Bell className="text-[#6d5c75] w-3 h-3 lg:w-5 lg:h-5" />

            <span
              className="
              absolute
              top-1 
               right-2
              w-2  
             h-2  
              rounded-full
              bg-yellow-500
              text-white
              text-[8px] lg:text-[10px]
              flex
              items-center
              justify-center
              "
            >

            </span>

          </button>

          <div className="py-1">
            <div className=" h-9 w-[1px] bg-[#dacbe1]"></div>
          </div>

          <div className="flex items-center gap-2 px-4 py-3 bg-white rounded-lg w-fit">
            <div className="w-9 h-9 rounded-full bg-[#E9D8F4] flex items-center justify-center">
              <UserRound size={18} className="text-[#61197B]" />
            </div>

            <span className="text-[16px] font-medium fontcorm text-black">
              Citizen
            </span>
          </div>


        </div>

      </div>

      <div className="flex items-center gap-1 lg:gap-2 text-[12px] lg:text-sm text-gray-600 ml-1">
        <span className="flex items-center gap-2 text-lg lg:text-3xl pb-0.5 text-gray-800">
          {`>`}
        </span>
        {
          parentTitle && (
            <>
              {
                parentTitle.split(">").map((item, index) => (
                  <React.Fragment key={index}>

                    <span className="font-medium text-gray-800">
                      {item.trim()}
                    </span>

                    <span className="text-[16px] lg:text-2xl pb-0.5   text-gray-800">
                      &gt;
                    </span>

                  </React.Fragment>
                ))
              }
            </>
          )
        }
        <span className="font-medium text-[#61197b]">
          {currTitle}
        </span>
      </div>
    </header>
  );
};

export default Header;