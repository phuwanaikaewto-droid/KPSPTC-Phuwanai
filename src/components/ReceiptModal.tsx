import React from 'react';
import { X, CheckCircle2, Printer, Download, Clock, MapPin, QrCode, ShieldCheck } from 'lucide-react';
import { Order } from '../types';

interface ReceiptModalProps {
  order: Order | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200 print:shadow-none print:border-none print:m-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar (Hidden in Print) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm">ใบเสร็จรับเงินสหกรณ์อิเล็กทรอนิกส์</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="ปิด"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Receipt Paper */}
        <div className="p-6 sm:p-8 bg-white text-slate-800 font-mono text-xs">
          {/* Cooperative Header */}
          <div className="text-center pb-4 border-b-2 border-dashed border-slate-300">
            <div className="w-16 h-16 mx-auto mb-2 bg-white rounded-xl p-1 border border-slate-100 flex items-center justify-center">
              <img
                src="https://cdn.phototourl.com/free/2026-08-24-24b27552-29da-4756-acc8-c2055f54f8fd.png"
                alt="โลโก้ วท.กาญจนาภิเษก สมุทรปราการ"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <h2 className="text-base font-bold font-['Prompt'] text-slate-900">
              ร้านค้าสหกรณ์ วิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ
            </h2>
            <p className="text-[11px] text-slate-500 font-['Prompt']">
              Kanchanaphisek Technical College Samutprakan Cooperative
            </p>
            <div className="text-[10px] text-slate-400 mt-1 font-sans">
              เลขที่ใบเสร็จ: <span className="font-bold text-slate-800">{order.slipNumber}</span>
            </div>
            <div className="text-[10px] text-slate-400 font-sans">
              วันที่: {new Date(order.createdAt).toLocaleString('th-TH')}
            </div>
          </div>

          {/* Member & Pickup Info */}
          <div className="py-3 border-b border-dashed border-slate-200 space-y-1 font-sans text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">ผู้สั่งซื้อ:</span>
              <span className="font-semibold text-slate-900">{order.customer.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">รหัสนักเรียน/ครู:</span>
              <span className="font-mono font-semibold text-blue-700">{order.customer.studentOrStaffId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">แผนกวิชา:</span>
              <span className="text-slate-800">{order.customer.department}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">สถานะ:</span>
              <span className="text-emerald-700 font-semibold">{order.customer.role} (ราคาสมาชิก)</span>
            </div>
          </div>

          {/* Pickup Point Details */}
          <div className="py-2.5 bg-blue-50/70 p-3 rounded-xl border border-blue-100 my-3 font-sans text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-blue-900">
              <MapPin className="w-3.5 h-3.5 text-blue-700" />
              จุดรับสินค้า:
            </div>
            <div className="text-blue-800 pl-5">{order.pickupLocation}</div>
            <div className="flex items-center gap-1.5 text-slate-600 pl-5 text-[11px] pt-1">
              <Clock className="w-3 h-3 text-slate-400" />
              ช่วงเวลานัดรับ: <span className="font-medium text-slate-800">{order.pickupTimeSlot}</span>
            </div>
          </div>

          {/* Items Table */}
          <div className="py-3 border-b border-dashed border-slate-300 font-sans">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-200 pb-1 text-[11px]">
                  <th className="pb-1 font-semibold">รายการ</th>
                  <th className="pb-1 text-center font-semibold">จำนวน</th>
                  <th className="pb-1 text-right font-semibold">ราคารวม</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="py-1">
                    <td className="py-1.5 pr-2">
                      <div className="font-medium text-slate-800 line-clamp-1">{item.product.name}</div>
                      {item.selectedOption && (
                        <div className="text-[10px] text-slate-500">ตัวเลือก: {item.selectedOption}</div>
                      )}
                    </td>
                    <td className="py-1.5 text-center text-slate-600 font-mono">x{item.quantity}</td>
                    <td className="py-1.5 text-right font-mono font-semibold text-slate-900">
                      ฿{item.product.memberPrice * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total & Discounts */}
          <div className="py-3 space-y-1 font-sans text-xs">
            <div className="flex justify-between text-slate-500">
              <span>ยอดรวมราคาเต็ม:</span>
              <span className="font-mono">฿{order.subtotal}</span>
            </div>
            {order.memberDiscount > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>ส่วนลดสมาชิก KPTC:</span>
                <span className="font-mono">-฿{order.memberDiscount}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-slate-900 text-sm pt-2 border-t border-slate-200">
              <span>ยอดชำระสุทธิ:</span>
              <span className="font-mono text-base text-blue-700">฿{order.total}</span>
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 pt-1">
              <span>วิธีชำระ:</span>
              <span className="font-medium text-slate-700">
                {order.paymentMethod === 'promptpay' ? 'PromptPay QR (ชำระแล้ว)' : 'เงินสด ณ จุดรับสินค้า'}
              </span>
            </div>
          </div>

          {/* Pickup QR Code Ticket */}
          <div className="pt-3 pb-2 text-center border-t-2 border-dashed border-slate-300 font-sans">
            <div className="inline-block p-2 bg-slate-50 rounded-xl border border-slate-200 mb-2">
              <div className="w-24 h-24 mx-auto bg-slate-900 text-white rounded-lg flex flex-col items-center justify-center p-2">
                <QrCode className="w-14 h-14 text-white" />
                <span className="text-[9px] font-mono tracking-widest text-slate-300 mt-1">
                  {order.orderNumber.slice(-6)}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-600 font-medium">
              แสดงรหัส QR นี้ต่อเจ้าหน้าที่สหกรณ์เพื่อรับสินค้า
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              จัดทำระบบโดย นายภูวนัย แก้วโต แผนกเทคโนโลยีธุรกิจดิจิทัล
            </p>
          </div>
        </div>

        {/* Action Buttons (Hidden in print) */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>พิมพ์ใบเสร็จ / บันทึก PDF</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold transition-all shadow-xs"
          >
            เสร็จสิ้น
          </button>
        </div>
      </div>
    </div>
  );
};
