"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { LANG_NAMES, ZODIAC_DICT, TOPICS_DICT, UI_DICT, slugify, getBaseIdFromLocalized, getUIString, safeUpper } from '../../../../../lib/cosmos-constants';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function ZodiacArticle() {
  const params = useParams(); 
  const searchParams = useSearchParams(); 
  const router = useRouter();

  const [insight, setInsight] = useState<any>(null);
  const [faqData, setFaqData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingState, setPlayingState] = useState<'idle' | 'playing' | 'paused'>('idle');

  const rawLang = decodeURIComponent((params.lang as string) || 'en').trim();
  const rawTopic = decodeURIComponent((params.topic as string) || '').trim();
  const rawSign = decodeURIComponent((params.sign as string) || '').trim();
  const rawDate = searchParams.get('date');

  // URL'deki kelimeleri (örn: karriere, skorpion) veritabanı ID'lerine çevir
  const dbTopic = getBaseIdFromLocalized(TOPICS_DICT, rawLang, rawTopic);
  const dbSign = getBaseIdFromLocalized(ZODIAC_DICT, rawLang, rawSign);

  useEffect(() => {
    const fetchData = async () => {
      let mainQuery = supabase
        .from('gemicha_insights')
        .select('*')
        .ilike('language', rawLang)
        .ilike('topic', dbTopic)
        .ilike('zodiac_sign', dbSign)
        .order('target_date', { ascending: false })
        .limit(1);
        
      if (rawDate) mainQuery = mainQuery.eq('target_date', rawDate);
      const { data } = await mainQuery;
      
      if (data && data[0]) {
         setInsight(data[0]);
         try { 
            setFaqData(typeof data[0].faq_schema === 'string' ? JSON.parse(data[0].faq_schema) : data[0].faq_schema); 
         } catch(e) {}
      }
      setLoading(false);
    };
    fetchData();
  }, [rawLang, dbTopic, dbSign, rawDate]);

  // Dil Değiştirici: Aynı burcun ve konunun yeni dildeki URL'sini bulup oraya gider
  const handleLangChange = (newLang: string) => {
    localStorage.setItem('gemicha_lang', newLang);
    const newTopicSlug = slugify(getUIString(TOPICS_DICT, newLang, dbTopic, dbTopic));
    const newSignSlug = slugify(getUIString(ZODIAC_DICT, newLang, dbSign, dbSign));
    router.push(`/cosmos/${newLang}/${newTopicSlug}/${newSignSlug}${rawDate ? `?date=${rawDate}` : ''}`);
  };

  // BLOG TARZI SES MOTORU
  const toggleAudio = () => {
    if (typeof window === 'undefined') return;
    if (playingState === 'playing') { window.speechSynthesis.pause(); setPlayingState('paused'); return; }
    if (playingState === 'paused') { window.speechSynthesis.resume(); setPlayingState('playing'); return; }
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(insight.content_body);
    utterance.lang = rawLang;
    utterance.onend = () => setPlayingState('idle');
    setPlayingState('playing');
    window.speechSynthesis.speak(utterance);
  };
  const stopAudio = () => { window.speechSynthesis.cancel(); setPlayingState('idle'); };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!insight) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10 font-['Plus_Jakarta_Sans',sans-serif]">
        <h1 className="text-[#D4AF37] text-4xl font-black mb-4 uppercase italic">Data Missing</h1>
        <p className="text-white/40 text-sm mb-8 italic">The stars could not find data for this specific alignment.</p>
        <Link href="/cosmos" className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase hover:bg-white/10 transition">Return to Cosmos</Link>
      </div>
    );
  }

  // Ekranda Gösterilecek Kelimeler
  const displaySign = getUIString(ZODIAC_DICT, rawLang, dbSign, dbSign);
  const displayTopic = getUIString(TOPICS_DICT, rawLang, dbTopic, dbTopic);

  return (
    <div className="bg-black text-white min-h-screen font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#D4AF37] selection:text-black flex flex-col overflow-x-hidden">
      
      {/* SİTE STANDART NAV BAR */}
      <nav className="h-20 flex items-center border-b border-white/5 sticky top-0 z-50 bg-black/95 px-6 backdrop-blur-md shrink-0">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link href="/cosmos" className="flex items-center gap-3 group">
            <img src="https://gemicha-portal.vercel.app/logo.png" className="h-10 rounded-lg" alt="Gemicha Logo" />
            <span className="text-xl font-black tracking-widest text-white">{safeUpper("GEMICHA", rawLang)}</span>
          </Link>
          <div className="flex items-center gap-6">
             <Link href="/cosmos" className="text-[10px] font-black tracking-widest text-white/50 hover:text-white hidden md:block transition">
               <i className="fa-solid fa-arrow-left mr-2"></i> {safeUpper(getUIString(UI_DICT, rawLang, 'back', 'BACK TO GRID'), rawLang)}
             </Link>
             <div className="h-4 w-[1px] bg-white/10 hidden md:block"></div>
             <select value={rawLang} onChange={(e) => handleLangChange(e.target.value)} className="bg-[#111] border border-white/20 rounded px-2 py-1 text-xs font-bold uppercase outline-none cursor-pointer">
                {Object.entries(LANG_NAMES).map(([code, name]) => <option key={code} value={code} className="bg-[#111]">{name}</option>)}
             </select>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 flex-col md:flex-row">
        
        {/* SOL PANEL */}
        <aside className="w-full md:w-[450px] bg-[#020202] border-r border-white/5 p-8 md:p-12 flex flex-col shrink-0">
           <div className="mb-6">
              <span className="bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 text-[9px] font-black px-4 py-2 rounded-full tracking-[0.3em] mb-6 inline-block">
                NEURAL {safeUpper(displayTopic, rawLang)}
              </span>
              <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-[0.85] mb-4">
                {safeUpper(displaySign, rawLang)}
              </h1>
           </div>

           <div className="relative rounded-[2rem] overflow-hidden border border-white/5 mb-8 group aspect-square shadow-2xl shadow-cyan-500/5">
              <img src={`https://gemicha-portal.vercel.app/images/zodiac/${dbSign}.webp`} className="w-full h-full object-cover transition-transform duration-1000 scale-105" alt={dbSign} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent"></div>
           </div>

           {/* Yasal Uyarı Köşesi */}
           <div className="mt-auto p-6 bg-red-500/5 border border-red-500/10 rounded-3xl">
              <p className="text-[9px] font-black text-red-400 tracking-widest mb-2 flex items-center gap-2 uppercase">
                <i className="fa-solid fa-triangle-exclamation"></i> {getUIString(UI_DICT, rawLang, 'legal', 'Legal Disclaimer')}
              </p>
              <p className="text-[11px] text-white/50 leading-relaxed font-medium">
                {getUIString(UI_DICT, rawLang, 'warning', 'These analyses are AI-generated. They do not constitute financial or medical advice.')}
              </p>
           </div>
        </aside>

        {/* MAKALE ALANI */}
        <main className="flex-1 bg-black p-8 md:p-20 overflow-y-auto relative no-scrollbar">
          <div className="max-w-3xl mx-auto">
            
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-white/90 uppercase">{insight.meta_title}</h2>
              
              {/* Orijinal Blog Stili Müzik Çalar Kapsülü */}
              <div className="flex items-center gap-2 mb-10 p-2 bg-white/5 rounded-2xl border border-white/10 w-max shadow-2xl shadow-black">
                  <div className="px-3 border-r border-white/10">
                      <i className={`fa-solid ${playingState === 'playing' ? 'fa-waveform text-cyan-400 animate-pulse' : 'fa-volume-high text-slate-500'}`}></i>
                  </div>
                  <button onClick={toggleAudio} className="hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-400 p-3 rounded-xl transition group flex items-center justify-center w-10 h-10">
                      <i className={`fa-solid ${playingState === 'playing' ? 'fa-pause' : 'fa-play'} text-xl group-hover:scale-110 transition-transform`}></i>
                  </button>
                  <div className="w-[1px] h-6 bg-white/10 mx-1"></div>
                  <button onClick={stopAudio} className="hover:bg-red-500/10 p-3 rounded-xl transition text-slate-500 hover:text-red-500 flex items-center justify-center w-10 h-10">
                      <i className="fa-solid fa-stop text-xl"></i>
                  </button>
              </div>

              {/* DİLE GÖRE DİNAMİK ALINTI */}
              <p className="text-2xl md:text-3xl font-light italic text-[#D4AF37] leading-relaxed opacity-90 border-l-4 border-[#D4AF37] pl-8">
                {getUIString(UI_DICT, rawLang, 'quote', '"The stars do not compel, they impel. This is your personal cosmic weather report."')}
              </p>
            </div>

            <article className="prose prose-invert max-w-none">
              <div className="text-xl leading-[2.1] text-white/70 space-y-12 first-letter:text-8xl first-letter:font-black first-letter:text-[#D4AF37] first-letter:mr-5 first-letter:float-left first-letter:mt-3">
                {insight.content_body}
              </div>
            </article>

            {/* Soru Cevap Alanı */}
            <section className="mt-20 pt-20 border-t border-white/5">
              <div className="grid gap-6">
                {faqData && Array.isArray(faqData) && faqData.map((faq: any, idx: number) => (
                  <div key={idx} className="bg-white/5 p-10 rounded-[3rem] border border-white/5 hover:border-cyan-500/30 transition-all">
                    <p className="text-cyan-400 font-black text-xs mb-4 uppercase tracking-widest">Q: {faq?.question}</p>
                    <p className="text-white/40 text-sm leading-relaxed italic">A: {faq?.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      <footer className="py-12 text-center border-t border-white/5 bg-black mt-auto shrink-0 z-50">
          <div className="max-w-7xl mx-auto flex flex-col gap-6 px-6 text-[10px] tracking-[0.4em] text-slate-600 font-bold">
              <nav className="flex justify-center flex-wrap gap-8">
                  <Link href="/" className="hover:text-white transition uppercase">{getUIString(UI_DICT, rawLang, 'home', 'Home')}</Link>
                  <Link href="/characters" className="hover:text-white transition uppercase">{getUIString(UI_DICT, rawLang, 'char', 'Characters')}</Link>
                  <Link href="/privacy" className="hover:text-white transition uppercase">{getUIString(UI_DICT, rawLang, 'priv', 'Privacy Policy')}</Link>
                  <Link href="/terms" className="hover:text-white transition uppercase">{getUIString(UI_DICT, rawLang, 'terms', 'Terms of Service')}</Link>
              </nav>
              <p className="text-[9px] text-slate-800 tracking-[0.6em] pt-4 border-t border-white/5 uppercase">© 2026 GEMICHA | ALL CELESTIAL RIGHTS RESERVED</p>
          </div>
      </footer>
    </div>
  );
}
