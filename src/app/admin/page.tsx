import { prisma } from '@/lib/db';
import { Package, ShoppingBag, Users, TrendingUp } from 'lucide-react';

export default async function AdminDashboard() {
  // Statistiques
  const totalProducts = await prisma.product.count();
  const totalOrders = await prisma.order.count();
  const totalUsers = await prisma.user.count();
  const pendingOrders = await prisma.order.count({
    where: { status: 'PENDING' }
  });
  
  // Revenus totaux
  const orders = await prisma.order.findMany();
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  
  // Dernières commandes
  const recentOrders = await prisma.order.findMany({
    take: 5,
    include: {
      user: { select: { name: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      
      {/* Statistiques Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Produits</p>
              <p className="text-3xl font-bold mt-2">{totalProducts}</p>
            </div>
            <div className="bg-wine-red/10 p-4 rounded-lg">
              <Package className="w-8 h-8 text-wine-red" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Commandes</p>
              <p className="text-3xl font-bold mt-2">{totalOrders}</p>
              <p className="text-sm text-orange-500 mt-1">{pendingOrders} en attente</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <ShoppingBag className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Utilisateurs</p>
              <p className="text-3xl font-bold mt-2">{totalUsers}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Revenus</p>
              <p className="text-3xl font-bold mt-2">{totalRevenue.toFixed(2)}€</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Dernières Commandes */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Dernières Commandes</h2>
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="text-left py-3 font-semibold">N° Commande</th>
              <th className="text-left py-3 font-semibold">Client</th>
              <th className="text-left py-3 font-semibold">Montant</th>
              <th className="text-left py-3 font-semibold">Statut</th>
              <th className="text-left py-3 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {recentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-4 font-semibold">{order.orderNumber}</td>
                <td className="py-4">{order.user.name}</td>
                <td className="py-4 font-bold text-wine-red">{order.total.toFixed(2)}€</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'PENDING' ? 'bg-orange-100 text-orange-600' :
                    order.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-600' :
                    order.status === 'SHIPPED' ? 'bg-purple-100 text-purple-600' :
                    order.status === 'DELIVERED' ? 'bg-green-100 text-green-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
