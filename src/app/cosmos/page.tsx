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
  const [sortOrder, setSortOrder] = useState('newest'); 
  const [viewMode, setViewMode] = useState<'cols-2' | 'cols-4'>('cols-2');
  const [loading, setLoading] = useState(true);

  // RTL dillerinin listesi
  const rtlLangs = ['ar', 'he', 'fa', 'ur'];
  const isRTL = rtlLangs.includes(lang);

  // ARAPÇA İÇİN TİPOGRAFİ KURTARICILARI (Bitişik dillerde boşluk/italik iptali)
  const trackingWidest = isRTL ? 'tracking-normal' : 'tracking-widest';
  const trackingWide = isRTL ? 'tracking-normal' : 'tracking-[0.4em]';
  const trackingTight = isRTL ? 'tracking-normal' : 'tracking-tighter';
  const fontItalic = isRTL ? 'not-italic' : 'italic';

  useEffect(() => {
    const savedLang = localStorage.getItem('gemicha_lang') || 'en';
    setLang(savedLang);
    document.documentElement.lang = savedLang;
    document.documentElement.dir = rtlLangs.includes(savedLang) ? 'rtl' : 'ltr';
    
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
    setLang(newLang); 
    localStorage.setItem('gemicha_lang', newLang); 
    document.documentElement.lang = newLang;
    document.documentElement.dir = rtlLangs.includes(newLang) ? 'rtl' : 'ltr';
    fetchGlobalInsights(newLang, targetDate, sortOrder);
  };

  const filteredInsights = insights.filter(i => {
    return (activeSign === 'all' || i.zodiac_sign.toLowerCase() === activeSign.toLowerCase()) &&
           (activeTopic === 'all' || i.topic.toLowerCase() === activeTopic.toLowerCase());
  });

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="bg-[#000] text-white min-h-screen font-['Plus_Jakarta_Sans',sans-serif] flex flex-col overflow-hidden">
      
      <nav className="h-20 flex items-center border-b border-white/5 sticky top-0 z-[100] bg-black/80 backdrop-blur-md px-4 md:px-8 shrink-0">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <img src="https://gemicha-portal.vercel.app/logo.png" alt="Gemicha" className="h-10 w-auto rounded-lg" />
            <span className={`text-xl font-black text-white uppercase ${trackingWidest}`}>{safeUpper("Gemicha", lang)}</span>
          </Link>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
                <Link href="/" className={`text-[10px] font-black text-white/50 hover:text-white transition uppercase ${trackingWidest}`}>
                    <i className="fa-solid fa-house me-1.5"></i> {safeUpper(getUIString(UI_DICT, lang, 'home', 'HOME'), lang)}
                </Link>
                <Link href="/characters" className={`text-[10px] font-black text-white/50 hover:text-white transition uppercase ${trackingWidest}`}>
                    <i className="fa-solid fa-user-astronaut me-1.5"></i> {safeUpper(getUIString(UI_DICT, lang, 'char', 'CHARACTERS'), lang)}
                </Link>
            </div>
            <div className="h-4 w-[1px] bg-white/10 hidden md:block"></div>
<select value={lang} onChange={(e) => handleLangChange(e.target.value)} className="bg-[#111] border border-white/20 rounded px-2 py-1 text-xs font-bold uppercase outline-none cursor-pointer">
  {Object.entries(LANG_NAMES).map(([code, fallbackName]) => {
     let displayLangName = fallbackName;
     try {
         // Aktif dile göre (lang) dillerin adını anında çevirir!
         const translated = new Intl.DisplayNames([lang], { type: 'language' }).of(code);
         if (translated) displayLangName = translated;
     } catch (e) {}
     return <option key={code} value={code} className="bg-[#111]">{displayLangName}</option>
  })}
</select>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden relative flex-col md:flex-row">
        <aside className="w-full md:w-80 bg-[#020202] border-e border-white/5 flex flex-col shrink-0 z-40 overflow-y-auto no-scrollbar max-h-[40vh] md:max-h-full">
          <div className="p-6 space-y-8">
            <div>
              <h3 className={`text-[10px] font-black text-cyan-500 mb-3 flex items-center gap-2 uppercase ${trackingWidest}`}>
                <i className="fa-regular fa-calendar"></i> {safeUpper(getUIString(UI_DICT, lang, 'filter_title', 'Cosmic Date'), lang)}
              </h3>
              <input type="date" value={targetDate} onChange={(e) => { setTargetDate(e.target.value); fetchGlobalInsights(lang, e.target.value, sortOrder); }} onClick={(e) => (e.target as HTMLInputElement).showPicker?.()} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white outline-none cursor-pointer" />
            </div>
            <div>
              <h3 className={`text-[10px] font-black text-gray-500 mb-4 uppercase ${trackingWidest}`}>
                {safeUpper(getUIString(UI_DICT, lang, 'zodiac_signs', 'Zodiac Signs'), lang)}
              </h3>
              <div className="grid grid-cols-4 md:grid-cols-3 gap-2">
                <button onClick={() => setActiveSign('all')} className={`p-2 rounded-xl text-[9px] font-black border transition-all ${activeSign === 'all' ? 'bg-white text-black border-white' : 'bg-white/5 border-transparent text-gray-500'}`}>
                  {safeUpper(getUIString(TOPICS_DICT, lang, 'all', 'ALL'), lang)}
                </button>
                {ZODIAC_SIGNS.map(s => (
                  <button key={s.id} onClick={() => setActiveSign(s.id)} className={`p-2 rounded-xl text-[9px] font-black border transition-all uppercase ${activeSign === s.id ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-white/5 border-transparent text-gray-500 hover:text-white'}`}>
                    {safeUpper(getUIString(ZODIAC_DICT, lang, s.id, s.id), lang)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className={`text-[10px] font-black text-gray-500 mb-4 uppercase ${trackingWidest}`}>
                {safeUpper(getUIString(UI_DICT, lang, 'topic_analytics', 'Topic Analytics'), lang)}
              </h3>
              <div className="space-y-2">
                {['ask', 'kariyer', 'saglik', 'para'].map(t => (
                  <button key={t} onClick={() => setActiveTopic(t)} className={`w-full text-start p-3 rounded-xl text-[10px] font-black border transition-all flex justify-between items-center uppercase ${activeTopic === t ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' : 'bg-white/5 border-transparent text-gray-500 hover:text-white'}`}>
                    {safeUpper(getUIString(TOPICS_DICT, lang, t, t), lang)}
                    {activeTopic === t && <div className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan]"></div>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 bg-black overflow-y-auto no-scrollbar p-6 md:p-12 pb-32">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
              <header>
                <span className={`text-cyan-500 text-[10px] font-black mb-3 block uppercase ${trackingWide}`}>
                  {safeUpper(getUIString(UI_DICT, lang, 'insights_cosmos', 'Insights & Cosmos'), lang)}
                </span>
                <h2 className={`text-4xl md:text-6xl font-black text-white ${fontItalic} ${trackingTight}`}>
                  {safeUpper(activeSign === 'all' ? getUIString(UI_DICT, lang, 'global', 'Global') : getUIString(ZODIAC_DICT, lang, activeSign, activeSign), lang)} 
                  <span className="text-white/20 ms-3">{safeUpper(getUIString(UI_DICT, lang, 'analysis', 'Analysis'), lang)}</span>
                </h2>
              </header>

              <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-1.5 backdrop-blur-md shadow-2xl">
                 <div className="relative group flex items-center border-e border-white/10 px-4">
                   <i className="fa-solid fa-arrow-down-short-wide text-cyan-400 me-3 text-sm"></i>
                   <select value={sortOrder} onChange={(e) => { setSortOrder(e.target.value); fetchGlobalInsights(lang, targetDate, e.target.value); }} className="bg-transparent text-white text-xs font-black uppercase outline-none cursor-pointer appearance-none pe-2">
                      <option value="newest" className="bg-[#111]">{getUIString(UI_DICT, lang, 'filter_new', 'NEWEST')}</option>
                      <option value="oldest" className="bg-[#111]">{getUIString(UI_DICT, lang, 'filter_old', 'OLDEST')}</option>
                   </select>
                 </div>
                 <div className="flex ps-2 gap-1">
                    <button onClick={() => setViewMode('cols-2')} className={`w-10 h-10 rounded-xl transition-all duration-300 flex items-center justify-center ${viewMode === 'cols-2' ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'text-white/50 hover:text-white hover:bg-white/10'}`}>
                       <i className="fa-solid fa-table-cells-large text-lg"></i>
                    </button>
                    <button onClick={() => setViewMode('cols-4')} className={`w-10 h-10 rounded-xl transition-all duration-300 flex items-center justify-center ${viewMode === 'cols-4' ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'text-white/50 hover:text-white hover:bg-white/10'}`}>
                       <i className="fa-solid fa-table-cells text-lg"></i>
                    </button>
                 </div>
              </div>
          </div>

          {loading ? (
             <div className="flex flex-col items-center justify-center py-20 gap-4"><div className="w-10 h-10 border-2 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin"></div></div>
          ) : (
            <div className={`grid w-full transition-all duration-500 ${viewMode === 'cols-2' ? "grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"}`}>
              {filteredInsights.map((item) => {
                const cleanTopic = slugify(getUIString(TOPICS_DICT, lang, item.topic.toLowerCase(), item.topic));
                const cleanSign = slugify(getUIString(ZODIAC_DICT, lang, item.zodiac_sign.toLowerCase(), item.zodiac_sign));

                return (
                  <Link href={`/cosmos/${lang}/${cleanTopic}/${cleanSign}${targetDate ? `?date=${targetDate}` : ''}`} key={item.id} 
                    className={`group relative bg-[#050505] border border-white/5 overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500 flex flex-col hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#D4AF37]/10 ${viewMode === 'cols-2' ? 'rounded-[2rem]' : 'rounded-2xl md:rounded-[2rem]'}`}
                  >
                    <div className="relative overflow-hidden aspect-video w-full shrink-0">
                      <img src={`https://gemicha-portal.vercel.app/images/zodiac/${item.zodiac_sign.toLowerCase()}.webp`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105 opacity-60" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
                    </div>
                    
                    <div className={`flex-1 flex flex-col justify-start ${viewMode === 'cols-2' ? 'p-8' : 'p-3 md:p-5'}`}>
                      <div className="flex justify-between items-center mb-3">
                        <span className={`text-[#D4AF37] font-black uppercase ${trackingWidest} ${viewMode === 'cols-2' ? 'text-[10px]' : 'text-[8px] md:text-[10px]'}`}>{safeUpper(getUIString(ZODIAC_DICT, lang, item.zodiac_sign.toLowerCase(), item.zodiac_sign), lang)}</span>
                        <span className={`bg-white/5 px-2 py-1 md:px-3 rounded-full font-black text-white/40 uppercase ${viewMode === 'cols-2' ? 'text-[9px]' : 'text-[7px] md:text-[9px]'}`}>{safeUpper(getUIString(TOPICS_DICT, lang, item.topic.toLowerCase(), item.topic), lang)}</span>
                      </div>
                      
                      <h3 className={`font-bold leading-tight group-hover:text-[#D4AF37] transition-colors uppercase ${viewMode === 'cols-2' ? 'text-2xl mb-4' : 'text-sm md:text-lg mb-2'} break-words`}>
                        {safeUpper(item.meta_title, lang)}
                      </h3>
                      
                      {viewMode === 'cols-2' && <p className="text-white/50 leading-relaxed font-medium text-sm line-clamp-3">{item.content_body}</p>}
                      
                      <div className={`mt-auto pt-4 border-t border-white/5 inline-flex items-center gap-2 font-black uppercase text-cyan-400 group-hover:text-white transition-colors ${trackingWidest} ${viewMode === 'cols-2' ? 'text-[9px]' : 'text-[7px] md:text-[9px]'}`}>
                        {safeUpper(getUIString(UI_DICT, lang, 'read_report', 'Read Neural Report'), lang)} 
                        <i className="fa-solid fa-arrow-right rtl:rotate-180 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform"></i>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </main>
      </div>

      <footer className="py-12 text-center border-t border-white/5 bg-black mt-auto shrink-0 z-50">
          <div className={`max-w-7xl mx-auto flex flex-col gap-6 px-6 text-[10px] text-slate-600 font-bold uppercase ${trackingWide}`}>
              <nav className="flex justify-center flex-wrap gap-8">
                  <Link href="/" className="hover:text-white transition">{safeUpper(getUIString(UI_DICT, lang, 'home', 'Home'), lang)}</Link>
                  <Link href="/characters" className="hover:text-white transition">{safeUpper(getUIString(UI_DICT, lang, 'char', 'Characters'), lang)}</Link>
                  <Link href="/privacy" className="hover:text-white transition">{safeUpper(getUIString(UI_DICT, lang, 'priv', 'Privacy Policy'), lang)}</Link>
                  <Link href="/terms" className="hover:text-white transition">{safeUpper(getUIString(UI_DICT, lang, 'terms', 'Terms of Service'), lang)}</Link>
              </nav>
              <p className={`text-[9px] text-slate-800 pt-4 border-t border-white/5 ${trackingWide}`}>© 2026 GEMICHA | ALL CELESTIAL RIGHTS RESERVED</p>
          </div>
      </footer>
      <style jsx global>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
}
