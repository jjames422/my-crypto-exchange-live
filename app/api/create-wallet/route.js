import { ethers } from 'ethers';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Only POST requests are allowed' });
    return;
  }

  try {
    // Create a new wallet
    const wallet = ethers.Wallet.createRandom();
    const walletAddress = wallet.address;
    const privateKey = wallet.privateKey;

    // Send wallet details to the Transaction Server
    const transactionServerUrl = process.env.TRANSACTION_SERVER_URL;
    await axios.post(`${transactionServerUrl}/register-wallet`, {
      walletAddress,
      privateKey,
    });

    res.status(200).json({ walletAddress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
