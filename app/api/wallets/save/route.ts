import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { walletAddress, nickname } = await request.json();

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if already saved
    const existing = await prisma.savedWallet.findFirst({
      where: {
        userId: user.id,
        walletAddress: walletAddress,
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Wallet already saved' },
        { status: 400 }
      );
    }

    // Save wallet
    const savedWallet = await prisma.savedWallet.create({
      data: {
        userId: user.id,
        walletAddress,
        nickname: nickname || null,
      },
    });

    return NextResponse.json({
      message: 'Wallet saved successfully',
      wallet: savedWallet,
    });
  } catch (error) {
    console.error('Save wallet error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}