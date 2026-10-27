/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  MENU_ITEMS,
  DEFAULT_BUSINESS_CONFIG,
  BusinessConfig,
  MenuItem,
} from './data/menuData';
import { CartItem } from './types/cart';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { FloatingCartButton } from './components/FloatingCartButton';
import { AdminPage } from './components/AdminPage';
import { ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Simple Client-side routing for /admin
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || path === '/admin/' || path.startsWith('/admin') || hash === '#/admin') {
        return '/admin';
      }
    }
    return '/';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || path === '/admin/' || path.startsWith('/admin') || hash === '#/admin') {
        setCurrentPath('/admin');
      } else {
        setCurrentPath('/');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Business Config & Persistence
  const [config, setConfig] = useState<BusinessConfig>(() => {
    try {
      const saved = localStorage.getItem('antojalos_config');
      return saved ? JSON.parse(saved) : DEFAULT_BUSINESS_CONFIG;
    } catch {
      return DEFAULT_BUSINESS_CONFIG;
    }
  });

  // Active Menu Items (supports custom prices from Admin)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem('antojalos_custom_menu');
      return saved ? JSON.parse(saved) : MENU_ITEMS;
    } catch {
      return MENU_ITEMS;
    }
  });

  // Cart & Persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('antojalos_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI State
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [initialFlavorForModal, setInitialFlavorForModal] = useState<string | undefined>(undefined);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Save Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('antojalos_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cart]);

  // Save Config to LocalStorage
  const handleSaveConfig = (newConfig: BusinessConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('antojalos_config', JSON.stringify(newConfig));
      // Re-read custom menu in case prices were saved in admin
      const customMenu = localStorage.getItem('antojalos_custom_menu');
      if (customMenu) {
        setMenuItems(JSON.parse(customMenu));
      }
    } catch (e) {
      console.error('Error saving config to localStorage', e);
    }
  };

  // Schedule status evaluation
  const isStoreOpen = useMemo(() => {
    if (config.schedule.alwaysOpen) return true;

    try {
      const now = new Date();
      const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const currentDay = days[now.getDay()];
      const dayConfig = config.schedule.days[currentDay];

      if (!dayConfig || !dayConfig.enabled) return false;

      const [startHour, startMin] = dayConfig.start.split(':').map(Number);
      const [endHour, endMin] = dayConfig.end.split(':').map(Number);

      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;

      return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
    } catch {
      return true;
    }
  }, [config.schedule]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: menuItems.length,
      alitas: menuItems.filter((i) => i.category === 'alitas').length,
      boneless: menuItems.filter((i) => i.category === 'boneless').length,
      paquetes: menuItems.filter((i) => i.category === 'paquetes').length,
      botaneros: menuItems.filter((i) => i.category === 'botaneros').length,
      papas: menuItems.filter((i) => i.category === 'papas').length,
    };
    return counts;
  }, [menuItems]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return menuItems.filter((item) => {
      // Category match
      if (activeCategory !== 'all') {
        if (item.category !== activeCategory) return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.categoryLabel.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesCat;
      }

      return true;
    });
  }, [menuItems, activeCategory, searchQuery]);

  // Cart operations
  const handleAddToCart = (newItem: CartItem) => {
    setCart((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: newQty, totalPrice: item.unitPrice * newQty }
          : item
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // If visiting /admin, render the isolated Admin Page!
  if (currentPath === '/admin') {
    return (
      <AdminPage
        config={config}
        onSaveConfig={handleSaveConfig}
        onBackToMenu={() => navigateTo('/')}
      />
    );
  }

  // Main Customer Menu Screen
  return (
    <div className="min-h-screen bg-[#070b19] text-[#e0e1dd] relative selection:bg-[#ff5722] selection:text-white pb-20">
      {/* Background Ambient Glows */}
      <div className="ambient-glow-orange" />
      <div className="ambient-glow-cyan" />

      {/* Header (No admin buttons, no flyer buttons) */}
      <Header config={config} isOpen={isStoreOpen} />

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4">
        {/* Category & Search Navigation */}
        <CategoryNav
          activeCategory={activeCategory}
          onSelectCategory={(id) => {
            setActiveCategory(id);
            setSearchQuery('');
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          counts={categoryCounts}
        />

        {/* Product Grid Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-white font-heading flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5722]" />
            <span>
              {activeCategory === 'all'
                ? 'Todos los Productos del Menú'
                : activeCategory === 'alitas'
                ? '#ANTOJ-ALITAS'
                : activeCategory === 'boneless'
                ? 'BONELESS'
                : activeCategory === 'paquetes'
                ? '#PAQUETE-ANTOJES'
                : activeCategory === 'botaneros'
                ? '#ANTOJOSOS BOTANEROS'
                : '#ANTOJA-PAPAS'}
            </span>
          </h2>
          <span className="text-xs text-gray-400">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'opción' : 'opciones'}
          </span>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((item, idx) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  index={idx}
                  onSelect={(selected) => {
                    setInitialFlavorForModal(undefined);
                    setSelectedProduct(selected);
                  }}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="glass-card rounded-2xl p-10 text-center border border-white/10 my-8">
            <ShoppingBag className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">
              No se encontraron productos
            </h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto mb-4">
              No hay resultados que coincidan con "{searchQuery}". Intenta buscar otra palabra o limpia el filtro.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 rounded-xl bg-[#ff5722] text-white text-xs font-bold"
            >
              Limpiar búsqueda
            </button>
          </div>
        )}
      </main>

      {/* Floating Cart Button */}
      <FloatingCartButton cart={cart} onOpenCart={() => setIsCartOpen(true)} />

      {/* Product Customization Modal */}
      <ProductModal
        item={selectedProduct}
        onClose={() => {
          setSelectedProduct(null);
          setInitialFlavorForModal(undefined);
        }}
        onAddToCart={handleAddToCart}
        initialFlavorId={initialFlavorForModal}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        config={config}
        isStoreOpen={isStoreOpen}
      />

      {/* Footer (Clean, no admin button, no flyer button) */}
      <footer className="mt-16 pt-8 pb-12 border-t border-white/10 text-center text-xs text-gray-400 max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-bold text-white text-sm font-heading">{config.businessName}</p>
            <p className="text-gray-400 mt-0.5">🍴 {config.tagline}</p>
          </div>

          <div className="text-center sm:text-right text-gray-400">
            <span>Pedidos directos y rápidos por WhatsApp</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-500">
          <span>&copy; 2026 Antó-Jalos. Todos los derechos reservados.</span>
          <span>Tradición en cada bocado</span>
        </div>
      </footer>
    </div>
  );
}
