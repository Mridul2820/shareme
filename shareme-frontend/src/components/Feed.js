import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

import { client } from '../client'

const Feed = () => {
    const [loading, setLoading] = useState(true)

    if(loading) return <Spinner message="We are adding new ideas to your feed!" />

    return (
        <div>
            Feed
        </div>
    )
}

export default Feed
