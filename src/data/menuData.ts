export interface SauceFlavor {
  id: string;
  name: string;
  spiceLevel: number; // 1 to 5
  description?: string;
  isPopular?: boolean;
}

export interface ModifierOption {
  name: string;
  price: number;
}

export interface Modifier {
  id: string;
  name: string;
  type: 'select' | 'checkbox';
  required?: boolean;
  options: ModifierOption[];
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'alitas' | 'boneless' | 'paquetes' | 'botaneros' | 'papas';
  categoryLabel: string;
  description: string;
  price: number;
  image?: string;
  badge?: string;
  popular?: boolean;
  requiresFlavor?: boolean;
  allowTwoFlavors?: boolean;
  modifiers?: Modifier[];
}

export interface CategoryInfo {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  tagline: string;
}

export interface BusinessConfig {
  businessName: string;
  tagline: string;
  whatsappPhone: string;
  facebookUrl: string;
  facebookHandle: string;
  deliveryCost: number;
  freeDeliveryThreshold?: number;
  currency: string;
  schedule: {
    alwaysOpen: boolean;
    days: Record<string, { enabled: boolean; start: string; end: string; name: string }>;
  };
}

export const SAUCE_FLAVORS: SauceFlavor[] = [
  { id: 'habanero', name: 'Habanero', spiceLevel: 5, description: 'Picante extremo con el auténtico toque yucateco' },
  { id: 'mango_habanero', name: 'Mango Habanero', spiceLevel: 5, isPopular: true, description: 'Dulce tropical con un golpe explosivo de habanero' },
  { id: 'habanero_cremoso', name: 'Habanero Cremoso', spiceLevel: 5, description: 'Textura suave y cremosa con toda la potencia del habanero' },
  { id: 'taquis_fuego', name: 'Taquis Fuego', spiceLevel: 5, isPopular: true, description: 'Intenso sabor a chile y limón al estilo taquis fuego' },
  { id: 'tamarindo_habanero', name: 'Tamarindo Habanero', spiceLevel: 4, isPopular: true, description: 'Equilibrio agridulce con picor pronunciado' },
  { id: 'bbq_habanero', name: 'BBQ Habanero', spiceLevel: 4, description: 'Ahumado tradicional con flama de habanero' },
  { id: 'bufalo', name: 'Búfalo', spiceLevel: 3, isPopular: true, description: 'La receta clásica picante y ácida estilo americano' },
  { id: 'naranja_chipotle', name: 'Naranja Chipotle', spiceLevel: 3, description: 'Toque cítrico agridulce combinado con chipotle ahumado' },
  { id: 'cheddar_picoso', name: 'Cheddar Picoso', spiceLevel: 3, description: 'Queso fundido con especias y picante medio' },
  { id: 'jalapeno', name: 'Jalapeño', spiceLevel: 3, description: 'El clásico picor mexicano fresco y herbal' },
  { id: 'papas_adobadas', name: 'Papas Adobadas', spiceLevel: 3, description: 'Sabor adobado especial con notas de especias mexicanas' },
  { id: 'lemon_pepper', name: 'Lemon Pepper', spiceLevel: 2, isPopular: true, description: 'Cítrico refrescante de limón con toque de pimienta negra' },
  { id: 'bbq_chipotle', name: 'BBQ Chipotle', spiceLevel: 2, description: 'Salsa barbacoa dulce con notas rústicas de chipotle' },
  { id: 'tamarindo', name: 'Tamarindo', spiceLevel: 1, description: 'Sabor agridulce artesanal, ideal para los que buscan poco picante' },
  { id: 'bbq', name: 'BBQ Clásica', spiceLevel: 1, isPopular: true, description: 'Dulce, ahumada y espesa con sabor tradicional' },
  { id: 'mezcal', name: 'Mezcal', spiceLevel: 1, description: 'Notas tostadas y acarameladas inspiradas en mezcal artesanal' },
  { id: 'cheddar', name: 'Cheddar', spiceLevel: 1, description: 'Cremoso y suave baño de queso cheddar' },
];

