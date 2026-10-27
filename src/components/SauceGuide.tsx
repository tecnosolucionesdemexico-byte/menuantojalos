import React, { useState } from 'react';
import { Flame, Sparkles, PlusCircle } from 'lucide-react';
import { SAUCE_FLAVORS, SauceFlavor } from '../data/menuData';

interface SauceGuideProps {
  onQuickOrderSauce?: (sauce: SauceFlavor) => void;
}

export const SauceGuide: React.FC<SauceGuideProps> = ({ onQuickOrderSauce }) => {
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');

  const filtered =
    selectedLevel === 'all'
      ? SAUCE_FLAVORS
      : SAUCE_FLAVORS.filter((s) => s.spiceLevel === selectedLevel);

  const renderFlames = (level: number) => {
    return Array.from({ length: level }).map((_, i) => (
      <Flame key={i} className="w-3.5 h-3.5 text-[#ff5722] fill-[#ff5722] inline" />
    ));
  };

  const getSpiceDescriptor = (level: number) => {
    switch (level) {
      case 5:
        return 'Picor Extremo';
      case 4:
        return 'Picor Fuerte';
      case 3:
        return 'Picor Moderado';
      case 2:
        return 'Picor Suave';
      case 1:
        return 'Agridulce / Sin Picor';
      default:
        return '';
    }
  };

  return (
    <div className="w-full glass-card rounded-2xl p-5 sm:p-7 border border-white/10 shadow-2xl relative overflow-hidden mb-8">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#ff5722]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#ff5722]/20 text-[#ff5722]">
              <Flame className="w-5 h-5 fill-[#ff5722]" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-wide">
              SABORES & PICANTE
            </h2>
          </div>
          <p className="text-gray-300 text-xs sm:text-sm">
            Explora nuestras 17 exclusivas salsas artesanales para tus Alitas y Boneless.
          </p>
        </div>

        {/* Extra Dip Callout */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold shrink-0">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Dip extra (Salsa o Aderezo): <strong className="text-white text-base">$20</strong></span>
        </div>
      </div>

      {/* Level Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1">
          Nivel de Picante:
        </span>
        <button
          onClick={() => setSelectedLevel('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
            selectedLevel === 'all'
              ? 'bg-[#ff5722] text-white border-[#ff5722] shadow-md'
              : 'bg-[#121e3d] text-gray-300 border-white/10 hover:border-white/20'
          }`}
        >
          Todos ({SAUCE_FLAVORS.length})
        </button>
        {[
          { lvl: 5, label: '5 Chiles (Extremo)' },
          { lvl: 4, label: '4 Chiles (Fuerte)' },
          { lvl: 3, label: '3 Chiles (Medio)' },
          { lvl: 2, label: '2 Chiles (Suave)' },
          { lvl: 1, label: '1 Chile (Dulce/Cero picor)' },
        ].map((item) => (
          <button
            key={item.lvl}
            onClick={() => setSelectedLevel(item.lvl)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
              selectedLevel === item.lvl
                ? 'bg-[#ff5722] text-white border-[#ff5722] shadow-md'
                : 'bg-[#121e3d] text-gray-300 border-white/10 hover:border-white/20'
            }`}
          >
            <span className="flex items-center">{renderFlames(item.lvl)}</span>
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Sauces Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filtered.map((sauce) => (
          <div
            key={sauce.id}
            className="p-3.5 rounded-xl bg-[#0f1a38]/80 border border-white/10 hover:border-[#ff5722]/50 hover:bg-[#152349] transition-all flex flex-col justify-between group"
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5">
                {sauce.id === 'taquis_fuego' && <span className="text-base">🌶️</span>}
                <h3 className="text-sm font-bold text-white group-hover:text-[#ff7043] transition-colors font-heading">
                  {sauce.name}
                </h3>
              </div>
              <div className="flex items-center gap-0.5 shrink-0 bg-black/30 px-2 py-0.5 rounded-full">
                {renderFlames(sauce.spiceLevel)}
              </div>
            </div>

            <p className="text-[11px] text-gray-300 mb-2.5 leading-relaxed">
              {sauce.description}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
              <span className="text-amber-400 font-medium">
                {getSpiceDescriptor(sauce.spiceLevel)}
              </span>
              {onQuickOrderSauce && (
                <button
                  type="button"
                  onClick={() => onQuickOrderSauce(sauce)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00b4d8] hover:text-[#90e0ef] transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Pedir con esta</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
