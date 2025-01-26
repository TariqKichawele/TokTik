import VideoList from '@/components/VideoList';
import { searchVideos } from '@/services/video';
import React from 'react'

const Search = async ({ params }: { params: { value: string }}) => {
    params = await params;
    const videos = await searchVideos(params.value);
  return (
    <div className="space-y-24">
        <div className="flex items-center gap-20 border-b border-b-secondary pb-8 text-5xl capitalize font-bold">
            RESULTS FOR *{params.value}* SEARCH
        </div>

        <div className="space-y-6">
            <span className="text-xl font-semibold text-neutral-400">
                {videos.length} Videos
            </span>
            <VideoList videos={videos} />
        </div>
    </div>
  )
}

export default Search