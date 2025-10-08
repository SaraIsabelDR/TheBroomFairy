import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { json, urlencoded } from 'body-parser'
import nftRoutes from './routes/nft'
import authRoutes from './routes/auth'
import bookingRoutes from './routes/booking'
import serviceRoutes from './routes/service'

// Cargar variables de entorno
dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Middlewares
app.use(cors())
app.use(helmet())
app.use(json())
app.use(urlencoded({ extended: true }))

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI || '', {
  // useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB conectado')
}).catch((err: unknown) => {
  console.error('Error conectando a MongoDB:', err)
})

// Rutas base
import { Request, Response } from 'express'
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'API funcionando' })
})

// Rutas NFT
app.use('/api/nft', nftRoutes)
// Rutas de autenticación
app.use('/api/auth', authRoutes)
// Rutas de reservas
app.use('/api/bookings', bookingRoutes)
// Rutas de servicios
app.use('/api/services', serviceRoutes)

// TODO: importar y usar rutas de auth, usuarios, bookings, servicios, NFT, etc.
// Ejemplo: app.use('/api/auth', require('./routes/auth'))

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}/api`)
})
