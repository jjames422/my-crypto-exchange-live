// wallet-server/utils/walletGenerator.js
const { ethers } = require('ethers');

const createEthereumWallet = () => {
  const wallet = ethers.Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
};

const createWallet = (network) => {
  switch (network) {
    case 'ETH':
    case 'BNB':
    case 'MATIC':
    case 'POLYGON':
      return createEthereumWallet();
    default:
      throw new Error('Unsupported network');
  }
};

module.exports = { createWallet };
