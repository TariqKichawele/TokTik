import { DetailedVideo } from '@/types'
import React from 'react'
import VideoCard from './VideoCard'

const VideoList = ({ videos }: { videos: DetailedVideo[] }) => {
  return (
    <ul>
        {videos.map(video => <VideoCard key={video._id} video={video} /> )}
    </ul>
  )
}

export default VideoList