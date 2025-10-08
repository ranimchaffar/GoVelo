'use client';
import { useState, useEffect } from 'react';
import { Eye, Package } from 'lucide-react';

interface Order {
  id: number;
  orderNumber: string;
  total: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
  items: Array<{
    quantity: number;
    price: number;
    product: {
      name: string;
    };
  }>;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await fetch('/api/orders?role=ADMIN');
    const data = await response.json();
    setOrders(data);
  };

  const updateOrderStatus = async (orderId: number, status: string) => {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    if (response.ok) {
      alert('Statut mis à jour!');
      fetchOrders();
      setSelectedOrder(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'PENDING': return 'bg-orange-100 text-orange-600';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-600';
      case 'SHIPPED': return 'bg-purple-100 text-purple-600';
      case 'DELIVERED': return 'bg-green-100 text-green-600';
      case 'CANCELLED': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Gestion des Commandes</h1>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">N° Commande</th>
              <th className="px-6 py-4 text-left font-semibold">Client</th>
              <th className="px-6 py-4 text-left font-semibold">Montant</th>
              <th className="px-6 py-4 text-left font-semibold">Paiement</th>
              <th className="px-6 py-4 text-left font-semibold">Statut</th>
              <th className="px-6 py-4 text-left font-semibold">Date</th>
              <th className="px-6 py-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-bold">{order.orderNumber}</td>
                <td className="px-6 py-4">
                  <div>
                    <div className="font-semibold">{order.user.name}</div>
                    <div className="text-sm text-gray-500">{order.user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-wine-red">{order.total.toFixed(2)}€</td>
                <td className="px-6 py-4">{order.paymentMethod}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString('fr-FR')}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex items-center gap-2 bg-wine-red text-white px-4 py-2 rounded-lg hover:bg-wine-red-dark transition-all"
                  >
                    <Eye className="w-4 h-4" />
                    Voir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Détails Commande */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Détails Commande {selectedOrder.orderNumber}</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="font-semibold mb-2">Produits</h3>
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex justify-between py-2 border-b">
                    <span>{item.product.name} x{item.quantity}</span>
                    <span className="font-semibold">{(item.price * item.quantity).toFixed(2)}TND</span>
                  </div>
                ))}
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Changer le Statut</h3>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="PENDING">En attente</option>
                  <option value="CONFIRMED">Confirmée</option>
                  <option value="SHIPPED">Expédiée</option>
                  <option value="DELIVERED">Livrée</option>
                  <option value="CANCELLED">Annulée</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
