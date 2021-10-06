import React, {useEffect, useState} from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'
import {useDimensions, useDeviceOrientation} from '@react-native-community/hooks'


export default function Gifs() {
    const url = 'https://api.giphy.com/v1/gifs/trending?api_key=fFzwj74JLAfe0WHrhCAKTC6suFdSj5nH&limit=25&rating=g'
    const [latestGifs, setLatestGifs] = useState([])
    const { landscape } = useDeviceOrientation()
    const { screen } = useDimensions()

    const getGifs = async() => {
        const resp = await fetch(url)
        const result = await resp.json()
        const trendingGifs = result.data.filter(gif => gif.trending_datetime !== '0000-00-00 00:00:00' && gif.images.original.url !== undefined)
        const sortedByDate = trendingGifs.sort((a,b) => new Date(b.trending_datetime) - new Date(a.trending_datetime))
        setLatestGifs(sortedByDate.slice(0,5))
    }

    const gifs = latestGifs.map((gif, index) => {
        return (
            <Image
                key={index}
                source={{
                    width: landscape ? screen.width * .7 : screen.width * .9,
                    height: landscape ? screen.height * .8 : screen.height * .3,
                    uri: gif.images.original.url,
                }}
                // style={styles.gif}
            />
        )
    })

    useEffect(() => {
        getGifs()
    }, [])

    return(
        <>{gifs}</>
    )
}

const styles = StyleSheet.create({
    gif: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
})