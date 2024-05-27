import Wallet from '../models/Wallet';
import { fetchBlockchainBalance } from '../../../utils/blockchain';
import logger from '../../../utils/logger';

export const createWallet = async (req, res) => {
  try {
    const { currency, address, network } = req.body;
    const wallet = new Wallet({ currency, address, network });
    await wallet.save();
    res.status(201).json(wallet);
  } catch (error) {
    logger.error(`POST /api/wallets - ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getWallets = async (req, res) => {
  try {
    const wallets = await Wallet.find({ userId: req.user.id });
    for (const wallet of wallets) {
      wallet.balance = await fetchBlockchainBalance(wallet.address, wallet.network);
    }
    res.status(200).json(wallets);
  } catch (error) {
    logger.error(`GET /api/wallets - ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateWallet = async (req, res) => {
  try {
    const { id } = req.query;
    const { currency, address, network } = req.body;
    const wallet = await Wallet.findByIdAndUpdate(
      id,
      { currency, address, network },
      { new: true, runValidators: true }
    );
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }
    res.status(200).json(wallet);
  } catch (error) {
    logger.error(`PUT /api/wallets - ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteWallet = async (req, res) => {
  try {
    const { id } = req.query;
    const wallet = await Wallet.findByIdAndDelete(id);
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }
    res.status(200).json({ message: 'Wallet deleted successfully' });
  } catch (error) {
    logger.error(`DELETE /api/wallets - ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
