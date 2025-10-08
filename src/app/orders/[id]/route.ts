import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// PUT mettre à jour le statut (Admin)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    
    const order = await prisma.order.update({
      where: { id: parseInt(params.id) },
      data: { status }
    });
    
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur mise à jour' }, { status: 500 });
  }
}
