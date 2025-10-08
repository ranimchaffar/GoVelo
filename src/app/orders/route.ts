import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET toutes les commandes (admin) ou par utilisateur
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const role = searchParams.get('role');
  
  let orders;
  
  if (role === 'ADMIN') {
    // Admin voit toutes les commandes
    orders = await prisma.order.findMany({
      include: {
        user: {
          select: { name: true, email: true }
        },
        items: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  } else if (userId) {
    // Client voit ses commandes
    orders = await prisma.order.findMany({
      where: { userId: parseInt(userId) },
      include: {
        items: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
  
  return NextResponse.json(orders || []);
}
