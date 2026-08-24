import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const regularSubtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const memberSubtotal = cartItems.reduce(
    (sum, item) => sum + item.product.memberPrice * item.quantity,
    0
  );
  const totalSavings = regularSubtotal - memberSubtotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-700 text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-base">ตะกร้าสินค้าสหกรณ์ KPTC</h2>
              <p className="text-xs text-slate-500">{cartItems.length} รายการที่เลือก</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors"
            aria-label="ปิดตะกร้า"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3 text-slate-300">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-sm font-semibold text-slate-600 mb-1">ยังไม่มีสินค้าในตะกร้า</p>
              <p className="text-xs text-slate-400 max-w-xs mb-4">
                เลือกซื้อชุดช็อป เสื้อนักศึกษา อุปกรณ์ช่าง หรือเครื่องเขียนตราวิทยาลัยได้ทันที
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs hover:bg-blue-800 transition-colors"
              >
                เลือกซื้อสินค้าสหกรณ์
              </button>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={`${item.product.id}-${item.selectedOption}-${index}`}
                className="bg-slate-50 rounded-2xl p-3 border border-slate-200/80 flex gap-3 relative group"
              >
                {/* Thumb */}
                <div className="w-16 h-16 rounded-xl bg-white overflow-hidden shrink-0 border border-slate-200">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                      {item.product.name}
                    </h4>
                    {item.selectedOption && (
                      <span className="inline-block text-[11px] text-blue-800 bg-blue-100/80 px-2 py-0.5 rounded-md mt-0.5 font-medium">
                        {item.selectedOption}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs font-bold text-blue-700">
                        ฿{item.product.memberPrice * item.quantity}
                      </span>
                      {item.product.price > item.product.memberPrice && (
                        <span className="text-[10px] text-slate-400 line-through">
                          ฿{item.product.price * item.quantity}
                        </span>
                      )}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(index, -1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-100 text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-semibold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(index, 1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-100 text-xs font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => onRemoveItem(index)}
                  className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                  aria-label="ลบรายการนี้"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/80 space-y-3">
            {/* Member Savings Banner */}
            {totalSavings > 0 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center justify-between text-xs text-emerald-800 font-medium">
                <span className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-emerald-600" />
                  สิทธิ์ราคาสมาชิกสหกรณ์ KPTC
                </span>
                <span className="font-bold">ประหยัด ฿{totalSavings}</span>
              </div>
            )}

            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>ยอดรวมราคาปกติ:</span>
                <span className="line-through text-slate-400">฿{regularSubtotal}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 text-sm">
                <span>ยอดชำระสุทธิ (ราคาสมาชิก):</span>
                <span className="text-base text-blue-700">฿{memberSubtotal}</span>
              </div>
            </div>

            <button
              id="proceed-checkout-button"
              onClick={onProceedToCheckout}
              className="w-full py-3 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <span>ดำเนินการสั่งซื้อและนัดรับสินค้า</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
