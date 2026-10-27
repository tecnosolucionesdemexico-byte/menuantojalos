import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Flame, ShoppingBag, Check } from 'lucide-react';
import { MenuItem, SAUCE_FLAVORS, SauceFlavor } from '../data/menuData';
import { CartItem, CartItemOption } from '../types/cart';

interface ProductModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
  initialFlavorId?: string;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  item,
  onClose,
  onAddToCart,
  initialFlavorId,
}) => {
  if (!item) return null;

  // Selected Flavors
  const [primaryFlavor, setPrimaryFlavor] = useState<string>('');
  const [secondaryFlavor, setSecondaryFlavor] = useState<string>('');
  const [selectedCarneOption, setSelectedCarneOption] = useState<string>('');
  const [selectedExtras, setSelectedExtras] = useState<CartItemOption[]>([]);
  const [extraDipFlavor, setExtraDipFlavor] = useState<string>('Ranch / Aderezo');
  const [notes, setNotes] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [flavorFilter, setFlavorFilter] = useState<number | 'all'>('all');

  useEffect(() => {
    // Set default initial flavor
    if (initialFlavorId) {
      const found = SAUCE_FLAVORS.find((f) => f.id === initialFlavorId);
      if (found) {
        setPrimaryFlavor(found.name);
      } else {
        setPrimaryFlavor(SAUCE_FLAVORS[0].name);
      }
    } else if (item.requiresFlavor) {
      setPrimaryFlavor(SAUCE_FLAVORS[1].name); // Default to popular Mango Habanero
    } else {
      setPrimaryFlavor('');
    }

    // Set default carne option if applicable
    const carneMod = item.modifiers?.find((m) => m.id === 'tipo_carne');
    if (carneMod && carneMod.options.length > 0) {
      setSelectedCarneOption(carneMod.options[0].name);
    } else {
      setSelectedCarneOption('');
    }

    setSecondaryFlavor('');
    setSelectedExtras([]);
    setExtraDipFlavor('Ranch / Aderezo');
    setNotes('');
    setQuantity(1);
    setFlavorFilter('all');
  }, [item, initialFlavorId]);

  const toggleExtra = (option: CartItemOption) => {
    setSelectedExtras((prev) => {
      const exists = prev.some((e) => e.name.startsWith(option.name));
      if (exists) {
        return prev.filter((e) => !e.name.startsWith(option.name));
      } else {
        return [...prev, option];
      }
    });
  };

  const isExtraSelected = (baseName: string) => {
    return selectedExtras.some((e) => e.name.startsWith(baseName));
  };

  const extrasTotal = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  const unitPrice = item.price + extrasTotal;
  const totalPrice = unitPrice * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (item.requiresFlavor && !primaryFlavor) {
      alert('Por favor selecciona tu salsa o sabor favorito.');
      return;
    }

    // Format extras with flavor if Dip extra is selected
    const finalizedExtras = selectedExtras.map((ext) => {
      if (ext.name.includes('Dip extra') && extraDipFlavor) {
        return {
          name: `Dip extra (${extraDipFlavor})`,
          price: ext.price,
        };
      }
      return ext;
    });

    const newCartItem: CartItem = {
      cartItemId: `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      item,
      quantity,
      primaryFlavor: item.requiresFlavor ? primaryFlavor : undefined,
      secondaryFlavor: item.allowTwoFlavors && secondaryFlavor ? secondaryFlavor : undefined,
      selectedOption: selectedCarneOption || undefined,
      extras: finalizedExtras,
      notes: notes.trim() || undefined,
      unitPrice,
      totalPrice,
    };

    onAddToCart(newCartItem);
    onClose();
  };

  const renderFlames = (level: number) => {
    return Array.from({ length: level }).map((_, i) => (
      <Flame key={i} className="w-3 h-3 text-[#ff5722] fill-[#ff5722] inline" />
    ));
  };

  const filteredFlavors =
    flavorFilter === 'all'
      ? SAUCE_FLAVORS
      : SAUCE_FLAVORS.filter((f) => f.spiceLevel === flavorFilter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#0b132b] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-start justify-between gap-3 bg-gradient-to-r from-[#121e3d] to-[#0b132b]">
          <div>
            <span className="text-xs font-bold text-[#00b4d8] uppercase tracking-wider block mb-1">
              {item.categoryLabel}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
              {item.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 leading-snug">
              {item.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors shrink-0"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <form id="product-form" onSubmit={handleSubmit} className="p-4 sm:p-5 overflow-y-auto space-y-5">
          {/* Option for Solo Alitas vs Solo Boneless */}
          {item.modifiers &&
            item.modifiers
              .filter((m) => m.id === 'tipo_carne')
              .map((mod) => (
                <div key={mod.id} className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                    {mod.name}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {mod.options.map((opt) => (
                      <button
                        key={opt.name}
                        type="button"
                        onClick={() => setSelectedCarneOption(opt.name)}
                        className={`p-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all text-center flex items-center justify-center gap-2 ${
                          selectedCarneOption === opt.name
                            ? 'bg-[#ff5722] text-white border-transparent shadow-md'
                            : 'bg-[#121e3d] text-gray-300 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {selectedCarneOption === opt.name && <Check className="w-3.5 h-3.5" />}
                        <span>{opt.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}

          {/* Flavor Selection (Sauces & Picantes) */}
          {item.requiresFlavor && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#ff7043] flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#ff5722]" />
                  <span>Complemento: Sabor de Salsa (Incluido)</span>
                </label>
                <span className="text-[11px] text-gray-400">17 sabores a elegir</span>
              </div>

              {/* Quick Spice Level Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => setFlavorFilter('all')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    flavorFilter === 'all'
                      ? 'bg-[#ff5722] text-white'
                      : 'bg-[#121e3d] text-gray-400 hover:text-white'
                  }`}
                >
                  Todas
                </button>
                {[5, 4, 3, 2, 1].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setFlavorFilter(lvl)}
                    className={`px-2 py-1 rounded-lg font-medium flex items-center gap-1 transition-colors ${
                      flavorFilter === lvl
                        ? 'bg-[#ff5722] text-white'
                        : 'bg-[#121e3d] text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>{lvl}</span>
                    <Flame className="w-2.5 h-2.5" />
                  </button>
                ))}
              </div>

              {/* Flavor Radio Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {filteredFlavors.map((flavor: SauceFlavor) => {
                  const isSelected = primaryFlavor === flavor.name;
                  return (
                    <button
                      key={flavor.id}
                      type="button"
                      onClick={() => setPrimaryFlavor(flavor.name)}
                      className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-[#ff5722]/20 border-[#ff5722] text-white shadow-[0_0_10px_rgba(255,87,34,0.25)]'
                          : 'bg-[#121e3d]/70 border-white/10 text-gray-300 hover:bg-[#182952] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-[#ff5722] bg-[#ff5722]' : 'border-gray-500'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                        <div>
                          <span className="text-xs font-bold block">{flavor.name}</span>
                          {flavor.isPopular && (
                            <span className="text-[10px] text-amber-300 font-semibold block">
                              ★ Favorito
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center shrink-0">
                        {renderFlames(flavor.spiceLevel)}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Optional 2nd Flavor if Allowed */}
              {item.allowTwoFlavors && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <label className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-1.5">
                    Segundo Sabor Opcional (Mitad y Mitad)
                  </label>
                  <select
                    value={secondaryFlavor}
                    onChange={(e) => setSecondaryFlavor(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-[#121e3d] border border-white/15 text-xs text-white focus:outline-none focus:border-[#00b4d8]"
                  >
                    <option value="">-- Sin segundo sabor (todo de {primaryFlavor || 'un solo sabor'}) --</option>
                    {SAUCE_FLAVORS.map((f) => (
                      <option key={`sec-${f.id}`} value={f.name}>
                        {f.name} ({'🔥'.repeat(f.spiceLevel)})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Extras Opcionales (Dip extra $20, Orden papas $45) */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center justify-between">
              <span>Adicionales para tu Orden</span>
              <span className="text-[11px] text-gray-400">Opcional</span>
            </label>
            <div className="space-y-2">
              {[
                { name: 'Dip extra (Salsa o Aderezo)', price: 20 },
                { name: 'Orden de papas adicional', price: 45 },
              ].map((extra) => {
                const isChecked = isExtraSelected(extra.name);
                return (
                  <div key={extra.name} className="space-y-2">
                    <button
                      type="button"
                      onClick={() => toggleExtra(extra)}
                      className={`w-full p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-[#00b4d8]/20 border-[#00b4d8] text-white'
                          : 'bg-[#121e3d]/70 border-white/10 text-gray-300 hover:bg-[#182952]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isChecked ? 'bg-[#00b4d8] border-[#00b4d8] text-black' : 'border-gray-500'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs sm:text-sm font-medium">{extra.name}</span>
                      </div>
                      <span className="text-xs font-bold text-amber-400">
                        +${extra.price} MXN
                      </span>
                    </button>

                    {/* Sabor de Dip Extra si está marcado */}
                    {extra.name.includes('Dip extra') && isChecked && (
                      <div className="p-2.5 rounded-xl bg-[#090f24] border border-[#00b4d8]/40 space-y-1 ml-2">
                        <label className="text-[11px] font-semibold text-cyan-300 block">
                          Sabor del Dip Adicional ($20):
                        </label>
                        <select
                          value={extraDipFlavor}
                          onChange={(e) => setExtraDipFlavor(e.target.value)}
                          className="w-full py-1.5 px-2.5 rounded-lg bg-[#121e3d] border border-white/20 text-xs text-white focus:outline-none focus:border-[#00b4d8]"
                        >
                          <option value="Ranch / Aderezo">Aderezo Ranch / Blanco</option>
                          {SAUCE_FLAVORS.map((f) => (
                            <option key={`dip-opt-${f.id}`} value={f.name}>
                              Salsa {f.name} ({'🔥'.repeat(f.spiceLevel)})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notes / Special Instructions */}
          <div className="space-y-1.5 pt-2 border-t border-white/10">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block">
              Notas o Instrucciones Especiales
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: salsa bien doradita, aderezo ranch aparte, sin servilletas..."
              rows={2}
              className="w-full p-2.5 rounded-xl bg-[#121e3d] border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff5722]"
            />
          </div>
        </form>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#070b19] flex items-center justify-between gap-3">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2 bg-[#121e3d] px-2 py-1.5 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-colors"
              aria-label="Disminuir cantidad"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center text-sm font-bold text-white font-heading">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-colors"
              aria-label="Aumentar cantidad"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            form="product-form"
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#ff5722] via-[#ff7043] to-[#ff5722] hover:opacity-95 text-white text-sm font-bold shadow-lg shadow-[#ff5722]/30 active:scale-98 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Agregar al pedido</span>
            <span className="font-extrabold ml-1 bg-black/20 px-2 py-0.5 rounded-lg text-xs">
              ${totalPrice} MXN
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
