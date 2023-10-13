import { IAuthService, IUserRepository } from '../interfaces'
import { UserRepository } from '../repositories'
import BaseService from './base.service'
import { compare } from 'bcrypt'
import { signJWT, verifyJWT } from '../core/config/jwt'
class AuthService extends BaseService implements IAuthService {
  constructor(private readonly userRepository: IUserRepository = new UserRepository()) {
    super(userRepository)
  }

  private comparePassword(password: string, hash: string) {
    return compare(password, hash)
  }

  async login(login: string, password: string) {
    const user = await this.userRepository.findByNameOrEmail(login)
    if (!user) {
      throw new Error('User tidak ditemukan')
    } 
    if (!user.isVerified) throw new Error('User belum terverifikasi')
    const isPasswordValid = await this.comparePassword(password, user.password)
    if (!isPasswordValid) throw new Error('User tidak ditemukan')
    
    // Create JWT
    const tokenPayload = { id: user.id, email: user.email, role: user.role }
    const accessToken = signJWT(tokenPayload, '15m')
    const refreshToken = signJWT(tokenPayload, '1d')
    return {
      accessToken: accessToken,
      refreshToken: refreshToken
    }
  }

  async register(email: string, username: string, password: string, role: string) {
    const user = 'user'
    return {
      email: 'email',
      username: 'username',
      password: 'password',
      role: 'role'
    }
  }
}

export default AuthService
