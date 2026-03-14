"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { useParams, useSearchParams, useRouter } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const LANG_NAMES = {
    tr: "Türkçe", en: "English", ar: "العربية", de: "Deutsch", es: "Español", 
    fr: "Français", it: "Italiano", pt: "Português", ru: "Русский", zh: "中文", 
    ja: "日本語", ko: "한국어", nl: "Nederlands", pl: "Polski", sv: "Svenska", 
    da: "Dansk", fi: "Suomi", no: "Norsk", cs: "Čeština", hu: "Magyar", 
    ro: "Română", el: "Ελληνικά", he: "עברית", hi: "हिन्दी", bn: "বাংলা", 
    id: "Bahasa Indonesia", ms: "Bahasa Melayu", th: "ไทย", vi: "Tiếng Việt", 
    uk: "Українська", fa: "فارسی", ur: "اردو", ta: "தமிழ்", te: "తెలుగు", 
    bg: "Български", tl: "Tagalog", hr: "Hrvatski", sr: "Српски", sk: "Slovenčina", 
    sl: "Slovenščina", et: "Eesti", lv: "Latviešu", lt: "Lietuvių", ca: "Català", 
    az: "Azərbaycanca", kk: "Қазақша" 
};

// DEV ZODYAK SÖZLÜĞÜ (46 DİL)
const ZODIAC_DICT: Record<string, Record<string, string>> = {
  tr: { koc: 'Koç', boga: 'Boğa', ikizler: 'İkizler', yengec: 'Yengeç', aslan: 'Aslan', basak: 'Başak', terazi: 'Terazi', akrep: 'Akrep', yay: 'Yay', oglak: 'Oğlak', kova: 'Kova', balik: 'Balık' },
  en: { koc: 'Aries', boga: 'Taurus', ikizler: 'Gemini', yengec: 'Cancer', aslan: 'Leo', basak: 'Virgo', terazi: 'Libra', akrep: 'Scorpio', yay: 'Sagittarius', oglak: 'Capricorn', kova: 'Aquarius', balik: 'Pisces' },
  es: { koc: 'Aries', boga: 'Tauro', ikizler: 'Géminis', yengec: 'Cáncer', aslan: 'Leo', basak: 'Virgo', terazi: 'Libra', akrep: 'Escorpio', yay: 'Sagitario', oglak: 'Capricornio', kova: 'Acuario', balik: 'Piscis' },
  pt: { koc: 'Áries', boga: 'Touro', ikizler: 'Gêmeos', yengec: 'Câncer', aslan: 'Leão', basak: 'Virgem', terazi: 'Libra', akrep: 'Escorpião', yay: 'Sagitário', oglak: 'Capricórnio', kova: 'Aquário', balik: 'Peixes' },
  ar: { koc: 'الحمل', boga: 'الثور', ikizler: 'الجوزاء', yengec: 'السرطان', aslan: 'الأسد', basak: 'العذراء', terazi: 'الميزان', akrep: 'العقرب', yay: 'القوس', oglak: 'الجدي', kova: 'الدلو', balik: 'الحوت' },
  fr: { koc: 'Bélier', boga: 'Taureau', ikizler: 'Gémeaux', yengec: 'Cancer', aslan: 'Lion', basak: 'Vierge', terazi: 'Balance', akrep: 'Scorpion', yay: 'Sagittaire', oglak: 'Capricorne', kova: 'Verseau', balik: 'Poissons' },
  it: { koc: 'Ariete', boga: 'Toro', ikizler: 'Gemelli', yengec: 'Cancro', aslan: 'Leone', basak: 'Vergine', terazi: 'Bilancia', akrep: 'Scorpione', yay: 'Sagittario', oglak: 'Capricorno', kova: 'Acquario', balik: 'Pesci' },
  ru: { koc: 'Овен', boga: 'Телец', ikizler: 'Близнецы', yengec: 'Рак', aslan: 'Лев', basak: 'Дева', terazi: 'Весы', akrep: 'Скорпион', yay: 'Стрелец', oglak: 'Козерог', kova: 'Водолей', balik: 'Рыбы' },
  zh: { koc: '白羊座', boga: '金牛座', ikizler: '双子座', yengec: '巨蟹座', aslan: '狮子座', basak: '处女座', terazi: '天秤座', akrep: '天蝎座', yay: '射手座', oglak: '摩羯座', kova: '水瓶座', balik: '双鱼座' },
  ja: { koc: '牡羊座', boga: '牡牛座', ikizler: '双子座', yengec: '蟹座', aslan: '獅子座', basak: '乙女座', terazi: '天秤座', akrep: '蠍座', yay: '射手座', oglak: '山羊座', kova: '水瓶座', balik: '魚座' },
  ko: { koc: '양자리', boga: '황소자리', ikizler: '쌍둥이자리', yengec: '게자리', aslan: '사자자리', basak: '처녀자리', terazi: '천칭자리', akrep: '전갈자리', yay: '사수자리', oglak: '염소자리', kova: '물병자리', balik: '물고기자리' },
  de: { koc: 'Widder', boga: 'Stier', ikizler: 'Zwillinge', yengec: 'Krebs', aslan: 'Löwe', basak: 'Jungfrau', terazi: 'Waage', akrep: 'Skorpion', yay: 'Schütze', oglak: 'Steinbock', kova: 'Wassermann', balik: 'Fische' },
  nl: { koc: 'Ram', boga: 'Stier', ikizler: 'Tweelingen', yengec: 'Kreeft', aslan: 'Leeuw', basak: 'Maagd', terazi: 'Weegschaal', akrep: 'Schorpioen', yay: 'Boogschutter', oglak: 'Steenbok', kova: 'Waterman', balik: 'Vissen' },
  pl: { koc: 'Baran', boga: 'Byk', ikizler: 'Bliźnięta', yengec: 'Rak', aslan: 'Lew', basak: 'Panna', terazi: 'Waga', akrep: 'Skorpion', yay: 'Strzelec', oglak: 'Koziorożec', kova: 'Wodnik', balik: 'Ryby' },
  sv: { koc: 'Väduren', boga: 'Oxen', ikizler: 'Tvillingarna', yengec: 'Kräftan', aslan: 'Lejonet', basak: 'Jungfrun', terazi: 'Vågen', akrep: 'Skorpionen', yay: 'Skytten', oglak: 'Stenbocken', kova: 'Vattumannen', balik: 'Fiskarna' },
  da: { koc: 'Vædderen', boga: 'Tyren', ikizler: 'Tvillingerne', yengec: 'Krebsen', aslan: 'Løven', basak: 'Jomfruen', terazi: 'Vægten', akrep: 'Skorpionen', yay: 'Skytten', oglak: 'Stenbukken', kova: 'Vandmanden', balik: 'Fiskene' },
  fi: { koc: 'Oinas', boga: 'Härkä', ikizler: 'Kaksoset', yengec: 'Rapu', aslan: 'Leijona', basak: 'Neitsyt', terazi: 'Vaaka', akrep: 'Skorpioni', yay: 'Jousimies', oglak: 'Kauris', kova: 'Vesimies', balik: 'Kalat' },
  no: { koc: 'Væren', boga: 'Tyren', ikizler: 'Tvillingene', yengec: 'Krepsen', aslan: 'Løven', basak: 'Jomfruen', terazi: 'Vekten', akrep: 'Skorpionen', yay: 'Skytten', oglak: 'Steinbukken', kova: 'Vannmannen', balik: 'Fiskene' },
  cs: { koc: 'Beran', boga: 'Býk', ikizler: 'Blíženci', yengec: 'Rak', aslan: 'Lev', basak: 'Panna', terazi: 'Váhy', akrep: 'Štír', yay: 'Střelec', oglak: 'Kozoroh', kova: 'Vodnář', balik: 'Ryby' },
  hu: { koc: 'Kos', boga: 'Bika', ikizler: 'Ikrek', yengec: 'Rák', aslan: 'Oroszlán', basak: 'Szűz', terazi: 'Mérleg', akrep: 'Skorpió', yay: 'Nyilas', oglak: 'Bak', kova: 'Vízöntő', balik: 'Halak' },
  ro: { koc: 'Berbec', boga: 'Taur', ikizler: 'Gemeni', yengec: 'Rac', aslan: 'Leu', basak: 'Fecioară', terazi: 'Balanță', akrep: 'Scorpion', yay: 'Săgetător', oglak: 'Capricorn', kova: 'Vărsător', balik: 'Pești' },
  el: { koc: 'Κριός', boga: 'Ταύρος', ikizler: 'Δίδυμοι', yengec: 'Καρκίνος', aslan: 'Λέων', basak: 'Παρθένος', terazi: 'Ζυγός', akrep: 'Σκορπιός', yay: 'Τοξότης', oglak: 'Αιγόκερως', kova: 'Υδροχόος', balik: 'Ιχθύες' },
  he: { koc: 'טלה', boga: 'שור', ikizler: 'תאומים', yengec: 'סרטן', aslan: 'אריה', basak: 'בתולה', terazi: 'מאזניים', akrep: 'עקרב', yay: 'קשת', oglak: 'גדי', kova: 'דלי', balik: 'דגים' },
  hi: { koc: 'मेष', boga: 'वृषभ', ikizler: 'मिथुन', yengec: 'कर्क', aslan: 'सिंह', basak: 'कन्या', terazi: 'तुला', akrep: 'वृश्चिक', yay: 'धनु', oglak: 'मकर', kova: 'कुंभ', balik: 'मीन' },
  bn: { koc: 'মেষ', boga: 'বৃষ', ikizler: 'মিথুন', yengec: 'কর্কট', aslan: 'সিংহ', basak: 'কন্যা', terazi: 'তুলা', akrep: 'বৃশ্চিক', yay: 'ধনু', oglak: 'মকর', kova: 'কুম্ভ', balik: 'মীন' },
  id: { koc: 'Aries', boga: 'Taurus', ikizler: 'Gemini', yengec: 'Cancer', aslan: 'Leo', basak: 'Virgo', terazi: 'Libra', akrep: 'Scorpio', yay: 'Sagitarius', oglak: 'Capricorn', kova: 'Aquarius', balik: 'Pisces' },
  ms: { koc: 'Aries', boga: 'Taurus', ikizler: 'Gemini', yengec: 'Cancer', aslan: 'Leo', basak: 'Virgo', terazi: 'Libra', akrep: 'Scorpio', yay: 'Sagittarius', oglak: 'Capricorn', kova: 'Aquarius', balik: 'Pisces' },
  th: { koc: 'ราศีเมษ', boga: 'ราศีพฤษภ', ikizler: 'ราศีเมถุน', yengec: 'ราศีกรกฎ', aslan: 'ราศีสิงห์', basak: 'ราศีกันย์', terazi: 'ราศีตุลย์', akrep: 'ราศีพิจิก', yay: 'ราศีธนู', oglak: 'ราศีมังกร', kova: 'ราศีกุมภ์', balik: 'ราศีมีน' },
  vi: { koc: 'Bạch Dương', boga: 'Kim Ngưu', ikizler: 'Song Tử', yengec: 'Cự Giải', aslan: 'Sư Tử', basak: 'Xử Nữ', terazi: 'Thiên Bình', akrep: 'Thiên Yết', yay: 'Nhân Mã', oglak: 'Ma Kết', kova: 'Bảo Bình', balik: 'Song Ngư' },
  uk: { koc: 'Овен', boga: 'Телець', ikizler: 'Близнята', yengec: 'Рак', aslan: 'Лев', basak: 'Діва', terazi: 'Терези', akrep: 'Скорпіон', yay: 'Стрілець', oglak: 'Козоріг', kova: 'Водолій', balik: 'Риби' },
  fa: { koc: 'حمل', boga: 'ثور', ikizler: 'جوزا', yengec: 'سرطان', aslan: 'اسد', basak: 'سنبله', terazi: 'میزان', akrep: 'عقرب', yay: 'قوس', oglak: 'جدی', kova: 'دلو', balik: 'حوت' },
  ur: { koc: 'حمل', boga: 'ثور', ikizler: 'جوزا', yengec: 'سرطان', aslan: 'اسد', basak: 'سنبلہ', terazi: 'میزان', akrep: 'عقرب', yay: 'قوس', oglak: 'جدی', kova: 'دلو', balik: 'حوت' },
  ta: { koc: 'மேஷம்', boga: 'ரிஷபம்', ikizler: 'மிதுனம்', yengec: 'கடகம்', aslan: 'சிம்மம்', basak: 'கன்னி', terazi: 'துலாம்', akrep: 'விருச்சிகம்', yay: 'தனுசு', oglak: 'மகரம்', kova: 'கும்பம்', balik: 'மீனம்' },
  te: { koc: 'మేషం', boga: 'వృషభం', ikizler: 'మిథునం', yengec: 'కర్కాటకం', aslan: 'సింహం', basak: 'కన్య', terazi: 'తుల', akrep: 'వృశ్చికం', yay: 'ధనుస్సు', oglak: 'మకరం', kova: 'కుంభం', balik: 'మీనం' },
  bg: { koc: 'Овен', boga: 'Телец', ikizler: 'Близнаци', yengec: 'Рак', aslan: 'Лъв', basak: 'Дева', terazi: 'Везни', akrep: 'Скорпион', yay: 'Стрелец', oglak: 'Козирог', kova: 'Водолей', balik: 'Риби' },
  tl: { koc: 'Aries', boga: 'Taurus', ikizler: 'Gemini', yengec: 'Cancer', aslan: 'Leo', basak: 'Virgo', terazi: 'Libra', akrep: 'Scorpio', yay: 'Sagittarius', oglak: 'Capricorn', kova: 'Aquarius', balik: 'Pisces' },
  hr: { koc: 'Ovan', boga: 'Bik', ikizler: 'Blizanci', yengec: 'Rak', aslan: 'Lav', basak: 'Djevica', terazi: 'Vaga', akrep: 'Škorpion', yay: 'Strijelac', oglak: 'Jarac', kova: 'Vodenjak', balik: 'Ribe' },
  sr: { koc: 'Ован', boga: 'Бик', ikizler: 'Близанци', yengec: 'Рак', aslan: 'Лав', basak: 'Девица', terazi: 'Вага', akrep: 'Шкорпија', yay: 'Стрелац', oglak: 'Јарац', kova: 'Водолија', balik: 'Рибе' },
  sk: { koc: 'Baran', boga: 'Býk', ikizler: 'Blíženci', yengec: 'Rak', aslan: 'Lev', basak: 'Panna', terazi: 'Váhy', akrep: 'Škorpión', yay: 'Strelec', oglak: 'Kozorožec', kova: 'Vodnár', balik: 'Ryby' },
  sl: { koc: 'Oven', boga: 'Bik', ikizler: 'Dvojčka', yengec: 'Rak', aslan: 'Lev', basak: 'Devica', terazi: 'Tehtnica', akrep: 'Škorpijon', yay: 'Strelec', oglak: 'Kozorog', kova: 'Vodnar', balik: 'Ribi' },
  et: { koc: 'Jäär', boga: 'Sõnn', ikizler: 'Kaksikud', yengec: 'Vähk', aslan: 'Lõvi', basak: 'Neitsi', terazi: 'Kaalud', akrep: 'Skorpion', yay: 'Ambur', oglak: 'Kaljukits', kova: 'Veevalaja', balik: 'Kalad' },
  lv: { koc: 'Auns', boga: 'Vērsis', ikizler: 'Dvīņi', yengec: 'Vēzis', aslan: 'Lauva', basak: 'Jaunava', terazi: 'Svari', akrep: 'Skorpions', yay: 'Strēlnieks', oglak: 'Mežāzis', kova: 'Ūdensvīrs', balik: 'Zivis' },
  lt: { koc: 'Avinas', boga: 'Jautis', ikizler: 'Dvyniai', yengec: 'Vėžys', aslan: 'Liūtas', basak: 'Mergelė', terazi: 'Svarstyklės', akrep: 'Skorpionas', yay: 'Šaulys', oglak: 'Ožiaragis', kova: 'Vandenis', balik: 'Žuvys' },
  ca: { koc: 'Àries', boga: 'Taure', ikizler: 'Bessons', yengec: 'Cranc', aslan: 'Lleó', basak: 'Verge', terazi: 'Balança', akrep: 'Escorpí', yay: 'Sagitari', oglak: 'Capricorn', kova: 'Aquari', balik: 'Peixos' },
  az: { koc: 'Qoç', boga: 'Buğa', ikizler: 'Əkizlər', yengec: 'Xərçəng', aslan: 'Şir', basak: 'Qız', terazi: 'Tərəzi', akrep: 'Əqrəb', yay: 'Oxatan', oglak: 'Oğlaq', kova: 'Dolça', balik: 'Balıqlar' },
  kk: { koc: 'Тоқты', boga: 'Торпақ', ikizler: 'Егіздер', yengec: 'Шаян', aslan: 'Арыстан', basak: 'Бикеш', terazi: 'Таразы', akrep: 'Сарышаян', yay: 'Мерген', oglak: 'Тауешкі', kova: 'Суқұйғыш', balik: 'Балықтар' }
};

