"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const SIGNS = [
  { id: 'koc', name: 'Aries' }, { id: 'boga', name: 'Taurus' }, { id: 'ikizler', name: 'Gemini' },
  { id: 'yengec', name: 'Cancer' }, { id: 'aslan', name: 'Leo' }, { id: 'basak', name: 'Virgo' },
  { id: 'terazi', name: 'Libra' }, { id: 'akrep', name: 'Scorpio' }, { id: 'yay', name: 'Sagittarius' },
  { id: 'oglak', name: 'Capricorn' }, { id: 'kova', name: 'Aquarius' }, { id: 'balik', name: 'Pisces' }
];

const TOPICS = ['kariyer', 'ask', 'saglik', 'para'];

export default function CosmosPortal({ params }: { params: { lang: string } }) {
  const [selectedTopic, setSelectedTopic] = useState('ask');

  return (
    <div className="bg-black min-h-screen text-white font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 1. KATEGORİ SEÇİCİ - Şık Pill Tasarımı */}
      <header className="pt-24 pb-12 text-center">
        <h1 className="text-6xl font-black italic tracking-tighter mb-8 uppercase">COSMIC <span className="text-[#D4AF37]">INDEX</span></h1>
        <div className="flex flex-wrap justify-center gap-3 px-6">
          {TOPICS.map(topic => (
            <button 
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${selectedTopic === topic ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'border-white/10 text-white/40 hover:border-white/30'}`}
            >
              {topic}
            </button>
          ))}
        </div>
      </header>

      {/* 2. BURÇ GRIDİ - Characters Kart Tasarımı */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {SIGNS.map(sign => (
            <Link 
              key={sign.id} 
              href={`/${params.lang}/cosmos/${selectedTopic}/${sign.id}`}
              className="group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-white/5 bg-[#0a0a0a] transition-all duration-500 hover:translate-y-[-8px] hover:shadow-[0_20px_40px_rgba(212,175,55,0.2)]"
            >
              {/* Burç Görseli */}
              <img src={`/images/zodiac/${sign.id}.jpg`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              {/* Gold Label */}
              <div className="absolute bottom-8 left-0 right-0 text-center px-4">
                <span className="text-[#D4AF37] text-[9px] font-black tracking-[0.4em] uppercase block mb-2 opacity-60 group-hover:opacity-100 transition-opacity">DAILY ANALYSIS</span>
                <h3 className="text-3xl font-bold uppercase italic tracking-tighter group-hover:text-[#D4AF37] transition-colors">{sign.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
