import React from 'react';
import { Truck, Store, CheckCircle, Clock, ExternalLink, Flame } from 'lucide-react';
import { BusinessConfig } from '../data/menuData';

interface HeaderProps {
  config: BusinessConfig;
  isOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ config, isOpen }) => {
  return (
    <header className="relative z-10 w-full pt-4 pb-6 px-4 max-w-5xl mx-auto">
      {/* Announcement Status Bar */}
      <div
        className={`w-full py-2.5 px-4 rounded-xl mb-4 flex items-center justify-between text-xs md:text-sm font-medium transition-all ${
          isOpen
            ? 'bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 shadow-[0_0_15px_rgba(46,196,182,0.15)]'
            : 'bg-rose-950/70 border border-rose-500/30 text-rose-300 shadow-[0_0_15px_rgba(230,57,70,0.15)]'
        }`}
      >
        <div className="flex items-center gap-2">
          {isOpen ? (
            <>
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
              <span>¡Estamos abiertos! Haz tu pedido ahora mismo por WhatsApp.</span>
            </>
          ) : (
            <>
              <Clock className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Negocio cerrado por el momento. Horario habitual: 6:00 PM - 11:30 PM.</span>
            </>
          )}
        </div>
      </div>

      {/* Main Brand Header */}
      <div className="glass-card rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row items-center gap-5 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff5722]/15 rounded-full blur-2xl pointer-events-none" />

        {/* Logo Container */}
        <div className="relative shrink-0 group">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-[#ff5722] via-[#ff7043] to-[#00b4d8] shadow-[0_0_20px_rgba(255,87,34,0.35)]">
            <img
              src="/img/logo.jpg"
              alt={config.businessName}
              className="w-full h-full object-cover rounded-xl bg-[#0b132b]"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://placehold.co/120x120/070b19/ff5722?text=ANTO-JALOS';
              }}
            />
          </div>
          <span className="absolute -bottom-2 -right-2 bg-[#ff5722] text-white p-1 rounded-full shadow-md">
            <Flame className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Brand Details */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-heading">
              {config.businessName}
            </h1>
            
            {/* Social media badge */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 self-center sm:self-auto px-3 py-1 text-xs font-semibold rounded-full bg-[#1877f2]/20 border border-[#1877f2]/40 text-[#4287f5] hover:bg-[#1877f2]/30 transition-colors"
            >
              <span>f</span>
              <span>{config.facebookHandle}</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
            </a>
          </div>

          <p className="text-gray-300 text-sm md:text-base mt-1 flex items-center justify-center sm:justify-start gap-2">
            <span className="text-[#ff5722]">🍴</span>
            <span>{config.tagline}</span>
          </p>

          {/* Delivery & Pickup Badges */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mt-3.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#ff5722]/15 text-[#ff7043] border border-[#ff5722]/30">
              <Truck className="w-3.5 h-3.5" />
              Envío a Domicilio (${config.deliveryCost})
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#00b4d8]/15 text-[#90e0ef] border border-[#00b4d8]/30">
              <Store className="w-3.5 h-3.5" />
              Para Recoger
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