const TOPICS_DICT: Record<string, Record<string, string>> = {
  tr: { ask: 'AŞK', kariyer: 'KARİYER', saglik: 'SAĞLIK', para: 'PARA' },
  en: { ask: 'LOVE', kariyer: 'CAREER', saglik: 'HEALTH', para: 'FINANCE' },
  ar: { ask: 'الحب', kariyer: 'المهنة', saglik: 'الصحة', para: 'المال' },
  de: { ask: 'LIEBE', kariyer: 'KARRIERE', saglik: 'GESUNDHEIT', para: 'FINANZEN' },
  es: { ask: 'AMOR', kariyer: 'CARRERA', saglik: 'SALUD', para: 'FINANZAS' },
  fr: { ask: 'AMOUR', kariyer: 'CARRIÈRE', saglik: 'SANTÉ', para: 'FINANCES' },
  it: { ask: 'AMORE', kariyer: 'CARRIERA', saglik: 'SALUTE', para: 'FINANZA' },
  pt: { ask: 'AMOR', kariyer: 'CARREIRA', saglik: 'SAÚDE', para: 'FINANÇAS' },
  ru: { ask: 'ЛЮБОВЬ', kariyer: 'КАРЬЕРА', saglik: 'ЗДОРОВЬЕ', para: 'ФИНАНСЫ' },
  zh: { ask: '爱情', kariyer: '事业', saglik: '健康', para: '财务' },
  ja: { ask: '恋愛', kariyer: 'キャリア', saglik: '健康', para: '財務' }
};

