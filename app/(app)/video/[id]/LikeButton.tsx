'use client'

import { useToast } from '@/hooks/use-toast';
import { getVideoLikesInfo, likeOrDislikeVideo } from '@/services/like';
import useAuth from '@/stores/auth';
import React, { useEffect, useState } from 'react'
import { IoHeart } from 'react-icons/io5';
import { VideoButton } from './page';

type Info = {
    count: number;
    hasLiked: boolean;
}

const LikeButton = ({ videoId }: { videoId: string }) => {
    const [ likeInfo, setLikeInfo ] = useState<Info>({ count: 0, hasLiked: false });
    const isLoggedIn = useAuth((state) => state.isLoggedIn);
    const { toast } = useToast();

    useEffect(() => {
        getVideoLikesInfo(videoId).then((info) => setLikeInfo(info as Info));
    }, [isLoggedIn]);

    const handleLikeOrDislike = async () => {
        if (!isLoggedIn) return toast({ title: "Please log in to like a video", variant: "destructive" });

        let newCount = likeInfo.count;
        let newHasLiked = likeInfo.hasLiked;

        if (likeInfo.hasLiked) {
            newHasLiked = false;
            if (newCount >= 0) newCount -= 1;
        } else {
            newHasLiked = true;
            newCount += 1;
        }

        setLikeInfo({ count: newCount, hasLiked: newHasLiked });
        await likeOrDislikeVideo(videoId, newHasLiked);
    }
  return (
    <form action={async () => { await handleLikeOrDislike(); }}>
        <VideoButton
            type="submit"
            icon={<IoHeart />}
            count={likeInfo.count}
            active={likeInfo.hasLiked}
        />
    </form>
  )
}

export default LikeButton