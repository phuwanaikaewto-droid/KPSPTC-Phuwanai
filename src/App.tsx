/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Banner } from './components/Banner';
import { BentoShowcase } from './components/BentoShowcase';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ReceiptModal } from './components/ReceiptModal';
import { CreatorProfile } from './components/CreatorProfile';
import { OrderHistoryView } from './components/OrderHistoryView';
import { INITIAL_PRODUCTS } from './data/products';
import { CartItem, Order, Product, UserProfile, UserRole } from './types';
import { ShoppingBag, Sparkles, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<'shop' | 'creator' | 'orders'>('shop');

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeReceiptOrder, setActiveReceiptOrder] = useState<Order | null>(null);

  // User Profile Role
  const [userRole, setUserRole] = useState<UserRole>('student_dip');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'user-001',
    fullName: 'ภูวนัย แก้วโต (นักศึกษา)',
    role: 'student_dip',
    roleTitle: 'นักศึกษา ปวส. เทคโนโลยีธุรกิจดิจิทัล',
    studentIdOrStaffId: '66309010028',
    department: 'เทคโนโลยีธุรกิจดิจิทัล',
    phone: '082-456-7890',
    memberPoints: 120,
  });

  // Handle role changes
  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    if (role === 'student_voc') {
      setUserProfile({
        id: 'user-002',
        fullName: 'สมชาย ใจช่าง (นักเรียน ปวช.)',
        role: 'student_voc',
        roleTitle: 'นักเรียน ปวช. ช่างยนต์',
        studentIdOrStaffId: '67201010015',
        department: 'ช่างยนต์',
        phone: '081-234-5678',
        memberPoints: 60,
      });
    } else if (role === 'student_dip') {
      setUserProfile({
        id: 'user-001',
        fullName: 'ภูวนัย แก้วโต (นักศึกษา ปวส.)',
        role: 'student_dip',
        roleTitle: 'นักศึกษา ปวส. เทคโนโลยีธุรกิจดิจิทัล',
        studentIdOrStaffId: '66309010028',
        department: 'เทคโนโลยีธุรกิจดิจิทัล',
        phone: '082-456-7890',
        memberPoints: 120,
      });
    } else if (role === 'teacher') {
      setUserProfile({
        id: 'user-003',
        fullName: 'อ.เกรียงศักดิ์ สอนดี (อาจารย์ประจำแผนก)',
        role: 'teacher',
        roleTitle: 'ครู / อาจารย์ประจำแผนก',
        studentIdOrStaffId: 'T-88021',
        department: 'เทคโนโลยีธุรกิจดิจิทัล',
        phone: '089-876-5432',
        memberPoints: 350,
      });
    } else {
      setUserProfile({
        id: 'user-004',
        fullName: 'น.ส.วิภาดา งานสารบรรณ (เจ้าหน้าที่)',
        role: 'staff',
        roleTitle: 'เจ้าหน้าที่ / บุคลากรทางการศึกษา',
        studentIdOrStaffId: 'ST-9004',
        department: 'ครูและบุคลากรทางการศึกษา',
        phone: '084-555-1234',
        memberPoints: 200,
      });
    }
  };

  // Cart State with LocalStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kptc_coop_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders History State with LocalStorage
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('kptc_coop_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Seed an initial sample order for realistic experience
    return [
      {
        id: 'ord-seed-01',
        orderNumber: 'KPTC-20260824-0018',
        items: [
          {
            product: INITIAL_PRODUCTS[0],
            quantity: 1,
            selectedOption: 'เบอร์ 40 (รอบอก 40")',
          },
          {
            product: INITIAL_PRODUCTS[6],
            quantity: 2,
            selectedOption: 'เส้นเดี่ยวมาตรฐาน (10 เล่ม)',
          },
        ],
        subtotal: 420,
        memberDiscount: 60,
        couponDiscount: 0,
        total: 360,
        customer: {
          fullName: 'ภูวนัย แก้วโต',
          studentOrStaffId: '66309010028',
          department: 'เทคโนโลยีธุรกิจดิจิทัล',
          role: 'นักศึกษา ปวส. (ราคาสมาชิก)',
          phone: '082-456-7890',
        },
        pickupLocation: 'หน้าร้านสหการโรงเรียน อาคาร 1 ชั้น 1 (ช่องรับด่วน)',
        pickupTimeSlot: 'ช่วงเช้าก่อนเข้าแถวเคารพธงชาติ (07:15 - 08:00 น.)',
        paymentMethod: 'promptpay',
        paymentStatus: 'paid',
        orderStatus: 'preparing',
        createdAt: new Date().toISOString(),
        slipNumber: 'KPTC-20260824-0018',
      },
    ];
  });

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('kptc_coop_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Persist orders
  useEffect(() => {
    try {
      localStorage.setItem('kptc_coop_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  // Cart operations
  const handleAddToCart = (product: Product, option?: string, qty: number = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedOption === option
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += qty;
        return next;
      } else {
        return [...prev, { product, quantity: qty, selectedOption: option }];
      }
    });
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCartItems((prev) => {
      const next = [...prev];
      const newQty = next[index].quantity + delta;
      if (newQty <= 0) {
        return next.filter((_, i) => i !== index);
      }
      next[index].quantity = newQty;
      return next;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleBuyNow = (product: Product, option?: string, qty: number = 1) => {
    handleAddToCart(product, option, qty);
    setSelectedProductModal(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setActiveReceiptOrder(newOrder);
  };

  // Filtered Products
  const filteredProducts = INITIAL_PRODUCTS.filter((product) => {
    // Search filter
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.department && product.department.toLowerCase().includes(searchQuery.toLowerCase()));

    // Category filter
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

    // Department filter
    const matchesDepartment =
      selectedDepartment === 'all' ||
      !product.department ||
      product.department.includes(selectedDepartment) ||
      product.department.includes('ทุกแผนก');

    return matchesSearch && matchesCategory && matchesDepartment;
  });

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Prompt',sans-serif]">
      {/* Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
        userProfile={userProfile}
        setUserRole={handleRoleChange}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activeTab === 'shop' && (
          <div className="space-y-2 pb-12">
            {/* Bento Grid Showcase Hub */}
            <BentoShowcase
              userProfile={userProfile}
              cartItems={cartItems}
              featuredProducts={INITIAL_PRODUCTS}
              onAddToCart={handleAddToCart}
              onQuickCheckout={() => setIsCheckoutOpen(true)}
              onOpenCart={() => setIsCartOpen(true)}
              onNavigateToCreator={() => setActiveTab('creator')}
              onSelectCategory={(cat) => setSelectedCategory(cat)}
            />

            {/* Search & Filters Bento Section */}
            <Banner
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment}
            />

            {/* Product Grid Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
              {/* Section Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white rounded-3xl border border-slate-200 shadow-xs p-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-900"></span>
                    <h2 className="text-base sm:text-xl font-bold text-slate-900 font-['Prompt']">
                      {selectedCategory === 'all'
                        ? 'รายการสินค้าสหกรณ์ทั้งหมด'
                        : INITIAL_PRODUCTS.find((p) => p.category === selectedCategory)?.categoryName || 'สินค้า'}
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    พบ {filteredProducts.length} รายการ (แสดงราคาสมาชิกเฉพาะชาว วท.กาญจนาภิเษก สมุทรปราการ)
                  </p>
                </div>

                {/* Creator Mini Credit pill */}
                <div 
                  onClick={() => setActiveTab('creator')}
                  className="cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200 rounded-2xl px-3.5 py-1.5 text-xs text-slate-700 flex items-center gap-2 shadow-2xs"
                >
                  <img
                    src="https://cdn.phototourl.com/free/2026-08-24-82bcfbf4-0aa9-492f-9334-0441bab3209a.png"
                    alt="ผู้จัดทำ"
                    className="w-6 h-6 rounded-full object-cover border border-white shadow-2xs"
                    referrerPolicy="no-referrer"
                  />
                  <span>ผู้พัฒนา: <strong className="text-blue-900">นายภูวนัย แก้วโต</strong></span>
                </div>
              </div>

              {/* Grid */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs max-w-md mx-auto my-8">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">ไม่พบสินค้าที่ตรงกับการค้นหา</h3>
                  <p className="text-xs text-slate-500 mb-4">
                    ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่น
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedDepartment('all');
                    }}
                    className="px-4 py-2 bg-blue-900 text-white rounded-2xl text-xs font-semibold shadow-xs hover:bg-blue-800"
                  >
                    ล้างตัวกรองทั้งหมด
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      onQuickView={(p) => setSelectedProductModal(p)}
                      isMember={true}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'creator' && (
          <CreatorProfile
            onNavigateToShop={() => setActiveTab('shop')}
          />
        )}

        {activeTab === 'orders' && (
          <OrderHistoryView
            orders={orders}
            onSelectOrder={(ord) => setActiveReceiptOrder(ord)}
            onNavigateToShop={() => setActiveTab('shop')}
          />
        )}
      </main>

      {/* Product Quick View Modal */}
      <ProductModal
        product={selectedProductModal}
        onClose={() => setSelectedProductModal(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        userProfile={userProfile}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Digital Receipt Modal */}
      <ReceiptModal
        order={activeReceiptOrder}
        onClose={() => setActiveReceiptOrder(null)}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
            {/* Col 1: College & Cooperative */}
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white p-1 shadow-xs shrink-0">
                  <img
                    src="https://cdn.phototourl.com/free/2026-08-24-24b27552-29da-4756-acc8-c2055f54f8fd.png"
                    alt="โลโก้ KPTC"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base font-['Prompt']">
                    ร้านค้าสหกรณ์ วิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ
                  </h3>
                  <p className="text-xs text-slate-400">
                    Kanchanaphisek Technical College Samutprakan Cooperative
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
                ระบบบริการร้านค้าสหกรณ์ออนไลน์สำหรับนักเรียน นักศึกษา ครู และบุคลากรทางการศึกษา 
                สั่งซื้อชุดช็อป เครื่องแบบ อุปกรณ์ช่าง เครื่องเขียน และอาหารว่างล่วงหน้าเพื่อลดความแออัด
              </p>
              <div className="text-[11px] text-blue-400 flex items-center gap-1.5 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                จุดบริการรับสินค้า: อาคารสหกรณ์ร้านค้า ชั้น 1 (เวลา 07:30 - 16:30 น.)
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">เมนูลัด</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setActiveTab('shop')} className="hover:text-white transition-colors">
                    หน้าร้านค้าสหกรณ์
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('orders')} className="hover:text-white transition-colors">
                    ตรวจสอบสถานะคำสั่งซื้อ & สลิป
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('creator')} className="hover:text-white transition-colors">
                    ข้อมูลผู้จัดทำโครงงาน
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Creator Profile & Credentials */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">ข้อมูลผู้จัดทำ</h4>
              <div className="flex items-center gap-3 bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
                <img
                  src="https://cdn.phototourl.com/free/2026-08-24-82bcfbf4-0aa9-492f-9334-0441bab3209a.png"
                  alt="นายภูวนัย แก้วโต"
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-blue-500/50 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-bold text-white text-xs">นายภูวนัย แก้วโต</div>
                  <div className="text-[11px] text-blue-300">แผนก เทคโนโลยีธุรกิจดิจิทัล</div>
                  <div className="text-[10px] text-slate-400">วท.กาญจนาภิเษก สมุทรปราการ</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div>
              © 2026 ร้านค้าสหกรณ์ วิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ. All Rights Reserved.
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              จัดทำเพื่อการศึกษาและพัฒนาระบบพาณิชย์ดิจิทัลในสถานศึกษา
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
