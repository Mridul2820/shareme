import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'
import { IoIosArrowForward } from 'react-icons/io'

import ShareMeLogo from '../assets/logo.png'
import { categories } from '../utils/data'

const Sidebar = ({ user, setToggleSidebar }) => {
    const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
    const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize';

    return (
        <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
            <div className="flex flex-col">
                <Link
                    to="/"
                    className="flex items-center gap-2 px-5 my-6 pt-1 w-190"
                    onClick={() => setToggleSidebar && setToggleSidebar(false)}
                >
                    <img 
                        src={ShareMeLogo} 
                        alt="Logo"
                        className="w-full"
                    />
                </Link>
                <div className="flex flex-col gap-5">
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
                        onClick={() => setToggleSidebar && setToggleSidebar(false)}
                    >
                        <RiHomeFill />
                        Home
                    </NavLink>
                    <h3 className="px-5 text-base 2xl:text-xl">Discover cateogries</h3>
                    {categories.slice(0, categories.length - 1).map(category => (
                        <NavLink
                            to={`/category/${category.name}`}
                            key={category.name}
                            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
                            onClick={() => setToggleSidebar && setToggleSidebar(false)}
                        >
                            <img 
                                src={category.image} className="w-8 h-8 rounded-full shadow-sm" 
                            />
                            {category.name}
                        </NavLink>
                    ))}
                </div>
            </div>
            {user && 
                <Link 
                    to={`user/${user?._id}`}
                    className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
                    onClick={() => setToggleSidebar && setToggleSidebar(false)}
                >
                    <img 
                        src={user.image} 
                        className="w-10 h-10 rounded-full" 
                        alt="user-profile" 
                    />
                    <p>{user.userName}</p>
                    <IoIosArrowForward />
                </Link>
            }
        </div>
    )
}

export default Sidebar
