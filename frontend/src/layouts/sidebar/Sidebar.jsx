import React from 'react'
import { navItems } from './navItems'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo/logo6.png'

const Sidebar = ({ isOpen, toggleSidebar }) => {
    let currRole = "citizen";//admin
    return (
        <>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}
            <aside className={`fixed top-0 left-0  h-screen z-40  transition-transform duration-300 fontcorm 
           ${isOpen ? "translate-x-0" : "-translate-x-[110%] md:translate-x-0"}`}>
                <div
                    className={` 
             h-full  w-50 lg:w-72 bg-[#fffef6] border  border-[#dacbe1]  
             
           `}
                >
                    {/* Logo */}
                    <div className="flex flex-col items-center ">
                        <img
                            src={logo}
                            alt="Vidyut Seva"
                            className="w-40 lg:w-56 object-contain"
                        />
                    </div>

                    {/* Navigation */}
                    <nav className=" mt-5 px-5  ">
                        <ul className="space-y-5">
                            {navItems.filter(item => item.role == currRole || item.role == "common").map((item) => (

                                <li key={item.path}>
                                    <NavLink to={item.path}>
                                        {({ isActive }) => (
                                            <div
                                                className={`flex items-center justify-between  rounded-2xl  px-4 py-3 border-y  border-transparent transition-all duration-300 
                                                ${isActive
                                                        ? "bg-[#61197b]  text-white "
                                                        : "hover:bg-[#7b3097]  hover:text-white"
                                                    }`
                                                }
                                            >




                                                <div className="flex items-center gap-2">
                                                    <div className={`w-7  h-7 flex items-center justify-center  rounded-lg 
                                                
                                                         ${isActive ? " bg-[#f3eee1] text-[#61197b] " : " bg-[#61197b] text-white"}`}>
                                                        {item.icon}
                                                    </div>


                                                    <span className="text-[14px] lg:text-[18px] font-medium">
                                                        {item.label}
                                                    </span>
                                                </div>

                                                {item.children && (
                                                    <ChevronDown size={18} />
                                                )}
                                            </div>
                                        )}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    )
}

export default Sidebar