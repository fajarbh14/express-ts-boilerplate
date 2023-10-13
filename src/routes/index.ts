import { Router } from 'express'
import authRoutes from './api/login'
import { Server } from 'socket.io'
const dataRoutes = (io: Server) => {
  const router = Router()
  router.use('/auth', authRoutes)
  return router
}
export default dataRoutes
