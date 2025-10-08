import mongoose, { Document, Schema } from 'mongoose'

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId
  expert: mongoose.Types.ObjectId
  service: string
  date: Date
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'disputed'
}

const BookingSchema = new Schema<IBooking>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  expert: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'disputed'], default: 'pending' },
})

export default mongoose.model<IBooking>('Booking', BookingSchema)
