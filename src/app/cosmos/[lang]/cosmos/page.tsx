"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// Supabase bağlantısını senin veritabanına göre ekledik (Satır silmiyoruz, ekliyoruz)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const SIGNS = [
  { id: 'koc', name: 'Aries' }, { id: 'boga', name: 'Taurus' }, { id: 'ikizler', name: 'Gemini' },
  { id: 'yengec', name: 'Cancer' }, { id: 'aslan', name: 'Leo' }, { id: 'basak', name: 'Virgo' },
  { id: 'terazi', name: 'Libra' }, { id: 'akrep', name: 'Scorpio' }, { id: 'yay', name: 'Sagittarius' },
  { id: 'oglak', name: 'Capricorn' }, { id: 'kova', name: 'Aquarius' }, { id: 'balik', name: 'Pisces' }
];

const TOPICS = ['kariyer', 'ask', 'saglik', 'para'];

const LANG_NAMES: Record<string, string> = { 
    tr: "Türkçe", en: "English", es: "Español", pt: "Português", fr: "Français", de: "Deutsch" 
};

export default function CosmosPortal({ params }: { params: { lang: string } }) {
  const [selectedTopic, setSelectedTopic] = useState('ask');
  const [currentLang, setCurrentLang] = useState(params.lang || 'tr'); // Varsayılanı tr yaptık
  const [insights, setInsights] = useState<any[]>([]);

  // Veritabanından verileri çekme mantığı (Senin istediğin o kategori-burç eşleşmesi için)
  useEffect(() => {
    const savedLang = localStorage.getItem('gemicha_lang') || 'tr';
    setCurrentLang(savedLang);
  }, []);

  const handleLangChange = (newLang: string) => {
    localStorage.setItem('gemicha_lang', newLang);
    window.location.href = `/cosmos/${newLang}`; // Yönlendirme artık /cosmos üzerinden
  };

  return (
    <div className="bg-black min-h-screen text-white font-['Plus_Jakarta_Sans',sans-serif] selection:bg-white selection:text-black">
      
      {/* 1. NAV BAR */}
      <nav className="h-20 flex items-center border-b border-white/5 sticky top-0 z-50 bg-black/80 backdrop-blur-md px-4 md:px-6">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Gemicha" className="h-10 w-auto rounded-lg" />
            <span className="text-xl font-extrabold tracking-widest uppercase">GEMICHA</span>
          </a>
          
          <div className="flex items-center gap-6">
            <a href="/characters" className="text-[10px] font-black uppercase text-white/70 hover:text-white transition">CHARACTERS</a>
            
            <select 
              value={currentLang} 
              onChange={(e) => handleLangChange(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-[9px] font-bold uppercase text-white outline-none cursor-pointer hover:bg-white/10"
            >
              {Object.entries(LANG_NAMES).map(([code, name]) => (
                <option key={code} value={code} className="bg-[#111]">{name}</option>
              ))}
            </select>
          </div>
        </div>
      </nav>

      {/* 2. KATEGORİ SEÇİCİ */}
      <header className="pt-16 pb-8 text-center">
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-8 uppercase bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
          COSMIC <span className="text-[#D4AF37]">INDEX</span>
        </h1>
        <div className="flex flex-wrap justify-center gap-3 px-6">
          {TOPICS.map(topic => (
            <button 
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border transition-all duration-300 ${
                selectedTopic === topic 
                ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-[0_0_25px_rgba(212,175,55,0.4)]' 
                : 'border-white/10 text-white/40 hover:border-white/30'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </header>

      {/* 3. BURÇ GRIDİ */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {SIGNS.map(sign => (
            <Link 
              key={sign.id} 
              // DİKKAT: Burası artık /cosmos ile başlıyor ki gemicha.com/cosmos/... çalışsın
              href={`/cosmos/${currentLang}/${selectedTopic}/${sign.id}`}
              className="group relative aspect-[3/4] rounded-[2rem] overflow-hidden border border-white/5 bg-[#0a0a0a] transition-all duration-500 hover:translate-y-[-8px] hover:shadow-[0_20px_40px_rgba(212,175,55,0.25)] hover:border-[#D4AF37]/30"
            >
              <img 
                src={`/images/zodiac/${sign.id}.jpg`} 
                alt={sign.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-1000 group-hover:scale-110 opacity-50 group-hover:opacity-100" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <div className="absolute bottom-8 left-0 right-0 text-center px-4">
                <span className="text-[#D4AF37] text-[9px] font-black tracking-[0.4em] uppercase block mb-2 opacity-60 group-hover:opacity-100 transition-opacity">DAILY ANALYSIS</span>
                <h3 className="text-3xl font-bold uppercase italic tracking-tighter group-hover:text-[#D4AF37] transition-colors duration-500">{sign.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="py-12 text-center border-t border-white/5 opacity-40">
         <p className="text-[10px] font-bold tracking-[0.4em] uppercase">© 2026 GEMICHA COSMOS</p>
      </footer>
    </div>
  );
}