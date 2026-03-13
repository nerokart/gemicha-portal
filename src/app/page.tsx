"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link'; // Yönlendirme için eklendi

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
    id: "Bahasa Indonesia", ms: "Bahasa Melayu", th: "ไทย", vi: "Tiếng Việt", 
    uk: "Українська", fa: "فارسی", ur: "اردو", ta: "தமிழ்", te: "తెలుగు", 
    bg: "Български", tl: "Tagalog", hr: "Hrvatski", sr: "Српски", sk: "Slovenčina", 
    sl: "Slovenščina", et: "Eesti", lv: "Latviešu", lt: "Lietuvių", ca: "Català", 
    az: "Azərbaycanca", kk: "Қазақша" 
};

// Filtreleme için Burç Listesi
const ZODIAC_SIGNS = [
  { id: 'aries', name: 'Aries', tr: 'Koç' }, { id: 'taurus', name: 'Taurus', tr: 'Boğa' },
  { id: 'gemini', name: 'Gemini', tr: 'İkizler' }, { id: 'cancer', name: 'Cancer', tr: 'Yengeç' },
  { id: 'leo', name: 'Leo', tr: 'Aslan' }, { id: 'virgo', name: 'Virgo', tr: 'Başak' },
  { id: 'libra', name: 'Libra', tr: 'Terazi' }, { id: 'scorpio', name: 'Scorpio', tr: 'Akrep' },
  { id: 'sagittarius', name: 'Sagittarius', tr: 'Yay' }, { id: 'capricorn', name: 'Capricorn', tr: 'Oğlak' },
  { id: 'aquarius', name: 'Aquarius', tr: 'Kova' }, { id: 'pisces', name: 'Pisces', tr: 'Balık' }
];

export default function GlobalCosmosPortal() {
  const [insights, setInsights] = useState<any[]>([]);
  const [lang, setLang] = useState('en');
  const [activeSign, setActiveSign] = useState('all'); // Filtreleme durumu
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

  // Filtreleme Mantığı
  const filteredInsights = activeSign === 'all' 
    ? insights 
    : insights.filter(i => i.zodiac_sign.toLowerCase() === activeSign.toLowerCase());

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

          {/* BURÇ FİLTRELEME BARIN (Yeni eklendi) */}
          <div className="flex gap-3 overflow-x-auto py-4 no-scrollbar justify-start md:justify-center">
            <button 
              onClick={() => setActiveSign('all')}
              className={`px-6 py-2 rounded-full border text-[9px] font-black uppercase transition-all ${activeSign === 'all' ? 'bg-[#D4AF37] border-[#D4AF37] text-black' : 'border-white/10 text-white/40'}`}
            >
              ALL
            </button>
            {ZODIAC_SIGNS.map(s => (
              <button 
                key={s.id}
                onClick={() => setActiveSign(s.id)}
                className={`px-6 py-2 rounded-full border text-[9px] font-black uppercase whitespace-nowrap transition-all ${activeSign === s.id ? 'bg-[#D4AF37] border-[#D4AF37] text-black' : 'border-white/10 text-white/40'}`}
              >
                {lang === 'tr' ? s.tr : s.name}
              </button>
            ))}
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
             <div className="w-12 h-12 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin"></div>
             <p className="text-[10px] font-black tracking-[0.5em] text-cyan-400 animate-pulse uppercase">Syncing with Stars...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInsights.map((item) => (
              <Link 
                key={item.id} 
                href={`/${lang}/cosmos/${item.topic.toLowerCase()}/${item.zodiac_sign.toLowerCase()}`}
                className="group relative rounded-[2.5rem] overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500"
              >
                {/* BURÇ GÖRSELİ (Yeni eklendi) */}
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img 
                    src={`/images/zodiac/${item.zodiac_sign.toLowerCase()}.jpg`} 
                    alt={item.zodiac_sign}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                  
                  {/* KART İÇERİĞİ OVERLAY */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex flex-col">
                          <span className="text-[#D4AF37] font-black text-xs uppercase tracking-[0.3em]">{item.zodiac_sign}</span>
                          <span className="text-[9px] text-white/40 font-bold uppercase">{item.target_date}</span>
                      </div>
                      <span className="bg-white/5 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-white/50 border border-white/5">
                          {item.topic}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-4 uppercase tracking-tight leading-tight group-hover:text-[#D4AF37] transition-colors duration-500">
                      {item.meta_title}
                    </h3>

                    <div className="text-xs text-white/50 leading-relaxed font-medium line-clamp-3">
                      {item.content_body}
                    </div>
                  </div>
                </div>

                <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-20 group-hover:opacity-100 transition-opacity duration-700"></div>
              </Link>
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
