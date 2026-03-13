// src/app/[slug]/page.tsx
import { supabase } from '../../lib/supabase' // Doğru yol: 2 klasör yukarı çık
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

// 1. DİNAMİK SEO METADATA (Google Botları İçin)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  const { data: insight } = await supabase
    .from('gemicha_insights')
    .select('meta_title, content_body')
    .eq('slug', slug)
    .single()

  if (!insight) return { title: 'Sayfa Bulunamadı - Gemicha' }

  return {
    title: `${insight.meta_title} | Gemicha`,
    description: insight.content_body.substring(0, 150) + '...',
  }
}

// 2. ANA İÇERİK BİLEŞENİ
export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Veriyi Supabase'den çek
  const { data: insight } = await supabase
    .from('gemicha_insights')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!insight) {
    notFound()
  }

  // 3. AEO (ANSWER ENGINE OPTIMIZATION) SCHEMA MARKUP
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: insight.faq_schema?.map((faq: any) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })) || [],
  }

  return (
    <main className="max-w-3xl mx-auto p-6 mt-10">
      {/* Görünmez Schema Kodu (ChatGPT ve Google İçin) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="prose lg:prose-xl">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600">
          {insight.meta_title}
        </h1>
        
        <div className="text-gray-700 leading-relaxed space-y-4">
          <p>{insight.content_body}</p>
        </div>
      </article>

      {/* Sıkça Sorulan Sorular (Helpful Content) */}
      {insight.faq_schema && insight.faq_schema.length > 0 && (
        <section className="mt-12 bg-gray-50 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4">
            {insight.faq_schema.map((faq: any, index: number) => (
              <div key={index} className="border-b pb-4 border-gray-200">
                <h3 className="font-medium text-lg text-gray-900">{faq.question}</h3>
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}