export const CATEGORIES: CategoryInfo[] = [
  { id: 'all', name: 'Todo el Menú', shortName: 'Todo', icon: 'grid', tagline: 'Explora todos los antojitos disponibles' },
  { id: 'alitas', name: '#ANTOJ-ALITAS', shortName: 'Alitas', icon: 'flame', tagline: 'Alitas crujientes bañadas en tu salsa favorita' },
  { id: 'boneless', name: 'BONELESS', shortName: 'Boneless', icon: 'drumstick', tagline: 'Jugosos trozos de pechuga 100% de pollo' },
  { id: 'paquetes', name: '#PAQUETE-ANTOJES', shortName: 'Paquetes', icon: 'package', tagline: 'Charolas y combos perfectos para compartir' },
  { id: 'botaneros', name: '#ANTOJOSOS BOTANEROS', shortName: 'Botaneros', icon: 'sparkles', tagline: 'Palomitas, nuggets, salchichas y deditos' },
  { id: 'papas', name: '#ANTOJA-PAPAS', shortName: 'Papas', icon: 'french-fries', tagline: 'Papas sazonadas con toppings especiales' },
];

export const COMMON_EXTRAS: Modifier = {
  id: 'extras_adicionales',
  name: 'Extras Opcionales',
  type: 'checkbox',
  options: [
    { name: 'Dip extra (Salsa o Aderezo)', price: 20 },
    { name: 'Orden de papas adicional', price: 45 },
  ],
};

