export interface CommentInput {
    postId: string
    content: string
    userId: string
}

export interface Comment {
    content: string
    created_at: Date
    user_name: string
}