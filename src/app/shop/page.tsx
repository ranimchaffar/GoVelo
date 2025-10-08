'use client';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  isPinned: boolean;
  createdAt: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // États des filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Sous-catégories
  const subcategories: { [key: string]: string[] } = {
    bicyclettes: ['VTT', 'Route', 'Urbains', 'Électriques', 'Enfants'],
    pièces: ['Freins', 'Chaînes', 'Pneus', 'Pédaliers', 'Dérailleurs', 'Roues'],
    accessoires: ['Casques', 'Lumières', 'Sacoches', 'Antivols', 'Vêtements', 'Outils'],
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, searchTerm, selectedCategory, selectedSubcategory, priceRange, sortBy, inStockOnly]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Erreur chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Filtre par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filtre par sous-catégorie
    if (selectedSubcategory !== 'all') {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(selectedSubcategory.toLowerCase()) ||
        p.description.toLowerCase().includes(selectedSubcategory.toLowerCase())
      );
    }

    // Recherche
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par prix
    filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    // Filtre stock
    if (inStockOnly) {
      filtered = filtered.filter(p => p.stock > 0);
    }

    // Tri
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
        filtered.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
        break;
    }

    setFilteredProducts(filtered);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedSubcategory('all');
    setPriceRange({ min: 0, max: 10000 });
    setSortBy('newest');
    setInStockOnly(false);
  };

  const getCategoryCount = (category: string) => {
    return products.filter(p => p.category === category).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Boutique GO Velo</h1>
          <p className="text-xl text-gray-300">Découvrez notre sélection complète de vélos, pièces et accessoires</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filtres - Desktop */}
          <aside className="hidden lg:block w-80 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <SlidersHorizontal className="w-6 h-6 text-wine-red" />
                  Filtres
                </h2>
                <button
                  onClick={resetFilters}
                  className="text-sm text-wine-red hover:underline font-semibold"
                >
                  Réinitialiser
                </button>
              </div>

              {/* Recherche */}
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2">Rechercher</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher un produit..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-red focus:border-transparent"
                  />
                </div>
              </div>

              {/* Catégories */}
              <div className="mb-6">
                <label className="block text-sm font-bold mb-3">Catégorie</label>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedSubcategory('all');
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-wine-red text-white font-semibold'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    Tous les produits ({products.length})
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory('bicyclettes');
                      setSelectedSubcategory('all');
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      selectedCategory === 'bicyclettes'
                        ? 'bg-wine-red text-white font-semibold'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    Bicyclettes ({getCategoryCount('bicyclettes')})
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory('pièces');
                      setSelectedSubcategory('all');
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      selectedCategory === 'pièces'
                        ? 'bg-wine-red text-white font-semibold'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    Pièces de Rechange ({getCategoryCount('pièces')})
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory('accessoires');
                      setSelectedSubcategory('all');
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      selectedCategory === 'accessoires'
                        ? 'bg-wine-red text-white font-semibold'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    Accessoires ({getCategoryCount('accessoires')})
                  </button>
                </div>
              </div>

              {/* Sous-catégories */}
              {selectedCategory !== 'all' && (
                <div className="mb-6">
                  <label className="block text-sm font-bold mb-3">Sous-catégorie</label>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedSubcategory('all')}
                      className={`w-full text-left px-3 py-1.5 rounded text-sm transition-all ${
                        selectedSubcategory === 'all'
                          ? 'bg-wine-red/20 text-wine-red font-semibold'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      Tous
                    </button>
                    {subcategories[selectedCategory]?.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setSelectedSubcategory(sub)}
                        className={`w-full text-left px-3 py-1.5 rounded text-sm transition-all ${
                          selectedSubcategory === sub
                            ? 'bg-wine-red/20 text-wine-red font-semibold'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Prix */}
              <div className="mb-6">
                <label className="block text-sm font-bold mb-3">
                  Prix: {priceRange.min}€ - {priceRange.max}€
                </label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
                      placeholder="Min"
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                      placeholder="Max"
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Stock */}
              <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-5 h-5 text-wine-red focus:ring-wine-red border-gray-300 rounded"
                  />
                  <span className="font-semibold">En stock uniquement</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Contenu Principal */}
          <main className="flex-1">
            {/* Barre d'outils Mobile */}
            <div className="lg:hidden mb-6 flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex-1 flex items-center justify-center gap-2 bg-white px-4 py-3 rounded-lg shadow-md font-semibold"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filtres
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg shadow-md font-semibold"
              >
                <option value="newest">Plus récents</option>
                <option value="featured">Recommandés</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="name">Nom A-Z</option>
              </select>
            </div>

            {/* Filtres Mobile (Drawer) */}
            {showFilters && (
              <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
                <div className="bg-white w-full max-w-sm h-full p-6 overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Filtres</h2>
                    <button onClick={() => setShowFilters(false)}>
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  {/* Répéter les filtres de la sidebar ici */}
                </div>
              </div>
            )}

            {/* Barre de résultats */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="font-bold text-lg">
                  {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} trouvé{filteredProducts.length !== 1 ? 's' : ''}
                </p>
                {(searchTerm || selectedCategory !== 'all' || inStockOnly) && (
                  <button
                    onClick={resetFilters}
                    className="text-sm text-wine-red hover:underline font-semibold"
                  >
                    Effacer tous les filtres
                  </button>
                )}
              </div>
              
              <div className="hidden lg:block">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-semibold focus:ring-2 focus:ring-wine-red"
                >
                  <option value="newest">Plus récents</option>
                  <option value="oldest">Plus anciens</option>
                  <option value="featured">Recommandés</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="name">Nom A-Z</option>
                </select>
              </div>
            </div>

            {/* Grille de Produits */}
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-wine-red"></div>
                <p className="mt-4 text-gray-600 font-semibold">Chargement des produits...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl shadow-lg">
                <p className="text-2xl font-bold text-gray-400 mb-2">😔 Aucun produit trouvé</p>
                <p className="text-gray-500 mb-6">Essayez de modifier vos critères de recherche</p>
                <button
                  onClick={resetFilters}
                  className="bg-wine-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-wine-red-dark transition-all"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProductCard product={product} isPinned={product.isPinned} />
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
