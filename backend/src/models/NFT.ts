import mongoose, { Document, Schema } from 'mongoose'

export interface INFT extends Document {
  owner: string
  tokenId: string
  metadata: string
}

const NFTSchema = new Schema<INFT>({
  owner: { type: String, required: true },
  tokenId: { type: String, required: true },
  metadata: { type: String, required: true },
})

export default mongoose.model<INFT>('NFT', NFTSchema)
