import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import MasonryLayout from '../components/MasonryLayout';
import Spinner from '../components/Spinner';

import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data';

const Feed = () => {
    const [pins, setPins] = useState()
    const [loading, setLoading] = useState(false)
    const { categoryId } = useParams()

    useEffect(() => {
        document.title = `${categoryId ? categoryId.slice(0, 1).toUpperCase() + categoryId.slice(1) + ' - ' : ''} ShareMe`
    }, [categoryId])
    
    useEffect(() => {
        if(categoryId){
            setLoading(true)
            const query = searchQuery(categoryId)
            client.fetch(query).then((data) => {
                setPins(data);
                setLoading(false)
            });
        }
        else {
            setLoading(true)
            client.fetch(feedQuery).then((data) => {
                setPins(data);
                setLoading(false)
            });
        }
    }, [categoryId])

    if(loading) return <Spinner message="We are adding new ideas to your feed!" />

    if(!pins?.length) return <h2 className="text-center">No Pins Found</h2>

    return (
        <div>
            {pins && <MasonryLayout pins={pins} />}
        </div>
    )
}

export default Feed
