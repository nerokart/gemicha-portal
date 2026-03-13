import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

const ZODIAC_DICT: Record<string, Record<string, string>> = {
  tr: { koc: 'Koç', boga: 'Boğa', ikizler: 'İkizler', yengec: 'Yengeç', aslan: 'Aslan', basak: 'Başak', terazi: 'Terazi', akrep: 'Akrep', yay: 'Yay', oglak: 'Oğlak', kova: 'Kova', balik: 'Balık' },
  en: { koc: 'Aries', boga: 'Taurus', ikizler: 'Gemini', yengec: 'Cancer', aslan: 'Leo', basak: 'Virgo', terazi: 'Libra', akrep: 'Scorpio', yay: 'Sagittarius', oglak: 'Capricorn', kova: 'Aquarius', balik: 'Pisces' }
};

export default async function ZodiacArticle({ params }: { params: Promise<{ lang: string, topic: string, sign: string }> }) {
  
  const resolvedParams = await params; 
  const cleanLang = decodeURIComponent(resolvedParams.lang || 'en').trim();
  const cleanTopic = decodeURIComponent(resolvedParams.topic || '').trim();
  const cleanSign = decodeURIComponent(resolvedParams.sign || '').trim();

  const { data: insights } = await supabase
    .from('gemicha_insights')
    .select('*')
    .ilike('language', cleanLang)
    .ilike('topic', cleanTopic)
    .ilike('zodiac_sign', cleanSign)
    .order('created_at', { ascending: false })
    .limit(1);

  const insight = insights?.[0];

  if (!insight) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10 font-['Plus_Jakarta_Sans',sans-serif]">
        <h1 className="text-[#D4AF37] text-4xl font-black mb-4 uppercase italic">Data Missing</h1>
        <p className="text-white/40 text-sm mb-8 italic">Stars could not find this record: {cleanLang}/{cleanTopic}/{cleanSign}</p>
        <Link href="/cosmos" className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase hover:bg-white/10 transition">Back to Cosmos</Link>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#D4AF37] selection:text-black flex flex-col overflow-x-hidden">
      
      {/* NAV BAR - Blog Sayfası Stili */}
      <nav className="h-20 flex items-center border-b border-white/5 sticky top-0 z-50 bg-black/95 px-6 backdrop-blur-md shrink-0">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link href="/cosmos" className="flex items-center gap-3 group">
            <img src="https://gemicha-portal.vercel.app/logo.png" alt="Logo" className="h-10 w-auto rounded-lg" />
            <span className="text-xl font-black tracking-widest uppercase text-white">GEMICHA</span>
          </Link>
          <div className="flex items-center gap-4">
             <span className="text-[10px] font-black uppercase text-[#D4AF37] tracking-[0.2em]">{cleanLang}</span>
             <div className="h-4 w-[1px] bg-white/10"></div>
             <Link href="/cosmos" className="text-[10px] font-black uppercase text-white/50 hover:text-white transition">EXPLORE</Link>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 flex-col md:flex-row">
        
        {/* SIDEBAR - Blog Panel Mantığı */}
        <aside className="w-full md:w-[450px] bg-[#020202] border-r border-white/5 p-8 md:p-16 flex flex-col shrink-0">
           <div className="mb-8">
              <span className="bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-[0.3em] mb-8 inline-block">
                NEURAL {cleanTopic} REPORT
              </span>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.85] mb-6">
                {ZODIAC_DICT[cleanLang]?.[cleanSign] || cleanSign} <br/>
                <span className="text-white/10">Insight</span>
              </h1>
              <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">{insight.target_date}</p>
           </div>

           <div className="relative rounded-[2rem] overflow-hidden border border-white/5 mb-8 group shadow-2xl shadow-cyan-500/5">
              <img 
                src={`https://gemicha-portal.vercel.app/images/zodiac/${cleanSign}.webp`} 
                className="w-full h-64 object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105" 
                alt={cleanSign}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent"></div>
           </div>

           <div className="mt-auto p-6 bg-white/5 rounded-3xl border border-white/5">
              <p className="text-[9px] font-black text-cyan-400 uppercase tracking-widest mb-2">Cosmic Integrity</p>
              <p className="text-xs text-white/40 leading-relaxed italic">Neural architecture analysis complete. Data synchronized with planetary indices.</p>
           </div>
        </aside>

        {/* MAIN CONTENT AREA - Blog Makale Mantığı */}
        <main className="flex-1 bg-black p-8 md:p-20 overflow-y-auto custom-scrollbar">
          <div className="max-w-3xl mx-auto">
            
            {/* Apple Tarzı Dramatik Giriş */}
            <div className="mb-20">
              <p className="text-2xl md:text-4xl font-light italic text-[#D4AF37] leading-relaxed opacity-90 border-l-4 border-[#D4AF37] pl-8">
                "The stars do not compel, they impel. This is your personal cosmic weather report."
              </p>
            </div>

            {/* İçerik Gövdesi */}
            <article className="prose prose-invert max-w-none">
              <div className="text-xl leading-[2.1] text-white/70 space-y-12 first-letter:text-8xl first-letter:font-black first-letter:text-[#D4AF37] first-letter:mr-5 first-letter:float-left first-letter:mt-3">
                {insight.content_body}
              </div>
            </article>

            {/* FAQ - Soru-Cevap */}
            <section className="mt-32 pt-20 border-t border-white/5">
              <h3 className="text-[10px] font-black tracking-[0.6em] uppercase text-cyan-500 mb-12">Neural Q&A Matrix</h3>
              <div className="grid gap-6">
                {JSON.parse(insight.faq_schema || "[]").map((faq: any, idx: number) => (
                  <div key={idx} className="bg-white/5 p-10 rounded-[3rem] border border-white/5 hover:border-cyan-500/30 transition-all group">
                    <p className="text-cyan-400 font-black text-xs mb-4 uppercase tracking-widest">Q: {faq.question}</p>
                    <p className="text-white/40 text-sm leading-relaxed italic group-hover:text-white/60 transition-colors">A: {faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <footer className="mt-32 pb-20 opacity-20 text-center md:text-left shrink-0">
               <p className="text-[10px] font-black tracking-[0.5em] uppercase mb-2">GEMICHA NEURAL ENGINE v3.0</p>
               <p className="text-[9px] uppercase tracking-widest">© 2026 GEMICHA</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
