"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { LANG_NAMES, ZODIAC_SIGNS, ZODIAC_DICT, TOPICS_DICT, UI_DICT, slugify, getUIString, safeUpper } from '../../lib/cosmos-constants';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function GlobalCosmosPortal() {
  const [insights, setInsights] = useState<any[]>([]);
  const [lang, setLang] = useState('en');
  const [activeSign, setActiveSign] = useState('all');
  const [activeTopic, setActiveTopic] = useState('all');
  const [targetDate, setTargetDate] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // YENİ: Sıralama Filtresi
  const [viewMode, setViewMode] = useState('grid'); // YENİ: Görünüm Filtresi
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedLang = localStorage.getItem('gemicha_lang') || 'en';
    setLang(savedLang);
    document.documentElement.lang = savedLang;
    const today = new Date().toISOString().split('T')[0];
    setTargetDate(today);
    fetchGlobalInsights(savedLang, today, sortOrder);
  }, []);

  const fetchGlobalInsights = async (selectedLang: string, date: string, order: string) => {
    setLoading(true);
    let query = supabase.from('gemicha_insights').select('*').eq('language', selectedLang).order('created_at', { ascending: order === 'oldest' });
    if (date) query = query.eq('target_date', date);
    const { data } = await query;
    if (data) setInsights(data);
    setLoading(false);
  };

  const handleLangChange = (newLang: string) => {
    setLang(newLang); localStorage.setItem('gemicha_lang', newLang); document.documentElement.lang = newLang;
    fetchGlobalInsights(newLang, targetDate, sortOrder);
  };

  const filteredInsights = insights.filter(i => {
    return (activeSign === 'all' || i.zodiac_sign.toLowerCase() === activeSign.toLowerCase()) &&
           (activeTopic === 'all' || i.topic.toLowerCase() === activeTopic.toLowerCase());
  });

  return (
    <div className="bg-[#000] text-white min-h-screen font-['Plus_Jakarta_Sans',sans-serif] flex flex-col overflow-hidden">
      <nav className="h-20 flex items-center border-b border-white/5 sticky top-0 z-[100] bg-black/80 backdrop-blur-md px-4 md:px-8 shrink-0">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <img src="https://gemicha-portal.vercel.app/logo.png" alt="Gemicha" className="h-10 w-auto rounded-lg" />
            <span className="text-xl font-black tracking-widest text-white">{safeUpper("Gemicha", lang)}</span>
          </Link>
          <div className="flex items-center gap-6">
            <select value={lang} onChange={(e) => handleLangChange(e.target.value)} className="bg-[#111] border border-white/20 rounded px-2 py-1 text-xs font-bold uppercase outline-none cursor-pointer">
              {Object.entries(LANG_NAMES).map(([code, name]) => <option key={code} value={code} className="bg-[#111]">{name}</option>)}
            </select>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden relative flex-col md:flex-row">
        <aside className="w-full md:w-80 bg-[#020202] border-r border-white/5 flex flex-col shrink-0 z-40 overflow-y-auto no-scrollbar max-h-[40vh] md:max-h-full">
          <div className="p-6 space-y-8">
            
            {/* GELİŞMİŞ TAKVİM */}
            <div>
              <h3 className="text-[10px] font-black text-cyan-500 mb-3 tracking-widest flex items-center gap-2">
                <i className="fa-regular fa-calendar"></i> {safeUpper(lang === 'tr' ? "Kozmik Tarih" : "Cosmic Date", lang)}
              </h3>
              <input type="date" value={targetDate} onChange={(e) => { setTargetDate(e.target.value); fetchGlobalInsights(lang, e.target.value, sortOrder); }} onClick={(e) => (e.target as HTMLInputElement).showPicker?.()} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white outline-none cursor-pointer" />
            </div>

            {/* BURÇLAR */}
            <div>
              <h3 className="text-[10px] font-black text-gray-500 mb-4 tracking-widest">{safeUpper(lang === 'tr' ? "Burçlar" : "Zodiac Signs", lang)}</h3>
              <div className="grid grid-cols-4 md:grid-cols-3 gap-2">
                <button onClick={() => setActiveSign('all')} className={`p-2 rounded-xl text-[9px] font-black border transition-all ${activeSign === 'all' ? 'bg-white text-black border-white' : 'bg-white/5 border-transparent text-gray-500'}`}>
                  {safeUpper(getUIString(TOPICS_DICT, lang, 'all', 'ALL'), lang)}
                </button>
                {ZODIAC_SIGNS.map(s => (
                  <button key={s.id} onClick={() => setActiveSign(s.id)} className={`p-2 rounded-xl text-[9px] font-black border transition-all ${activeSign === s.id ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-white/5 border-transparent text-gray-500 hover:text-white'}`}>
                    {safeUpper(getUIString(ZODIAC_DICT, lang, s.id, s.id), lang)}
                  </button>
                ))}
              </div>
            </div>

            {/* KONULAR */}
            <div>
              <h3 className="text-[10px] font-black text-gray-500 mb-4 tracking-widest">{safeUpper(lang === 'tr' ? "Analiz Konusu" : "Topic Analytics", lang)}</h3>
              <div className="space-y-2">
                {['ask', 'kariyer', 'saglik', 'para'].map(t => (
                  <button key={t} onClick={() => setActiveTopic(t)} className={`w-full text-left p-3 rounded-xl text-[10px] font-black border transition-all flex justify-between items-center ${activeTopic === t ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' : 'bg-white/5 border-transparent text-gray-500 hover:text-white'}`}>
                    {safeUpper(getUIString(TOPICS_DICT, lang, t, t), lang)}
                    {activeTopic === t && <div className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan]"></div>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 bg-black overflow-y-auto no-scrollbar p-6 md:p-12 pb-32">
          
          {/* YENİ: SIRALAMA VE GÖRÜNÜM FİLTRESİ */}
          <div className="flex justify-between items-end mb-12 flex-wrap gap-6">
              <header>
                <span className="text-cyan-500 text-[10px] font-black tracking-[0.4em] mb-3 block">{safeUpper("Insights & Cosmos", lang)}</span>
                <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter">
                  {safeUpper(activeSign === 'all' ? 'Global' : getUIString(ZODIAC_DICT, lang, activeSign, activeSign), lang)} <span className="text-white/20">{safeUpper("Analysis", lang)}</span>
                </h2>
              </header>

              <div className="flex items-center gap-3">
                  <div>
                    <span className="text-[9px] font-bold text-gray-600 block mb-1">{safeUpper(getUIString(UI_DICT, lang, 'filter_title', 'FILTER'), lang)}</span>
                    <select 
                      value={sortOrder} 
                      onChange={(e) => { setSortOrder(e.target.value); fetchGlobalInsights(lang, targetDate, e.target.value); }}
                      className="bg-black text-white text-[11px] font-bold px-4 py-2 border border-white/10 rounded-xl outline-none cursor-pointer hover:border-white/30 transition"
                    >
                      <option value="newest">{getUIString(UI_DICT, lang, 'filter_new', 'NEWEST')}</option>
                      <option value="oldest">{getUIString(UI_DICT, lang, 'filter_old', 'OLDEST')}</option>
                    </select>
                  </div>
                  <div className="flex bg-[#050505] p-1 rounded-xl border border-white/10 h-full self-end">
                      <button onClick={() => setViewMode('grid')} className={`px-3 py-2 rounded-lg transition-all ${viewMode === 'grid' ? 'text-cyan-400 bg-white/10' : 'text-gray-500 hover:text-white'}`}><i className="fa-solid fa-table-cells-large text-sm"></i></button>
                      <button onClick={() => setViewMode('list')} className={`px-3 py-2 rounded-lg transition-all ${viewMode === 'list' ? 'text-cyan-400 bg-white/10' : 'text-gray-500 hover:text-white'}`}><i className="fa-solid fa-list text-sm"></i></button>
                  </div>
              </div>
          </div>

          {loading ? (
             <div className="flex flex-col items-center justify-center py-20 gap-4"><div className="w-10 h-10 border-2 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin"></div></div>
          ) : (
            <div className={viewMode === 'grid' ? "grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl" : "flex flex-col gap-6 max-w-4xl"}>
              {filteredInsights.map((item) => {
                // Temiz (Slugify) URL Yolu
                const cleanTopic = slugify(getUIString(TOPICS_DICT, lang, item.topic.toLowerCase(), item.topic));
                const cleanSign = slugify(getUIString(ZODIAC_DICT, lang, item.zodiac_sign.toLowerCase(), item.zodiac_sign));

                return (
                  <Link href={`/cosmos/${lang}/${cleanTopic}/${cleanSign}${targetDate ? `?date=${targetDate}` : ''}`} key={item.id} 
                    className={`group relative bg-[#050505] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500 flex hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#D4AF37]/10 ${viewMode === 'grid' ? 'flex-col' : 'flex-row items-center h-48'}`}>
                    
                    <div className={`relative overflow-hidden ${viewMode === 'grid' ? 'aspect-video w-full' : 'w-48 h-full shrink-0'}`}>
                      <img src={`https://gemicha-portal.vercel.app/images/zodiac/${item.zodiac_sign.toLowerCase()}.webp`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105 opacity-50" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
                    </div>

                    <div className="p-8 flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[#D4AF37] font-black text-[10px] tracking-widest">{safeUpper(getUIString(ZODIAC_DICT, lang, item.zodiac_sign.toLowerCase(), item.zodiac_sign), lang)}</span>
                        <span className="bg-white/5 px-3 py-1 rounded-full text-[9px] font-black text-white/40">{safeUpper(getUIString(TOPICS_DICT, lang, item.topic.toLowerCase(), item.topic), lang)}</span>
                      </div>
                      <h3 className={`font-bold mb-3 leading-tight group-hover:text-[#D4AF37] transition-colors ${viewMode === 'grid' ? 'text-2xl' : 'text-xl line-clamp-2'}`}>{safeUpper(item.meta_title, lang)}</h3>
                      {viewMode === 'grid' && <p className="text-sm text-white/50 leading-relaxed line-clamp-3 font-medium">{item.content_body}</p>}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </main>
      </div>

      <footer className="py-12 text-center border-t border-white/5 bg-black mt-auto shrink-0 z-50">
          <div className="max-w-7xl mx-auto flex flex-col gap-6 px-6 text-[10px] tracking-[0.4em] text-slate-600 font-bold">
              <nav className="flex justify-center flex-wrap gap-8">
                  <Link href="/" className="hover:text-white transition">{safeUpper(getUIString(UI_DICT, lang, 'home', 'Home'), lang)}</Link>
                  <Link href="/privacy" className="hover:text-white transition">{safeUpper(getUIString(UI_DICT, lang, 'priv', 'Privacy'), lang)}</Link>
              </nav>
              <p className="text-[9px] text-slate-800 tracking-[0.6em] pt-4 border-t border-white/5">© 2026 GEMICHA | ALL CELESTIAL RIGHTS RESERVED</p>
          </div>
      </footer>
      <style jsx global>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
}
