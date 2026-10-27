import React from 'react';
import { ShoppingBasket } from 'lucide-react';
import { CartItem } from '../types/cart';

interface FloatingCartButtonProps {
  cart: CartItem[];
  onOpenCart: () => void;
}

export const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({ cart, onOpenCart }) => {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  if (totalCount === 0) return null;

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40 animate-bounce-subtle">
      <button
        onClick={onOpenCart}
        className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-[#ff5722] via-[#ff7043] to-[#ff5722] text-white font-extrabold shadow-[0_10px_25px_rgba(255,87,34,0.5)] hover:shadow-[0_12px_30px_rgba(255,87,34,0.7)] active:scale-95 transition-all border border-white/20"
        aria-label="Ver Pedido"
      >
        <div className="relative">
          <ShoppingBasket className="w-5 h-5" />
          <span className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-black text-[#00b4d8] text-[11px] font-black flex items-center justify-center border border-white/30">
            {totalCount}
          </span>
        </div>
        <span className="text-sm font-heading hidden xs:inline tracking-wide">
          Ver Pedido
        </span>
        <span className="text-sm font-black bg-black/25 px-2.5 py-1 rounded-full font-heading">
          ${subtotal} MXN
        </span>
      </button>
    </div>
  );
};
