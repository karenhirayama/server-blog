import { pool } from '../config/database'

import { User, UserInput } from '../types/user'

export const UserModel = {
  async findById(id: string) {
    const result = await pool.query('SELECT email, name, is_admin FROM users WHERE id = $1', [id])
    return result.rows[0] || null
  },

  async findByEmail(email: string) {
    const result = await pool.query('SELECT id, email, name, password, is_admin FROM users WHERE email = $1', [email])
    return result.rows[0] || null
  },

  async create(userInput: UserInput): Promise<User> {
    const { email, password, name, isAdmin = false } = userInput

    if (!name || name.trim().length === 0) {
      throw new Error('Name is required and cannot be empty')
    }

    const cleanName = name.trim()

    try {
      const result = await pool.query('INSERT INTO users (email, password, name, is_admin) VALUES ($1, $2, $3, $4) RETURNING id, email, name, is_admin', [
        email,
        password,
        cleanName,
        isAdmin,
      ])
      return result.rows[0]
    } catch (error) {
      console.error('Database error in UserModel.create:', error)
      throw error
    }
  },
}
