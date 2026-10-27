// Fallback Default Data in case server API is not available (Static Hosting)
const DEFAULT_CONFIG = {
  "businessName": "Antó-Jalos",
  "whatsappPhone": "524741342246",
  "facebook": "#Antó-Jalos",
  "deliveryCost": 30,
  "currency": "MXN",
  "schedule": {
    "alwaysOpen": true,
    "days": {
      "monday": {
        "enabled": true,
        "start": "18:00",
        "end": "23:30"
      },
      "tuesday": {
        "enabled": true,
        "start": "18:00",
        "end": "23:30"
      },
      "wednesday": {
        "enabled": true,
        "start": "18:00",
        "end": "23:30"
      },
      "thursday": {
        "enabled": true,
        "start": "18:00",
        "end": "23:30"
      },
      "friday": {
        "enabled": true,
        "start": "18:00",
        "end": "23:30"
      },
      "saturday": {
        "enabled": true,
        "start": "18:00",
        "end": "23:30"
      },
      "sunday": {
        "enabled": true,
        "start": "18:00",
        "end": "23:30"
      }
    }
  }
};

const DEFAULT_MENU_ITEMS = [
  {
    "id": "alitas-5-pz",
    "name": "Alitas (5 Piezas)",
    "description": "Orden de 5 piezas de alitas crujientes bañadas en tu salsa favorita.",
    "price": 85,
    "category": "alitas",
    "image": "",
    "modifiers": [
      {
        "id": "sabor",
        "name": "Sabor de salsa",
        "type": "select",
        "required": true,
        "options": [
          {
            "name": "Habanero (🔥🔥🔥🔥🔥)",
            "price": 0
          },
          {
            "name": "Mango habanero (🔥🔥🔥🔥🔥)",
            "price": 0
          },
          {
            "name": "Habanero cremoso (🔥🔥🔥🔥🔥)",
            "price": 0
          },
          {
            "name": "Taquis fuego (🔥🔥🔥🔥🔥)",
            "price": 0
          },
          {
            "name": "Tamarindo habanero (🔥🔥🔥🔥)",
            "price": 0
          },
          {
            "name": "BBQ Habanero (🔥🔥🔥🔥)",
            "price": 0
          },
          {
            "name": "Búfalo (🔥🔥🔥)",
            "price": 0
          },
          {
            "name": "Naranja Chipotle (🔥🔥🔥)",
            "price": 0
          },
          {
            "name": "Cheddar picoso (🔥🔥🔥)",
            "price": 0
          },
          {
            "name": "Jalapeño (🔥🔥🔥)",
            "price": 0
          },
          {
            "name": "Papas Adobadas (🔥🔥🔥)",
            "price": 0
          },
          {
            "name": "Lemon pepper (🔥🔥)",
            "price": 0
          },
          {
            "name": "BBQ Chipotle (🔥🔥)",
            "price": 0
          },
          {
            "name": "Tamarindo (🔥)",
            "price": 0
          },
          {
            "name": "BBQ (🔥)",
            "price": 0
          },
          {
            "name": "Mezcal (🔥)",
            "price": 0
          },
          {
            "name": "Cheddar (🔥)",
            "price": 0
          }
        ]
      },
      {
        "id": "extras",
        "name": "Extras",
        "type": "checkbox",
        "options": [
          {
            "name": "Dip extra (Salsa o Aderezo)",
            "price": 20
          },
          {
            "name": "Orden de papas adicional",
            "price": 45
          }
        ]
      }
    ]
  },
  {
    "id": "alitas-8-pz",
    "name": "Alitas (8 Piezas)",
    "description": "Orden de 8 piezas de alitas crujientes bañadas en tu salsa favorita.",
    "price": 115,
    "category": "alitas",
    "image": "",
    "modifiers": []
  },
  {
    "id": "alitas-10-pz",
    "name": "Alitas (10 Piezas)",
    "description": "Orden de 10 piezas de alitas crujientes bañadas en tu salsa favorita.",
    "price": 145,
    "category": "alitas",
    "image": "",
    "modifiers": []
  },
  {
    "id": "alitas-15-pz",
    "name": "Alitas (15 Piezas)",
    "description": "Orden de 15 piezas de alitas crujientes bañadas en tu salsa favorita.",
    "price": 185,
    "category": "alitas",
    "image": "",
    "modifiers": []
  },
  {
    "id": "alitas-20-pz",
    "name": "Alitas (20 Piezas)",
    "description": "Orden de 20 piezas de alitas crujientes bañadas en tu salsa favorita.",
    "price": 245,
    "category": "alitas",
    "image": "",
    "modifiers": []
  },
  {
    "id": "alitas-25-pz",
    "name": "Alitas (25 Piezas)",
    "description": "Orden de 25 piezas de alitas crujientes bañadas en tu salsa favorita.",
    "price": 295,
    "category": "alitas",
    "image": "",
    "modifiers": []
  },
  {
    "id": "alitas-30-pz",
    "name": "Alitas (30 Piezas)",
    "description": "Orden de 30 piezas de alitas crujientes bañadas en tu salsa favorita.",
    "price": 340,
    "category": "alitas",
    "image": "",
    "modifiers": []
  },
  {
    "id": "alitas-40-pz",
    "name": "Alitas (40 Piezas)",
    "description": "Orden de 40 piezas de alitas crujientes bañadas en tu salsa favorita.",
    "price": 435,
    "category": "alitas",
    "image": "",
    "modifiers": []
  },
  {
    "id": "alitas-50-pz",
    "name": "Alitas (50 Piezas)",
    "description": "Orden de 50 piezas de alitas crujientes bañadas en tu salsa favorita.",
    "price": 545,
    "category": "alitas",
    "image": "",
    "modifiers": []
  },
  {
    "id": "boneless-10-pz",
    "name": "Boneless (10 Piezas)",
    "description": "Orden de 10 piezas de boneless de pechuga de pollo marinados y empanizados.",
    "price": 120,
    "category": "boneless",
    "image": "",
    "modifiers": []
  },
  {
    "id": "boneless-15-pz",
    "name": "Boneless (15 Piezas)",
    "description": "Orden de 15 piezas de boneless de pechuga de pollo marinados y empanizados.",
    "price": 180,
    "category": "boneless",
    "image": "",
    "modifiers": []
  },
  {
    "id": "boneless-20-pz",
    "name": "Boneless (20 Piezas)",
    "description": "Orden de 20 piezas de boneless de pechuga de pollo marinados y empanizados.",
    "price": 240,
    "category": "boneless",
    "image": "",
    "modifiers": []
  },
  {
    "id": "boneless-25-pz",
    "name": "Boneless (25 Piezas)",
    "description": "Orden de 25 piezas de boneless de pechuga de pollo marinados y empanizados.",
    "price": 300,
    "category": "boneless",
    "image": "",
    "modifiers": []
  },
  {
    "id": "boneless-30-pz",
    "name": "Boneless (30 Piezas)",
    "description": "Orden de 30 piezas de boneless de pechuga de pollo marinados y empanizados.",
    "price": 360,
    "category": "boneless",
    "image": "",
    "modifiers": []
  },
  {
    "id": "boneless-40-pz",
    "name": "Boneless (40 Piezas)",
    "description": "Orden de 40 piezas de boneless de pechuga de pollo marinados y empanizados.",
    "price": 480,
    "category": "boneless",
    "image": "",
    "modifiers": []
  },
  {
    "id": "boneless-50-pz",
    "name": "Boneless (50 Piezas)",
    "description": "Orden de 50 piezas de boneless de pechuga de pollo marinados y empanizados.",
    "price": 600,
    "category": "boneless",
    "image": "",
    "modifiers": []
  },
  {
    "id": "paquete-1-minipack-a",
    "name": "1. MiniPack A",
    "description": "12 Alitas + Papas + Dip",
    "price": 200,
    "category": "paquetes",
    "image": "",
    "modifiers": []
  },
  {
    "id": "paquete-2-minipack-b",
    "name": "2. MiniPack B",
    "description": "12 Boneless + Papas + Dip",
    "price": 249,
    "category": "paquetes",
    "image": "",
    "modifiers": []
  },
  {
    "id": "paquete-3-bigpack",
    "name": "3. BigPack",
    "description": "12 Alitas + 12 Boneless + Papas + Dip + 2 Catsup",
    "price": 310,
    "category": "paquetes",
    "image": "",
    "modifiers": []
  },
  {
    "id": "paquete-4-bigpack-solo",
    "name": "4. BigPack (Solo Alitas o Boneless)",
    "description": "Solo Alitas o Boneless + Papas + Dip + 2 Catsup",
    "price": 350,
    "category": "paquetes",
    "image": "",
    "modifiers": []
  },
  {
    "id": "paquete-5-pollitopack",
    "name": "5. PollitoPack",
    "description": "10 Alitas + 10 Boneless + 10 Nuggets + 10 Palomitas + Salchichas + Papas + Dip + 2 Catsup",
    "price": 350,
    "category": "paquetes",
    "image": "",
    "modifiers": []
  },
  {
    "id": "paquete-6-pollitopack-solo",
    "name": "6. PollitoPack (Solo Alitas o Boneless)",
    "description": "Solo Alitas o Boneless (20 pz) + 10 Nuggets + 10 Palomitas + Salchichas + Papas + Dip + 2 Catsup",
    "price": 420,
    "category": "paquetes",
    "image": "",
    "modifiers": []
  },
  {
    "id": "paquete-7-megapack",
    "name": "7. Mega Pack",
    "description": "20 Alitas + 20 Boneless + 6 Dedos + 10 Nuggets + Papas + 2 Dip + 2 Catsup",
    "price": 625,
    "category": "paquetes",
    "image": "",
    "modifiers": []
  },
  {
    "id": "paquete-8-megapack-solo",
    "name": "8. Mega Pack (Solo Alitas o Boneless)",
    "description": "Solo Alitas o Boneless (40 pz) + 6 Dedos + 10 Nuggets + Papas + 2 Dip + 2 Catsup",
    "price": 675,
    "category": "paquetes",
    "image": "",
    "modifiers": []
  },
  {
    "id": "botanero-palomitas",
    "name": "Palomitas de pollo (~25 pz)",
    "description": "Aproximadamente 25 piezas crujientes de palomitas de pollo.",
    "price": 75,
    "category": "botaneros",
    "image": "",
    "modifiers": []
  },
  {
    "id": "botanero-nuggets",
    "name": "Nugget (6 pz) + Papas",
    "description": "6 nuggets dorados con porción de papas a la francesa.",
    "price": 85,
    "category": "botaneros",
    "image": "",
    "modifiers": []
  },
  {
    "id": "botanero-dedos-queso",
    "name": "Dedos de queso (6 pz)",
    "description": "6 piezas de dedos de queso mozzarella crujientes y fundidos.",
    "price": 90,
    "category": "botaneros",
    "image": "",
    "modifiers": []
  },
  {
    "id": "botanero-salchichas",
    "name": "Salchichas (~25 pz)",
    "description": "Aproximadamente 25 piezas de salchichas botaneras preparadas.",
    "price": 68,
    "category": "botaneros",
    "image": "",
    "modifiers": []
  },
  {
    "id": "papas-sencillas",
    "name": "Sencillas (a la francesa)",
    "description": "Orden de papas a la francesa clásicas crujientes y sazonadas.",
    "price": 65,
    "category": "papas",
    "image": "",
    "modifiers": []
  },
  {
    "id": "papas-salchipapas",
    "name": "Salchipapas (Papas + Salchicha)",
    "description": "Papas a la francesa doraditas con rodajas de salchicha.",
    "price": 75,
    "category": "papas",
    "image": "",
    "modifiers": []
  },
  {
    "id": "papas-especial",
    "name": "Antoja-Papa Especial (Papas + Palomitas + Salchicha)",
    "description": "Papas a la francesa con palomitas de pollo y salchicha.",
    "price": 85,
    "category": "papas",
    "image": "",
    "modifiers": []
  },
  {
    "id": "papas-boneless-especial",
    "name": "Antoja-Papa Boneless Especial (Papas + 6 Boneless)",
    "description": "Papas a la francesa servidas con 6 piezas de boneless en tu salsa favorita.",
    "price": 115,
    "category": "papas",
    "image": "",
    "modifiers": []
  },
  {
    "id": "papas-alita-especial",
    "name": "Antoja-Papa Alita Especial (Papas + 4 Alitas)",
    "description": "Papas a la francesa acompañadas con 4 piezas de alitas bañadas en tu salsa favorita.",
    "price": 115,
    "category": "papas",
    "image": "",
    "modifiers": []
  },
  {
    "id": "papas-pollito-mix",
    "name": "Antoja-Papa Pollito Mix (Papas + 3 Alitas + 4 Boneless)",
    "description": "Papas a la francesa con 3 alitas y 4 boneless bañados en tus salsas preferidas.",
    "price": 145,
    "category": "papas",
    "image": "",
    "modifiers": []
  }
];
