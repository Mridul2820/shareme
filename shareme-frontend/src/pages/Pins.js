import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import PinDetail from '../components/PinDetail'
import Search from '../components/Search'
import CreatePin from './CreatePin'
import Feed from './Feed'

const Pins = ({ user }) => {
    const [searchTerm, setSearchTerm] = useState("")
    return (
        <div className="px-2 md:px-5">
            <div className="bg-gray-50">
                <Navbar 
                    user={user}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
            </div>
            <div className="h-full">
                <Routes>
                    <Route path="/" element={<Feed />}/>
                    <Route path="/category/:categoryId" element={<Feed />} />
                    <Route path="/pin/:pinId" element={<PinDetail user={user} />}/>
                    <Route path="/pin-create" element={<CreatePin />}/>
                    <Route 
                        path="/search" 
                        element={
                            <Search 
                                searchTerm={searchTerm} 
                                setSearchTerm={setSearchTerm} 
                            />
                        } 
                    />
                </Routes>
            </div>
        </div>
    )
}

export default Pins
