'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, Loader2, Package, AlertCircle } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product, Category } from '@/lib/types/Product';

const ProductsView: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock data for demonstration
  const mockProducts: Product[] = [
    {
      id: '1',
      nombre: 'Arepa de Huevo Tradicional',
      precio: 5000,
      url_imagen: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      categoria: 'Comida',
      tienda: {
        nombre: 'Arepas Doña María',
        calificacion: 4.8
      },
      calificacion: 4.9,
      descripcion: 'Arepa de huevo tradicional barranquillera'
    },
    {
      id: '2',
      nombre: 'Jugo de Corozo Natural',
      precio: 3500,
      url_imagen: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400',
      categoria: 'Bebidas',
      tienda: {
        nombre: 'Jugos El Paraíso',
        calificacion: 4.6
      },
      calificacion: 4.7,
      descripcion: 'Jugo natural de corozo, sin azúcar añadida'
    },
    {
      id: '3',
      nombre: 'Empanadas de Pollo (3 unidades)',
      precio: 8000,
      url_imagen: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
      categoria: 'Comida',
      tienda: {
        nombre: 'Empanadas La Costeña',
        calificacion: 4.9
      },
      calificacion: 4.8,
      descripcion: 'Empanadas crujientes rellenas de pollo desmechado'
    },
    {
      id: '4',
      nombre: 'Café Colombiano Premium',
      precio: 12000,
      url_imagen: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400',
      categoria: 'Bebidas',
      tienda: {
        nombre: 'Café del Puerto',
        calificacion: 4.7
      },
      calificacion: 4.6,
      descripcion: 'Café 100% colombiano, tostado artesanalmente'
    },
    {
      id: '5',
      nombre: 'Patacón con Hogao',
      precio: 6500,
      url_imagen: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      categoria: 'Comida',
      tienda: {
        nombre: 'Patacones El Malecón',
        calificacion: 4.5
      },
      calificacion: 4.4,
      descripcion: 'Patacón crujiente con hogao tradicional'
    },
    {
      id: '6',
      nombre: 'Raspao de Tamarindo',
      precio: 2500,
      url_imagen: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400',
      categoria: 'Postres',
      tienda: {
        nombre: 'Raspao Don Pedro',
        calificacion: 4.8
      },
      calificacion: 4.9,
      descripcion: 'Raspao artesanal con jarabe de tamarindo'
    },
    {
      id: '7',
      nombre: 'Sancocho de Gallina',
      precio: 15000,
      url_imagen: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      categoria: 'Comida',
      tienda: {
        nombre: 'Sancocho Abuela Rosa',
        calificacion: 4.9
      },
      calificacion: 4.8,
      descripcion: 'Sancocho tradicional con gallina criolla'
    },
    {
      id: '8',
      nombre: 'Limonada de Coco',
      precio: 4000,
      url_imagen: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400',
      categoria: 'Bebidas',
      tienda: {
        nombre: 'Cocteles Tropicales',
        calificacion: 4.6
      },
      calificacion: 4.5,
      descripcion: 'Limonada refrescante con coco rallado'
    }
  ];

  const mockCategories: Category[] = [
    { id: 'all', nombre: 'Todos', emoji: '🏪' },
    { id: 'comida', nombre: 'Comida', emoji: '🍽️' },
    { id: 'bebidas', nombre: 'Bebidas', emoji: '🥤' },
    { id: 'postres', nombre: 'Postres', emoji: '🍰' },
    { id: 'snacks', nombre: 'Snacks', emoji: '🍿' },
    { id: 'frutas', nombre: 'Frutas', emoji: '🍎' }
  ];

  // Simulate API call
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setProducts(mockProducts);
        setCategories(mockCategories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term and category
  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(product =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tienda.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.categoria.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  const handleCategoryFilter = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  // Loading skeleton component
  const ProductSkeleton = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        <div className="flex justify-between items-center">
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Productos Locales
          </h1>
          <p className="text-lg text-gray-600">
            Descubre lo mejor de tu barrio
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar productos o tiendas..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Categorías:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryFilter(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 hover:border-blue-300'
                }`}
              >
                <span>{category.emoji}</span>
                <span>{category.nombre}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        {!isLoading && !error && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              {filteredProducts.length === 0 
                ? 'No se encontraron productos'
                : `${filteredProducts.length} producto${filteredProducts.length !== 1 ? 's' : ''} encontrado${filteredProducts.length !== 1 ? 's' : ''}`
              }
              {searchTerm && (
                <span className="ml-1">
                  para "<span className="font-semibold">{searchTerm}</span>"
                </span>
              )}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Error al cargar productos
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
            >
              Intentar de nuevo
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <>
            <div className="flex items-center justify-center mb-8">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              <span className="ml-3 text-gray-600 font-medium">Cargando productos...</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }, (_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          </>
        )}

        {/* Products Grid */}
        {!isLoading && !error && (
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm 
                    ? 'Intenta con otros términos de búsqueda'
                    : 'No hay productos disponibles en esta categoría'
                  }
                </p>
                {(searchTerm || selectedCategory !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
                  >
                    Ver todos los productos
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <ProductCard product={product} />
                  </Link>
                ))}
              </div>
            )}
          </>
        )}

        {/* Load More Button (for future pagination) */}
        {!isLoading && !error && filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 font-semibold">
              Cargar más productos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsView;