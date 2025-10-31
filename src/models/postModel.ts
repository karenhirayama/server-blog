import { pool } from '../config/database'

import { Post, PostInput } from '../types/post'

export const PostModel = {
  async createPost(postInput: PostInput): Promise<Post> {
    const { title, content, authorId } = postInput

    try {
      const result = await pool.query(
        `INSERT INTO posts 
        (title, content, user_id, created_at, updated_at)
        VALUES ($1, $2, $3, NOW(), NOW()) 
        RETURNING title, content, created_at, updated_at, 
        (SELECT name FROM users WHERE id = $3) AS author_name`,
        [title, content, authorId]
      )
      return result.rows[0]
    } catch (error) {
      console.error('Database error in postModel.createPost:', error)
      throw error
    }
  },

  async updatePost(postInput: PostInput): Promise<Post> {
    const { title, content, authorId, postId } = postInput

    try {
      const result = await pool.query(
        `UPDATE posts
            SET title = $1, content = $2, updated_at = NOW()
            WHERE id = $3 AND user_id = $4
            RETURNING title, content, created_at, updated_at,
            (SELECT name FROM users WHERE id = $4) AS author_name`,
        [title, content, postId, authorId]
      )
      return result.rows[0]
    } catch (error) {
      console.error('Database error in postModel.updatePost:', error)
      throw error
    }
  },

  async getPosts(): Promise<Post[]> {
    try {
      const result = await pool.query(
        `SELECT p.title, p.content, p.created_at, p.updated_at, u.name AS author_name 
        FROM posts p JOIN users u 
        ON p.user_id = u.id 
        ORDER BY p.created_at DESC`
      )
      return result.rows
    } catch (error) {
      console.error('Database error in postModel.getPosts:', error)
      throw error
    }
  },

  async getPostById(postId: string): Promise<Post | null> {
    try {
      const result = await pool.query(
        `SELECT p.title, p.content, p.created_at, p.updated_at, u.name AS author_name 
        FROM posts p JOIN users u 
        ON p.user_id = u.id 
        WHERE p.id = $1`,
        [postId]
      )
      return result.rows[0] || null
    } catch (error) {
      console.error('Database error in postModel.getPostById:', error)
      throw error
    }
  },

  async deletePost(postId: string): Promise<void> {
    try {
      await pool.query('DELETE FROM posts WHERE id = $1', [postId])
    } catch (error) {
      console.error('Database error in postModel.deletePost:', error)
      throw error
    }
  },
}
