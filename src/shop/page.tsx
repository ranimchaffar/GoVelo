'use client';
import { useEffect, useState } from 'react';

export default function ShopPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8" style={{ color: '#8B0000' }}>
        GO Velo - Boutique
      </h1>
      <div className="grid grid-cols-3 gap-6">
        {products.map((product: any) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <img src={product.image} alt={product.name} />
            <h3 className="font-bold mt-2">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-xl font-bold mt-2" style={{ color: '#8B0000' }}>
              {product.price}€
            </p>
            <button className="bg-black text-white px-4 py-2 rounded mt-4">
              Ajouter au panier
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
