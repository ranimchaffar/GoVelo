'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, User, Search, Menu, X, ChevronDown, Bike, Wrench, Package } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Détecter le scroll pour changer le style de la navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Charger le nombre d'articles dans le panier
  useEffect(() => {
    const fetchCartCount = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const response = await fetch(`/api/cart?userId=${userId}`);
          const cart = await response.json();
          const count = cart?.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0;
          setCartCount(count);
        } catch (error) {
          console.error('Erreur chargement panier:', error);
        }
      }
    };
    
    fetchCartCount();
  }, []);

  // Structure des catégories et sous-catégories
  const categories = [
    {
      id: 'bicyclettes',
      name: 'Bicyclettes',
      icon: <Bike className="w-5 h-5" />,
      subcategories: [
        { name: 'VTT', slug: 'vtt' },
        { name: 'Vélos de route', slug: 'route' },
        { name: 'Vélos urbains', slug: 'urbains' },
        { name: 'Vélos électriques', slug: 'electriques' },
        { name: 'Vélos pour enfants', slug: 'enfants' },
      ]
    },
    {
      id: 'pieces',
      name: 'Pièces de Rechange',
      icon: <Wrench className="w-5 h-5" />,
      subcategories: [
        { name: 'Freins', slug: 'freins' },
        { name: 'Chaînes', slug: 'chaines' },
        { name: 'Pneus', slug: 'pneus' },
        { name: 'Pédaliers', slug: 'pedaliers' },
        { name: 'Dérailleurs', slug: 'derailleurs' },
        { name: 'Roues', slug: 'roues' },
      ]
    },
    {
      id: 'accessoires',
      name: 'Accessoires',
      icon: <Package className="w-5 h-5" />,
      subcategories: [
        { name: 'Casques', slug: 'casques' },
        { name: 'Lumières', slug: 'lumieres' },
        { name: 'Sacoches', slug: 'sacoches' },
        { name: 'Antivols', slug: 'antivols' },
        { name: 'Vêtements', slug: 'vetements' },
        { name: 'Outils', slug: 'outils' },
      ]
    },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/95 backdrop-blur-lg shadow-2xl' : 'bg-black'
    }`}>
      <div className="container mx-auto px-6">
        {/* Top bar - Desktop */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-wine-red/50 group-hover:ring-wine-red transition-all">
              <Image
                src="/GOVELO.png"
                alt="GO Velo Logo"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-2xl font-bold text-white group-hover:text-wine-red transition-colors">
                GO Velo
              </div>
              <div className="text-xs text-wine-red font-semibold">
                Accélère ta liberté !
              </div>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-white hover:text-wine-red transition-colors font-semibold text-lg"
            >
              Accueil
            </Link>
            
            <Link 
              href="/shop" 
              className="text-white hover:text-wine-red transition-colors font-semibold text-lg"
            >
              Boutique
            </Link>

            {/* Dropdowns pour chaque catégorie */}
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(category.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-2 text-white hover:text-wine-red transition-colors font-semibold text-lg">
                  {category.icon}
                  {category.name}
                  <ChevronDown className={`w-4 h-4 transition-transform ${
                    activeDropdown === category.id ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Dropdown Menu */}
                <div className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${
                  activeDropdown === category.id 
                    ? 'opacity-100 visible translate-y-0' 
                    : 'opacity-0 invisible -translate-y-2'
                }`}>
                  <div className="p-2">
                    <Link
                      href={`/shop?category=${category.id}`}
                      className="block px-4 py-3 text-gray-700 hover:bg-wine-red hover:text-white rounded-lg transition-all font-semibold"
                    >
                      Tous les {category.name}
                    </Link>
                    <div className="border-t border-gray-100 my-2" />
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/shop?category=${category.id}&subcategory=${sub.slug}`}
                        className="block px-4 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-wine-red rounded-lg transition-all"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <Link 
              href="/about" 
              className="text-white hover:text-wine-red transition-colors font-semibold text-lg"
            >
              À propos
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search Button */}
            <button className="text-white hover:text-wine-red transition-colors p-2 hover:bg-white/10 rounded-lg">
              <Search className="w-6 h-6" />
            </button>
            
            {/* User Account */}
            <Link 
              href="/dashboard/client" 
              className="text-white hover:text-wine-red transition-colors p-2 hover:bg-white/10 rounded-lg"
            >
              <User className="w-6 h-6" />
            </Link>
            
            {/* Cart */}
            <Link 
              href="/cart" 
              className="relative text-white hover:text-wine-red transition-colors p-2 hover:bg-white/10 rounded-lg"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-wine-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-800 animate-fade-in">
            <div className="flex flex-col gap-2">
              <Link 
                href="/" 
                className="text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              
              <Link 
                href="/shop" 
                className="text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Boutique
              </Link>

              {/* Mobile Categories with Expandable Subcategories */}
              {categories.map((category) => (
                <div key={category.id} className="border-t border-gray-800 pt-2">
                  <button
                    onClick={() => setActiveDropdown(
                      activeDropdown === category.id ? null : category.id
                    )}
                    className="w-full flex items-center justify-between text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-colors"
                  >
                    <span className="flex items-center gap-2 font-semibold">
                      {category.icon}
                      {category.name}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${
                      activeDropdown === category.id ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {activeDropdown === category.id && (
                    <div className="ml-4 mt-2 space-y-1 animate-fade-in">
                      <Link
                        href={`/shop?category=${category.id}`}
                        className="block text-wine-red hover:bg-white/10 px-4 py-2 rounded-lg transition-colors font-semibold"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Tous les {category.name}
                      </Link>
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/shop?category=${category.id}&subcategory=${sub.slug}`}
                          className="block text-gray-300 hover:bg-white/10 hover:text-white px-4 py-2 rounded-lg transition-colors text-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link 
                href="/about" 
                className="text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                À propos
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
