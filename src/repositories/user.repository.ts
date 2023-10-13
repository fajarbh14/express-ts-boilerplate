import { PrismaClient}  from '@prisma/client';
import type { IUserRepository, User } from '../interfaces/user.interface';
const prisma = new PrismaClient()
export class UserRepository implements IUserRepository {
  
  async findByNameOrEmail(login: string){
    const user = await prisma.users.findFirst({
      where: {
        OR: [
          {
            username: login
          },
          {
            email: login
          }
        ]
      }
    })
    if (!user) return null
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
      isVerified: user.isVerified,
      refreshToken: user.refreshToken,
      role: user.role
    }
  }

  async create(data: User){
    const user = await prisma.users.create({
      data: {
        email: data.email,
        username: data.username,
        password: data.password,
        refreshToken: data.refreshToken,
        role: data.role,
      }
    })
    return user
  }
}
