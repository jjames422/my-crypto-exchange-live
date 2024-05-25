import { getServerSession } from 'next-auth';
import { Client } from 'pg';
import { authOptions } from '../../auth/[...nextauth]/route';

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

client.connect();

export async function GET(req, res) {
  const { id } = req.query;
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const result = await client.query('SELECT * FROM wallets WHERE id = $1 AND user_id = $2', [id, session.user.id]);

  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Wallet not found' });
  }

  return res.status(200).json(result.rows[0]);
}

export async function PUT(req, res) {
  const { id } = req.query;
  const { balance } = req.body;
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const result = await client.query('UPDATE wallets SET balance = $1 WHERE id = $2 AND user_id = $3 RETURNING *', [balance, id, session.user.id]);

  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Wallet not found or not authorized' });
  }

  return res.status(200).json(result.rows[0]);
}

export async function DELETE(req, res) {
  const { id } = req.query;
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const result = await client.query('DELETE FROM wallets WHERE id = $1 AND user_id = $2 RETURNING *', [id, session.user.id]);

  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Wallet not found or not authorized' });
  }

  return res.status(200).json({ message: 'Wallet deleted successfully' });
}
