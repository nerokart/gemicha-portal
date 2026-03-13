// app/[lang]/cosmos/[category]/[sign]/page.tsx
import { createClient } from '@supabase/supabase-js';

export default async function ZodiacArticle({ params }: { params: { lang: string, category: string, sign: string } }) {
  // Supabase'den o burca, dile ve kategoriye özel makaleyi çekiyoruz
  // Not: Veritabanındaki 'topic' ile 'category' eşleşecek.
  
  return (
    <article className="bg-[#050505] min-h-screen">
      {/* HERO GÖRSEL: Blogdaki gibi devasa ve dramatik */}
      <header className="relative h-[60vh] w-full">
        <img src={`/images/zodiac/${params.sign}_hero.jpg`} className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]"></div>
        <div className="absolute bottom-12 left-0 right-0 text-center">
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter">{params.sign}</h1>
            <p className="text-[#D4AF37] font-black tracking-[0.4em] uppercase text-xs mt-4">{params.category} ANALİZİ</p>
        </div>
      </header>

      {/* MAKALE İÇERİĞİ */}
      <div className="max-w-3xl mx-auto px-6 py-20">
        <div className="prose prose-invert prose-gold">
          {/* Supabase'den gelen meta_title ve content_body buraya gelecek */}
          <h2 className="text-3xl font-bold mb-8 uppercase text-white/90">Kozmik Durum Analizi</h2>
          <p className="text-lg leading-relaxed text-white/70 first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-[#D4AF37]">
            {/* Buraya Supabase verisi gelecek */}
          </p>
          
          {/* Blogdaki gibi araya görseller veya vurgulu kutular ekleyebiliriz */}
          <div className="my-12 p-8 bg-white/5 border-l-2 border-[#D4AF37] italic text-xl">
             "Bu dönemde gökyüzündeki sert açılar, {params.sign} burcu için aslında bir sıçrama tahtası görevi görüyor."
          </div>
        </div>
      </div>
    </article>
  );
}