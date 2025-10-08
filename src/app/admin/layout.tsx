import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings,
  LogOut 
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white fixed h-full">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-wine-red">GO Velo Admin</h1>
          <p className="text-sm text-gray-400 mt-1">Panneau d'administration</p>
        </div>
        
        <nav className="mt-6">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-6 py-3 hover:bg-wine-red/20 transition-colors border-l-4 border-transparent hover:border-wine-red"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-semibold">Dashboard</span>
          </Link>
          
          <Link
            href="/admin/products"
            className="flex items-center gap-3 px-6 py-3 hover:bg-wine-red/20 transition-colors border-l-4 border-transparent hover:border-wine-red"
          >
            <Package className="w-5 h-5" />
            <span className="font-semibold">Produits</span>
          </Link>
          
          <Link
            href="/admin/orders"
            className="flex items-center gap-3 px-6 py-3 hover:bg-wine-red/20 transition-colors border-l-4 border-transparent hover:border-wine-red"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="font-semibold">Commandes</span>
          </Link>
          
          <Link
            href="/admin/users"
            className="flex items-center gap-3 px-6 py-3 hover:bg-wine-red/20 transition-colors border-l-4 border-transparent hover:border-wine-red"
          >
            <Users className="w-5 h-5" />
            <span className="font-semibold">Utilisateurs</span>
          </Link>
          
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-6 py-3 hover:bg-wine-red/20 transition-colors border-l-4 border-transparent hover:border-wine-red"
          >
            <Settings className="w-5 h-5" />
            <span className="font-semibold">Paramètres</span>
          </Link>
        </nav>
        
        <div className="absolute bottom-6 left-0 right-0 px-6">
          <button className="flex items-center gap-3 w-full px-4 py-3 bg-wine-red hover:bg-wine-red-dark rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-semibold">Déconnexion</span>
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
