import { Request, Response } from 'express'
import type { IAuthController } from '../interfaces/auth.interface'
import { getResponse, getHttpCode } from '../utils'
import { IAuthService } from '../interfaces/auth.interface'
import AuthService from '../services/auth.service'
class AuthController implements IAuthController {
  private readonly authService: IAuthService = new AuthService()
  constructor() {
    this.login = this.login.bind(this)
  }

  async login(req: Request, res: Response) {
    try {
      const { login, password } = req.body
      const result = await this.authService.login(login, password)
      return getResponse(res, getHttpCode.OK, 'Berhasil', result)
    } catch (error) {
      return getResponse(res, getHttpCode.INTERNAL_SERVER_ERROR, 'Gagal', {})
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { email, username, password, role } = req.body
      const result = await this.authService.register(email, username, password, role)
      return getResponse(res, getHttpCode.OK, 'Berhasil', {})
    } catch (error) {
      return getResponse(res, getHttpCode.INTERNAL_SERVER_ERROR, 'Gagal', {})
    }
  }
}
export default AuthController
