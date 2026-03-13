"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase Global Bağlantı (Client-side)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const LANG_NAMES = {
    tr: "Türkçe", en: "English", ar: "العربية", de: "Deutsch", es: "Español", 
    fr: "Français", it: "Italiano", pt: "Português", ru: "Русский", zh: "中文", 
    ja: "日本語", ko: "한국어", nl: "Nederlands", pl: "Polski", sv: "Svenska", 
    da: "Dansk", fi: "Suomi", no: "Norsk", cs: "Čeština", hu: "Magyar", 
    ro: "Română", el: "Ελληνικά", he: "עברית", hi: "हिन्दी", bn: "বাংলা", 
    id: "Bahasa Indonesia", ms: "Bahasa Melayu", th: "ไทย", vi: "Tiếng Việt"
};

export default function GlobalCosmosPortal() {
  const [insights, setInsights] = useState<any[]>([]);
  const [lang, setLang] = useState('en');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Kullanıcının dilini karakter sayfasındaki gibi yakala
    const savedLang = localStorage.getItem('gemicha_lang') || 'en';
    setLang(savedLang);
    document.documentElement.lang = savedLang;
    fetchGlobalInsights(savedLang);
  }, []);

  const fetchGlobalInsights = async (selectedLang: string) => {
    setLoading(true);
    // Bugünün verilerini çek
    const { data, error } = await supabase
      .from('gemicha_insights')
      .select('*')
      .eq('language', selectedLang)
      .order('zodiac_sign', { ascending: true });

    if (data) setInsights(data);
    setLoading(false);
  };

  const changeLanguage = (newLang: string) => {
    setLang(newLang);
    localStorage.setItem('gemicha_lang', newLang);
    document.documentElement.lang = newLang;
    fetchGlobalInsights(newLang);
  };

  return (
    <div className="bg-[#000] text-white min-h-screen font-['Plus_Jakarta_Sans',sans-serif] selection:bg-white selection:text-black">
      
      {/* GLOBAL NAV (Sitedeki standart bar) */}
      <nav className="h-20 flex items-center border-b border-white/5 sticky top-0 z-50 bg-black/80 backdrop-blur-md px-4 md:px-8">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <a href="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="Gemicha" className="h-10 w-auto rounded-lg" />
            <span className="text-xl font-extrabold tracking-widest uppercase">GEMICHA</span>
          </a>
          
          <div className="flex items-center gap-4 md:gap-8">
            <a href="/characters" className="text-[10px] font-black uppercase text-white/70 hover:text-white transition">CHARACTERS</a>
            <a href="/lab" className="text-[10px] font-black uppercase text-cyan-400 hover:text-white transition">LOGIN</a>
            
            {/* STANDART DİL BARIN (Sağda) */}
            <select 
              value={lang} 
              onChange={(e) => changeLanguage(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase outline-none cursor-pointer hover:bg-white/10 transition"
            >
              {Object.entries(LANG_NAMES).map(([code, name]) => (
                <option key={code} value={code} className="bg-[#111]">{name}</option>
              ))}
            </select>
          </div>
        </div>
      </nav>

      {/* PORTAL MAIN CONTENT */}
      <main className="pt-12 pb-24 px-6 max-w-7xl mx-auto w-full">
        <header className="mb-16 text-center">
          <h1 className="text-5xl md:text-8xl font-black mb-6 italic uppercase tracking-tighter bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent">
            COSMOS ANALYTICS
          </h1>
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-5 max-w-3xl mx-auto mb-12 backdrop-blur-sm">
            <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-[0.3em]">
              Global daily insights powered by real-time cosmic ephemeris and structural pressure indices.
            </p>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
             <div className="w-12 h-12 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin"></div>
             <p className="text-[10px] font-black tracking-[0.5em] text-cyan-400 animate-pulse uppercase">Syncing with Stars...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insights.map((item) => (
              <div key={item.id} className="group relative rounded-[2.5rem] overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500">
                
                <div className="p-8">
                  {/* KART BAŞLIĞI: BURÇ VE KONU */}
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex flex-col">
                        <span className="text-[#D4AF37] font-black text-xs uppercase tracking-[0.3em]">{item.zodiac_sign}</span>
                        <span className="text-[9px] text-white/20 font-bold uppercase">{item.target_date}</span>
                    </div>
                    <span className="bg-white/5 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-white/50 border border-white/5">
                        {item.topic}
                    </span>
                  </div>

                  {/* İÇERİK */}
                  <h3 className="text-xl font-bold mb-6 uppercase tracking-tight leading-tight group-hover:text-[#D4AF37] transition-colors duration-500">
                    {item.meta_title}
                  </h3>
                  
                  <div className="text-sm text-white/50 leading-relaxed font-medium space-y-4">
                     {/* Gövde metni (İlk 250 karakteri göster, hoverda tamamını aç) */}
                     <p className="line-clamp-5 group-hover:line-clamp-none transition-all duration-1000 ease-in-out">
                        {item.content_body}
                     </p>
                  </div>
                </div>

                {/* ALTIN PANEL AYIRICI (Characters sayfasındaki estetik) */}
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-20 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* FAQ SNEAK PEEK (Opsiyonel) */}
                <div className="px-8 py-4 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-[8px] font-black text-cyan-400 tracking-widest uppercase">Deep Insight Available</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="py-16 text-center border-t border-white/5 bg-black mt-auto">
         <div className="max-w-7xl mx-auto px-6">
            <p className="text-[10px] text-slate-700 font-bold tracking-[0.5em] uppercase mb-4 italic">Global Insight Engine v3.0</p>
            <p className="text-[9px] text-slate-800 tracking-[0.2em] uppercase">© 2026 GEMICHA | ALL CELESTIAL RIGHTS RESERVED</p>
         </div>
      </footer>
    </div>
  );
}