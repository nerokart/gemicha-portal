// src/app/api/v1/insights/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sign = searchParams.get('sign')
  const topic = searchParams.get('topic')
  const date = searchParams.get('date')

  // GÜVENLİK DUVARI: Şifre kontrolü aktif edildi 🔒
  const authHeader = request.headers.get('Authorization')
  
  // Şifreyi şimdilik kodun içine sabitliyoruz. 
  // İleride bunu .env dosyasına taşımak daha profesyonel olur.
  if (authHeader !== 'Bearer GEMICHA_OZEL_SIFRE_2026') {
    return NextResponse.json(
      { success: false, error: 'Erişim Reddedildi! Geçersiz API Anahtarı.' }, 
      { status: 401 }
    )
  }

  let query = supabase.from('gemicha_insights').select('zodiac_sign, topic, target_date, meta_title, content_body')

  if (sign) query = query.eq('zodiac_sign', sign)
  if (topic) query = query.eq('topic', topic)
  if (date) query = query.eq('target_date', date)

  query = query.order('created_at', { ascending: false }).limit(10)

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    success: true,
    results: data.length,
    data: data
  })
}