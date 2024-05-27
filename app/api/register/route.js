import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { Client } from 'pg';

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

client.connect();

export async function POST(req, res) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    await client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
