import React, {useEffect, useState} from 'react'
import {View, Image, Text} from 'react-native'


export default function Gifs() {
    const url = 'https://api.giphy.com/v1/gifs/trending?api_key=fFzwj74JLAfe0WHrhCAKTC6suFdSj5nH&limit=25&rating=g'
    const [latestGifs, setLatestGifs] = useState([])

    const getGifs = async() => {
        const resp = await fetch(url)
        const result = await resp.json()
        const trendingGifs = result.data.filter(gif => gif.trending_datetime !== '0000-00-00 00:00:00' && gif.images.original.url !== undefined)
        const sortedByDate = trendingGifs.sort((a,b) => new Date(b.trending_datetime) - new Date(a.trending_datetime))
        setLatestGifs(sortedByDate.slice(0,5))
    }

    const gifs = latestGifs.map(gif => {
        return (
            <Image
                source={{
                    uri: gif.images.original.url,
                    width: 600,
                    height: 300
                }}
            />
        )
    })

    useEffect(() => {
        getGifs()
    }, [])

    return(
        <View>
            {gifs}
        </View>
    )
}