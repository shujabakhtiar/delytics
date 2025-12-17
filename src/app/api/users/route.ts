import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * Example API route demonstrating Prisma usage
 * GET /api/users - Fetch all users
 */
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        tenantId: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch users',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/users - Create a new user
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, tenantId, passwordHash, role } = body;

    if (!email || !tenantId || !passwordHash) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email, tenantId, and passwordHash are required',
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        email,
        tenantId,
        passwordHash,
        role: role || 'user',
      },
    });

    return NextResponse.json({
      success: true,
      data: user,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Database error:', error);
    
    // Handle unique constraint violation
    if (error.code === 'P2002') {
      return NextResponse.json(
        {
          success: false,
          error: 'User with this email already exists',
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create user',
      },
      { status: 500 }
    );
  }
}
