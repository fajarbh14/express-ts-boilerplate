import { Request, Response, NextFunction } from 'express'
import { verifyJWT, signJWT } from '../config'
import { JWTTokenPayload } from './types'
import bcrypt from 'bcrypt'

export default async function deserializeUser(req: Request, res: Response, next: NextFunction) {}
