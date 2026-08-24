export interface Product {
  id: string;
  name: string;
  category: 'uniform' | 'notebooks' | 'stationery' | 'art_craft' | 'school_snack' | 'essentials' | string;
  categoryName: string;
  price: number;
  memberPrice: number;
  image: string;
  description: string;
  stock: number;
  department?: string;
  badge?: string;
  unit: string;
  options?: string[];
  specs?: { label: string; value: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOption?: string;
}

export type UserRole = 'student_voc' | 'student_dip' | 'teacher' | 'staff';

export interface UserProfile {
  id: string;
  fullName: string;
  role: UserRole;
  roleTitle: string;
  studentIdOrStaffId: string;
  department: string;
  phone: string;
  memberPoints: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  memberDiscount: number;
  couponDiscount: number;
  total: number;
  customer: {
    fullName: string;
    studentOrStaffId: string;
    department: string;
    role: string;
    phone: string;
    note?: string;
  };
  pickupLocation: string;
  pickupTimeSlot: string;
  paymentMethod: 'promptpay' | 'coop_wallet' | 'cash_on_pickup';
  paymentStatus: 'paid' | 'pending';
  orderStatus: 'preparing' | 'ready_for_pickup' | 'completed' | 'cancelled';
  createdAt: string;
  slipNumber: string;
}
