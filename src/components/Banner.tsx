import React from 'react';
import { Search, Sparkles, Filter, X } from 'lucide-react';
import { DEPARTMENTS } from '../data/products';

interface BannerProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedDepartment: string;
  setSelectedDepartment: (dept: string) => void;
}

export const Banner: React.FC<BannerProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedDepartment,
  setSelectedDepartment,
}) => {
  const categories = [
    { id: 'all', name: 'สินค้าทั้งหมด', icon: '🏫' },
    { id: 'uniform', name: 'เครื่องแบบ & ชุดพละ', icon: '👔' },
    { id: 'notebooks', name: 'สมุด & กระดาษรายงาน', icon: '📚' },
    { id: 'stationery', name: 'เครื่องเขียน & อุปกรณ์สอบ', icon: '✏️' },
    { id: 'art_craft', name: 'ศิลปะ & งานประดิษฐ์', icon: '🎨' },
    { id: 'school_snack', name: 'นมโรงเรียน & อาหารว่าง', icon: '🥛' },
    { id: 'essentials', name: 'ของใช้จำเป็น & พยาบาล', icon: '🩹' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Search and Filters Bento Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-4 sm:p-6 space-y-4">
        
        {/* Top Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="search-product-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่อสินค้า เช่น เสื้อนักเรียน, สมุดโรงเรียน, ดินสอ 2B, นมโรงเรียน, สีไม้, พลาสเตอร์ยา..."
              className="w-full pl-11 pr-10 py-3 bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
                title="ล้างข้อความค้นหา"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Department / Category Filter Select */}
          <div className="w-full sm:w-72 shrink-0 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              id="filter-department-select"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full bg-transparent text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">กรองตามแผนก: ทุกหมวดหมู่สหการ</option>
              {DEPARTMENTS.filter(d => d !== 'ทุกหมวดหมู่สหการ').map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Filter Chips Bento Row */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`category-chip-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-blue-900 text-white shadow-sm font-semibold'
                  : 'bg-slate-100/80 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60'
              }`}
            >
              <span className="text-sm">{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
