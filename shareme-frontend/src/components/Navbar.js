import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdAdd, IoMdSearch } from 'react-icons/io'

const Navbar = ({ user, searchTerm, setSearchTerm }) => {
    const navigate = useNavigate();

    if(!user) return null

    return (
        <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
            <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-md">
                <IoMdSearch 
                    fontSize={21}
                    className="ml-1"
                />
                <input 
                    type="text"
                    placeholder='Search Pin' 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    onFocus={() => navigate("/search")}
                    className="p-2 w-full bg-white outline-none"
                />
            </div>
            <div className="flex gap-2">
                <Link 
                    to={`/user/${user?._id}`}
                    className="hidden md:block"
                >
                    <img 
                        src={user?.image}
                        alt={user?.username} 
                        className="w-14 h-12 rounded-lg"
                    />
                </Link>'
                <Link to="/pin-create" className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
                    <IoMdAdd />
                </Link>'
            </div>
        </div>
    )
}

export default Navbar
