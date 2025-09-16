'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  Eye, 
  Plus,
  Settings,
  DollarSign,
  Clock,
  Users,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import LoginView from './LoginView';

interface SalesData {
  today: number;
  week: number;
  month: number;
  orders: number;
}

interface RecentOrder {
  id: string;
  customer: string;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
  time: string;
  items: number;
}

const DashboardView: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - en producción vendría de la API
  const [salesData, setSalesData] = useState<SalesData>({
    today: 125000,
    week: 850000,
    month: 3200000,
    orders: 24
  });

  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([
    {
      id: '001',
      customer: 'María González',
      total: 25000,
      status: 'pending',
      time: '10:30 AM',
      items: 3
    },
    {
      id: '002',
      customer: 'Carlos Mendoza',
      total: 18500,
      status: 'preparing',
      time: '10:15 AM',
      items: 2
    },
    {
      id: '003',
      customer: 'Ana Rodríguez',
      total: 32000,
      status: 'ready',
      time: '09:45 AM',
      items: 5
    }
  ]);

  const handleOpenLogin = useCallback(() => setShowLogin(true), []);
  const handleCloseLogin = useCallback(() => setShowLogin(false), []);
  const handleLoginSuccess = useCallback(() => {
    setShowLogin(false);
  }, []);

  // Verificar autenticación y rol de vendedor
  useEffect(() => {
    if (!isAuthenticated) {
      handleOpenLogin();
      return;
    }

    if (user?.role !== 'vendedor') {
      router.push('/');
      return;
    }

    setIsLoading(false);
  }, [isAuthenticated, user, router, handleOpenLogin]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: RecentOrder['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-orange-100 text-orange-800',
      ready: 'bg-green-100 text-green-800',
      delivered: 'bg-gray-100 text-gray-800'
    };
    return colors[status];
  };

  const getStatusIcon = (status: RecentOrder['status']) => {
    const icons = {
      pending: Clock,
      confirmed: CheckCircle,
      preparing: Package,
      ready: AlertCircle,
      delivered: CheckCircle
    };
    return icons[status];
  };

  const getStatusText = (status: RecentOrder['status']) => {
    const texts = {
      pending: 'Pendiente',
      confirmed: 'Confirmado',
      preparing: 'Preparando',
      ready: 'Listo',
      delivered: 'Entregado'
    };
    return texts[status];
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Cargando dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Dashboard de Vendedor
            </h1>
            <p className="text-lg text-gray-600">
              Bienvenido, {user?.fullName} - Gestiona tu negocio desde aquí
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === 'overview'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Resumen</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === 'products'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Package className="h-5 w-5" />
                    <span>Productos</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === 'orders'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="h-5 w-5" />
                    <span>Pedidos</span>
                  </div>
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Ventas Hoy</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatPrice(salesData.today)}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600 font-medium">+12%</span>
                    <span className="text-sm text-gray-500 ml-1">vs ayer</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Esta Semana</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatPrice(salesData.week)}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600 font-medium">+8%</span>
                    <span className="text-sm text-gray-500 ml-1">vs semana anterior</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Este Mes</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatPrice(salesData.month)}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600 font-medium">+15%</span>
                    <span className="text-sm text-gray-500 ml-1">vs mes anterior</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pedidos Hoy</p>
                      <p className="text-2xl font-bold text-gray-900">{salesData.orders}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <Users className="h-4 w-4 text-blue-500 mr-1" />
                    <span className="text-sm text-blue-600 font-medium">18 clientes</span>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Pedidos Recientes
                    </h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                    >
                      <span>Ver todos</span>
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentOrders.map((order) => {
                      const StatusIcon = getStatusIcon(order.status);
                      return (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold text-sm">
                                #{order.id}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{order.customer}</p>
                              <p className="text-sm text-gray-500">
                                {order.items} {order.items === 1 ? 'producto' : 'productos'} • {order.time}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">
                                {formatPrice(order.total)}
                              </p>
                              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {getStatusText(order.status)}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                  onClick={() => setActiveTab('products')}
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200 text-left group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                      <Plus className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Agregar Producto</h4>
                      <p className="text-sm text-gray-500">Añade nuevos productos a tu catálogo</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200 text-left group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                      <ShoppingBag className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Gestionar Pedidos</h4>
                      <p className="text-sm text-gray-500">Revisa y actualiza tus pedidos</p>
                    </div>
                  </div>
                </button>

                <button className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200 text-left group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-200">
                      <Settings className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Configuración</h4>
                      <p className="text-sm text-gray-500">Ajusta tu perfil y preferencias</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Gestión de Productos
                </h3>
                <p className="text-gray-600 mb-6">
                  Esta sección estará disponible próximamente
                </p>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold">
                  Agregar Primer Producto
                </button>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Gestión de Pedidos
                </h3>
                <p className="text-gray-600 mb-6">
                  Esta sección estará disponible próximamente
                </p>
                <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold">
                  Ver Pedidos Pendientes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Login Modal */}
      <LoginView 
        isOpen={showLogin} 
        onClose={handleCloseLogin}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default DashboardView;