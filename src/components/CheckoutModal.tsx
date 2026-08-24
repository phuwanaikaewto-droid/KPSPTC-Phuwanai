import React, { useState } from 'react';
import { X, ShieldCheck, MapPin, Clock, QrCode, CreditCard, Banknote, Sparkles, Check, ArrowRight, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Order, UserProfile } from '../types';
import { DEPARTMENTS, PICKUP_LOCATIONS, PICKUP_TIME_SLOTS } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  userProfile: UserProfile;
  onOrderPlaced: (newOrder: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  userProfile,
  onOrderPlaced,
}) => {
  if (!isOpen || cartItems.length === 0) return null;

  const [fullName, setFullName] = useState(userProfile.fullName);
  const [studentId, setStudentId] = useState(userProfile.studentIdOrStaffId);
  const [department, setDepartment] = useState(userProfile.department);
  const [phone, setPhone] = useState(userProfile.phone);
  const [pickupLocation, setPickupLocation] = useState(PICKUP_LOCATIONS[0].name);
  const [pickupTimeSlot, setPickupTimeSlot] = useState(PICKUP_TIME_SLOTS[0]);
  const [paymentMethod, setPaymentMethod] = useState<'promptpay' | 'coop_wallet' | 'cash_on_pickup'>('promptpay');
  const [isPaidVerified, setIsPaidVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [note, setNote] = useState('');

  const regularSubtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const memberSubtotal = cartItems.reduce(
    (sum, item) => sum + item.product.memberPrice * item.quantity,
    0
  );
  const memberDiscount = regularSubtotal - memberSubtotal;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const now = new Date();
    const orderTimestamp = now.getTime().toString().slice(-6);
    const slipNumber = `KPTC-${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${orderTimestamp}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: slipNumber,
      items: [...cartItems],
      subtotal: regularSubtotal,
      memberDiscount,
      couponDiscount: 0,
      total: memberSubtotal,
      customer: {
        fullName: fullName || 'นักศึกษา KPTC',
        studentOrStaffId: studentId || '6630901xxxx',
        department: department || 'เทคโนโลยีธุรกิจดิจิทัล',
        role: userProfile.roleTitle,
        phone: phone || '08x-xxx-xxxx',
        note,
      },
      pickupLocation,
      pickupTimeSlot,
      paymentMethod,
      paymentStatus: paymentMethod === 'promptpay' ? 'paid' : 'pending',
      orderStatus: 'preparing',
      createdAt: now.toISOString(),
      slipNumber,
    };

    // Trigger celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderPlaced(newOrder);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-0.5 shadow-xs flex items-center justify-center">
              <img
                src="https://cdn.phototourl.com/free/2026-08-24-24b27552-29da-4756-acc8-c2055f54f8fd.png"
                alt="โลโก้ KPTC"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg font-['Prompt']">ยืนยันการสั่งซื้อและนัดรับสินค้า</h2>
              <p className="text-xs text-blue-200">ร้านค้าสหกรณ์ วิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="ปิด"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitOrder} className="p-6 max-h-[78vh] overflow-y-auto space-y-6">
          {/* Section 1: Customer Identity */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                1. ข้อมูลผู้สั่งซื้อ (นักเรียน / นักศึกษา / ครู / บุคลากร)
              </h3>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {userProfile.roleTitle}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ชื่อ-นามสกุล <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="เช่น นายสมชาย ช่างกล"
                  className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  รหัสนักศึกษา / รหัสบุคลากร <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="เช่น 66309010025"
                  className="w-full text-xs font-mono bg-white border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  แผนกวิชา <span className="text-rose-500">*</span>
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  เบอร์โทรศัพท์ติดต่อ <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="เช่น 089-123-4567"
                  className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Pickup details */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <MapPin className="w-4 h-4 text-indigo-700" />
              2. จุดนัดรับสินค้าและช่วงเวลารับ
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  เลือกจุดรับสินค้าในวิทยาลัย:
                </label>
                <div className="space-y-2">
                  {PICKUP_LOCATIONS.map((loc) => (
                    <label
                      key={loc.id}
                      className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                        pickupLocation === loc.name
                          ? 'bg-blue-50/80 border-blue-500 text-blue-950 font-medium'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/60'
                      }`}
                    >
                      <input
                        type="radio"
                        name="pickupLocation"
                        checked={pickupLocation === loc.name}
                        onChange={() => setPickupLocation(loc.name)}
                        className="mt-0.5 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="text-xs">
                        <div className="font-semibold">{loc.name}</div>
                        <div className="text-[11px] text-slate-500">{loc.timeDesc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ช่วงเวลานัดรับสินค้า:
                </label>
                <select
                  value={pickupTimeSlot}
                  onChange={(e) => setPickupTimeSlot(e.target.value)}
                  className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {PICKUP_TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  หมายเหตุเพิ่มเติม (ถ้ามี):
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="เช่น ฝากไว้กับหัวหน้าห้อง, รับพร้อมเพื่อน ปวช.2"
                  className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <CreditCard className="w-4 h-4 text-emerald-700" />
              3. วิธีการชำระเงิน
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('promptpay')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  paymentMethod === 'promptpay'
                    ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <QrCode className="w-4 h-4 text-blue-700" />
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded">แนะนำ</span>
                </div>
                <div className="text-xs font-bold">PromptPay QR</div>
                <div className="text-[10px] text-slate-500">สแกนจ่ายทันที</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('coop_wallet')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  paymentMethod === 'coop_wallet'
                    ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <CreditCard className="w-4 h-4 text-indigo-700" />
                </div>
                <div className="text-xs font-bold">บัตรสหกรณ์ KPTC</div>
                <div className="text-[10px] text-slate-500">หักเงินในกระเป๋า</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cash_on_pickup')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  paymentMethod === 'cash_on_pickup'
                    ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <Banknote className="w-4 h-4 text-amber-700" />
                </div>
                <div className="text-xs font-bold">เงินสด ณ จุดรับ</div>
                <div className="text-[10px] text-slate-500">ชำระเมื่อรับของ</div>
              </button>
            </div>

            {/* PromptPay QR Preview if selected */}
            {paymentMethod === 'promptpay' && (
              <div className="bg-white p-4 rounded-xl border border-blue-200 flex flex-col sm:flex-row items-center gap-4 animate-in fade-in">
                <div className="bg-slate-900 p-3 rounded-xl text-white flex flex-col items-center justify-center shrink-0 w-32 h-32">
                  <QrCode className="w-20 h-20 text-white" />
                  <span className="text-[9px] font-bold text-amber-300 mt-1">PromptPay สหกรณ์</span>
                </div>
                <div className="text-xs text-slate-600 space-y-1 text-center sm:text-left">
                  <div className="font-bold text-slate-900 text-sm">
                    บัญชี: สหกรณ์ร้านค้า วท.กาญจนาภิเษก สมุทรปราการ
                  </div>
                  <div className="font-mono text-slate-500">พร้อมเพย์: 0-9940-0082-XXXX</div>
                  <div className="text-blue-700 font-bold text-sm">
                    ยอดชำระ: ฿{memberSubtotal} บาท
                  </div>
                  <div className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded inline-block">
                    ✓ ระบบจะตรวจสอบและแนบสลิปดิจิทัลในใบเสร็จให้อัตโนมัติ
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 4: Price Summary */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>ราคาสินค้ารวม ({cartItems.length} รายการ):</span>
              <span>฿{regularSubtotal}</span>
            </div>
            {memberDiscount > 0 && (
              <div className="flex justify-between text-xs text-emerald-400 font-semibold">
                <span>ส่วนลดสมาชิกสหกรณ์ KPTC:</span>
                <span>-฿{memberDiscount}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-800">
              <span>ยอดชำระสุทธิ:</span>
              <span className="text-xl text-amber-400 font-extrabold font-mono">฿{memberSubtotal}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold"
            >
              ย้อนกลับ
            </button>

            <button
              id="confirm-place-order-button"
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-95 disabled:bg-slate-400"
            >
              {isSubmitting ? (
                <span>กำลังประมวลผลคำสั่งซื้อ...</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>ยืนยันการสั่งซื้อและออกใบเสร็จดิจิทัล</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
