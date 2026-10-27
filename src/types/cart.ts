import { MenuItem } from '../data/menuData';

export interface CartItemOption {
  name: string;
  price: number;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  primaryFlavor?: string;
  secondaryFlavor?: string;
  selectedOption?: string; // e.g. 'Solo Alitas' or 'Solo Boneless'
  extras: CartItemOption[];
  notes?: string;
  unitPrice: number;
  totalPrice: number;
}

export interface CustomerOrderData {
  customerName: string;
  deliveryType: 'domicilio' | 'sucursal';
  address: string;
  paymentMethod: 'Efectivo' | 'Transferencia' | 'Tarjeta';
  cashAmount?: string;
  notes?: string;
}
