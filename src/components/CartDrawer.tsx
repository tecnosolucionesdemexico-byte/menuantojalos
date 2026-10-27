import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBasket, Truck, Store, Send, AlertTriangle, ShieldCheck, Bike } from 'lucide-react';
import { CartItem, CustomerOrderData } from '../types/cart';
import { BusinessConfig } from '../data/menuData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  config: BusinessConfig;
  isStoreOpen: boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  config,
  isStoreOpen,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [deliveryType, setDeliveryType] = useState<'domicilio' | 'sucursal'>('domicilio');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Efectivo' | 'Transferencia' | 'Tarjeta'>('Efectivo');
  const [cashAmount, setCashAmount] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = deliveryType === 'domicilio' ? config.deliveryCost : 0;
  const total = subtotal + deliveryFee;

  const handleSendOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Tu carrito está vacío. Por favor agrega productos.');
      return;
    }

    if (!customerName.trim()) {
      alert('Por favor ingresa tu nombre completo.');
      return;
    }

    if (deliveryType === 'domicilio' && !address.trim()) {
      alert('Por favor ingresa tu dirección completa y referencias para el envío.');
      return;
    }

    // Format WhatsApp message
    let message = `🍗 *¡NUEVO PEDIDO - ${config.businessName.toUpperCase()}!* 🍗\n`;
    message += `─────────────────────────\n`;
    message += `👤 *Cliente:* ${customerName.trim()}\n`;
    message += `🛵 *Entrega:* ${deliveryType === 'domicilio' ? 'A Domicilio' : 'Para Recoger en Sucursal'}\n`;
    if (deliveryType === 'domicilio') {
      message += `📍 *Dirección:* ${address.trim()}\n`;
    }
    message += `💳 *Método de Pago:* ${paymentMethod}\n`;
    if (paymentMethod === 'Efectivo' && cashAmount.trim()) {
      message += `💵 *Paga con:* $${cashAmount.trim()} (Llevar cambio)\n`;
    }
    message += `─────────────────────────\n`;
    message += `📦 *DETALLE DEL PEDIDO:*\n\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.quantity}x ${item.item.name}* - $${item.totalPrice} MXN\n`;
      if (item.selectedOption) {
        message += `   • Especialidad: ${item.selectedOption}\n`;
      }
      if (item.primaryFlavor) {
        message += `   • Sabor: ${item.primaryFlavor}\n`;
      }
      if (item.secondaryFlavor) {
        message += `   • 2do Sabor: ${item.secondaryFlavor}\n`;
      }
      if (item.extras.length > 0) {
        message += `   • Extras: ${item.extras.map((e) => `${e.name} (+$${e.price})`).join(', ')}\n`;
      }
      if (item.notes) {
        message += `   • Nota: ${item.notes}\n`;
      }
      message += `\n`;
    });

    message += `─────────────────────────\n`;
    message += `Subtotal: $${subtotal} MXN\n`;
    message += `Envío: ${deliveryType === 'domicilio' ? `$${deliveryFee} MXN` : '$0 (Para Recoger)'}\n`;
    message += `*TOTAL A PAGAR: $${total} MXN*\n`;

    if (orderNotes.trim()) {
      message += `─────────────────────────\n`;
      message += `📝 *Instrucciones adicionales:* ${orderNotes.trim()}\n`;
    }

    message += `─────────────────────────\n`;
    message += `_Enviado desde el Menú Digital Oficial Antó-Jalos_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${config.whatsappPhone}?text=${encodedMessage}`;

    // Open WhatsApp
    window.location.href = whatsappUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#090f24] border-l border-white/10 h-full flex flex-col z-10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[#121e3d] to-[#090f24]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#ff5722]/20 text-[#ff5722]">
              <ShoppingBasket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-heading">Tu Pedido</h2>
              <span className="text-xs text-gray-400">
                {cart.length} {cart.length === 1 ? 'producto' : 'productos'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                type="button"
                onClick={onClearCart}
                className="text-xs text-gray-400 hover:text-rose-400 p-1.5 transition-colors"
                title="Vaciar Carrito"
              >
                Vaciar
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Closed warning if store closed */}
        {!isStoreOpen && (
          <div className="p-3 bg-rose-950/80 border-b border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>
              El restaurante está cerrado en este horario, pero puedes armar tu pedido o consultar.
            </span>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {cart.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-gray-400">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-3">
                <ShoppingBasket className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Tu carrito está vacío</h3>
              <p className="text-xs text-gray-400 max-w-xs">
                ¡Agrega deliciosas alitas, boneless, paquetes o papas preparadas a tu orden!
              </p>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="space-y-3">
                {cart.map((cartItem) => (
                  <div
                    key={cartItem.cartItemId}
                    className="p-3.5 rounded-xl bg-[#121e3d]/80 border border-white/10 flex flex-col gap-2 relative group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-white font-heading">
                          {cartItem.item.name}
                        </h4>
                        <span className="text-xs font-semibold text-amber-400">
                          ${cartItem.unitPrice} MXN c/u
                        </span>
                      </div>

                      <button
                        onClick={() => onRemoveItem(cartItem.cartItemId)}
                        className="text-gray-400 hover:text-rose-400 p-1 transition-colors"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Modifiers & Flavors info */}
                    <div className="text-xs space-y-0.5 text-gray-300 bg-black/20 p-2 rounded-lg">
                      {cartItem.selectedOption && (
                        <p className="text-cyan-300 font-medium">
                          • {cartItem.selectedOption}
                        </p>
                      )}
                      {cartItem.primaryFlavor && (
                        <p>
                          • Sabor: <strong className="text-white">{cartItem.primaryFlavor}</strong>
                        </p>
                      )}
                      {cartItem.secondaryFlavor && (
                        <p>
                          • 2do Sabor: <strong className="text-white">{cartItem.secondaryFlavor}</strong>
                        </p>
                      )}
                      {cartItem.extras.length > 0 && (
                        <p className="text-amber-300">
                          • {cartItem.extras.map((e) => e.name).join(', ')}
                        </p>
                      )}
                      {cartItem.notes && (
                        <p className="text-gray-400 italic">
                          • Nota: "{cartItem.notes}"
                        </p>
                      )}
                    </div>

                    {/* Quantity controls & item total */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <div className="flex items-center gap-2 bg-[#090f24] px-2 py-1 rounded-lg border border-white/10">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
                          className="w-5 h-5 rounded flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center text-white">
                          {cartItem.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                          className="w-5 h-5 rounded flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-black text-white font-heading">
                        ${cartItem.totalPrice} MXN
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Checkout Form */}
              <form id="checkout-form" onSubmit={handleSendOrder} className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#ff7043] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#ff5722]" />
                  <span>Datos de Entrega y Pago</span>
                </h3>

                {/* Customer Name */}
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Tu Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ej. Juan Pérez"
                    className="w-full px-3 py-2 rounded-xl bg-[#121e3d] border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff5722]"
                  />
                </div>

                {/* Delivery Type Radios */}
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Método de Entrega *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('domicilio')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                        deliveryType === 'domicilio'
                          ? 'bg-[#ff5722] text-white border-transparent shadow-md'
                          : 'bg-[#121e3d] text-gray-400 border-white/10 hover:text-white'
                      }`}
                    >
                      <Bike className="w-4 h-4" />
                      <span>A Domicilio (+${config.deliveryCost})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType('sucursal')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                        deliveryType === 'sucursal'
                          ? 'bg-[#00b4d8] text-white border-transparent shadow-md'
                          : 'bg-[#121e3d] text-gray-400 border-white/10 hover:text-white'
                      }`}
                    >
                      <Store className="w-4 h-4" />
                      <span>Para Recoger</span>
                    </button>
                  </div>
                </div>

                {/* Address (If Domicilio) */}
                {deliveryType === 'domicilio' && (
                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">
                      Dirección y Referencias *
                    </label>
                    <textarea
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Calle, número exterior/interior, colonia y entre calles..."
                      rows={2}
                      className="w-full px-3 py-2 rounded-xl bg-[#121e3d] border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff5722]"
                    />
                  </div>
                )}

                {/* Payment Method */}
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Método de Pago *
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[#121e3d] border border-white/15 text-xs text-white focus:outline-none focus:border-[#ff5722]"
                  >
                    <option value="Efectivo">Efectivo</option>
                    <option value="Transferencia">Transferencia bancaria</option>
                    <option value="Tarjeta">Tarjeta (Terminal física al entregar)</option>
                  </select>
                </div>

                {/* Cash Change if Cash */}
                {paymentMethod === 'Efectivo' && (
                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">
                      ¿Con cuánto vas a pagar? (Opcional, para cambio)
                    </label>
                    <input
                      type="number"
                      value={cashAmount}
                      onChange={(e) => setCashAmount(e.target.value)}
                      placeholder="Ej. 200, 500, 1000"
                      className="w-full px-3 py-2 rounded-xl bg-[#121e3d] border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff5722]"
                    />
                  </div>
                )}

                {/* Order Notes */}
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Instrucciones Adicionales (Opcional)
                  </label>
                  <textarea
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Instrucciones del timbre, servilletas extra, etc."
                    rows={2}
                    className="w-full px-3 py-2 rounded-xl bg-[#121e3d] border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff5722]"
                  />
                </div>
              </form>
            </>
          )}
        </div>

        {/* Footer Summary & WhatsApp Button */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-white/10 bg-[#070b19] space-y-3">
            <div className="space-y-1.5 text-xs text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-white">${subtotal} MXN</span>
              </div>
              <div className="flex justify-between">
                <span>Envío:</span>
                <span className="font-semibold text-cyan-400">
                  {deliveryType === 'domicilio' ? `$${deliveryFee} MXN` : 'Gratis (Para Recoger)'}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10 font-heading">
                <span>Total Estimado:</span>
                <span className="text-xl text-[#ff5722]">${total} MXN</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              className="w-full py-3.5 px-4 rounded-xl bg-[#25d366] hover:bg-[#20ba5a] text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#25d366]/20 active:scale-98 transition-all"
            >
              <Send className="w-4 h-4 text-black" />
              <span>Enviar Pedido por WhatsApp</span>
            </button>
            <p className="text-[10px] text-center text-gray-400">
              Se abrirá WhatsApp directamente con tu orden formateada.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
