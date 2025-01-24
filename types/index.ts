export type User = {
    _id: string,
    email: string,
    name: string,
    picture_url: string
}

export type Comment = {
    _id: string,
    text: string,
    author: User
}

export type Video = {
    _id: string,
    caption: string, 
    description: string, 
    video_url: string,
    hashtag: string 
    author: User
}

export type DetailedVideo = Video & { likes_count: number, comments_count: number }