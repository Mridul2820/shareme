import React from 'react'
import { urlFor } from '../client'

const Pin = ({ pin }) => {
    const { postedBy, image, _id, destination } = pin;
    
    return (
        <div className="m-2">
            <img 
                src={(urlFor(image).width(250).url())}
                alt={pin.title} 
                className="rounded-lg w-full"
            />
        </div>
    )
}

export default Pin
