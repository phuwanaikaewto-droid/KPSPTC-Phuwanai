import React from 'react';
import { ShoppingBag, ArrowRight, Sparkles, Award, Star, Bell, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { CartItem, Product, UserProfile } from '../types';

interface BentoShowcaseProps {
  userProfile: UserProfile;
  cartItems: CartItem[];
  featuredProducts: Product[];
  onAddToCart: (product: Product, option?: string) => void;
  onQuickCheckout: () => void;
  onOpenCart: () => void;
  onNavigateToCreator: () => void;
  onSelectCategory: (cat: string) => void;
}

export const BentoShowcase: React.FC<BentoShowcaseProps> = ({
  userProfile,
  cartItems,
  featuredProducts,
  onAddToCart,
  onQuickCheckout,
  onOpenCart,
  onNavigateToCreator,
  onSelectCategory,
}) => {
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.product.memberPrice * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-min">
        
        {/* Bento Card 1: Creator Profile (col-span-12 md:col-span-3) */}
        <div 
          id="bento-creator-card"
          onClick={onNavigateToCreator}
          className="md:col-span-3 bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all p-6 flex flex-col items-center justify-between text-center cursor-pointer group"
        >
          <div className="flex flex-col items-center w-full">
            <div className="relative mb-4 mt-2">
              <div className="absolute inset-0 bg-blue-200/60 rounded-full scale-110 blur-md opacity-60 group-hover:scale-125 transition-transform duration-300"></div>
              <img
                src="https://cdn.phototourl.com/free/2026-08-24-82bcfbf4-0aa9-492f-9334-0441bab3209a.png"
                className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg object-cover group-hover:rotate-1 transition-transform"
                alt="นายภูวนัย แก้วโต"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white" title="พร้อมให้บริการ">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[11px] font-semibold mb-1.5 border border-blue-100">
              <Award className="w-3 h-3 text-blue-600" />
              ผู้พัฒนาและออกแบบระบบ
            </div>

            <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors font-['Prompt']">
              นายภูวนัย แก้วโต
            </h2>
            <p className="text-blue-700 font-semibold text-xs mb-1">
              แผนกเทคโนโลยีธุรกิจดิจิทัล
            </p>
            <p className="text-slate-500 text-[11px] px-2 leading-relaxed">
              วิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 w-full text-xs space-y-2">
            <div className="flex justify-between items-center text-slate-600">
              <span className="text-slate-400">รหัสประจำตัว</span>
              <span className="font-mono font-medium text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                66309010028
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span className="text-slate-400">สถานะระบบ</span>
              <span className="text-emerald-600 font-medium flex items-center gap-1.5 text-[11px]">
                <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span> 
                พร้อมใช้งาน 24 ชม.
              </span>
            </div>
          </div>
        </div>

        {/* Bento Card 2: Featured Cooperative Essentials (col-span-12 md:col-span-6) */}
        <div className="md:col-span-6 bg-white rounded-3xl border border-slate-200 shadow-xs p-6 overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Prompt']">
                  สินค้าและอุปกรณ์การเรียนแนะนำประจำสัปดาห์
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                เครื่องแบบนักเรียน สมุดโรงเรียน เครื่องเขียนสอบ และนมโรงเรียนแท้ 100%
              </p>
            </div>
            <button 
              onClick={() => onSelectCategory('all')}
              className="text-blue-700 hover:text-blue-900 text-xs font-semibold flex items-center gap-1 group"
            >
              <span>ดูทั้งหมด</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* 2-column featured product preview items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            {featuredProducts.slice(0, 2).map((prod) => (
              <div
                key={prod.id}
                className="bg-slate-50 hover:bg-blue-50/40 rounded-2xl p-3.5 border border-slate-100 hover:border-blue-200 transition-all flex flex-col justify-between group/item"
              >
                <div>
                  <div className="relative aspect-4/3 w-full bg-white rounded-xl mb-3 overflow-hidden border border-slate-200/70">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    {prod.badge && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-amber-400 text-slate-950 font-bold text-[10px] rounded-md shadow-xs">
                        {prod.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1 mb-1 group-hover/item:text-blue-700 transition-colors">
                    {prod.name}
                  </h4>
                  <p className="text-slate-500 text-[11px] line-clamp-1 mb-2">
                    {prod.description}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-200/60 mt-1">
                  <div className="flex flex-col">
                    <span className="text-blue-700 font-extrabold text-sm sm:text-base">
                      ฿{prod.memberPrice}
                    </span>
                    <span className="text-[10px] text-slate-400 line-through">
                      ฿{prod.price}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(prod);
                    }}
                    className="bg-blue-900 hover:bg-blue-800 text-white text-xs px-3 py-1.5 rounded-xl font-medium transition-all shadow-xs active:scale-95 flex items-center gap-1"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>ใส่ตะกร้า</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bento Card 3: Live Quick Cart Sidebar (col-span-12 md:col-span-3) */}
        <div className="md:col-span-3 bg-slate-900 rounded-3xl shadow-xl p-6 text-white flex flex-col justify-between border border-slate-800 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold flex items-center gap-2 font-['Prompt']">
                <ShoppingBag className="w-5 h-5 text-yellow-400" />
                <span>ตะกร้าสินค้าด่วน</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono bg-white/10 px-2 py-0.5 rounded-full">
                {cartItems.reduce((s, i) => s + i.quantity, 0)} ชิ้น
              </span>
            </div>

            {/* Cart Items Preview */}
            {cartItems.length === 0 ? (
              <div className="py-6 text-center text-slate-400 space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-500">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <p className="text-xs">ตะกร้าของคุณยังว่างอยู่</p>
                <p className="text-[11px] text-slate-500">
                  เลือกสินค้าที่ต้องการเพื่อสั่งซื้อล่วงหน้า
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-44 overflow-y-auto pr-1 no-scrollbar">
                {cartItems.slice(0, 3).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/5 p-2 rounded-xl transition-colors"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-10 h-10 rounded-lg object-cover shrink-0 bg-slate-800"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white truncate">
                        {item.product.name}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        จำนวน: {item.quantity} {item.selectedOption ? `(${item.selectedOption})` : ''}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-yellow-400 font-mono">
                      ฿{item.product.memberPrice * item.quantity}
                    </span>
                  </div>
                ))}
                {cartItems.length > 3 && (
                  <button 
                    onClick={onOpenCart}
                    className="w-full text-center text-[11px] text-blue-300 hover:text-blue-200 py-1"
                  >
                    + อีก {cartItems.length - 3} รายการ (คลิกเพื่อดูทั้งหมด)
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Cart Footer Total and Action */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex justify-between items-baseline mb-3">
              <span className="text-xs text-slate-400">ยอดรวมสมาชิกร้านค้า</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-yellow-400">
                ฿{cartTotal}
              </span>
            </div>

            <button
              onClick={cartItems.length > 0 ? onQuickCheckout : onOpenCart}
              disabled={cartItems.length === 0}
              className={`w-full py-3 sm:py-3.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${
                cartItems.length > 0
                  ? 'bg-yellow-500 hover:bg-yellow-400 text-slate-950 shadow-yellow-500/20 cursor-pointer'
                  : 'bg-white/10 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>{cartItems.length > 0 ? 'ชำระเงินและรับสินค้า' : 'เลือกสินค้าเข้าตะกร้า'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bento Card 4: Cooperative News & Announcements (col-span-12 md:col-span-6) */}
        <div className="md:col-span-6 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 rounded-3xl p-6 text-white flex flex-col justify-between shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-60 h-60 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                ประชาสัมพันธ์
              </span>
              <span className="text-xs text-blue-200 flex items-center gap-1">
                <Bell className="w-3 h-3 text-amber-300" /> อัปเดตล่าสุด
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-bold mb-1.5 font-['Prompt']">
              เปิดจำหน่ายเครื่องแบบนักเรียน สมุดโรงเรียน และนมโรงเรียนล็อตใหม่
            </h4>
            <p className="text-blue-100 text-xs leading-relaxed max-w-xl">
              นักเรียน นักศึกษา ผู้ปกครอง และบุคลากร สามารถสั่งซื้ออุปกรณ์การเรียนและเครื่องแบบล่วงหน้า พร้อมรับได้ที่หน้าร้านสหการ อาคาร 1 ชั้น 1
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
            <div className="text-[11px] text-blue-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              รับสินค้าทันใจภายใน 15 นาทีหลังจากสั่งซื้อ
            </div>
            <button
              onClick={onNavigateToCreator}
              className="text-xs font-semibold bg-white/20 hover:bg-white/30 text-white py-1.5 px-3.5 rounded-xl transition-colors flex items-center gap-1"
            >
              <span>ข้อมูลผู้จัดทำ</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bento Card 5: Member Loyalty Points & Privileges (col-span-12 md:col-span-6) */}
        <div className="md:col-span-6 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-6 text-white flex items-center justify-between shadow-xs relative overflow-hidden">
          <div className="flex flex-col gap-1.5 z-10">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-emerald-100 uppercase tracking-wider">
                คะแนนสะสมสมาชิกร้านค้าสหกรณ์
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/80 text-[10px] font-bold border border-emerald-400/40">
                {userProfile.roleTitle}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                {userProfile.memberPoints ? (userProfile.memberPoints * 20).toLocaleString() : '2,450'}
              </span>
              <span className="text-sm font-normal text-emerald-200">
                คะแนนสะสม (pts)
              </span>
            </div>

            <p className="text-[11px] text-emerald-100">
              ทุก 100 บาท รับ 10 คะแนน นำไปใช้แลกส่วนลดเครื่องเขียนและเครื่องดื่มได้
            </p>
          </div>

          <div className="h-16 w-16 sm:h-20 sm:w-20 bg-white/15 rounded-2xl flex items-center justify-center shrink-0 border border-white/20 shadow-inner">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-amber-300" />
          </div>
        </div>

      </div>
    </div>
  );
};
