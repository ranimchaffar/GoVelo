import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET tous les produits
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  
  const products = await prisma.product.findMany({
    where: category ? { category } : {},
    orderBy: [
      { isPinned: 'desc' },
      { createdAt: 'desc' }
    ]
  });
  
  return NextResponse.json(products);
}

// POST nouveau produit
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: parseFloat(body.price),
        image: body.image,
        category: body.category,
        stock: parseInt(body.stock),
        isPinned: body.isPinned || false,
      }
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création' }, { status: 500 });
  }
}
