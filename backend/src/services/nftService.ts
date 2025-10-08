import { ethers } from 'ethers'


const provider = process.env.ETHEREUM_RPC_URL ? new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL) : undefined;
let wallet: ethers.Wallet | undefined = undefined;
let contract: ethers.Contract | undefined = undefined;
const contractAddress = process.env.NFT_CONTRACT_ADDRESS || '';
const privateKey = process.env.PRIVATE_KEY;

// ABI mínimo para mint y consulta de NFT
const abi = [
  'function mint(address to, string memory metadata) public returns (uint256)',
  'function tokensOfOwner(address owner) public view returns (uint256[])',
];

if (privateKey && privateKey.startsWith('0x') && privateKey.length === 66 && provider) {
  wallet = new ethers.Wallet(privateKey, provider);
  contract = new ethers.Contract(contractAddress, abi, wallet);
} else {
  console.warn('NFTService: PRIVATE_KEY inválido o faltante, o provider no configurado. Funcionalidad NFT deshabilitada.');
}

export const mintNFTService = async (to: string, metadata: string) => {
  if (!contract) throw new Error('Funcionalidad NFT no disponible: revisa PRIVATE_KEY y ETHEREUM_RPC_URL en .env');
  // Llama al smart contract para mintear NFT
  const tx = await contract.mint(to, metadata);
  return tx;
}

export const getNFTsService = async () => {
  if (!contract || !wallet) throw new Error('Funcionalidad NFT no disponible: revisa PRIVATE_KEY y ETHEREUM_RPC_URL en .env');
  // Ejemplo: obtener NFTs del wallet
  const nfts = await contract.tokensOfOwner(wallet.address);
  return nfts;
}
