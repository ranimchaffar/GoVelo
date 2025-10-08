'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Edit, Trash2, Star, Search, X, CheckCircle } from 'lucide-react';

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

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: 'bicyclettes',
    stock: 0,
    isPinned: false,
  });

  // Charger les produits au montage
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtrer les produits
  useEffect(() => {
    let filtered = products;
    
    if (filterCategory !== 'all') {
      filtered = filtered.filter(p => p.category === filterCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [products, filterCategory, searchTerm]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Erreur chargement produits:', error);
      alert('Erreur lors du chargement des produits');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const url = editingProduct 
        ? `/api/products/${editingProduct.id}` 
        : '/api/products';
      
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(editingProduct ? '✅ Produit modifié avec succès!' : '✅ Produit ajouté avec succès!');
        setIsFormOpen(false);
        setEditingProduct(null);
        resetForm();
        fetchProducts();
      } else {
        alert('❌ Erreur lors de l\'enregistrement');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Erreur lors de l\'enregistrement');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${name}"?`)) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('✅ Produit supprimé avec succès!');
        fetchProducts();
      } else {
        alert('❌ Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Erreur lors de la suppression');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.stock,
      isPinned: product.isPinned,
    });
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      image: '',
      category: 'bicyclettes',
      stock: 0,
      isPinned: false,
    });
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Gestion des Produits</h1>
            <p className="text-gray-600 mt-2">Ajouter, modifier ou supprimer des produits</p>
          </div>
          <button
            onClick={() => {
              setIsFormOpen(true);
              setEditingProduct(null);
              resetForm();
            }}
            className="flex items-center gap-2 bg-wine-red text-white px-6 py-3 rounded-xl font-semibold hover:bg-wine-red-dark transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Ajouter un Produit
          </button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <p className="text-gray-600 text-sm font-semibold">Total Produits</p>
            <p className="text-3xl font-bold text-wine-red mt-2">{products.length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <p className="text-gray-600 text-sm font-semibold">Bicyclettes</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {products.filter(p => p.category === 'bicyclettes').length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <p className="text-gray-600 text-sm font-semibold">Pièces</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {products.filter(p => p.category === 'pièces').length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <p className="text-gray-600 text-sm font-semibold">Accessoires</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {products.filter(p => p.category === 'accessoires').length}
            </p>
          </div>
        </div>

        {/* Filtres et Recherche */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-red focus:border-transparent"
              />
            </div>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine-red focus:border-transparent font-semibold"
            >
              <option value="all">Toutes les catégories</option>
              <option value="bicyclettes">Bicyclettes</option>
              <option value="pièces">Pièces de Rechange</option>
              <option value="accessoires">Accessoires</option>
            </select>
          </div>
        </div>

        {/* Modal Formulaire */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">
                  {editingProduct ? '✏️ Modifier le Produit' : '➕ Nouveau Produit'}
                </h2>
                <button
                  onClick={handleCloseForm}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nom du Produit */}
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">
                    Nom du Produit <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: VTT Pro Carbon X1"
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-wine-red focus:border-wine-red transition-all"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Description détaillée du produit..."
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 h-32 focus:ring-2 focus:ring-wine-red focus:border-wine-red transition-all resize-none"
                    required
                  />
                </div>

                {/* Prix et Stock */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-700">
                      Prix (TND) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                      placeholder="0.00"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-wine-red focus:border-wine-red transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-700">
                      Stock <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                      placeholder="0"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-wine-red focus:border-wine-red transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Catégorie */}
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">
                    Catégorie <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-wine-red focus:border-wine-red transition-all font-semibold"
                  >
                    <option value="bicyclettes">Bicyclettes</option>
                    <option value="pièces">Pièces de Rechange</option>
                    <option value="accessoires">Accessoires</option>
                  </select>
                </div>

                {/* URL Image */}
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">
                    URL de l'Image <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/products/image.jpg ou https://example.com/image.jpg"
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-wine-red focus:border-wine-red transition-all"
                    required
                  />
                  {formData.image && (
                    <div className="mt-4 relative w-40 h-40 rounded-xl overflow-hidden border-4 border-gray-200 shadow-lg">
                      <Image 
                        src={formData.image} 
                        alt="Preview" 
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Épingler */}
                <div className="flex items-center gap-3 p-5 bg-gradient-to-r from-wine-red/5 to-wine-red/10 rounded-xl border-2 border-wine-red/20">
                  <input
                    type="checkbox"
                    checked={formData.isPinned}
                    onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                    className="w-6 h-6 text-wine-red focus:ring-wine-red border-gray-300 rounded"
                    id="isPinned"
                  />
                  <label htmlFor="isPinned" className="font-bold flex items-center gap-2 cursor-pointer">
                    <Star className="w-5 h-5 text-wine-red fill-wine-red" />
                    Épingler ce produit (Produit recommandé)
                  </label>
                </div>

                {/* Boutons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 bg-wine-red text-white px-6 py-4 rounded-xl font-bold hover:bg-wine-red-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {loading ? (
                      <>⏳ Enregistrement...</>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        {editingProduct ? 'Modifier le Produit' : 'Ajouter le Produit'}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="flex-1 bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-bold hover:bg-gray-300 transition-all shadow-lg"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Grille de Produits */}
        {loading && !isFormOpen ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-wine-red"></div>
            <p className="mt-4 text-gray-600 font-semibold">Chargement...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-lg">
            <p className="text-gray-500 text-xl font-semibold">😔 Aucun produit trouvé</p>
            <p className="text-gray-400 mt-2">Essayez de modifier vos filtres ou ajoutez un nouveau produit</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300"
              >
                <div className="relative h-56">
                  {product.isPinned && (
                    <div className="absolute top-3 right-3 z-10 bg-wine-red text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                      <Star className="w-3 h-3 fill-current" />
                      Épinglé
                    </div>
                  )}
                  {product.stock < 5 && product.stock > 0 && (
                    <div className="absolute top-3 left-3 z-10 bg-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      Stock faible
                    </div>
                  )}
                  {product.stock === 0 && (
                    <div className="absolute top-3 left-3 z-10 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      Rupture
                    </div>
                  )}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block text-xs font-bold text-gray-500 uppercase bg-gray-100 px-3 py-1 rounded-full mb-3">
                    {product.category}
                  </span>
                  <h3 className="font-bold text-xl mb-2 line-clamp-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-bold text-wine-red">{product.price.toFixed(2)}TND</span>
                    <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      Stock: {product.stock}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-3 rounded-xl hover:bg-blue-600 transition-all font-semibold shadow-md hover:shadow-lg"
                    >
                      <Edit className="w-4 h-4" />
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-3 rounded-xl hover:bg-red-600 transition-all font-semibold shadow-md hover:shadow-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
