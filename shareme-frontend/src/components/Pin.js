import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { v4 as uuidv4 } from 'uuid';

import { urlFor, client } from '../client'
import { fetchUser } from '../utils/fetchUser'

const Pin = ({ pin }) => {
    const [postHovered, setPostHovered] = useState(false)
    const [savingPost, setSavingPost] = useState(false)
    const navigate = useNavigate()
    const { postedBy, image, _id, destination, save } = pin;

    const user = fetchUser()
    let alreadySaved = !!(save?.filter(item => item.postedBy._id === user?.googleId))?.length;

    const savePin = (id) => {
        if (!alreadySaved) {
            setSavingPost(true);
        
            client
                .patch(id)
                .setIfMissing({ save: [] })
                .insert('after', 'save[-1]', [{
                    _key: uuidv4(),
                    userId: user?.googleId,
                    postedBy: {
                        _type: 'postedBy',
                        _ref: user?.googleId,
                    },
                }])
                .commit()
                .then(() => {
                    window.location.reload();
                    setSavingPost(false);
                });
        }
    };

    const deletePin = (id) => {
        client
            .delete(id)
            .then(() => {
                window.location.reload();
            });
    };

    return (
        <div className="m-2">
            <div
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/pin/${_id}`)}
                className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
            >
                <img 
                    src={(urlFor(image).width(350).url())}
                    alt={pin.title} 
                    className="rounded-lg w-full"
                />
                {postHovered && 
                    <div className="flex flex-col justify-between absolute top-0 w-full h-full p-1 pr-2 py-2 z-50" style={{ height: '100%' }}>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <a 
                                    href={`${image?.asset?.url}?dl=`} 
                                    onClick={(e) => e.stopPropagation()}
                                    download
                                    className="bg-white w-8 h-8 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                                >
                                    <MdDownloadForOffline
                                        className="h-6 w-6" 
                                    
                                    />
                                </a>
                            </div>
                            {alreadySaved ? 
                                <button
                                    type="button" className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                                >
                                    {save?.length} Saved
                                </button>
                                :
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        savePin(_id);
                                    }}
                                    type="button"
                                    className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-4 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                                >
                                    {pin?.save?.length}   {savingPost ? 'Saving' : 'Save'}
                                </button>
                            }
                        </div>
                        <div className="flex justify-between items-center gap-2 w-full">
                        {destination && 
                            <a 
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                href={destination}
                                target="_blank"
                                className="bg-white flex items-center gap-2 text-black font-bold p-1 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                                rel="noreferrer"
                            >
                                {' '}
                                <BsFillArrowUpRightCircleFill />
                                {destination?.slice(8, 17)}...
                            </a>
                        }
                        {postedBy?._id === user?.googleId && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deletePin(_id);
                                }}
                                className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                            >
                                <AiTwotoneDelete />
                            </button>
                            )
                        }
                        </div>
                    </div>
                }
            </div>
            <Link 
                to={`/user/${postedBy?._id}`} 
                className="flex gap-2 mt-2 items-center"
            >
                <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={postedBy?.image}
                    alt="user-profile"
                />
                <p className="font-semibold capitalize">
                    {postedBy?.userName}
                </p>
            </Link>
        </div>
    )
}

export default Pin
