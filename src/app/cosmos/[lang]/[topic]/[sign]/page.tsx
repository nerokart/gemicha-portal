import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!);

export default async function ZodiacArticle({ params }: { params: { lang: string, topic: string, sign: string } }) {

  // 1. HAYAT KURTARAN HAMLE: URL'den gelen verileri temizleyelim (Kodlama ve boşluk hatalarını siler)
  const cleanLang = decodeURIComponent(params.lang).trim();
  const cleanTopic = decodeURIComponent(params.topic).trim();
  const cleanSign = decodeURIComponent(params.sign).trim();

  const { data: insights, error } = await supabase
    .from('gemicha_insights')
    .select('*')
    .ilike('language', cleanLang)
    .ilike('topic', cleanTopic)
    .ilike('zodiac_sign', cleanSign)
    .order('created_at', { ascending: false })
    .limit(1);

  const insight = insights?.[0];

  // 2. EĞER VERİ BULAMAZSA 404 YERİNE ÖZEL HATA EKRANI (Sorunun nerede olduğunu görelim)
  if (!insight) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-10 text-center font-['Plus_Jakarta_Sans',sans-serif]">
        <h1 className="text-[#D4AF37] text-6xl font-black mb-6 uppercase tracking-widest">Kayıp Kayıt</h1>
        <p className="text-white/60 text-lg max-w-lg mb-8">
          Yıldızlar bu analizi bulamadı. Veritabanında eşleşmeyen bilgiler şunlar:
        </p>
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl text-left space-y-4 font-mono text-sm">
          <p><span className="text-cyan-400">Aranan Dil:</span> {cleanLang}</p>
          <p><span className="text-cyan-400">Aranan Konu:</span> {cleanTopic}</p>
          <p><span className="text-cyan-400">Aranan Burç:</span> {cleanSign}</p>
          <p><span className="text-red-400">Not:</span> Bu 3 şarta uyan satır veritabanında yok. Engine (Python) kodundan bu dilin yayınlanıp yayınlanmadığını kontrol et.</p>
        </div>
      </div>
    );
  }

  // 3. EĞER VERİ BULUNURSA O MUHTEŞEM TASARIM VE RESİM DEVREYE GİRER
  return (
    <article className="bg-[#050505] min-h-screen text-white font-['Plus_Jakarta_Sans',sans-serif]">
      {/* HERO AREA - Dev Resim ve Başlık */}
      <div className="relative h-[75vh] w-full flex items-end pb-20 overflow-hidden">
        {/* RESİM UZANTISI BURADA (Vercel klasöründen .webp olarak çekiyor) */}
        <img src={`https://gemicha-portal.vercel.app/images/zodiac/${cleanSign}.webp`} className="absolute inset-0 w-full h-full object-cover opacity-40 scale-110 animate-slow-zoom" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-[#050505]" />
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-4 mb-6">
            <span className="bg-[#D4AF37] text-black text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{cleanTopic}</span>
            <span className="border border-white/20 text-white/50 text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{insight.target_date}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-4">
            {insight?.meta_title?.split(':')[0] || insight.meta_title || `${cleanSign} Analytics`}
          </h1>
        </div>
      </div>

      {/* MAKALE GÖVDESİ */}
      <div className="max-w-3xl mx-auto px-6 py-24">
        <p className="text-2xl font-light italic text-[#D4AF37] mb-16 border-l-2 border-[#D4AF37] pl-10 leading-relaxed opacity-90">
          "The stars do not compel, they impel. Understanding your {cleanTopic} cosmic weather for {insight.target_date}."
        </p>

        <div className="prose prose-invert prose-gold max-w-none">
          <div className="text-lg leading-[1.8] text-white/70 space-y-8 first-letter:text-6xl first-letter:font-black first-letter:text-[#D4AF37] first-letter:mr-4 first-letter:float-left">
            {insight.content_body}
          </div>
        </div>

        {/* FAQ SECTION */}
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
