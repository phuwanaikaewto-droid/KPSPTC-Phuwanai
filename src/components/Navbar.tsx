import React from 'react';
import { ShoppingBag, FileText, UserCheck, Clock, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';
import { UserProfile, UserRole } from '../types';

interface NavbarProps {
  activeTab: 'shop' | 'creator' | 'orders';
  setActiveTab: (tab: 'shop' | 'creator' | 'orders') => void;
  cartCount: number;
  openCart: () => void;
  userProfile: UserProfile;
  setUserRole: (role: UserRole) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  userProfile,
  setUserRole,
}) => {
  const [roleMenuOpen, setRoleMenuOpen] = React.useState(false);

  const roleOptions: { role: UserRole; title: string; label: string; tag: string }[] = [
    { role: 'student_voc', title: 'นักเรียน ปวช.', label: 'ระดับ ปวช. (สาขาวิชาชีพ)', tag: 'ปวช.' },
    { role: 'student_dip', title: 'นักศึกษา ปวส.', label: 'ระดับ ปวส. (วิชาชีพชั้นสูง)', tag: 'ปวส.' },
    { role: 'teacher', title: 'ครู / อาจารย์', label: 'อาจารย์ผู้สอนประจำแผนก', tag: 'ครู' },
    { role: 'staff', title: 'เจ้าหน้าที่ / บุคลากร', label: 'บุคลากรทางการศึกษา', tag: 'จนท.' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top emergency/coop notification strip */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-400 text-slate-950">
              เฉพาะภายใน
            </span>
            <span className="hidden sm:inline">ระบบสั่งซื้อออนไลน์ร้านค้าสหกรณ์ วิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ</span>
            <span className="sm:hidden">สหกรณ์ วท.กาญจนาภิเษก สมุทรปราการ</span>
          </div>
          <div className="flex items-center gap-4 text-slate-200 text-[11px]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> รับราคาสมาชิกสหกรณ์ลดสูงสุด 15%
            </span>
            <span className="hidden md:inline text-blue-300">|</span>
            <span className="hidden md:inline text-blue-200">รับสินค้าด่วน อาคารสหกรณ์ ชั้น 1</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          {/* Logo & Brand */}
          <div 
            id="brand-logo-button"
            onClick={() => setActiveTab('shop')} 
            className="flex items-center gap-3.5 cursor-pointer group shrink-0"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center p-1 bg-white rounded-2xl shadow-xs border border-slate-200 group-hover:scale-105 transition-transform duration-200">
              <img
                src="https://cdn.phototourl.com/free/2026-08-24-24b27552-29da-4756-acc8-c2055f54f8fd.png"
                alt="โลโก้ วิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold text-blue-900 tracking-tight leading-tight group-hover:text-blue-700 transition-colors font-['Prompt']">
                  สหการ วิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium tracking-wide uppercase">
                KPTC Online Store - สำหรับบุคลากรและนักศึกษาเท่านั้น
              </span>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80">
            <button
              id="nav-tab-shop"
              onClick={() => setActiveTab('shop')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'shop'
                  ? 'bg-white text-blue-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-blue-700" />
              หน้าหลักสหกรณ์
            </button>

            <button
              id="nav-tab-orders"
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'orders'
                  ? 'bg-white text-blue-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Clock className="w-4 h-4 text-slate-600" />
              ประวัติคำสั่งซื้อ
            </button>

            <button
              id="nav-tab-creator"
              onClick={() => setActiveTab('creator')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'creator'
                  ? 'bg-white text-blue-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <UserCheck className="w-4 h-4 text-emerald-600" />
              ผู้จัดทำ
            </button>
          </nav>

          {/* Right Action: User Role Switcher + Cart */}
          <div className="flex items-center gap-3">
            {/* Role Switcher Pill */}
            <div className="relative">
              <button
                id="role-switcher-toggle"
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-2.5 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 px-3.5 py-2 rounded-2xl text-left transition-colors"
                title="คลิกเพื่อเปลี่ยนมุมมองสถานะสมาชิก"
              >
                <div className="w-7 h-7 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold text-xs">
                  {userProfile.role === 'teacher' ? 'ครู' : userProfile.role === 'staff' ? 'จนท' : 'นศ'}
                </div>
                <div className="hidden sm:block text-xs">
                  <div className="font-semibold text-slate-800 flex items-center gap-1">
                    {userProfile.roleTitle}
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </div>
                  <div className="text-[10px] text-emerald-700 font-medium">สมาชิกลดสูงสุด 15%</div>
                </div>
              </button>

              {roleMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                  onMouseLeave={() => setRoleMenuOpen(false)}
                >
                  <div className="px-3 py-1.5 border-b border-slate-100">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      สลับสถานะผู้ใช้งาน (เพื่อจำลองสิทธิ)
                    </span>
                  </div>
                  {roleOptions.map((opt) => (
                    <button
                      key={opt.role}
                      onClick={() => {
                        setUserRole(opt.role);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors ${
                        userProfile.role === opt.role ? 'bg-blue-50 font-semibold text-blue-900' : 'text-slate-700'
                      }`}
                    >
                      <div>
                        <div className="font-medium text-slate-900">{opt.title}</div>
                        <div className="text-[11px] text-slate-500">{opt.label}</div>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] rounded-md bg-slate-200 text-slate-700 font-mono">
                        {opt.tag}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Trigger Button */}
            <button
              id="cart-trigger-button"
              onClick={openCart}
              className="relative flex items-center justify-center p-3 sm:px-4 sm:py-2.5 rounded-2xl bg-blue-900 hover:bg-blue-800 text-white font-medium shadow-xs hover:shadow-md transition-all active:scale-95 group"
              aria-label="เปิดตะกร้าสินค้า"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span 
                    id="cart-badge-count"
                    className="absolute -top-2 -right-2 h-4.5 w-4.5 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold shadow-xs animate-pulse"
                  >
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold">ตะกร้า</span>
            </button>
          </div>
        </div>

        {/* Mobile Tab navigation bar */}
        <div className="lg:hidden flex items-center justify-between border-t border-slate-100 py-2 overflow-x-auto gap-1 text-xs no-scrollbar">
          <button
            onClick={() => setActiveTab('shop')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium flex items-center gap-1.5 ${
              activeTab === 'shop' ? 'bg-blue-700 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" /> สินค้าสหกรณ์
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium flex items-center gap-1.5 ${
              activeTab === 'orders' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Clock className="w-3.5 h-3.5" /> ประวัติสั่งซื้อ
          </button>
          <button
            onClick={() => setActiveTab('creator')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium flex items-center gap-1.5 ${
              activeTab === 'creator' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" /> ผู้จัดทำ
          </button>
        </div>
      </div>
    </header>
  );
};
