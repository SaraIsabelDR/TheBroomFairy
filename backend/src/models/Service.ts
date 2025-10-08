import mongoose, { Document, Schema } from 'mongoose'

export interface IService extends Document {
  name: string
  description: string
  price: number
}

const ServiceSchema = new Schema<IService>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
})

export default mongoose.model<IService>('Service', ServiceSchema)
