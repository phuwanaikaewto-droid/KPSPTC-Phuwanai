import React from 'react';
import { Clock, MapPin, QrCode, FileText, CheckCircle2, AlertCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { Order } from '../types';

interface OrderHistoryViewProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
  onNavigateToShop: () => void;
}

export const OrderHistoryView: React.FC<OrderHistoryViewProps> = ({
  orders,
  onSelectOrder,
  onNavigateToShop,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold mb-2 border border-blue-200">
            <Clock className="w-3.5 h-3.5 text-blue-700" />
            สถานะและคิวรับสินค้า
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-['Prompt']">
            ประวัติการสั่งซื้อร้านค้าสหกรณ์
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            วิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ • สามารถกดดูใบเสร็จและแสดงรหัส QR รับสินค้าได้ที่นี่
          </p>
        </div>

        <button
          onClick={onNavigateToShop}
          className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>สั่งซื้อสินค้าเพิ่ม</span>
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-xs max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">ยังไม่มีประวัติการสั่งซื้อ</h3>
          <p className="text-xs text-slate-500 mb-6">
            เมื่อสั่งซื้อสินค้า อาหารพร้อมทาน หรือเครื่องดื่มร้านสะดวกซื้อสหกรณ์ ใบเสร็จดิจิทัลและรหัส QR จะแสดงในหน้านี้
          </p>
          <button
            onClick={onNavigateToShop}
            className="w-full py-2.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs shadow-md transition-all"
          >
            ไปที่หน้าร้านสหกรณ์
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-blue-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {order.slipNumber}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    กำลังจัดเตรียมสินค้า
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {new Date(order.createdAt).toLocaleString('th-TH')}
                  </span>
                </div>

                <div className="text-xs text-slate-700 font-medium">
                  {order.items.map((i) => `${i.product.name} (x${i.quantity})`).join(', ')}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-700" />
                    <span>{order.pickupLocation}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{order.pickupTimeSlot}</span>
                  </div>
                </div>
              </div>

              {/* Right side: Amount and Button */}
              <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-left md:text-right">
                  <div className="text-[10px] text-slate-400">ยอดชำระสุทธิ</div>
                  <div className="text-lg font-bold font-mono text-blue-700">฿{order.total}</div>
                </div>

                <button
                  onClick={() => onSelectOrder(order)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>ดูใบเสร็จ & QR</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
