import { Request, Response } from 'express'
import { mintNFTService, getNFTsService } from '../services/nftService'

export const mintNFT = async (req: Request, res: Response) => {
  try {
    const { to, metadata } = req.body
    const tx = await mintNFTService(to, metadata)
    res.json({ success: true, tx })
  } catch (err) {
    res.status(500).json({ success: false, error: (err as Error).message })
  }
}

export const getNFTs = async (req: Request, res: Response) => {
  try {
    const nfts = await getNFTsService()
    res.json({ success: true, nfts })
  } catch (err) {
    res.status(500).json({ success: false, error: (err as Error).message })
  }
}
