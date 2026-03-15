"use client";
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
// DİKKAT: Sadece 2 adım geriye (../../) gidiyor, çünkü bu dosya src/app/cosmos içinde
import { LANG_NAMES, ZODIAC_SIGNS, ZODIAC_DICT, TOPICS_DICT, UI_DICT, safeUpper, getUIString, slugify } from '../../lib/cosmos-constants';

function CosmosPageContent() {
  const [lang, setLang] = useState('en');
  // Client'ta render edilip edilmediğini kontrol eden state eklendi
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Tarayıcı ortamına geçildiğinde mounted'ı true yap ve dili al
    setMounted(true);
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('gemicha_lang') || 'en';
      setLang(savedLang);
    }
  }, []);

  const handleLangChange = (newLang: string) => {
    setLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('gemicha_lang', newLang);
    }
  };

  // Sayfa yüklenmeden önce (sunucuda) UI farklılıklarını önlemek için null dön
  if (!mounted) {
    return <div className="min-h-screen bg-black" />; 
  }

  const rtlLangs = ['ar', 'he', 'fa', 'ur'];
  const isRTL = rtlLangs.includes(lang);
  const trackingWidest = isRTL ? 'tracking-normal' : 'tracking-widest';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="bg-black text-white min-h-screen font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#D4AF37] selection:text-black flex flex-col overflow-x-hidden">
      <nav className="h-20 flex items-center border-b border-white/5 sticky top-0 z-50 bg-black/95 px-2 md:px-6 backdrop-blur-md shrink-0 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center gap-1 md:gap-2 flex-nowrap">
          <Link href="/" className="flex items-center gap-1.5 md:gap-3 group shrink-0">
            <img src="https://gemicha-portal.vercel.app/logo.png" className="h-6 md:h-10 rounded-lg" alt="Gemicha Logo" />
            <span className={`text-[10px] sm:text-sm md:text-xl font-black text-white shrink-0 ${trackingWidest}`}>{safeUpper("GEMICHA", lang)}</span>
          </Link>
          <div className="flex items-center gap-2 md:gap-6 flex-nowrap shrink-0">
             <select value={lang} onChange={(e) => handleLangChange(e.target.value)} className="bg-[#111] border border-white/20 rounded px-1.5 md:px-2 py-1 text-[8px] sm:text-[10px] md:text-xs font-bold uppercase outline-none cursor-pointer w-auto whitespace-nowrap shrink-0">
               {Object.entries(LANG_NAMES).map(([code, fallbackName]) => {
                  let displayLangName = fallbackName;
                  try {
                      const translated = new Intl.DisplayNames([lang], { type: 'language' }).of(code);
                      if (translated) displayLangName = translated;
                  } catch (e) {}
                  return <option key={code} value={code} className="bg-[#111]">{displayLangName}</option>
               })}
             </select>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-12">
        <h1 className="text-4xl md:text-6xl font-black text-center mb-12 text-[#D4AF37] italic uppercase">
          {getUIString(UI_DICT, lang, 'cosmos', 'COSMOS')}
        </h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {ZODIAC_SIGNS.map((sign) => {
            const displaySign = getUIString(ZODIAC_DICT, lang, sign, sign);
            const signSlug = slugify(displaySign);
            // Varsayılan olarak hep "ask" konusuna yönlendirsin (onu da o dile çevirip slug yapsın)
            const defaultTopicSlug = slugify(getUIString(TOPICS_DICT, lang, 'ask', 'ask'));
            
            return (
              <Link 
                key={sign} 
                href={`/cosmos/${lang}/${defaultTopicSlug}/${signSlug}`}
                className="group relative rounded-2xl overflow-hidden border border-white/10 aspect-[3/4] hover:border-cyan-400 transition-all"
              >
                <img src={`https://gemicha-portal.vercel.app/images/zodiac/${sign}.webp`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt={displaySign} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end justify-center pb-6">
                  <span className="text-white font-black uppercase tracking-widest text-sm drop-shadow-lg">
                    {displaySign}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default function CosmosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex justify-center items-center"><div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div></div>}>
      <CosmosPageContent />
    </Suspense>
  );
}
