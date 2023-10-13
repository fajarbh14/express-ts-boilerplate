import path from 'path'
import cors from 'cors'
import helmet from 'helmet'
import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import deserializeUser from '../core/middlewares/deserializeUser'
import http from 'http'
import routes from '../routes'
const app = express()
const server = http.createServer(app)
import { Server } from 'socket.io'

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000']
  }
})

io.on('connection', (socket: any) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('a user disconnected')
  })
})
app.use(cookieParser())
app.use(json())
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Origin',
      'X-Requested-With',
      'X-Access-Token',
      'X-Key',
      'Cookies',
      'Cache-Control',
      'Set-Cookie'
    ],
    credentials: true
  })
)

app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
)

app.use(urlencoded({ extended: true }))
app.use('/image', express.static(path.join(__dirname, '../../public/uploads')))
app.use(routes(io))
app.use(deserializeUser)

export default server
