import { Router } from 'express'
import { mintNFT, getNFTs } from '../controllers/nftController'

const router = Router()

router.post('/mint', mintNFT)
router.get('/', getNFTs)

export default router