const UI_DICT: Record<string, any> = {
  tr: { home: "Ana Sayfa", char: "Karakterler", priv: "Gizlilik Politikası", terms: "Hizmet Şartları", support: "RESMİ DESTEK", back: "SİSTEME DÖN", legal: "Yasal Uyarı", warning: "Bu analizler yapay zeka tarafından astronomik verilere dayanılarak kişisel farkındalık amacıyla üretilmiştir. Finansal veya tıbbi tavsiye içermez. Ticari amaçla kullanılması veya kazanç için paylaşılması kesinlikle yasaktır." },
  en: { home: "Home", char: "Characters", priv: "Privacy Policy", terms: "Terms of Service", support: "OFFICIAL SUPPORT", back: "BACK TO GRID", legal: "Legal Disclaimer", warning: "These analyses are AI-generated based on astronomical data for personal awareness purposes. They do not constitute financial or medical advice. Commercial use, selling, or sharing for profit is strictly prohibited." },
  fr: { home: "Accueil", char: "Personnages", priv: "Politique de Confidentialité", terms: "Conditions", support: "SUPPORT OFFICIEL", back: "RETOUR", legal: "Avertissement Légal", warning: "Ces analyses sont générées par l'IA sur la base de données astronomiques à des fins de sensibilisation personnelle. Elles ne constituent pas des conseils financiers ou médicaux. L'utilisation commerciale ou le partage à des fins lucratives est strictement interdit." },
  de: { home: "Startseite", char: "Charaktere", priv: "Datenschutz", terms: "Nutzungsbedingungen", support: "OFFIZIELLER SUPPORT", back: "ZURÜCK", legal: "Haftungsausschluss", warning: "Diese Analysen werden von KI basierend auf astronomischen Daten zur persönlichen Bewusstseinsbildung erstellt. Sie stellen keine finanzielle oder medizinische Beratung dar. Kommerzielle Nutzung oder Weitergabe mit Gewinnabsicht ist strengstens untersagt." },
  es: { home: "Inicio", char: "Personajes", priv: "Política de Privacidad", terms: "Términos", support: "SOPORTE OFICIAL", back: "VOLVER", legal: "Aviso Legal", warning: "Estos análisis son generados por IA basados en datos astronómicos para fines de autoconocimiento. No constituyen asesoramiento financiero o médico. El uso comercial o compartir con fines de lucro está estrictamente prohibido." }
};

