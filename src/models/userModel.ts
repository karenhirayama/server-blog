import bcrypt from 'bcrypt'
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
    const { email, password } = userInput
    const hashPassord = bcrypt.hashSync(password, 10)
    const result = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, name, is_admin', [email, hashPassord])
    return result.rows[0]
  },
}
