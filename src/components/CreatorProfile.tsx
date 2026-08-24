import React from 'react';
import { Award, GraduationCap, Building2, Code2, Sparkles, CheckCircle2, ShieldCheck, Mail, BookOpen, Layers } from 'lucide-react';

export const CreatorProfile: React.FC<{ onNavigateToShop?: () => void }> = ({
  onNavigateToShop,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden mb-8 border border-blue-800/50">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-60 h-60 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Creator Image with badge */}
          <div className="relative shrink-0">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden ring-4 ring-white/30 shadow-2xl bg-white p-1">
              <img
                src="https://cdn.phototourl.com/free/2026-08-24-82bcfbf4-0aa9-492f-9334-0441bab3209a.png"
                alt="รูปภาพผู้จัดทำ นายภูวนัย แก้วโต"
                className="w-full h-full object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> ผู้พัฒนาและออกแบบระบบ
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-medium mb-3 border border-blue-700">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              โครงงานพัฒนาระบบสารสนเทศและพาณิชย์อิเล็กทรอนิกส์
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2 font-['Prompt']">
              นายภูวนัย แก้วโต
            </h1>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-2 gap-x-4 text-sm text-blue-100 mb-5">
              <div className="flex items-center gap-1.5 font-medium">
                <GraduationCap className="w-4 h-4 text-amber-300" />
                แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล
              </div>
              <span className="hidden sm:inline text-blue-400">•</span>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-blue-300" />
                วิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
              จัดทำขึ้นโดยการศึกษาและเก็บรวบรวมข้อมูลจริงจากร้านค้าสหกรณ์ วิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ 
              เพื่อวิเคราะห์ ออกแบบ และพัฒนาระบบร้านค้าสหกรณ์ออนไลน์ที่ตอบสนองต่อนักเรียน นักศึกษา ครู และบุคลากรทางการศึกษา 
              ช่วยลดความแออัด เพิ่มประสิทธิภาพการกระจายชุดช็อป อุปกรณ์ช่าง เครื่องเขียน และอาหารว่างอย่างมีประสิทธิภาพ
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              {onNavigateToShop && (
                <button
                  onClick={onNavigateToShop}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-md active:scale-95"
                >
                  เลือกดูและสั่งซื้อสินค้าหน้าร้าน
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: วัตถุประสงค์และแรงบันดาลใจ */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center mb-4 border border-blue-100">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2 font-['Prompt']">แรงบันดาลใจในการจัดทำ</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              จากประสบการณ์จริงที่พบว่านักศึกษาต้องต่อแถวเป็นเวลานานเพื่อซื้อเครื่องแบบและอุปกรณ์ช่างก่อนเวลาเข้าแถว 
              จึงนำทักษะการเขียนโปรแกรมและการวิเคราะห์ระบบจากแผนกเทคโนโลยีธุรกิจดิจิทัลมาสร้างนวัตกรรมที่ใช้งานได้จริง
            </p>
          </div>
        </div>

        {/* Card 2: ทักษะและเทคโนโลยีที่ใช้ */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4 border border-indigo-100">
              <Code2 className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2 font-['Prompt']">เทคโนโลยีที่ใช้พัฒนา</h2>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200/60">React 19</span>
              <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200/60">TypeScript</span>
              <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200/60">Bento Grid UI</span>
              <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200/60">System Analysis</span>
              <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200/60">Prompt Engineering</span>
            </div>
          </div>
        </div>

        {/* Card 3: สิทธิประโยชน์และการรองรับ */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 border border-emerald-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2 font-['Prompt']">มาตรฐานสถาบัน</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              ระบบถูกออกแบบให้สอดคล้องกับระเบียบการจัดซื้อและอัตลักษณ์ของวิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ 
              พร้อมรองรับการคิดราคาสมาชิกสหกรณ์และการออกใบเสร็จกำกับ
            </p>
          </div>
        </div>
      </div>

      {/* Institutional Sign-off & Department Verification */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 p-1.5 shadow-2xs border border-slate-200 shrink-0">
            <img
              src="https://cdn.phototourl.com/free/2026-08-24-24b27552-29da-4756-acc8-c2055f54f8fd.png"
              alt="โลโก้วิทยาลัย"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 font-['Prompt']">
              แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล (Digital Business Technology)
            </h3>
            <p className="text-xs text-slate-500">
              วิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ • อาชีวศึกษาเพื่อการพัฒนาวิชาชีพ
            </p>
          </div>
        </div>
        <div className="text-xs text-blue-900 bg-blue-50 px-4 py-2 rounded-2xl border border-blue-200 font-bold">
          ผลงานโครงงานพัฒนาระบบ ปีการศึกษา 2026
        </div>
      </div>
    </div>
  );
};
