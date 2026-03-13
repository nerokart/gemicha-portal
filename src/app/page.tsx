// src/app/page.tsx
import { supabase } from '../lib/supabase'
import Link from 'next/link'

export const revalidate = 3600; 

export default async function Home() {
  const { data: insights } = await supabase
    .from('gemicha_insights')
    .select('slug, meta_title, zodiac_sign, topic, target_date')
    .order('created_at', { ascending: false })
    .limit(20)

  return (
    <main className="max-w-4xl mx-auto p-6 mt-10">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-4">
          Gemicha AI
        </h1>
        <p className="text-xl text-gray-600">
          Yapay Zeka Destekli Günlük Astroloji ve Kişisel Gelişim Rehberin
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">En Güncel Yorumlar</h2>
        
        {(!insights || insights.length === 0) ? (
          <p className="text-gray-500 italic">Henüz içerik üretilmedi. Python botunun çalışmasını bekliyoruz...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insights.map((insight) => (
              <Link 
                href={`/${insight.slug}`} 
                key={insight.slug}
                className="block p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full uppercase tracking-wider">
                    {insight.zodiac_sign}
                  </span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-bold rounded-full uppercase tracking-wider">
                    {insight.topic}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {insight.meta_title}
                </h3>
                <p className="text-sm text-gray-500">
                  Tarih: {insight.target_date}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}