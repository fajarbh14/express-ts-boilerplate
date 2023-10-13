import { Handler } from '../types'

export interface IAuthController {
  login: Handler
}

export interface IAuthService {
  login: (
    login: string,
    password: string
  ) => Promise<{
    accessToken: string
    refreshToken: string
  }>
  register:(
    email: string,
    username: string,
    password: string,
    role: string
  ) => Promise<{
    email: string
    username: string
    password: string
    role: string
  }>
}
