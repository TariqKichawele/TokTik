import VideoList from '@/components/VideoList';
import { getHashtagVideos } from '@/services/video';
import React from 'react'
import { FaSlackHash } from 'react-icons/fa';

const Page = async ({ params }: { params: { hashtag: string }}) => {
    params = await params;
    const videos = await getHashtagVideos(params.hashtag);
  return (
    <div className="space-y-24">
        <div className="flex items-center gap-20 border-b border-b-secondary pb-8 text-5xl">
            <div className='p-8 flex justify-center items-center bg-secondary rounded-full'>
                <FaSlackHash />
            </div>
            <div className='capitalize font-bold'>
                {params.hashtag}
            </div>
        </div>

        <div className="space-y-6">
            <span className="text-xl font-semibold text-neutral-400">
                {`${params.hashtag} videos`} - {videos.length} Videos
            </span>
            <VideoList videos={videos} />
        </div>
    </div>
  )
}

export default Page