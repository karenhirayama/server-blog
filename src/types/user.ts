export interface User {
  id: string
  name: string
  email: string
  password: string
  created_at: Date
  isAdmin: boolean
}

export interface UserInput {
  email: string
  password: string
}

export interface AuthRequest extends Express.Request {
  user?: User
}
