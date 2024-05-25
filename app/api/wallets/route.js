import { getServerSession } from 'next-auth';
import { Client } from 'pg';
import { authOptions } from '../auth/[...nextauth]/route';
import { fetchBlockchainBalance } from '../../../utils/blockchain';
import logger from '../../../utils/logger';

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

client.connect();

export async function GET(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const result = await client.query('SELECT * FROM wallets WHERE user_id = $1', [session.user.id]);
    const wallets = result.rows;

    for (const wallet of wallets) {
      const balance = await fetchBlockchainBalance(wallet.address, wallet.network);
      wallet.balance = balance;
    }

    return res.status(200).json(wallets);
  } catch (error) {
    logger.error(`GET /api/wallets - ${error.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function POST(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { currency, address, network } = req.body;
    if (!currency || !address || !network) {
      return res.status(400).json({ error: 'Currency, address, and network are required' });
    }

    const result = await client.query('INSERT INTO wallets (user_id, currency, address, network) VALUES ($1, $2, $3, $4) RETURNING *', [session.user.id, currency, address, network]);
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    logger.error(`POST /api/wallets - ${error.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function PUT(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id, balance } = req.body;
    if (!id || !balance) {
      return res.status(400).json({ error: 'ID and balance are required' });
    }

    const result = await client.query('UPDATE wallets SET balance = $1 WHERE id = $2 AND user_id = $3 RETURNING *', [balance, id, session.user.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Wallet not found or not authorized' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    logger.error(`PUT /api/wallets - ${error.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function DELETE(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    const result = await client.query('DELETE FROM wallets WHERE id = $1 AND user_id = $2 RETURNING *', [id, session.user.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Wallet not found or not authorized' });
    }

    return res.status(200).json({ message: 'Wallet deleted successfully' });
  } catch (error) {
    logger.error(`DELETE /api/wallets - ${error.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
