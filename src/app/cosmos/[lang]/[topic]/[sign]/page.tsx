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
  // 1. KRİTİK HATA ÇÖZÜMÜ: params nesnesi await edilmeli
  const resolvedParams = await params;
  const cleanLang = decodeURIComponent(resolvedParams.lang).trim();
  const cleanTopic = decodeURIComponent(resolvedParams.topic).trim();
  const cleanSign = decodeURIComponent(resolvedParams.sign).trim();

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
        <h1 className="text-[#D4AF37] text-4xl font-black mb-4 uppercase">Kayıp Kayıt</h1>
        <p className="text-white/40 text-sm mb-8 italic">"{cleanLang} - {cleanTopic} - {cleanSign}" veritabanında bulunamadı.</p>
        <Link href="/cosmos" className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase hover:bg-white/10 transition">Geri Dön</Link>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#D4AF37] selection:text-black">
      {/* BLOG TARZI NAV BAR */}
      <nav className="h-20 flex items-center border-b border-white/5 sticky top-0 z-50 bg-black/95 px-6 backdrop-blur-md">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link href="/cosmos" className="flex items-center gap-3 group">
            <img src="https://gemicha-portal.vercel.app/logo.png" alt="Logo" className="h-10 w-auto rounded-lg" />
            <span className="text-xl font-black tracking-widest uppercase">GEMICHA</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-[10px] font-black uppercase text-white/50 hover:text-white transition">HOME</Link>
            <div className="h-4 w-[1px] bg-white/10"></div>
            <span className="text-[10px] font-black uppercase text-[#D4AF37] tracking-[0.2em]">{cleanLang}</span>
          </div>
        </div>
      </nav>

      <main className="flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
        {/* SOL TARAF: BLOG SIDEBAR MANTIĞI */}
        <aside className="w-full md:w-[400px] border-r border-white/5 bg-[#050505] p-8 md:p-12 shrink-0">
          <div className="sticky top-32">
             <div className="flex items-center gap-2 mb-8">
                <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 text-[9px] font-black rounded-full uppercase tracking-widest">
                  {cleanTopic} Report
                </span>
             </div>
             
             <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-[0.9] mb-8">
               {ZODIAC_DICT[cleanLang]?.[cleanSign] || cleanSign} <br/>
               <span className="text-white/20">Cosmic Analysis</span>
             </h1>

             <div className="space-y-6">
                <div className="p-6 bg-white/5 border border-white/5 rounded-3xl group hover:border-[#D4AF37]/30 transition-all">
                   <p className="text-[10px] font-black text-white/30 uppercase mb-2 tracking-widest">Target Date</p>
                   <p className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">{insight.target_date}</p>
                </div>
                
                <div className="p-6 bg-white/5 border border-white/5 rounded-3xl">
                   <p className="text-[10px] font-black text-white/30 uppercase mb-4 tracking-widest">Sign Status</p>
                   <img 
                     src={`https://gemicha-portal.vercel.app/images/zodiac/${cleanSign}.webp`} 
                     className="w-full h-40 object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700" 
                     alt={cleanSign}
                   />
                </div>
             </div>
          </div>
        </aside>

        {/* SAĞ TARAF: BLOG MAKALE MANTIĞI */}
        <div className="flex-1 bg-black p-8 md:p-20 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            {/* Dramatik Spot Metni */}
            <p className="text-2xl md:text-3xl font-light italic text-[#D4AF37] mb-20 border-l-2 border-[#D4AF37] pl-10 leading-relaxed opacity-90">
              "The stars do not compel, they impel. This is your neural cosmic map for the current structural cycle."
            </p>

            {/* Ana İçerik - Blog Stili */}
            <div className="prose prose-invert max-w-none">
              <div className="text-xl leading-[2] text-white/70 space-y-10 first-letter:text-7xl first-letter:font-black first-letter:text-[#D4AF37] first-letter:mr-4 first-letter:float-left first-letter:mt-2">
                {insight.content_body}
              </div>
            </div>

            {/* FAQ / Soru-Cevap Alanı */}
            <section className="mt-32 pt-20 border-t border-white/5">
              <h4 className="text-[10px] font-black tracking-[0.5em] uppercase text-cyan-500 mb-12">Neural FAQ Matrix</h4>
              <div className="space-y-6">
                {JSON.parse(insight.faq_schema || "[]").map((faq: any, idx: number) => (
                  <div key={idx} className="bg-white/5 p-10 rounded-[2.5rem] border border-white/5 group hover:border-cyan-500/30 transition-all">
                    <p className="text-cyan-400 font-black text-xs mb-4 uppercase tracking-widest leading-relaxed">Q: {faq.question}</p>
                    <p className="text-white/40 text-sm leading-[1.8] font-medium italic">A: {faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Footer Alanı */}
            <footer className="mt-32 pt-20 border-t border-white/5 text-center md:text-left">
               <p className="text-[10px] text-slate-700 font-bold tracking-[0.5em] uppercase mb-4 italic">Neural Engine v3.14</p>
               <p className="text-[9px] text-slate-800 tracking-[0.2em] uppercase">© 2026 GEMICHA | ALL CELESTIAL RIGHTS RESERVED</p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
