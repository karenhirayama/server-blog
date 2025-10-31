import { Request, Response } from 'express'

import { CommentModel } from '../models/commentModel'

export const commentController = {
  async createComment(req: Request, res: Response) {
    try {
      const { postId, content, userId } = req.body
      const newComment = await CommentModel.createComment({ postId, content, userId })
      res.status(201).json({
        success: true,
        message: 'Comment created successfully.',
        data: newComment,
      })
    } catch (error) {
      console.error('Error creating comment:', error)
      res.status(500).json({ success: false, message: 'Internal server error.' })
    }
  },

    async getCommentsByPostId(req: Request, res: Response) {
        try {
            const postId = req.params.postId as string
            const comments = await CommentModel.getCommentsByPostId(postId)
            res.status(200).json({
                success: true,
                message: 'Comments fetched successfully.',
                data: comments,
            })
        } catch (error) {
            console.error('Error fetching comments by post ID:', error)
            res.status(500).json({ success: false, message: 'Internal server error.' })
        }
    },

    async deleteCommentsByPostId(req: Request, res: Response) {
        try {
            const postId = req.params.postId as string
            await CommentModel.deleteCommentsByPostId(postId)
            res.status(200).json({
                success: true,
                message: 'Comments deleted successfully.',
            })
        } catch (error) {
            console.error('Error deleting comments by post ID:', error)
            res.status(500).json({ success: false, message: 'Internal server error.' })
        }
    },
}
