import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { fetchBlockchainBalance } from '../../../utils/blockchain';
import logger from '../../../utils/logger';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const session = await getServerSession(req, { authOptions });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const wallets = await prisma.wallet.findMany({
      where: { userId: session.user.id },
    });

    for (const wallet of wallets) {
      wallet.balance = await fetchBlockchainBalance(wallet.address, wallet.network);
    }

    return NextResponse.json(wallets);
  } catch (error) {
    logger.error(`GET /api/wallets - ${error.message}`);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(req, { authOptions });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { currency, address, network } = await req.json();
    if (!currency || !address || !network) {
      return NextResponse.json({ error: 'Currency, address, and network are required' }, { status: 400 });
    }

    const wallet = await prisma.wallet.create({
      data: {
        userId: session.user.id,
        currency,
        address,
        network,
      },
    });

    return NextResponse.json(wallet, { status: 201 });
  } catch (error) {
    logger.error(`POST /api/wallets - ${error.message}`);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
