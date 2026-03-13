// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Sunucu tarafında (SSR) verileri ışık hızında çekmek için tekil (singleton) istemcimiz
export const supabase = createClient(supabaseUrl, supabaseAnonKey)