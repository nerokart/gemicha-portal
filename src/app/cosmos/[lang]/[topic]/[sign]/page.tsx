"use client";
import { useEffect, useState, Suspense } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { useParams, useSearchParams, useRouter } from 'next/navigation';

// Kendi klasör yapına göre import yolunu ayarla (../../../../../ veya ../../)
import { LANG_NAMES, ZODIAC_DICT, TOPICS_DICT, UI_DICT, slugify, getBaseIdFromLocalized, getUIString, safeUpper } from '../../../../../lib/cosmos-constants';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

// 1. ASIL KODUMUZ: Eski "export default function ZodiacArticle" adını "ZodiacArticleContent" yaptık
function ZodiacArticleContent() {
  const params = useParams(); 
  const searchParams = useSearchParams(); 
  const router = useRouter();

  const [insight, setInsight] = useState<any>(null);
  const [faqData, setFaqData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingState, setPlayingState] = useState<'idle' | 'playing' | 'paused'>('idle');

  const rawLang = decodeURIComponent((params?.lang as string) || 'en').trim();
  const rawTopic = decodeURIComponent((params?.topic as string) || '').trim();
  const rawSign = decodeURIComponent((params?.sign as string) || '').trim();

  const getTodayFormatted = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const adjustedDate = new Date(now.getTime() - (offset * 60 * 1000));
    return adjustedDate.toISOString().split('T')[0];
  };

  const rawDate = searchParams?.get('date') || getTodayFormatted();

  const dbTopic = getBaseIdFromLocalized(TOPICS_DICT, rawLang, rawTopic);
  const dbSign = getBaseIdFromLocalized(ZODIAC_DICT, rawLang, rawSign);

  const rtlLangs = ['ar', 'he', 'fa', 'ur'];
  const isRTL = rtlLangs.includes(rawLang);
  const trackingWidest = isRTL ? 'tracking-normal' : 'tracking-widest';
  const trackingWide = isRTL ? 'tracking-normal' : 'tracking-[0.4em]';
  const trackingTight = isRTL ? 'tracking-normal' : 'tracking-tighter';
  const fontItalic = isRTL ? 'not-italic' : 'italic';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.speechSynthesis?.cancel();
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    }

    if (insight) {
      const sName = getUIString(ZODIAC_DICT, rawLang, dbSign, dbSign);
      const tName = getUIString(TOPICS_DICT, rawLang, dbTopic, dbTopic);
      document.title = `${safeUpper(sName, rawLang)} ${safeUpper(tName, rawLang)} - ${insight?.target_date || ''} Daily Analysis | Gemicha`;

      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      const descText = insight?.content_body ? insight.content_body.substring(0, 160).replace(/\s+/g, ' ').trim() : "";
      metaDesc.setAttribute("content", descText + "...");
    }

    return () => { if (typeof window !== 'undefined') window.speechSynthesis?.cancel(); };
  }, [params?.lang, params?.topic, params?.sign, rawDate, insight, isRTL, rawLang, dbSign, dbTopic]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let mainQuery = supabase.from('gemicha_insights')
          .select('*')
          .ilike('language', rawLang)
          .ilike('topic', dbTopic)
          .ilike('zodiac_sign', dbSign)
          .eq('target_date', rawDate)
          .limit(1);

        const { data, error } = await mainQuery;
        
        if (error) throw error;

        if (data && data[0]) {
           setInsight(data[0]);
           try { 
             setFaqData(typeof data[0].faq_schema === 'string' ? JSON.parse(data[0].faq_schema) : data[0].faq_schema); 
           } catch(e) { setFaqData([]); }
        } else {
           setInsight(null);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [rawLang, dbTopic, dbSign, rawDate]);

  const handleLangChange = (newLang: string) => {
    localStorage.setItem('gemicha_lang', newLang);
    const newTopicSlug = slugify(getUIString(TOPICS_DICT, newLang, dbTopic, dbTopic));
    const newSignSlug = slugify(getUIString(ZODIAC_DICT, newLang, dbSign, dbSign));
    router.push(`/cosmos/${newLang}/${newTopicSlug}/${newSignSlug}${rawDate ? `?date=${rawDate}` : ''}`);
  };

  const handleDateChange = (newDate: string) => {
    const tSlug = slugify(getUIString(TOPICS_DICT, rawLang, dbTopic, dbTopic));
    const sSlug = slugify(getUIString(ZODIAC_DICT, rawLang, dbSign, dbSign));
    router.push(`/cosmos/${rawLang}/${tSlug}/${sSlug}?date=${newDate}`);
  };

  const toggleAudio = () => {
    if (typeof window === 'undefined' || !insight?.content_body) return;
    if (playingState === 'playing') { window.speechSynthesis.pause(); setPlayingState('paused'); return; }
    if (playingState === 'paused') { window.speechSynthesis.resume(); setPlayingState('playing'); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(insight.content_body);
    utterance.lang = rawLang;
    utterance.onend = () => setPlayingState('idle');
    setPlayingState('playing');
    window.speechSynthesis.speak(utterance);
  };
  const stopAudio = () => { if (typeof window !== 'undefined') window.speechSynthesis.cancel(); setPlayingState('idle'); };

  if (loading) return <div className="min-h-screen bg-black flex justify-center items-center"><div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div></div>;

  if (!insight) return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10 font-['Plus_Jakarta_Sans',sans-serif]">
        <h1 className="text-[#D4AF37] text-4xl font-black mb-4 uppercase italic">Data Missing</h1>
        <p className="mb-6 text-white/50 text-center">No cosmic data found for {rawSign} in {rawLang} on {rawDate}.</p>
        <Link href="/cosmos" className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase hover:bg-white/10 transition">Return to Cosmos</Link>
      </div>
  );

  const displaySign = getUIString(ZODIAC_DICT, rawLang, dbSign, dbSign);
  const displayTopic = getUIString(TOPICS_DICT, rawLang, dbTopic, dbTopic);

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="bg-black text-white min-h-screen font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#D4AF37] selection:text-black flex flex-col overflow-x-hidden">
      <nav className="h-20 flex items-center border-b border-white/5 sticky top-0 z-50 bg-black/95 px-2 md:px-6 backdrop-blur-md shrink-0 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center gap-1 md:gap-2 flex-nowrap">
          <Link href="/" className="flex items-center gap-1.5 md:gap-3 group shrink-0">
            <img src="https://gemicha-portal.vercel.app/logo.png" className="h-6 md:h-10 rounded-lg" alt="Gemicha Logo" />
            <span className={`text-[10px] sm:text-sm md:text-xl font-black text-white shrink-0 ${trackingWidest}`}>{safeUpper("GEMICHA", rawLang)}</span>
          </Link>
          <div className="flex items-center gap-2 md:gap-6 flex-nowrap shrink-0">
             <div className="hidden md:flex items-center gap-2 md:gap-6 shrink-0">
                <Link href="/" className={`text-[8px] sm:text-[10px] md:text-xs font-black text-white/50 hover:text-white transition whitespace-nowrap shrink-0 ${trackingWidest}`}>
                    <i className="fa-solid fa-house me-1 md:me-1.5"></i> {safeUpper(getUIString(UI_DICT, rawLang, 'home', 'HOME'), rawLang)}
                </Link>
                <Link href="/cosmos" className={`text-[8px] sm:text-[10px] md:text-xs font-black text-white/50 hover:text-white transition whitespace-nowrap shrink-0 ${trackingWidest}`}>
                    <i className="fa-solid fa-meteor me-1 md:me-1.5"></i> {safeUpper(getUIString(UI_DICT, rawLang, 'cosmos', 'COSMOS'), rawLang)}
                </Link>
             </div>
             <div className="h-4 w-[1px] bg-white/10 hidden md:block shrink-0"></div>
             <select value={rawLang} onChange={(e) => handleLangChange(e.target.value)} className="bg-[#111] border border-white/20 rounded px-1.5 md:px-2 py-1 text-[8px] sm:text-[10px] md:text-xs font-bold uppercase outline-none cursor-pointer w-auto whitespace-nowrap shrink-0">
               {Object.entries(LANG_NAMES).map(([code, fallbackName]) => {
                  let displayLangName = fallbackName;
                  try {
                      const translated = new Intl.DisplayNames([rawLang], { type: 'language' }).of(code);
                      if (translated) displayLangName = translated;
                  } catch (e) {}
                  return <option key={code} value={code} className="bg-[#111]">{displayLangName}</option>
               })}
             </select>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 flex-col md:flex-row">
        <aside className="w-full md:w-[450px] bg-[#020202] border-e border-white/5 p-8 md:p-12 flex flex-col shrink-0 overflow-hidden">
           <div className="mb-6 w-full">
              <span className={`bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 text-[9px] font-black px-4 py-2 rounded-full mb-6 inline-block ${trackingWide}`}>
                {safeUpper(`NEURAL ${displayTopic}`, rawLang)}
              </span>
              <h1 className={`text-3xl md:text-4xl lg:text-5xl font-black leading-[0.85] mb-4 break-words w-full overflow-hidden ${fontItalic} ${trackingTight}`}>
                {safeUpper(displaySign, rawLang)}
              </h1>
           </div>
           <div className="relative rounded-[2rem] overflow-hidden border border-white/5 mb-8 group aspect-square shadow-2xl shadow-cyan-500/5">
              <img src={`https://gemicha-portal.vercel.app/images/zodiac/${dbSign}.webp`} className="w-full h-full object-cover transition-transform duration-1000 scale-105" alt={dbSign} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent"></div>
           </div>
           <div className="mb-6">
              <input type="date" value={rawDate} onChange={(e) => handleDateChange(e.target.value)} onClick={(e) => (e.target as HTMLInputElement).showPicker?.()} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white outline-none focus:border-cyan-400 transition-all cursor-pointer" />
           </div>
           <div className="space-y-2 mb-8 w-full">
              {['ask', 'kariyer', 'saglik', 'para'].map(t => {
                 const isCurrent = t === dbTopic;
                 const tSlug = slugify(getUIString(TOPICS_DICT, rawLang, t, t));
                 const sSlug = slugify(getUIString(ZODIAC_DICT, rawLang, dbSign, dbSign));
                 return (
                   <Link key={t} href={`/cosmos/${rawLang}/${tSlug}/${sSlug}${rawDate ? `?date=${rawDate}` : ''}`} className={`w-full text-start p-3 rounded-xl text-[10px] font-black border transition-all flex justify-between items-center break-words ${isCurrent ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' : 'bg-white/5 border-transparent text-gray-500 hover:text-white'}`}>
                     {safeUpper(getUIString(TOPICS_DICT, rawLang, t, t), rawLang)}
                     {isCurrent && <div className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan]"></div>}
                   </Link>
                 );
              })}
           </div>
           <div className="mt-auto p-6 bg-red-500/5 border border-red-500/10 rounded-3xl w-full">
              <p className={`text-[9px] font-black text-red-400 mb-2 flex items-center gap-2 ${trackingWidest}`}>
                <i className="fa-solid fa-triangle-exclamation"></i> {safeUpper(getUIString(UI_DICT, rawLang, 'legal', 'Legal Disclaimer'), rawLang)}
              </p>
              <p className="text-[11px] text-white/50 leading-relaxed font-medium">
                {getUIString(UI_DICT, rawLang, 'warning', 'These analyses are AI-generated based on astronomical data. Commercial use or sharing for profit is strictly prohibited.')}
              </p>
           </div>
        </aside>

        <main className="flex-1 bg-black p-8 md:p-20 overflow-y-auto relative no-scrollbar">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 w-full">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white/90 break-words w-full">
                {safeUpper(insight?.meta_title || "", rawLang)}
              </h2>
              <div className="flex items-center gap-2 mb-10 p-2 bg-white/5 rounded-2xl border border-white/10 w-max shadow-2xl shadow-black">
                  <div className="px-3 border-e border-white/10">
                      <i className={`fa-solid ${playingState === 'playing' ? 'fa-waveform text-cyan-400 animate-pulse' : 'fa-volume-high text-slate-500'}`}></i>
                  </div>
                  <button onClick={toggleAudio} className="hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-400 p-3 rounded-xl transition group flex items-center justify-center w-10 h-10">
                      <i className={`fa-solid ${playingState === 'playing' ? 'fa-pause' : 'fa-play rtl:rotate-180'} text-xl group-hover:scale-110 transition-transform`}></i>
                  </button>
                  <div className="w-[1px] h-6 bg-white/10 mx-1"></div>
                  <button onClick={stopAudio} className="hover:bg-red-500/10 p-3 rounded-xl transition text-slate-500 hover:text-red-500 flex items-center justify-center w-10 h-10">
                      <i className="fa-solid fa-stop text-xl"></i>
                  </button>
              </div>
              <p className={`text-2xl md:text-3xl font-light text-[#D4AF37] leading-relaxed opacity-90 border-s-4 border-[#D4AF37] ps-8 ${fontItalic}`}>
                {getUIString(UI_DICT, rawLang, 'quote', '"The stars do not compel, they impel. This is your personal cosmic weather report."')}
              </p>
            </div>
            <article className="prose prose-invert max-w-none">
              <div className="text-xl leading-[2.1] text-white/70 space-y-12 first-letter:text-8xl first-letter:font-black first-letter:text-[#D4AF37] first-letter:me-5 first-letter:float-start first-letter:mt-3 break-words">
                {insight?.content_body || ""}
              </div>
            </article>
            <section className="mt-20 pt-20 border-t border-white/5">
              <div className="grid gap-6">
                {faqData && faqData.length > 0 && faqData.map((faq: any, idx: number) => (
                  <div key={idx} className="bg-white/5 p-10 rounded-[3rem] border border-white/5 hover:border-cyan-500/30 transition-all group">
                    <p className={`text-cyan-400 font-black text-xs mb-4 ${trackingWidest}`}>
                      {safeUpper(`Q: ${faq?.question || ""}`, rawLang)}
                    </p>
                    <p className={`text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors ${fontItalic}`}>
                      A: {faq?.answer || ""}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
      <footer className="py-12 text-center border-t border-white/5 bg-black mt-auto shrink-0 z-50">
          <div className={`max-w-7xl mx-auto flex flex-col gap-6 px-6 text-[10px] text-slate-600 font-bold ${trackingWide}`}>
              <nav className="flex justify-center flex-wrap gap-8">
                  <Link href="/" className="hover:text-white transition">{safeUpper(getUIString(UI_DICT, rawLang, 'home', 'Home'), rawLang)}</Link>
                  <Link href="/characters" className="hover:text-white transition">{safeUpper(getUIString(UI_DICT, rawLang, 'char', 'Characters'), rawLang)}</Link>
                  <Link href="/privacy" className="hover:text-white transition">{safeUpper(getUIString(UI_DICT, rawLang, 'priv', 'Privacy Policy'), rawLang)}</Link>
                  <Link href="/terms" className="hover:text-white transition">{safeUpper(getUIString(UI_DICT, rawLang, 'terms', 'Terms of Service'), rawLang)}</Link>
              </nav>
              <p className={`text-[9px] text-slate-800 pt-4 border-t border-white/5 ${trackingWide}`}>© 2026 GEMICHA | ALL CELESTIAL RIGHTS RESERVED</p>
          </div>
      </footer>
    </div>
  );
}

// 2. YENİ EKLENEN KISIM: Next.js'in Build Sırasında İstediği Kalkan (<Suspense>)
export default function ZodiacArticle() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex justify-center items-center"><div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div></div>}>
      <ZodiacArticleContent />
    </Suspense>
  );
}
