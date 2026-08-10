'use client';

import Link from 'next/link';
import { guestMap } from '@/lib/guests';
import { useState, useEffect, useMemo } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

const allGuests = Object.entries(guestMap);

export default function LinksPage() {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [origin, setOrigin] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Lấy domain hiện tại (chạy 1 lần khi load trang ở client)
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const handleCopy = (slug: string) => {
    const url = `${origin}/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    });
  };

  const filteredGuests = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return allGuests;
    
    // Hàm hỗ trợ bỏ dấu tiếng Việt để tìm kiếm không phân biệt dấu
    const removeVietnameseTones = (str: string) => {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    };
    
    const searchVal = removeVietnameseTones(debouncedSearchTerm);
    
    return allGuests.filter(([slug, name]) => {
      return removeVietnameseTones(name).includes(searchVal) || slug.includes(searchVal);
    });
  }, [debouncedSearchTerm]);

  return (
    <main className="min-h-screen bg-[#F5F3EF] p-4 sm:p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold mb-2 text-center text-[#8B5A2B]">
          Danh Sách Link Khách Mời
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Đang hiển thị: {filteredGuests.length} / {allGuests.length} khách mời
        </p>

        {/* Ô Tìm Kiếm */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên khách mời..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] focus:border-transparent transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
        
        <div className="grid gap-3 max-h-[60vh] overflow-y-auto pr-2">
          {filteredGuests.length > 0 ? (
            filteredGuests.map(([slug, name]) => (
              <div 
                key={slug} 
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors gap-3"
              >
                <span className="font-medium text-gray-800">{name}</span>
                <div className="flex gap-3 items-center justify-between sm:justify-end">
                  <Link 
                    href={`/${slug}`}
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 hover:underline text-sm truncate max-w-[200px] sm:max-w-[250px]"
                  >
                    /{slug}
                  </Link>
                  <button 
                    onClick={() => handleCopy(slug)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors w-24 text-center shrink-0 ${
                      copiedSlug === slug 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {copiedSlug === slug ? 'Đã copy' : 'Copy'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              Không tìm thấy khách mời nào phù hợp với "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
