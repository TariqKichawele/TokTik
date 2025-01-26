import VideoList from '@/components/VideoList';
import { getUserVideos } from '@/services/video';
import React from 'react'
import Image from 'next/image';

const Page = async ({ params }: { params: { id: string }}) => {
    params = await params;
    const videos = await getUserVideos(params.id);
    
    const user = videos.at(0)?.author;
    if(!user) return;
  return (
    <div className="space-y-24">
        <div className="flex items-center gap-20 border-b border-b-secondary pb-8">
            <Image
                alt="Profile pic"
                src={user.picture_url}
                width={200}
                height={200}
                className="rounded-full"
            />
            <div className="space-y-3">
                <p className="text-3xl font-semibold">
                    @{user.name.toLocaleLowerCase().split(" ")}
                </p>
                <p className="text-xl text-neutral-300 font-semibold">{user.email}</p>
            </div>
        </div>

        <div className="space-y-6">
            <span className="text-xl font-semibold text-neutral-400">
                {`${user.name}'s videos`} - {videos.length} Videos
            </span>
            <VideoList videos={videos} />
        </div>
    </div>
  )
}

export default Page