import React, { useState } from 'react';
import { X, ShoppingBag, Check, ShieldCheck, Tag, Info, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, option?: string, qty?: number) => void;
  onBuyNow: (product: Product, option?: string, qty?: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  if (!product) return null;

  const [selectedOption, setSelectedOption] = useState<string>(
    product.options && product.options.length > 0 ? product.options[0] : ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedOption || undefined, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleDirectBuy = () => {
    onBuyNow(product, selectedOption || undefined, quantity);
  };

  const discountPercent = Math.round(((product.price - product.memberPrice) / product.price) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          aria-label="ปิดหน้าต่าง"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Side */}
          <div className="relative aspect-square md:aspect-auto bg-slate-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.badge && (
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-400 text-slate-950 shadow-xs">
                  {product.badge}
                </span>
              )}
              <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-900/80 text-white">
                {product.categoryName}
              </span>
            </div>
          </div>

          {/* Details Side */}
          <div className="p-6 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
            <div>
              {product.department && (
                <div className="text-xs font-semibold text-blue-700 mb-1">
                  📍 {product.department}
                </div>
              )}

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-2 font-['Prompt']">
                {product.name}
              </h2>

              {/* Price Banner */}
              <div className="bg-blue-50/70 rounded-2xl p-3.5 border border-blue-100 mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-blue-800">
                    ฿{product.memberPrice}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    ฿{product.price}
                  </span>
                  {discountPercent > 0 && (
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-rose-500 text-white">
                      ประหยัด {discountPercent}%
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  ราคาสมาชิกสหกรณ์ KPTC (นักเรียน/นศ./ครู/บุคลากร)
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Specs Table */}
              {product.specs && product.specs.length > 0 && (
                <div className="mb-4 bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs">
                  <div className="font-semibold text-slate-800 mb-2">ข้อมูลจำเพาะ / คุณลักษณะ:</div>
                  <dl className="space-y-1">
                    {product.specs.map((s, idx) => (
                      <div key={idx} className="flex justify-between">
                        <dt className="text-slate-500">{s.label}:</dt>
                        <dd className="font-medium text-slate-800">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* Options selection */}
              {product.options && product.options.length > 0 && (
                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    เลือกขนาด / รูปแบบ ({product.options.length} ตัวเลือก):
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {product.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedOption(opt)}
                        className={`px-3 py-2 rounded-xl text-xs text-left border transition-all ${
                          selectedOption === opt
                            ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity selector */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-slate-700">จำนวน:</span>
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 font-bold"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-slate-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={handleAdd}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border transition-all ${
                  added
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-xs'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> เพิ่มลงตะกร้าแล้ว
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> เพิ่มลงตะกร้า
                  </>
                )}
              </button>

              <button
                onClick={handleDirectBuy}
                className="flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95"
              >
                <span>สั่งซื้อทันที</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
