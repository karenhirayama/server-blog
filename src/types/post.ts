export interface Post {
    title: string
    content: string
    createdAt: Date
    updatedAt: Date
    authorName: string
}

export interface PostInput {
    title: string
    content: string
    authorId: string
    postId?: string
}

