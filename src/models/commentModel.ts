import { pool } from "../config/database"

import { Comment, CommentInput } from "../types/comment"

export const CommentModel = {
    async createComment(commentInput: CommentInput): Promise<Comment> {
        const { postId, content, userId } = commentInput

        try {
            const result = await pool.query(
                `INSERT INTO comments 
                (post_id, content, user_id, created_at)
                VALUES ($1, $2, $3, NOW()) 
                RETURNING content, created_at,
                (SELECT name FROM users WHERE id = $3) AS user_name`,
                [postId, content, userId]
            )
            return result.rows[0]
        } catch (error) {
            console.error('Database error in commentModel.createComment:', error)
            throw error
        }
    },

    async getCommentsByPostId(postId: string): Promise<Comment[]> {
        try {
            const result = await pool.query(
                `SELECT c.content, c.created_at, u.name AS user_name 
                FROM comments c JOIN users u 
                ON c.user_id = u.id 
                WHERE c.post_id = $1
                ORDER BY c.created_at DESC`,
                [postId]
            )
            return result.rows
        } catch (error) {
            console.error('Database error in commentModel.getCommentsByPostId:', error)
            throw error
        }
    },

    async deleteCommentsByPostId(postId: string): Promise<void> {
        try {
            await pool.query(
                `DELETE FROM comments WHERE post_id = $1`,
                [postId]
            )
        } catch (error) {
            console.error('Database error in commentModel.deleteCommentsByPostId:', error)
            throw error
        }
    },
}