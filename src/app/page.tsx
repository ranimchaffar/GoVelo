import Link from 'next/link';
import { prisma } from '@/lib/db';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { ShoppingCart, Bike, Wrench, Package, TrendingUp, Award, Users } from 'lucide-react';

export default async function HomePage() {
  // Récupérer les produits épinglés et récents
  const pinnedProducts = await prisma.product.findMany({
    where: { isPinned: true },
    take: 4,
    orderBy: { createdAt: 'desc' }
  });

  const recentProducts = await prisma.product.findMany({
    where: { isPinned: false },
    take: 8,
    orderBy: { createdAt: 'desc' }
  });

  // Compter les produits par catégorie
  const bicyclettesCount = await prisma.product.count({
    where: { category: 'bicyclettes' }
  });

  const piecesCount = await prisma.product.count({
    where: { category: 'pièces' }
  });

  const accessoiresCount = await prisma.product.count({
    where: { category: 'accessoires' }
  });

  // Total des produits
  const totalProducts = await prisma.product.count();

  return (
    <div className="min-h-screen">
      {/* Hero Section - Bannière principale avec overlay gradient amélioré */}
      <section className="hero-section relative h-[85vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        <Image
          src="/banner.png"
          alt="GO Velo Banner"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay pour meilleure lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        
        {/* Animated elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-wine-red rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-7xl md:text-8xl font-bold mb-6 tracking-tight drop-shadow-2xl">
              GO Velo
            </h1>
            <p className="text-4xl md:text-5xl font-bold mb-4 text-wine-red drop-shadow-lg animate-fade-in-up delay-200">
              Ride your passion!
            </p>
            <p className="text-2xl md:text-3xl mb-10 italic font-light animate-fade-in-up delay-300">
              Accélère ta liberté !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-500">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 bg-wine-red hover:bg-wine-red-dark text-white px-10 py-5 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 hover:shadow-2xl shadow-lg"
              >
                <ShoppingCart className="w-6 h-6" />
                Découvrir la Boutique
              </Link>
              <Link
                href="#categories"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-10 py-5 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 border-2 border-white/30"
              >
                Voir les Catégories
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>
      {/* Catégories principales avec animations améliorées */}
      <section id="categories" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            Nos Catégories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explorez notre sélection complète de vélos, pièces et accessoires pour tous vos besoins
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/shop?category=bicyclettes" className="group">
            <div className="category-card relative cursor-pointer bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-wine-red/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
              <div className="flex flex-col items-center relative z-10">
                <div className="bg-gradient-to-br from-wine-red/10 to-wine-red/5 p-8 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Bike className="w-20 h-20 text-wine-red" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-wine-red transition-colors">
                  Bicyclettes
                </h3>
                <p className="text-gray-600 text-center leading-relaxed mb-3">
                  VTT, vélos de route, urbains et électriques
                </p>
                <span className="inline-block bg-wine-red/10 text-wine-red px-4 py-2 rounded-full text-sm font-semibold">
                  {bicyclettesCount} produits
                </span>
                <div className="mt-6 text-wine-red font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                  Explorer <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/shop?category=pièces" className="group">
            <div className="category-card relative cursor-pointer bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-wine-red/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
              <div className="flex flex-col items-center relative z-10">
                <div className="bg-gradient-to-br from-wine-red/10 to-wine-red/5 p-8 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Wrench className="w-20 h-20 text-wine-red" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-wine-red transition-colors">
                  Pièces de Rechange
                </h3>
                <p className="text-gray-600 text-center leading-relaxed mb-3">
                  Freins, chaînes, pneus et plus encore
                </p>
                <span className="inline-block bg-wine-red/10 text-wine-red px-4 py-2 rounded-full text-sm font-semibold">
                  {piecesCount} produits
                </span>
                <div className="mt-6 text-wine-red font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                  Explorer <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/shop?category=accessoires" className="group">
            <div className="category-card relative cursor-pointer bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-wine-red/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
              <div className="flex flex-col items-center relative z-10">
                <div className="bg-gradient-to-br from-wine-red/10 to-wine-red/5 p-8 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Package className="w-20 h-20 text-wine-red" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-wine-red transition-colors">
                  Accessoires
                </h3>
                <p className="text-gray-600 text-center leading-relaxed mb-3">
                  Casques, lumières, sacoches et équipements
                </p>
                <span className="inline-block bg-wine-red/10 text-wine-red px-4 py-2 rounded-full text-sm font-semibold">
                  {accessoiresCount} produits
                </span>
                <div className="mt-6 text-wine-red font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                  Explorer <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Produits épinglés (Recommandés) avec design amélioré */}
      {pinnedProducts.length > 0 && (
        <section className="bg-gradient-to-b from-gray-50 to-white py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
              <div>
                <h2 className="text-5xl font-bold mb-2">Produits Recommandés</h2>
                <p className="text-gray-600 text-lg">Sélection spéciale par nos experts</p>
              </div>
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 bg-wine-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-wine-red-dark transition-all hover:gap-3"
              >
                Voir tout
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pinnedProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} isPinned />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nouveaux produits avec design amélioré */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
          <div>
            <h2 className="text-5xl font-bold mb-2">Nouveautés</h2>
            <p className="text-gray-600 text-lg">Les derniers produits ajoutés à notre collection</p>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-wine-red hover:text-wine-red-dark font-semibold text-lg transition-all hover:gap-3"
          >
            Voir tout
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentProducts.map((product, index) => (
            <div 
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Section Avantages redessinée */}
      <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-wine-red rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Pourquoi GO Velo ?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Votre satisfaction est notre priorité
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">🚚</div>
              <h3 className="text-2xl font-bold mb-3">Livraison Rapide</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Livraison à domicile dans toute la région en 24-48h
              </p>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">💳</div>
              <h3 className="text-2xl font-bold mb-3">Paiement Flexible</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Espèces à la livraison ou paiement sécurisé en ligne
              </p>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">✓</div>
              <h3 className="text-2xl font-bold mb-3">Produits de Qualité</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Sélection rigoureuse de vélos et accessoires premium
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-wine-red text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Prêt à commencer votre aventure ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez des milliers de cyclistes satisfaits
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-white text-wine-red hover:bg-gray-100 px-10 py-5 rounded-xl text-lg font-bold transition-all transform hover:scale-105 shadow-xl"
          >
            <ShoppingCart className="w-6 h-6" />
            Commencer mes achats
          </Link>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}