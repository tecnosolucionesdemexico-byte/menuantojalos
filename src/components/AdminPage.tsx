import React, { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  Phone,
  DollarSign,
  Clock,
  Save,
  CheckCircle2,
  ArrowLeft,
  Download,
  AlertCircle,
  Eye,
  LogOut,
  Sliders,
  UtensilsCrossed,
  RotateCcw,
} from 'lucide-react';
import { BusinessConfig, DEFAULT_BUSINESS_CONFIG, MENU_ITEMS, MenuItem } from '../data/menuData';

interface AdminPageProps {
  config: BusinessConfig;
  onSaveConfig: (newConfig: BusinessConfig) => void;
  onBackToMenu: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ config, onSaveConfig, onBackToMenu }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('antojalos_admin_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'general' | 'horarios' | 'precios'>('general');

  // Form State
  const [formData, setFormData] = useState<BusinessConfig>({ ...config });
  const [menuList, setMenuList] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem('antojalos_custom_menu');
      return saved ? JSON.parse(saved) : MENU_ITEMS;
    } catch {
      return MENU_ITEMS;
    }
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setFormData({ ...config });
  }, [config]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'antojalos2024' || password === 'admin' || password === '1234') {
      setIsAuthenticated(true);
      sessionStorage.setItem('antojalos_admin_auth', 'true');
      setErrorMsg('');
    } else {
      setErrorMsg('Contraseña incorrecta. (Contraseña de acceso: antojalos2024)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('antojalos_admin_auth');
    setPassword('');
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    localStorage.setItem('antojalos_custom_menu', JSON.stringify(menuList));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handlePriceChange = (id: string, newPrice: number) => {
    setMenuList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, price: newPrice } : item))
    );
  };

  const handleResetMenuPrices = () => {
    if (window.confirm('¿Deseas restaurar todos los precios originales del menú?')) {
      setMenuList(MENU_ITEMS);
      localStorage.removeItem('antojalos_custom_menu');
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  const filteredMenuItems = menuList.filter((item) => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    return (
      item.name.toLowerCase().includes(q) ||
      item.categoryLabel.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  });

  // Not authenticated screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070b19] text-[#e0e1dd] flex flex-col items-center justify-center p-4 relative">
        <div className="ambient-glow-orange" />
        <div className="ambient-glow-cyan" />

        <div className="w-full max-w-md bg-[#0b132b] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 relative">
          <button
            onClick={onBackToMenu}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al menú</span>
          </button>

          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#ff5722] to-[#00b4d8] p-1 mx-auto mb-3 shadow-[0_0_20px_rgba(255,87,34,0.35)]">
              <div className="w-full h-full bg-[#070b19] rounded-xl flex items-center justify-center">
                <Lock className="w-7 h-7 text-[#ff5722]" />
              </div>
            </div>
            <h1 className="text-2xl font-black text-white font-heading">
              Panel Administrador
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Acceso exclusivo para el personal de {config.businessName}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                Contraseña de Administrador
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="w-full px-4 py-3 rounded-xl bg-[#121e3d] border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff5722] text-sm"
              />
              {errorMsg && (
                <p className="text-xs text-rose-400 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errorMsg}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff5722] to-[#ff7043] hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-[#ff5722]/30 transition-all"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-center text-[11px] text-gray-500">
            <span>Antó-Jalos • Panel de Control</span>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Dashboard
  return (
    <div className="min-h-screen bg-[#070b19] text-[#e0e1dd] pb-16 relative">
      <div className="ambient-glow-orange" />
      <div className="ambient-glow-cyan" />

      {/* Admin Top Navigation */}
      <header className="sticky top-0 z-30 bg-[#090f24]/90 backdrop-blur-md border-b border-white/10 px-4 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToMenu}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-xs text-gray-200 transition-colors border border-white/10"
            >
              <ArrowLeft className="w-4 h-4 text-[#00b4d8]" />
              <span>Ver Menú de Clientes</span>
            </button>
            <div className="hidden sm:block h-4 w-px bg-white/20" />
            <h1 className="text-sm sm:text-base font-bold text-white font-heading hidden sm:block">
              {config.businessName} • Panel Administrador
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 text-xs font-semibold transition-colors border border-rose-500/20"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 pt-6">
        {/* Banner with Status */}
        {saveSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-2 shadow-lg animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Los cambios han sido guardados exitosamente.</span>
          </div>
        )}

        {/* Tab Controls */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setActiveTab('general')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
              activeTab === 'general'
                ? 'bg-[#ff5722] text-white border-transparent shadow-lg shadow-[#ff5722]/30'
                : 'bg-[#121e3d] text-gray-300 border-white/10 hover:border-white/20'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Configuración y Pedidos</span>
          </button>
          <button
            onClick={() => setActiveTab('horarios')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
              activeTab === 'horarios'
                ? 'bg-[#ff5722] text-white border-transparent shadow-lg shadow-[#ff5722]/30'
                : 'bg-[#121e3d] text-gray-300 border-white/10 hover:border-white/20'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Horarios y Turnos</span>
          </button>
          <button
            onClick={() => setActiveTab('precios')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
              activeTab === 'precios'
                ? 'bg-[#ff5722] text-white border-transparent shadow-lg shadow-[#ff5722]/30'
                : 'bg-[#121e3d] text-gray-300 border-white/10 hover:border-white/20'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Precios del Menú ({menuList.length})</span>
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSaveAll} className="space-y-6">
          {/* TAB 1: GENERAL CONFIG */}
          {activeTab === 'general' && (
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white font-heading">
                  Datos de WhatsApp y Recepción de Pedidos
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Los pedidos generados en el menú digital se mandarán a este número.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* WhatsApp Phone */}
                <div>
                  <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5 mb-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Número de WhatsApp (con código de país)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.whatsappPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, whatsappPhone: e.target.value.replace(/\D/g, '') })
                    }
                    placeholder="524741342246"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121e3d] border border-white/15 text-white text-sm focus:outline-none focus:border-[#ff5722]"
                  />
                  <span className="text-[11px] text-gray-400 mt-1 block">
                    Ejemplo para México: <strong>524741342246</strong> (sin signos + ni espacios).
                  </span>
                </div>

                {/* Delivery Cost */}
                <div>
                  <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5 mb-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                    <span>Costo de Envío a Domicilio ($ MXN)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.deliveryCost}
                    onChange={(e) =>
                      setFormData({ ...formData, deliveryCost: Number(e.target.value) || 0 })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121e3d] border border-white/15 text-white text-sm focus:outline-none focus:border-[#ff5722]"
                  />
                  <span className="text-[11px] text-gray-400 mt-1 block">
                    Se sumará automáticamente cuando el cliente elija entrega a domicilio.
                  </span>
                </div>

                {/* Business Name */}
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                    Nombre del Negocio
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121e3d] border border-white/15 text-white text-sm focus:outline-none focus:border-[#ff5722]"
                  />
                </div>

                {/* Tagline */}
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                    Eslogan o Subtítulo
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121e3d] border border-white/15 text-white text-sm focus:outline-none focus:border-[#ff5722]"
                  />
                </div>
              </div>

              {/* Sync and Download helpers */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
                <a
                  href="/data/menu.json"
                  download="menu.json"
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-gray-300 hover:text-white flex items-center gap-1.5 border border-white/10 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#00b4d8]" />
                  <span>Descargar copia de menu.json</span>
                </a>
                <a
                  href="/data/config.json"
                  download="config.json"
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-gray-300 hover:text-white flex items-center gap-1.5 border border-white/10 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Descargar copia de config.json</span>
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: SCHEDULE CONFIG */}
          {activeTab === 'horarios' && (
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-white font-heading">
                    Horarios de Atención
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Configura si el negocio está abierto 24/7 o si respeta un horario automático.
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-[#0f1a38] p-2 rounded-xl border border-white/10">
                  <span className="text-xs font-semibold text-gray-300">Modo de Operación:</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        schedule: {
                          ...formData.schedule,
                          alwaysOpen: !formData.schedule.alwaysOpen,
                        },
                      })
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      formData.schedule.alwaysOpen
                        ? 'bg-emerald-500 text-black'
                        : 'bg-[#ff5722] text-white'
                    }`}
                  >
                    {formData.schedule.alwaysOpen ? 'Siempre Abierto (24/7)' : 'Horario Programado'}
                  </button>
                </div>
              </div>

              {/* Days Table */}
              <div className="space-y-3">
                {Object.entries(formData.schedule.days).map(([dayKey, day]) => (
                  <div
                    key={dayKey}
                    className="p-3.5 rounded-xl bg-[#121e3d]/70 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={day.enabled}
                        onChange={(e) => {
                          const updated = { ...formData.schedule.days };
                          updated[dayKey] = { ...day, enabled: e.target.checked };
                          setFormData({
                            ...formData,
                            schedule: { ...formData.schedule, days: updated },
                          });
                        }}
                        className="w-4 h-4 rounded text-[#ff5722] focus:ring-0"
                      />
                      <span className="text-sm font-bold text-white w-24">{day.name}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-gray-400">Apertura:</span>
                        <input
                          type="time"
                          value={day.start}
                          disabled={!day.enabled}
                          onChange={(e) => {
                            const updated = { ...formData.schedule.days };
                            updated[dayKey] = { ...day, start: e.target.value };
                            setFormData({
                              ...formData,
                              schedule: { ...formData.schedule, days: updated },
                            });
                          }}
                          className="px-2 py-1 rounded-lg bg-[#0b132b] border border-white/15 text-xs text-white disabled:opacity-40"
                        />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-gray-400">Cierre:</span>
                        <input
                          type="time"
                          value={day.end}
                          disabled={!day.enabled}
                          onChange={(e) => {
                            const updated = { ...formData.schedule.days };
                            updated[dayKey] = { ...day, end: e.target.value };
                            setFormData({
                              ...formData,
                              schedule: { ...formData.schedule, days: updated },
                            });
                          }}
                          className="px-2 py-1 rounded-lg bg-[#0b132b] border border-white/15 text-xs text-white disabled:opacity-40"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MENU PRICES */}
          {activeTab === 'precios' && (
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-white font-heading">
                    Gestión de Precios de Productos
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Modifica los precios de las alitas, boneless, paquetes y antojitos.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Filtrar producto..."
                    className="px-3 py-1.5 rounded-xl bg-[#121e3d] border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleResetMenuPrices}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors"
                    title="Restaurar precios iniciales"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredMenuItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-[#121e3d]/70 border border-white/10 flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 pr-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#00b4d8] block">
                        {item.categoryLabel}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-white font-heading leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-xs text-gray-400 font-bold">$</span>
                      <input
                        type="number"
                        min="0"
                        value={item.price}
                        onChange={(e) => handlePriceChange(item.id, Number(e.target.value) || 0)}
                        className="w-20 px-2.5 py-1.5 rounded-lg bg-[#0b132b] border border-white/15 text-white font-bold text-xs text-right focus:outline-none focus:border-[#ff5722]"
                      />
                      <span className="text-[10px] text-gray-400">MXN</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Save Bar */}
          <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-[#090f24]/95 backdrop-blur-md border border-white/15 shadow-2xl flex items-center justify-between gap-4">
            <span className="text-xs text-gray-300 hidden sm:inline">
              Recuerda hacer clic en "Guardar Todos los Cambios" para aplicar la configuración.
            </span>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff5722] via-[#ff7043] to-[#ff5722] hover:opacity-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#ff5722]/30 active:scale-98 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Todos los Cambios</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
