import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!);

export default async function ZodiacArticle({ params }: { params: { lang: string, topic: string, sign: string } }) {

  const { data: insights } = await supabase
    .from('gemicha_insights')
    .select('*')
    .ilike('language', params.lang)
    .ilike('topic', params.topic)
    .ilike('zodiac_sign', params.sign)
    .order('created_at', { ascending: false }) // En son eklenen yazıyı en üste al
    .limit(1); // Sadece 1 tanesini getir ki sayfa çökmesin

  const insight = insights?.[0];

  if (!insight) notFound();

  return (
    <article className="bg-[#050505] min-h-screen text-white">
      {/* 1. HERO AREA - Dramatik Blog Girişi */}
      <div className="relative h-[75vh] w-full flex items-end pb-20 overflow-hidden">
        {/* DİKKAT: Vercel Rewrite krizini aşmak için Absolute (Tam) Link kullanıldı */}
        <img src={`https://gemicha-portal.vercel.app/images/zodiac/${params.sign}.jpg`} className="absolute inset-0 w-full h-full object-cover opacity-40 scale-110 animate-slow-zoom" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-[#050505]" />
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-4 mb-6">
            <span className="bg-[#D4AF37] text-black text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{params.topic}</span>
            <span className="border border-white/20 text-white/50 text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{insight.target_date}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-4">
            {insight?.meta_title?.split(':')[0] || insight.meta_title}
          </h1>
        </div>
      </div>

      {/* 2. MAKALE GÖVDESİ */}
      <div className="max-w-3xl mx-auto px-6 py-24">
        {/* Vurgulu Spot Metni */}
        <p className="text-2xl font-light italic text-[#D4AF37] mb-16 border-l-2 border-[#D4AF37] pl-10 leading-relaxed opacity-90">
          "The stars do not compel, they impel. Understanding your {params.topic} cosmic weather for {insight.target_date}."
        </p>

        {/* Ana İçerik */}
        <div className="prose prose-invert prose-gold max-w-none">
          <div className="text-lg leading-[1.8] text-white/70 space-y-8 first-letter:text-6xl first-letter:font-black first-letter:text-[#D4AF37] first-letter:mr-4 first-letter:float-left">
            {insight.content_body}
          </div>
        </div>

        {/* 3. FAQ SECTION - Soru-Cevap Akordeon */}
        <section className="mt-24 pt-24 border-t border-white/5">
          <h4 className="text-xs font-black tracking-[0.5em] uppercase text-cyan-400 mb-12">Cosmic Q&A</h4>
          <div className="space-y-6">
            {JSON.parse(insight.faq_schema || "[]").map((faq: any, idx: number) => (
              <div key={idx} className="bg-white/5 p-8 rounded-[2rem] border border-white/5 group hover:border-[#D4AF37]/30 transition-all">
                <p className="text-[#D4AF37] font-bold text-sm mb-3">Q: {faq.question}</p>
                <p className="text-white/50 text-sm leading-relaxed">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