export const MENU_ITEMS: MenuItem[] = [
  // ==========================================
  // #ANTOJ-ALITAS
  // ==========================================
  {
    id: 'alitas-5-pz',
    name: 'Alitas (5 Piezas)',
    category: 'alitas',
    categoryLabel: '#ANTOJ-ALITAS',
    price: 85,
    description: 'Orden de 5 piezas de alitas crujientes bañadas en tu salsa o sabor preferido.',
    requiresFlavor: true,
    badge: '5 Pz',
    modifiers: [COMMON_EXTRAS],
  },
  {
    id: 'alitas-8-pz',
    name: 'Alitas (8 Piezas)',
    category: 'alitas',
    categoryLabel: '#ANTOJ-ALITAS',
    price: 115,
    description: 'Orden de 8 piezas de alitas crujientes bañadas en tu salsa o sabor preferido.',
    requiresFlavor: true,
    badge: '8 Pz',
    modifiers: [COMMON_EXTRAS],
  },
  {
    id: 'alitas-10-pz',
    name: 'Alitas (10 Piezas)',
    category: 'alitas',
    categoryLabel: '#ANTOJ-ALITAS',
    price: 145,
    popular: true,
    description: 'Orden de 10 piezas de alitas crujientes bañadas en tu salsa o sabor preferido.',
    requiresFlavor: true,
    badge: 'Más Vendido',
    modifiers: [COMMON_EXTRAS],
  },
  {
    id: 'alitas-15-pz',
    name: 'Alitas (15 Piezas)',
    category: 'alitas',
    categoryLabel: '#ANTOJ-ALITAS',
    price: 185,
    description: 'Orden de 15 piezas de alitas crujientes bañadas en tu salsa o sabor preferido.',
    requiresFlavor: true,
    allowTwoFlavors: true,
    badge: '15 Pz',
    modifiers: [COMMON_EXTRAS],
  },
  {
    id: 'alitas-20-pz',
    name: 'Alitas (20 Piezas)',
    category: 'alitas',
    categoryLabel: '#ANTOJ-ALITAS',
    price: 245,
    popular: true,
    description: 'Orden de 20 piezas de alitas crujientes bañadas en tu salsa o sabor preferido.',
    requiresFlavor: true,
    allowTwoFlavors: true,
    badge: '20 Pz',
    modifiers: [COMMON_EXTRAS],
  },
  {
    id: 'alitas-25-pz',
    name: 'Alitas (25 Piezas)',
    category: 'alitas',
    categoryLabel: '#ANTOJ-ALITAS',
    price: 295,
    description: 'Orden de 25 piezas de alitas crujientes bañadas en tu salsa o sabor preferido.',
    requiresFlavor: true,
    allowTwoFlavors: true,
    badge: '25 Pz',
    modifiers: [COMMON_EXTRAS],
  },
  {
    id: 'alitas-30-pz',
    name: 'Alitas (30 Piezas)',
    category: 'alitas',
    categoryLabel: '#ANTOJ-ALITAS',
    price: 340,
    description: 'Orden de 30 piezas de alitas crujientes bañadas en tu salsa o sabor preferido.',
    requiresFlavor: true,
    allowTwoFlavors: true,
    badge: '30 Pz',
    modifiers: [COMMON_EXTRAS],
  },
  {
    id: 'alitas-40-pz',
    name: 'Alitas (40 Piezas)',
    category: 'alitas',
    categoryLabel: '#ANTOJ-ALITAS',
    price: 435,
    description: 'Orden de 40 piezas de alitas crujientes bañadas en tu salsa o sabor preferido.',
    requiresFlavor: true,
    allowTwoFlavors: true,
    badge: '40 Pz',
    modifiers: [COMMON_EXTRAS],
  },
  {
    id: 'alitas-50-pz',
    name: 'Alitas (50 Piezas)',
    category: 'alitas',
    categoryLabel: '#ANTOJ-ALITAS',
    price: 545,
    description: 'Megabox de 50 piezas de alitas crujientes bañadas en tu salsa o sabor preferido.',
    requiresFlavor: true,
    allowTwoFlavors: true,
    badge: '50 Pz Mega',
    modifiers: [COMMON_EXTRAS],
  },

  // ==========================================
  // BONELESS
  // ==========================================
  {
    id: 'boneless-10-pz',
    name: 'Boneless (10 Piezas)',
    category: 'boneless',
    categoryLabel: 'BONELESS',
    price: 120,
    popular: true,
    description: 'Orden de 10 piezas de boneless de pechuga de pollo marinados y empanizados.',
    requiresFlavor: true,
    badge: '10 Pz',
    modifiers: [COMMON_EXTRAS],
  },
  {
    id: 'boneless-15-pz',
    name: 'Boneless (15 Piezas)',
    category: 'boneless',
    categoryLabel: 'BONELESS',
    price: 180,
    description: 'Orden de 15 piezas de boneless de pechuga de pollo marinados y empanizados.',
    requiresFlavor: true,
    allowTwoFlavors: true,
    badge: '15 Pz',
    modifiers: [COMMON_EXTRAS],
  },
  {
    id: 'boneless-20-pz',
    name: 'Boneless (20 Piezas)',
    category: 'boneless',
    categoryLabel: 'BONELESS',
    price: 240,
    popular: true,
    description: 'Orden de 20 piezas de boneless de pechuga de pollo marinados y empanizados.',
    requiresFlavor: true,
    allowTwoFlavors: true,
    badge: 'Más Pedido',
    modifiers: [COMMON_EXTRAS],
  },
  {
    id: 'boneless-25-pz',
    name: 'Boneless (25 Piezas)',
    category: 'boneless',
    categoryLabel: 'BONELESS',
    price: 300,
    description: 'Orden de 25 piezas de boneless de pechuga de pollo marinados y empanizados.',
    requiresFlavor: true,
    allowTwoFlavors: true,
    badge: '25 Pz',
    modifiers: [COMMON_EXTRAS],
  },
  {
    id: 'boneless-30-pz',
    name: 'Boneless (30 Piezas)',
    category: 'boneless',
    categoryLabel: 'BONELESS',
    price: 360,
    description: 'Orden de 30 piezas de boneless de pechuga de pollo marinados y empanizados.',
    requiresFlavor: true,
    allowTwoFlavors: true,
    badge: '30 Pz',
    modifiers: [COMMON_EXTRAS],
  },
  {
    id: 'boneless-40-pz',
    name: 'Boneless (40 Piezas)',
    category: 'boneless',
    categoryLabel: 'BONELESS',
    price: 480,
    description: 'Orden de 40 piezas de boneless de pechuga de pollo marinados y empanizados.',
    requiresFlavor: true,
    allowTwoFlavors: true,
    badge: '40 Pz',
    modifiers: [COMMON_EXTRAS],
  },
  {
    id: 'boneless-50-pz',
    name: 'Boneless (50 Piezas)',
    category: 'boneless',
    categoryLabel: 'BONELESS',
    price: 600,
    description: 'Megabox de 50 piezas de boneless de pechuga de pollo con tus salsas favoritas.',
    requiresFlavor: true,
    allowTwoFlavors: true,
    badge: '50 Pz Mega',
    modifiers: [COMMON_EXTRAS],
  },

  // ==========================================
  // #PAQUETE-ANTOJES
  // ==========================================
  {
    id: 'paquete-1-minipack-a',
    name: '1. MiniPack A',
    category: 'paquetes',
    categoryLabel: '#PAQUETE-ANTOJES',
    price: 200,
    description: '12 Alitas + Papas + Dip.',
    requiresFlavor: true,
    badge: 'Pack 1',
    modifiers: [
      {
        id: 'dip_extra',
        name: 'Adicionales',
        type: 'checkbox',
        options: [
          { name: 'Dip extra (Salsa o Aderezo)', price: 20 },
          { name: 'Orden de papas adicional', price: 45 },
        ],
      },
    ],
  },
  {
    id: 'paquete-2-minipack-b',
    name: '2. MiniPack B',
    category: 'paquetes',
    categoryLabel: '#PAQUETE-ANTOJES',
    price: 249,
    description: '12 Boneless + Papas + Dip.',
    requiresFlavor: true,
    badge: 'Pack 2',
    modifiers: [
      {
        id: 'dip_extra',
        name: 'Adicionales',
        type: 'checkbox',
        options: [
          { name: 'Dip extra (Salsa o Aderezo)', price: 20 },
          { name: 'Orden de papas adicional', price: 45 },
        ],
      },
    ],
  },
  {
    id: 'paquete-3-bigpack',
    name: '3. BigPack (Alitas + Boneless)',
    category: 'paquetes',
    categoryLabel: '#PAQUETE-ANTOJES',
    price: 310,
    popular: true,
    description: '12 Alitas + 12 Boneless + Papas + Dip + 2 Catsup.',
    requiresFlavor: true,
    allowTwoFlavors: true,
    badge: 'Pack 3 • Favorito',
    modifiers: [
      {
        id: 'dip_extra',
        name: 'Adicionales',
        type: 'checkbox',
        options: [
          { name: 'Dip extra (Salsa o Aderezo)', price: 20 },
          { name: 'Orden de papas adicional', price: 45 },
        ],
      },
    ],
  },
  {
    id: 'paquete-4-bigpack-solo',
    name: '4. BigPack (Solo Alitas o Boneless)',
    category: 'paquetes',
    categoryLabel: '#PAQUETE-ANTOJES',
    price: 350,
    description: 'Solo Alitas o Boneless + Papas + Dip + 2 Catsup.',
    requiresFlavor: true,
    badge: 'Pack 4',
    modifiers: [
      {
        id: 'tipo_carne',
        name: 'Elige tu especialidad (Requerido)',
        type: 'select',
        required: true,
        options: [
          { name: 'Solo Alitas (24 pz)', price: 0 },
          { name: 'Solo Boneless (24 pz)', price: 0 },
        ],
      },
      {
        id: 'dip_extra',
        name: 'Adicionales',
        type: 'checkbox',
        options: [
          { name: 'Dip extra (Salsa o Aderezo)', price: 20 },
          { name: 'Orden de papas adicional', price: 45 },
        ],
      },
    ],
  },
  {
    id: 'paquete-5-pollitopack',
    name: '5. PollitoPack',
    category: 'paquetes',
    categoryLabel: '#PAQUETE-ANTOJES',
    price: 350,
    popular: true,
    description: '10 Alitas + 10 Boneless + 10 Nuggets + 10 Palomitas + Salchichas + Papas + Dip + 2 Catsup.',
    requiresFlavor: true,
    allowTwoFlavors: true,
    badge: 'Pack 5 • Surtido',
    modifiers: [
      {
        id: 'dip_extra',
        name: 'Adicionales',
        type: 'checkbox',
        options: [
          { name: 'Dip extra (Salsa o Aderezo)', price: 20 },
          { name: 'Orden de papas adicional', price: 45 },
        ],
      },
    ],
  },
  {
    id: 'paquete-6-pollitopack-solo',
    name: '6. PollitoPack (Solo Alitas o Boneless)',
    category: 'paquetes',
    categoryLabel: '#PAQUETE-ANTOJES',
    price: 420,
    description: 'Solo Alitas o Boneless (20 pz) + 10 Nuggets + 10 Palomitas + Salchichas + Papas + Dip + 2 Catsup.',
    requiresFlavor: true,
    badge: 'Pack 6',
    modifiers: [
      {
        id: 'tipo_carne',
        name: 'Elige tu especialidad (Requerido)',
        type: 'select',
        required: true,
        options: [
          { name: 'Solo Alitas (20 pz)', price: 0 },
          { name: 'Solo Boneless (20 pz)', price: 0 },
        ],
      },
      {
        id: 'dip_extra',
        name: 'Adicionales',
        type: 'checkbox',
        options: [
          { name: 'Dip extra (Salsa o Aderezo)', price: 20 },
          { name: 'Orden de papas adicional', price: 45 },
        ],
      },
    ],
  },
  {
    id: 'paquete-7-megapack',
    name: '7. Mega Pack',
    category: 'paquetes',
    categoryLabel: '#PAQUETE-ANTOJES',
    price: 625,
    popular: true,
    description: '20 Alitas + 20 Boneless + 6 Dedos + 10 Nuggets + Papas + 2 Dip + 2 Catsup.',
    requiresFlavor: true,
    allowTwoFlavors: true,
    badge: 'Pack 7 • Mega Charola',
    modifiers: [
      {
        id: 'dip_extra',
        name: 'Adicionales',
        type: 'checkbox',
        options: [
          { name: 'Dip extra (Salsa o Aderezo)', price: 20 },
          { name: 'Orden de papas adicional', price: 45 },
        ],
      },
    ],
  },
  {
    id: 'paquete-8-megapack-solo',
    name: '8. Mega Pack (Solo Alitas o Boneless)',
    category: 'paquetes',
    categoryLabel: '#PAQUETE-ANTOJES',
    price: 675,
    description: 'Solo Alitas o Boneless (40 pz) + 6 Dedos + 10 Nuggets + Papas + 2 Dip + 2 Catsup.',
    requiresFlavor: true,
    badge: 'Pack 8 • Mega Total',
    modifiers: [
      {
        id: 'tipo_carne',
        name: 'Elige tu especialidad (Requerido)',
        type: 'select',
        required: true,
        options: [
          { name: 'Solo Alitas (40 pz)', price: 0 },
          { name: 'Solo Boneless (40 pz)', price: 0 },
        ],
      },
      {
        id: 'dip_extra',
        name: 'Adicionales',
        type: 'checkbox',
        options: [
          { name: 'Dip extra (Salsa o Aderezo)', price: 20 },
          { name: 'Orden de papas adicional', price: 45 },
        ],
      },
    ],
  },

  // ==========================================
  // #ANTOJOSOS BOTANEROS
  // ==========================================
  {
    id: 'botanero-palomitas',
    name: 'Palomitas de pollo (~25 pz)',
    category: 'botaneros',
    categoryLabel: '#ANTOJOSOS BOTANEROS',
    price: 75,
    description: 'Aproximadamente 25 piezas de crujientes bocados de pechuga de pollo sazonada.',
    badge: '~25 Pz',
    modifiers: [
      {
        id: 'sabor_opcional',
        name: '¿Deseas bañarlas en salsa?',
        type: 'select',
        options: [
          { name: 'Naturales (sin salsa)', price: 0 },
          { name: 'Bañadas en salsa de tu elección', price: 0 },
        ],
      },
      COMMON_EXTRAS,
    ],
  },
  {
    id: 'botanero-nuggets',
    name: 'Nugget (6 pz) + Papas',
    category: 'botaneros',
    categoryLabel: '#ANTOJOSOS BOTANEROS',
    price: 85,
    description: '6 piezas de nuggets de pollo dorados acompañados con papas a la francesa.',
    badge: '6 pz + Papas',
    modifiers: [COMMON_EXTRAS],
  },
  {
    id: 'botanero-dedos-queso',
    name: 'Dedos de queso (6 pz)',
    category: 'botaneros',
    categoryLabel: '#ANTOJOSOS BOTANEROS',
    price: 90,
    popular: true,
    description: '6 deliciosos dedos de queso mozzarella empanizados y crujientes por fuera y fundidos por dentro.',
    badge: '6 Pz',
    modifiers: [COMMON_EXTRAS],
  },
  {
    id: 'botanero-salchichas',
    name: 'Salchichas (~25 pz)',
    category: 'botaneros',
    categoryLabel: '#ANTOJOSOS BOTANEROS',
    price: 68,
    description: 'Aproximadamente 25 piezas de salchichas botaneras preparadas al gusto.',
    badge: '~25 Pz',
    modifiers: [COMMON_EXTRAS],
  },

  // ==========================================
  // #ANTOJA-PAPAS
  // ==========================================
  {
    id: 'papas-sencillas',
    name: 'Sencillas (a la francesa)',
    category: 'papas',
    categoryLabel: '#ANTOJA-PAPAS',
    price: 65,
    description: 'Orden de papas clásicas a la francesa bien doraditas y con sazón especial.',
    badge: 'Clásicas',
    modifiers: [
      {
        id: 'dip_extra',
        name: 'Dip adicional',
        type: 'checkbox',
        options: [
          { name: 'Dip extra (Salsa o Aderezo)', price: 20 },
        ],
      },
    ],
  },
  {
    id: 'papas-salchipapas',
    name: 'Salchipapas (Papas + Salchicha)',
    category: 'papas',
    categoryLabel: '#ANTOJA-PAPAS',
    price: 75,
    popular: true,
    description: 'La combinación favorita: papas a la francesa con rodajas de salchicha dorada.',
    badge: 'Popular',
    modifiers: [
      {
        id: 'dip_extra',
        name: 'Dip adicional',
        type: 'checkbox',
        options: [
          { name: 'Dip extra (Salsa o Aderezo)', price: 20 },
        ],
      },
    ],
  },
  {
    id: 'papas-especial',
    name: 'Antoja-Papa Especial (Papas + Palomitas + Salchicha)',
    category: 'papas',
    categoryLabel: '#ANTOJA-PAPAS',
    price: 85,
    description: 'Papas a la francesa acompañadas con ricas palomitas de pollo y salchicha.',
    badge: 'Especial',
    modifiers: [
      {
        id: 'dip_extra',
        name: 'Dip adicional',
        type: 'checkbox',
        options: [
          { name: 'Dip extra (Salsa o Aderezo)', price: 20 },
        ],
      },
    ],
  },
  {
    id: 'papas-boneless-especial',
    name: 'Antoja-Papa Boneless Especial (Papas + 6 Boneless)',
    category: 'papas',
    categoryLabel: '#ANTOJA-PAPAS',
    price: 115,
    popular: true,
    description: 'Papas a la francesa cubiertas con 6 jugosos trozos de boneless en tu salsa favorita.',
    requiresFlavor: true,
    badge: 'Top Seller',
    modifiers: [
      {
        id: 'dip_extra',
        name: 'Dip adicional',
        type: 'checkbox',
        options: [
          { name: 'Dip extra (Salsa o Aderezo)', price: 20 },
        ],
      },
    ],
  },
  {
    id: 'papas-alita-especial',
    name: 'Antoja-Papa Alita Especial (Papas + 4 Alitas)',
    category: 'papas',
    categoryLabel: '#ANTOJA-PAPAS',
    price: 115,
    description: 'Papas a la francesa acompañadas con 4 crujientes alitas bañadas en tu salsa favorita.',
    requiresFlavor: true,
    badge: 'Alitas Lover',
    modifiers: [
      {
        id: 'dip_extra',
        name: 'Dip adicional',
        type: 'checkbox',
        options: [
          { name: 'Dip extra (Salsa o Aderezo)', price: 20 },
        ],
      },
    ],
  },
  {
    id: 'papas-pollito-mix',
    name: 'Antoja-Papa Pollito Mix (Papas + 3 Alitas + 4 Boneless)',
    category: 'papas',
    categoryLabel: '#ANTOJA-PAPAS',
    price: 145,
    popular: true,
    description: 'El combo definitivo: porción de papas + 3 alitas + 4 piezas de boneless en tu salsa favorita.',
    requiresFlavor: true,
    allowTwoFlavors: true,
    badge: 'Mega Mix',
    modifiers: [
      {
        id: 'dip_extra',
        name: 'Dip adicional',
        type: 'checkbox',
        options: [
          { name: 'Dip extra (Salsa o Aderezo)', price: 20 },
        ],
      },
    ],
  },
];

export const DEFAULT_BUSINESS_CONFIG: BusinessConfig = {
  businessName: 'Antó-Jalos',
  tagline: 'Tradición en cada bocado',
  whatsappPhone: '524741342246',
  facebookUrl: 'https://www.facebook.com/search/top?q=ant%C3%B3-jalos',
  facebookHandle: '#Antó-Jalos',
  deliveryCost: 30,
  freeDeliveryThreshold: 0,
  currency: 'MXN',
  schedule: {
    alwaysOpen: true, // as configured in repo
    days: {
      monday: { enabled: true, start: '18:00', end: '23:30', name: 'Lunes' },
      tuesday: { enabled: true, start: '18:00', end: '23:30', name: 'Martes' },
      wednesday: { enabled: true, start: '18:00', end: '23:30', name: 'Miércoles' },
      thursday: { enabled: true, start: '18:00', end: '23:30', name: 'Jueves' },
      friday: { enabled: true, start: '18:00', end: '23:30', name: 'Viernes' },
      saturday: { enabled: true, start: '18:00', end: '23:30', name: 'Sábado' },
      sunday: { enabled: true, start: '18:00', end: '23:30', name: 'Domingo' },
    },
  },
};
