import { Handler } from '../types'

export interface User {
  email: string
  username: string
  password: string
  refreshToken: string
  role: string
}

export interface IUserRepository {
  create: (data: User) => Promise<any>
  findByNameOrEmail: (login: string) => Promise<{
    id: String
    email: string 
    username: string | null
    password: string 
    refreshToken: string | null
    isVerified: boolean 
    role: string
  }| null>
}