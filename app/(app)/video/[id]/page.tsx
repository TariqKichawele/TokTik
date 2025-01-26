import { getComments, hasUserCommented } from '@/services/comment';
import { getVideoById } from '@/services/video'
import { AiFillMessage } from 'react-icons/ai';
import { IoMdShare } from 'react-icons/io';
import React from 'react'
import VideoPlayer from '@/components/VideoPlayer';
import VideoInfo from '@/components/VideoInfo';
import LikeButton from './LikeButton';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const VideoDetails = async ({ params }: { params: { id: string }}) => {
    params = await params;
    const video = await getVideoById(params.id);
    const comments = await getComments(params.id);
    const hasCommented = await hasUserCommented(comments);

    return (
        <div className="flex flex-col gap-4 md:flex-row h-full">
            <VideoPlayer video={video} />
            <div className="flex flex-col justify-between w-full overflow-auto">
                <div className="border-secondary flex flex-col gap-4  p-6">
                    <VideoInfo video={video} />
                </div>
                <div className="bg-secondary h-[1px]" />

                <div className="p-6 space-y-12">
                    <div className="flex items-center gap-2">
                        <LikeButton videoId={video._id} />
                        <VideoButton icon={<AiFillMessage />} count={comments.length} active={hasCommented} />
                        <VideoButton icon={<IoMdShare />} />
                    </div>
                </div>

                <CommentList comments={comments} />
                <CommentForm videoId={video._id} />
            </div>
        </div>
    )
}

export default VideoDetails

export function VideoButton({
    icon,
    count,
    active,
    type
}: {
    icon: React.ReactNode;
    count?: number;
    active?: boolean;
    type?: "button" | "submit"
} ) {
    const showCounter = !Number.isNaN(count);
    return (
        <button
            type={type || "button"}
            className={`${showCounter ? "flex items-center gap-1 text-xl" : "text-2xl"} p-3 bg-secondary rounded-full hover:bg-secondary/50`}
        >
            <span className={`${active ? "text-primary" : ""}`}>{icon}</span>
            {showCounter ? <span className="text-white">{count}</span> : null}
        </button>
    );
}