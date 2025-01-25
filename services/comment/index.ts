'use server'

import { sanity } from "@/sanity/lib/client";
import { getAuthedUserId } from "../auth";
import { Comment } from "@/types";

type Data = {
    text: string
    videoId: string
}

export async function createComment(data: Data) {
    const userId = await getAuthedUserId();
    if (!userId) return;

    const doc = {
        _type: "comment",
        author: { _ref: userId },
        text: data.text,
        video: { _ref: data.videoId }
    }

    await sanity.create(doc);
}

export async function getComments(videoId: string) {
    const query = `
        *[_type=="comment" && video._ref=="${videoId}"] {
            ...,
            author->,
        } | order(_createdAt asc)
    `

    const comments = await sanity.fetch(query);
    return comments as Comment[]
}

export async function hasUserCommented(comments: Comment[]) {
    const userId = await getAuthedUserId();
    if (!userId) return false;

    return comments.some(c => c.author._id === userId);
}