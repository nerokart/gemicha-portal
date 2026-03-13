"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase Bağlantısı
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const LANGUAGES = {
  tr: "Türkçe", en: "English", es: "Español", fr: "Français", de: "Deutsch", 
  it: "Italiano", pt: "Português", ru: "Русский", hi: "हिन्दी", ar: "العربية"
};

export default function CosmicPortal() {
  const [insights, setInsights] = useState<any[]>([]);
  const [lang, setLang] = useState('tr');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // LocalStorage'dan dil tercihini al (Senin HTML'deki mantıkla aynı)
    const savedLang = localStorage.getItem('gemicha_lang') || 'tr';
    setLang(savedLang);
    fetchInsights(savedLang);
  }, []);

  const fetchInsights = async (selectedLang: string) => {
    setLoading(true);
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('gemicha_insights')
      .select('*')
      .eq('language', selectedLang)
      .order('zodiac_sign', { ascending: true });

    if (data) setInsights(data);
    setLoading(false);
  };

  const handleLangChange = (newLang: string) => {
    setLang(newLang);
    localStorage.setItem('gemicha_lang', newLang);
    fetchInsights(newLang);
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">
      {/* NAV BAR - Karakterler sayfasıyla aynı */}
      <nav className="h-20 flex items-center border-b border-white/5 sticky top-0 z-50 bg-black/80 backdrop-blur-md px-6">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Gemicha" className="h-10 w-auto rounded-lg" />
            <span className="text-xl font-extrabold tracking-widest uppercase">GEMICHA</span>
          </a>
          <div className="flex items-center gap-6">
            <a href="/lab" className="text-xs font-black uppercase text-white/70">LAB</a>
            <a href="/characters" className="text-xs font-black uppercase text-white/70">CHARACTERS</a>
            {/* DİL SWITCHER */}
            <select 
              value={lang}
              onChange={(e) => handleLangChange(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase outline-none cursor-pointer"
            >
              {Object.entries(LANGUAGES).map(([code, name]) => (
                <option key={code} value={code} className="bg-[#111]">{name}</option>
              ))}
            </select>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="pt-12 pb-20 px-6 max-w-7xl mx-auto w-full">
        <header className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 italic uppercase tracking-tighter">
            {lang === 'tr' ? 'KOZMİK ANALİZ' : 'COSMIC INSIGHTS'}
          </h1>
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 max-w-2xl mx-auto">
            <p className="text-[11px] text-white/40 leading-relaxed uppercase tracking-[0.3em]">
              {lang === 'tr' 
                ? 'Gerçek astronomik verilere dayalı günlük gökyüzü raporu.' 
                : 'Daily celestial analysis based on real-time astronomical data.'}
            </p>
          </div>
        </header>

        {/* INSIGHTS GRID */}
        {loading ? (
          <div className="text-center py-20 animate-pulse text-cyan-400 font-black tracking-widest">LOADING COSMOS...</div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insights.map((item) => (
              <div key={item.id} className="group relative rounded-[2.5rem] overflow-hidden bg-[#0a0a0a] border border-white/5 transition-all duration-500 hover:translate-y-[-8px] hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)]">
                {/* İÇERİK KISMI */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[#D4AF37] font-black text-xs uppercase tracking-[0.2em]">{item.zodiac_sign}</span>
                    <span className="bg-white/5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest text-white/40">{item.topic}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 uppercase tracking-tight leading-tight group-hover:text-[#D4AF37] transition-colors">
                    {item.meta_title}
                  </h3>
                  
                  <p className="text-sm text-white/60 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all duration-700">
                    {item.content_body}
                  </p>
                </div>

                {/* ALTIN PANEL EFEKTİ (Kartın altına ince bir çizgi veya hoverda beliren efekt) */}
                <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-30"></div>
              </div>
            ))}
          </section>
        )}
      </main>

      {/* FOOTER - Karakterler sayfasıyla aynı */}
      <footer className="py-12 text-center border-t border-white/5 bg-black mt-auto">
         <p className="text-[10px] text-slate-600 font-bold tracking-[0.4em] uppercase">© 2026 GEMICHA COSMOS</p>
      </footer>
    </div>
  );
}
