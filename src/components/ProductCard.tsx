import React, { useState } from 'react';
import { ShoppingBag, Check, Eye, Tag, AlertCircle } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, option?: string) => void;
  onQuickView: (product: Product) => void;
  isMember: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  isMember,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(
    product.options && product.options.length > 0 ? product.options[0] : ''
  );
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedOption || undefined);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const discountPercent = Math.round(((product.price - product.memberPrice) / product.price) * 100);

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onQuickView(product)}
      className="group bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* Product Image Box */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-amber-400 text-slate-950 shadow-xs">
              {product.badge}
            </span>
          )}
          <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-medium bg-slate-900/80 backdrop-blur-xs text-white">
            {product.categoryName}
          </span>
        </div>

        {/* Member Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-3 right-3 bg-rose-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-lg shadow-xs flex items-center gap-1">
            <Tag className="w-3 h-3" /> ลด {discountPercent}%
          </div>
        )}

        {/* Quick View Floating button on hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs text-slate-700 hover:text-blue-700 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="ดูรายละเอียดสินค้า"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {product.department && (
            <div className="text-[11px] text-blue-700 font-medium line-clamp-1 mb-1">
              📍 {product.department}
            </div>
          )}

          <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-blue-700 transition-colors line-clamp-2 mb-1.5 font-['Prompt']">
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mb-3">
            {product.description}
          </p>

          {/* Options Dropdown if available */}
          {product.options && product.options.length > 0 && (
            <div className="mb-3" onClick={(e) => e.stopPropagation()}>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                เลือกตัวเลือก / ขนาด:
              </label>
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800"
              >
                {product.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-blue-700 font-mono">
                ฿{product.memberPrice}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ฿{product.price}
              </span>
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-0.5">
              ✓ ราคาสมาชิก KPTC
            </div>
          </div>

          <button
            id={`add-to-cart-${product.id}`}
            onClick={handleAdd}
            disabled={product.stock <= 0}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs active:scale-95 ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : product.stock <= 0
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-blue-900 hover:bg-blue-800 text-white'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>เพิ่มแล้ว</span>
              </>
            ) : product.stock <= 0 ? (
              'สินค้าหมด'
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>เพิ่มลงตะกร้า</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
