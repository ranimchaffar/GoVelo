'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
  };
  isPinned?: boolean;
}

export default function ProductCard({ product, isPinned = false }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    
    // Récupérer userId depuis localStorage ou session
    const userId = localStorage.getItem('userId');
    
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: parseInt(userId || '1'),
          productId: product.id,
          quantity: 1
        })
      });
      
      if (response.ok) {
        // Afficher notification succès (à implémenter avec toast)
        alert('Produit ajouté au panier !');
      }
    } catch (error) {
      console.error('Erreur ajout panier:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="product-card bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer relative">
        {/* Badge produit épinglé */}
        {isPinned && (
          <div className="absolute top-3 right-3 z-10 bg-wine-red text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Recommandé
          </div>
        )}
        
        {/* Badge stock faible */}
        {product.stock < 5 && product.stock > 0 && (
          <div className="absolute top-3 left-3 z-10 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            Stock limité
          </div>
        )}
        
        {/* Badge rupture de stock */}
        {product.stock === 0 && (
          <div className="absolute top-3 left-3 z-10 bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-bold">
            Rupture de stock
          </div>
        )}

        {/* Image produit */}
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Détails produit */}
        <div className="p-5">
          <div className="mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {product.category}
            </span>
          </div>
          
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-wine-red transition-colors">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-wine-red">
              {product.price.toFixed(2)} €
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || isAdding}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                product.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-black hover:bg-wine-red text-white transform hover:scale-105'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              {isAdding ? 'Ajout...' : 'Ajouter'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
