import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET(req) {
  const { id } = req.params;
  const session = await getServerSession(req, { authOptions });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const wallet = await prisma.wallet.findFirst({
    where: {
      id: Number(id),
      userId: session.user.id,
    },
  });

  if (!wallet) {
    return NextResponse.json({ error: 'Wallet not found' }, { status: 404 });
  }

  return NextResponse.json(wallet);
}

export async function PUT(req) {
  const { id } = req.params;
  const { balance } = await req.json();
  const session = await getServerSession(req, { authOptions });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const wallet = await prisma.wallet.update({
    where: {
      id: Number(id),
      userId: session.user.id,
    },
    data: {
      balance,
    },
  });

  if (!wallet) {
    return NextResponse.json({ error: 'Wallet not found or not authorized' }, { status: 404 });
  }

  return NextResponse.json(wallet);
}

export async function DELETE(req) {
  const { id } = req.params;
  const session = await getServerSession(req, { authOptions });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const wallet = await prisma.wallet.delete({
    where: {
      id: Number(id),
      userId: session.user.id,
    },
  });

  if (!wallet) {
    return NextResponse.json({ error: 'Wallet not found or not authorized' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Wallet deleted successfully' });
}
