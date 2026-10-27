import React from 'react';
import { motion } from 'motion/react';
import { Plus, Flame, Sparkles } from 'lucide-react';
import { MenuItem } from '../data/menuData';

interface ProductCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ item, onSelect, index = 0 }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.28,
        delay: Math.min(index * 0.03, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.15 } }}
      onClick={() => onSelect(item)}
      className="glass-card glass-card-hover rounded-2xl p-4 sm:p-5 flex flex-col justify-between cursor-pointer border border-white/10 group relative overflow-hidden"
    >
      {/* Top Banner or Popular Indicator */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#00b4d8]">
          {item.categoryLabel}
        </span>
        {item.badge && (
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase ${
              item.popular
                ? 'bg-[#ff5722] text-white shadow-[0_0_10px_rgba(255,87,34,0.5)]'
                : 'bg-white/10 text-gray-200 border border-white/10'
            }`}
          >
            {item.popular && <Sparkles className="w-2.5 h-2.5 inline mr-1" />}
            {item.badge}
          </span>
        )}
      </div>

      {/* Title & Description */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white group-hover:text-[#ff7043] transition-colors font-heading leading-snug">
          {item.name}
        </h3>
        <p className="text-gray-300 text-xs sm:text-sm mt-1.5 leading-relaxed line-clamp-3">
          {item.description}
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {item.requiresFlavor && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-300/90 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
              <Flame className="w-3 h-3 text-[#ff5722]" />
              {item.allowTwoFlavors ? 'Hasta 2 salsas a elegir' : 'Salsa a elegir'}
            </span>
          )}
          {item.modifiers && item.modifiers.some((m) => m.id === 'tipo_carne') && (
            <span className="text-[11px] font-medium text-cyan-300/90 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
              Alitas o Boneless
            </span>
          )}
        </div>
      </div>

      {/* Price & Action Button */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-auto">
        <div>
          <span className="text-xs text-gray-400 block">Precio</span>
          <span className="text-xl sm:text-2xl font-black text-white font-heading">
            ${item.price}
            <span className="text-xs font-medium text-gray-400 ml-1">MXN</span>
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(item);
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#ff5722] to-[#ff7043] hover:from-[#ff7043] hover:to-[#ff5722] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#ff5722]/30 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Pedir</span>
        </button>
      </div>
    </motion.div>
  );
};