// Yönlendirmeler İçin Çevirici (Tersine Mühendislik)
const getBaseIdFromLocalized = (dict: any, lang: string, localizedSlug: string) => {
  const langDict = dict[lang] || dict['en'];
  for (const [key, value] of Object.entries(langDict)) {
    if ((value as string).toLowerCase().replace(/\s+/g, '-') === localizedSlug) return key;
  }
  return localizedSlug;
};

const getUIString = (dict: any, lang: string, key: string, fallback: string) => {
  return dict[lang]?.[key] || dict['en']?.[key] || fallback;
};

const getLocalSlug = (dict: any, lang: string, key: string) => {
  return (dict[lang]?.[key] || dict['en']?.[key] || key).toLowerCase().replace(/\s+/g, '-');
};

export default function ZodiacArticle() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [insight, setInsight] = useState<any>(null);
  const [faqData, setFaqData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const [prevInfo, setPrevInfo] = useState<{url: string, title: string} | null>(null);
  const [nextInfo, setNextInfo] = useState<{url: string, title: string} | null>(null);

  const rawLang = decodeURIComponent((params.lang as string) || 'en').trim();
  const rawTopic = decodeURIComponent((params.topic as string) || '').trim();
  const rawSign = decodeURIComponent((params.sign as string) || '').trim();
  const rawDate = searchParams.get('date');

  const dbTopic = getBaseIdFromLocalized(TOPICS_DICT, rawLang, rawTopic);
  const dbSign = getBaseIdFromLocalized(ZODIAC_DICT, rawLang, rawSign);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let mainQuery = supabase.from('gemicha_insights').select('*')
        .ilike('language', rawLang).ilike('topic', dbTopic).ilike('zodiac_sign', dbSign)
        .order('target_date', { ascending: false }).limit(1);

      if (rawDate) mainQuery = mainQuery.eq('target_date', rawDate);

      const { data, error } = await mainQuery;
      
      if (error || !data || data.length === 0) {
         setError(true); setLoading(false); return;
      }

      const currentInsight = data[0];
      setInsight(currentInsight);

      try { setFaqData(typeof currentInsight.faq_schema === 'string' ? JSON.parse(currentInsight.faq_schema) : currentInsight.faq_schema); } catch(e) { setFaqData([]); }

      const localTopicSlug = getLocalSlug(TOPICS_DICT, rawLang, dbTopic);
      const localSignSlug = getLocalSlug(ZODIAC_DICT, rawLang, dbSign);

      const { data: prevD } = await supabase.from('gemicha_insights').select('*').ilike('language', rawLang).ilike('topic', dbTopic).ilike('zodiac_sign', dbSign)
        .lt('target_date', currentInsight.target_date).order('target_date', { ascending: false }).limit(1);
      
      const { data: nextD } = await supabase.from('gemicha_insights').select('*').ilike('language', rawLang).ilike('topic', dbTopic).ilike('zodiac_sign', dbSign)
        .gt('target_date', currentInsight.target_date).order('target_date', { ascending: true }).limit(1);

      if(prevD?.[0]) setPrevInfo({ url: `/cosmos/${rawLang}/${localTopicSlug}/${localSignSlug}?date=${prevD[0].target_date}`, title: `${prevD[0].target_date}` });
      if(nextD?.[0]) setNextInfo({ url: `/cosmos/${rawLang}/${localTopicSlug}/${localSignSlug}?date=${nextD[0].target_date}`, title: `${nextD[0].target_date}` });

      setLoading(false);
    };

    fetchData();
  }, [rawLang, dbTopic, dbSign, rawDate]);

  const handleLangChange = (newLang: string) => {
    localStorage.setItem('gemicha_lang', newLang);
    const newTopicSlug = getLocalSlug(TOPICS_DICT, newLang, dbTopic);
    const newSignSlug = getLocalSlug(ZODIAC_DICT, newLang, dbSign);
    router.push(`/cosmos/${newLang}/${newTopicSlug}/${newSignSlug}${rawDate ? `?date=${rawDate}` : ''}`);
  };

  const handleDateChange = (newDate: string) => {
    const tSlug = getLocalSlug(TOPICS_DICT, rawLang, dbTopic);
    const sSlug = getLocalSlug(ZODIAC_DICT, rawLang, dbSign);
    router.push(`/cosmos/${rawLang}/${tSlug}/${sSlug}?date=${newDate}`);
  };

  const toggleSpeech = (text: string) => {
    if (typeof window === 'undefined') return;
    if (playingId === 'playing') {
      window.speechSynthesis.cancel();
      setPlayingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = rawLang;
    utterance.onend = () => setPlayingId(null);
    setPlayingId('playing');
    window.speechSynthesis.speak(utterance);
  };

  if (loading) {
    return <div className="min-h-screen bg-black text-cyan-400 flex justify-center items-center font-black tracking-widest animate-pulse">Syncing...</div>;
  }

  if (error || !insight) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10 font-['Plus_Jakarta_Sans',sans-serif]">
        <h1 className="text-[#D4AF37] text-4xl font-black mb-4 uppercase italic">Data Missing</h1>
        <Link href="/cosmos" className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase hover:bg-white/10 transition">Return to Cosmos</Link>
      </div>
    );
  }

  const displaySign = getUIString(ZODIAC_DICT, rawLang, dbSign, dbSign);
  const displayTopic = getUIString(TOPICS_DICT, rawLang, dbTopic, dbTopic);

  return (
    <div className="bg-black text-white min-h-screen font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#D4AF37] selection:text-black flex flex-col overflow-x-hidden">
      
      {/* SİTE STANDART NAV BAR */}
      <nav className="h-20 flex items-center border-b border-white/5 sticky top-0 z-50 bg-black/95 px-6 backdrop-blur-md shrink-0">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <img src="https://gemicha-portal.vercel.app/logo.png" alt="Logo" className="h-10 w-auto rounded-lg" />
            <span className="text-xl font-black tracking-widest uppercase text-white">GEMICHA</span>
          </Link>
          
          <div className="flex items-center gap-6">
             <Link href="/cosmos" className="text-[10px] font-black uppercase text-white/50 hover:text-white transition hidden md:block">
               <i className="fa-solid fa-arrow-left mr-2"></i> {getUIString(UI_DICT, rawLang, 'back', 'BACK TO GRID')}
             </Link>
             <div className="h-4 w-[1px] bg-white/10 hidden md:block"></div>
             
             {/* DİNAMİK URL ÇEVİRİCİ DİL BAR */}
             <select 
                value={rawLang}
                onChange={(e) => handleLangChange(e.target.value)}
                className="bg-[#111] border border-white/20 rounded px-2 py-1 text-xs font-bold uppercase outline-none cursor-pointer"
             >
                {Object.entries(LANG_NAMES).map(([code, name]) => (
                  <option key={code} value={code} className="bg-[#111]">{name}</option>
                ))}
             </select>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 flex-col md:flex-row">
        
        {/* SOL PANEL (FİLTRELER VE RESİM) */}
        <aside className="w-full md:w-[450px] bg-[#020202] border-r border-white/5 p-8 md:p-12 flex flex-col shrink-0 overflow-y-auto no-scrollbar">
           <div className="mb-6">
              <span className="bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-[0.3em] mb-6 inline-block">
                NEURAL {displayTopic}
              </span>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.85] mb-4">
                {displaySign}
              </h1>
           </div>

           {/* RESİMDEN GRAYSCALE KALDIRILDI (CANLI RENKLER) */}
           <div className="relative rounded-[2rem] overflow-hidden border border-white/5 mb-8 group shadow-2xl shadow-cyan-500/5 aspect-square">
              <img 
                src={`https://gemicha-portal.vercel.app/images/zodiac/${dbSign}.webp`} 
                className="w-full h-full object-cover transition-all duration-1000 scale-105" 
                alt={dbSign}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent"></div>
           </div>

           {/* TAKVİM FİLTRESİ */}
           <div className="mb-6">
              <h3 className="text-[10px] font-black text-cyan-500 mb-3 uppercase tracking-widest flex items-center gap-2">
                <i className="fa-regular fa-calendar"></i> Cosmic Date
              </h3>
              <input 
                type="date" 
                value={insight.target_date} 
                onChange={(e) => handleDateChange(e.target.value)}
                onClick={(e) => (e.target as HTMLInputElement).showPicker?.()}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white outline-none focus:border-cyan-400 transition-all cursor-pointer"
              />
           </div>

           {/* KONU (AŞK, PARA VB.) FİLTRESİ */}
           <div className="space-y-2 mb-8">
              {['ask', 'kariyer', 'saglik', 'para'].map(t => {
                 const isCurrent = t === dbTopic;
                 const slug = getLocalSlug(TOPICS_DICT, rawLang, t);
                 const currentSignSlug = getLocalSlug(ZODIAC_DICT, rawLang, dbSign);
                 return (
                   <Link key={t} href={`/cosmos/${rawLang}/${slug}/${currentSignSlug}${rawDate ? `?date=${rawDate}` : ''}`}
                     className={`w-full text-left p-3 rounded-xl text-[10px] font-black border transition-all uppercase flex justify-between items-center ${isCurrent ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' : 'bg-white/5 border-transparent text-gray-500 hover:text-white'}`}
                   >
                     {getUIString(TOPICS_DICT, rawLang, t, t)}
                     {isCurrent && <div className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan]"></div>}
                   </Link>
                 );
              })}
           </div>

           {/* YASAL UYARI KUTUSU */}
           <div className="mt-auto p-6 bg-red-500/5 border border-red-500/10 rounded-3xl">
              <p className="text-[9px] font-black text-red-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <i className="fa-solid fa-triangle-exclamation"></i> {getUIString(UI_DICT, rawLang, 'legal', 'Legal Disclaimer')}
              </p>
              <p className="text-[11px] text-white/50 leading-relaxed font-medium">
                {getUIString(UI_DICT, rawLang, 'warning', UI_DICT['en'].warning)}
              </p>
           </div>
        </aside>

        {/* MAKALE ALANI */}
        <main className="flex-1 bg-black p-8 md:p-20 overflow-y-auto relative no-scrollbar">
          <div className="max-w-3xl mx-auto">
            
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-6 uppercase text-white/90">{insight.meta_title}</h2>
              <div className="flex items-center gap-4 mb-10">
                {/* BLOG TARZI HOPARLÖR BUTONU */}
                <button 
                  onClick={() => toggleSpeech(insight.content_body)}
                  className={`p-4 rounded-2xl border backdrop-blur-md transition-all z-20 flex items-center gap-3 ${playingId === 'playing' ? 'bg-cyan-500 border-cyan-400 text-black' : 'bg-white/5 border-white/10 text-white hover:bg-white/20'}`}
                >
                  <i className={`fa-solid ${playingId === 'playing' ? 'fa-stop' : 'fa-play'}`}></i>
                  <span className="text-[10px] font-black uppercase tracking-widest">{playingId === 'playing' ? 'STOP AUDIO' : 'LISTEN'}</span>
                </button>
              </div>
              <p className="text-2xl md:text-3xl font-light italic text-[#D4AF37] leading-relaxed opacity-90 border-l-4 border-[#D4AF37] pl-8">
                "The stars do not compel, they impel. This is your personal cosmic weather report."
              </p>
            </div>

            <article className="prose prose-invert max-w-none">
              <div className="text-xl leading-[2.1] text-white/70 space-y-12 first-letter:text-8xl first-letter:font-black first-letter:text-[#D4AF37] first-letter:mr-5 first-letter:float-left first-letter:mt-3">
                {insight.content_body}
              </div>
            </article>

            {/* İLERİ / GERİ BUTONLARI */}
            <div className="mt-20 flex gap-4 pt-10 border-t border-white/5">
                {prevInfo ? (
                  <Link href={prevInfo.url} className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all group">
                    <span className="block text-cyan-400 font-black text-[9px] tracking-widest uppercase mb-2">PREVIOUS STORY</span>
                    <span className="block text-white font-bold group-hover:text-cyan-300 transition-colors">{prevInfo.title}</span>
                  </Link>
                ) : <div className="flex-1"></div>}
                
                {nextInfo ? (
                  <Link href={nextInfo.url} className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all group text-right">
                    <span className="block text-cyan-400 font-black text-[9px] tracking-widest uppercase mb-2">NEXT STORY</span>
                    <span className="block text-white font-bold group-hover:text-cyan-300 transition-colors">{nextInfo.title}</span>
                  </Link>
                ) : <div className="flex-1"></div>}
            </div>

            {/* FAQ */}
            <section className="mt-20 pt-20 border-t border-white/5">
              <h3 className="text-[10px] font-black tracking-[0.6em] uppercase text-cyan-500 mb-12">Neural Q&A Matrix</h3>
              <div className="grid gap-6">
                {faqData && Array.isArray(faqData) && faqData.map((faq: any, idx: number) => (
                  <div key={idx} className="bg-white/5 p-10 rounded-[3rem] border border-white/5 hover:border-cyan-500/30 transition-all group">
                    <p className="text-cyan-400 font-black text-xs mb-4 uppercase tracking-widest">Q: {faq?.question}</p>
                    <p className="text-white/40 text-sm leading-relaxed italic">A: {faq?.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* STANDART FOOTER */}
      <footer className="py-12 text-center border-t border-white/5 bg-black mt-auto shrink-0 z-50">
          <div className="max-w-7xl mx-auto flex flex-col gap-8 px-6 text-[10px] uppercase tracking-[0.4em] text-slate-600 font-bold">
              <nav className="flex justify-center flex-wrap gap-8">
                  <Link href="/" className="hover:text-white transition">{getUIString(UI_DICT, rawLang, 'home', 'Home')}</Link>
                  <Link href="/characters" className="hover:text-white transition">{getUIString(UI_DICT, rawLang, 'char', 'Characters')}</Link>
                  <Link href="/privacy" className="hover:text-white transition">{getUIString(UI_DICT, rawLang, 'priv', 'Privacy Policy')}</Link>
                  <Link href="/terms" className="hover:text-white transition">{getUIString(UI_DICT, rawLang, 'terms', 'Terms of Service')}</Link>
              </nav>
              <p className="text-slate-700 tracking-[0.3em] uppercase">{getUIString(UI_DICT, rawLang, 'support', 'OFFICIAL SUPPORT')}</p>
              <a href="mailto:support@gemicha.com" className="text-sm text-white/80 hover:text-cyan-400 transition lowercase tracking-normal font-medium">support@gemicha.com</a>
              
              <div className="mt-4 border-t border-white/5 pt-8 flex flex-col items-center">
                <p className="text-[10px] font-black tracking-[0.5em] text-[#D4AF37] uppercase mb-2">GEMICHA NEURAL ENGINE v3.0</p>
                <p className="text-[9px] text-slate-800 tracking-[0.6em] uppercase">© 2026 GEMICHA</p>
              </div>
          </div>
      </footer>
    </div>
  );
}
