import { Request, Response } from "express"

import { PostModel } from "../models/postModel"

export const postController = {
    async createPost(req: Request, res: Response) {
        try {
            console.log('createPost called with body:', req.body)
            const { title, content, authorId } = req.body
            const newPost = await PostModel.createPost({ title, content, authorId })
            res.status(201).json({
                success: true,
                message: 'Post created successfully.',
                data: newPost,
            })
        } catch (error) {
            console.error('Error creating post:', error)
            res.status(500).json({ success: false, message: 'Internal server error.' })
        }
    },

    async getPosts(req: Request, res: Response) {
        try {
            const posts = await PostModel.getPosts()
            res.status(200).json({
                success: true,
                message: 'Posts fetched successfully.',
                data: posts,
            })
        } catch (error) {
            console.error('Error fetching posts:', error)
            res.status(500).json({ success: false, message: 'Internal server error.' })
        }
    },

    async getPostById(req: Request, res: Response) {
        try {
            const postId = req.params.id as string
            const post = await PostModel.getPostById(postId)
            if (!post) {
                return res.status(404).json({ success: false, message: 'Post not found.' })
            }
            res.status(200).json({
                success: true,
                message: 'Post fetched successfully.',
                data: post,
            })
        } catch (error) {
            console.error('Error fetching post by ID:', error)
            res.status(500).json({ success: false, message: 'Internal server error.' })
        }
    },

    async updatePost(req: Request, res: Response) {
        try {
            const postId = req.params.id as string
            const { title, content, authorId } = req.body
            const updatedPost = await PostModel.updatePost({ title, content, authorId, postId })
            if (!updatedPost) {
                return res.status(404).json({ success: false, message: 'Post not found or unauthorized.' })
            }
            res.status(200).json({
                success: true,
                message: 'Post updated successfully.',
                data: updatedPost,
            })
        } catch (error) {
            console.error('Error updating post:', error)
            res.status(500).json({ success: false, message: 'Internal server error.' })
        }
    },

    async deletePost(req: Request, res: Response) {
        try {
            const postId = req.params.id as string
            await PostModel.deletePost(postId)
            res.status(200).json({
                success: true,
                message: 'Post deleted successfully.',
            })
        } catch (error) {
            console.error('Error deleting post:', error)
            res.status(500).json({ success: false, message: 'Internal server error.' })
        }
    },
}