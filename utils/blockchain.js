import axios from 'axios';

const networks = {
  ethereum: {
    mainnet: process.env.ETH_MAINNET_API_URL,
    sepolia: process.env.ETH_SEPOLIA_API_URL
  },
  linea: {
    mainnet: process.env.LINEA_MAINNET_API_URL,
    sepolia: process.env.LINEA_SEPOLIA_API_URL
  },
  polygon: {
    mainnet: process.env.POLYGON_MAINNET_API_URL,
    amoy: process.env.POLYGON_AMOY_API_URL
  },
  blast: {
    mainnet: process.env.BLAST_MAINNET_API_URL,
    sepolia: process.env.BLAST_SEPOLIA_API_URL
  },
  optimism: {
    mainnet: process.env.OPTIMISM_MAINNET_API_URL,
    sepolia: process.env.OPTIMISM_SEPOLIA_API_URL
  },
  arbitrum: {
    mainnet: process.env.ARBITRUM_MAINNET_API_URL,
    sepolia: process.env.ARBITRUM_SEPOLIA_API_URL
  },
  palm: {
    mainnet: process.env.PALM_MAINNET_API_URL,
    testnet: process.env.PALM_TESTNET_API_URL
  },
  avalanche: {
    mainnet: process.env.AVALANCHE_MAINNET_API_URL,
    fuji: process.env.AVALANCHE_FUJI_API_URL
  },
  starknet: {
    mainnet: process.env.STARKNET_MAINNET_API_URL,
    sepolia: process.env.STARKNET_SEPOLIA_API_URL
  },
  celo: {
    mainnet: process.env.CELO_MAINNET_API_URL,
    alfajores: process.env.CELO_ALFAJORES_API_URL
  }
};

export async function fetchBlockchainBalance(walletAddress, network, chain) {
  try {
    const url = networks[network][chain];
    if (!url) throw new Error('Unsupported network or chain');

    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${Buffer.from(`:${process.env.INFURA_PROJECT_SECRET}`).toString('base64')}`
      },
      params: {
        module: 'account',
        action: 'balance',
        address: walletAddress,
        tag: 'latest',
        apikey: process.env.INFURA_PROJECT_ID
      }
    });

    return response.data.result; // Adjust according to the API response format
  } catch (error) {
    console.error('Error fetching blockchain balance:', error);
    return null;
  }
}
