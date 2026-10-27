import React, { useRef } from 'react';
import { Search, X, ChevronLeft, ChevronRight, Flame, Drumstick, Package, Sparkles, UtensilsCrossed, LayoutGrid } from 'lucide-react';
import { CATEGORIES } from '../data/menuData';

interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts: Record<string, number>;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  counts,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -220 : 220;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'all':
        return <LayoutGrid className="w-4 h-4" />;
      case 'alitas':
        return <Flame className="w-4 h-4 text-[#ff5722]" />;
      case 'boneless':
        return <Drumstick className="w-4 h-4 text-amber-400" />;
      case 'paquetes':
        return <Package className="w-4 h-4 text-[#00b4d8]" />;
      case 'botaneros':
        return <Sparkles className="w-4 h-4 text-emerald-400" />;
      case 'papas':
        return <UtensilsCrossed className="w-4 h-4 text-yellow-400" />;
      default:
        return <Flame className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mb-6 sticky top-2 z-20">
      {/* Search Bar */}
      <div className="relative mb-3.5">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar alitas, boneless, paquetes, papas, salsas..."
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#0e172e]/90 backdrop-blur-md border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] shadow-lg text-sm transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Categories Horizontal Navigation Bar */}
      <div className="relative flex items-center">
        {/* Scroll Left Button */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute -left-3 z-10 w-7 h-7 rounded-full bg-[#121e3d] border border-white/10 items-center justify-center text-gray-300 hover:text-white hover:bg-[#1a2a55] shadow-md transition-colors"
          aria-label="Scroll izquierda"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 w-full scroll-smooth"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = counts[cat.id];

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold shrink-0 transition-all border ${
                  isActive
                    ? 'bg-gradient-to-r from-[#ff5722] to-[#ff7043] text-white border-transparent shadow-[0_0_15px_rgba(255,87,34,0.45)] scale-[1.02]'
                    : 'bg-[#121e3d]/80 text-gray-300 border-white/5 hover:border-[#00b4d8]/40 hover:text-white hover:bg-[#182952]'
                }`}
              >
                <span>{getCategoryIcon(cat.id)}</span>
                <span>{cat.shortName}</span>
                {count !== undefined && count > 0 && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Scroll Right Button */}
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute -right-3 z-10 w-7 h-7 rounded-full bg-[#121e3d] border border-white/10 items-center justify-center text-gray-300 hover:text-white hover:bg-[#1a2a55] shadow-md transition-colors"
          aria-label="Scroll derecha"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
