"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

// Supabase Global Bağlantı (Client-side)
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

const ZODIAC_SIGNS = [
  { id: 'koc' }, { id: 'boga' }, { id: 'ikizler' }, { id: 'yengec' },
  { id: 'aslan' }, { id: 'basak' }, { id: 'terazi' }, { id: 'akrep' },
  { id: 'yay' }, { id: 'oglak' }, { id: 'kova' }, { id: 'balik' }
];

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

const UI_ALL: Record<string, string> = {
  tr: 'TÜMÜ', en: 'ALL', es: 'TODO', pt: 'TUDO', ar: 'الكل', fr: 'TOUT', it: 'TUTTI', ru: 'ВСЕ', zh: '全部', ja: 'すべて',
  ko: '전체', de: 'ALLE', nl: 'ALLES', pl: 'WSZYSTKO', sv: 'ALLA', da: 'ALLE', fi: 'KAIKKI', no: 'ALLE', cs: 'VŠE',
  hu: 'ÖSSZES', ro: 'TOATE', el: 'ΟΛΑ', he: 'הכל', hi: 'सभी', bn: 'সব', id: 'SEMUA', ms: 'SEMUA', th: 'ทั้งหมด',
  vi: 'TẤT CẢ', uk: 'ВСЕ', fa: 'همه', ur: 'سب', ta: 'அனைத்தும்', te: 'అన్నీ', bg: 'ВСИЧКИ', tl: 'LAHAT', hr: 'SVE',
  sr: 'СВЕ', sk: 'VŠETKY', sl: 'VSE', et: 'KÕIK', lv: 'VISI', lt: 'VISI', ca: 'TOT', az: 'HAMISI', kk: 'БАРЛЫҒЫ'
};
const TOPICS = [
  { id: 'all', tr: 'TÜMÜ', en: 'ALL' },
  { id: 'ask', tr: 'AŞK', en: 'LOVE' },
  { id: 'kariyer', tr: 'KARİYER', en: 'CAREER' },
  { id: 'saglik', tr: 'SAĞLIK', en: 'HEALTH' },
  { id: 'para', tr: 'PARA', en: 'FINANCE' }
];

export default function GlobalCosmosPortal() {
  const [insights, setInsights] = useState<any[]>([]);
  const [lang, setLang] = useState('en');
  const [activeSign, setActiveSign] = useState('all');
  const [activeTopic, setActiveTopic] = useState('all');
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    const savedLang = localStorage.getItem('gemicha_lang') || 'en';
    setLang(savedLang);
    document.documentElement.lang = savedLang;
    fetchGlobalInsights(savedLang);
  }, []);

  const fetchGlobalInsights = async (selectedLang: string) => {
    setLoading(true);
    const { data } = await supabase
      .from('gemicha_insights')
      .select('*')
      .eq('language', selectedLang)
      .order('created_at', { ascending: false });

    if (data) setInsights(data);
    setLoading(false);
  };

  const changeLanguage = (newLang: string) => {
    setLang(newLang);
    localStorage.setItem('gemicha_lang', newLang);
    document.documentElement.lang = newLang;
    fetchGlobalInsights(newLang);
  };

  const toggleSpeech = (text: string, id: string) => {
    if (typeof window === 'undefined') return;
    if (playingId === id) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.onend = () => setPlayingId(null);
    setPlayingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const filteredInsights = insights.filter(i => {
    const signMatch = activeSign === 'all' || i.zodiac_sign.toLowerCase() === activeSign.toLowerCase();
    const topicMatch = activeTopic === 'all' || i.topic.toLowerCase() === activeTopic.toLowerCase();
    return signMatch && topicMatch;
  });

  return (
    <div className="bg-[#000] text-white min-h-screen font-['Plus_Jakarta_Sans',sans-serif] flex flex-col overflow-hidden">
      
      {/* NAV BAR */}
      <nav className="h-20 flex items-center border-b border-white/5 sticky top-0 z-[100] bg-black/80 backdrop-blur-md px-4 md:px-8 shrink-0">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <a href="/" className="flex items-center gap-3 group">
            <img src="https://gemicha-portal.vercel.app/logo.png" alt="Gemicha" className="h-10 w-auto rounded-lg" />
            <span className="text-xl font-extrabold tracking-widest uppercase">GEMICHA</span>
          </a>
          <select 
            value={lang} 
            onChange={(e) => changeLanguage(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase outline-none cursor-pointer"
          >
            {Object.entries(LANG_NAMES).map(([code, name]) => (
              <option key={code} value={code} className="bg-[#111]">{name}</option>
            ))}
          </select>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden relative">
        {/* ASIDE - FILTERS (Desktop'ta Sol, Mobile'da üstte katlanır) */}
        <aside className="w-full md:w-80 bg-[#020202] border-r border-white/5 flex flex-col shrink-0 z-40 overflow-y-auto no-scrollbar max-h-[35vh] md:max-h-full">
          <div className="p-6 space-y-8">
            {/* Burç Seçimi Grid */}
            <div>
              <h3 className="text-[10px] font-black text-gray-500 mb-4 uppercase tracking-widest">Zodiac Signs</h3>
              <div className="grid grid-cols-4 md:grid-cols-3 gap-2">
                <button 
                  onClick={() => setActiveSign('all')}
                  className={`p-2 rounded-xl text-[9px] font-black border transition-all ${activeSign === 'all' ? 'bg-white text-black border-white' : 'bg-white/5 border-transparent text-gray-500'}`}
                >
                  {UI_ALL[lang] || 'ALL'}
                </button>
                {ZODIAC_SIGNS.map(s => (
                  <button key={s.id} onClick={() => setActiveSign(s.id)}
                    className={`p-2 rounded-xl text-[9px] font-black border transition-all uppercase ${activeSign === s.id ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-white/5 border-transparent text-gray-500 hover:text-white'}`}
                  >
                    {ZODIAC_DICT[lang]?.[s.id] || ZODIAC_DICT['en'][s.id]}
                  </button>
                ))}
              </div>
            </div>

            {/* Konu Seçimi Liste */}
            <div>
              <h3 className="text-[10px] font-black text-gray-500 mb-4 uppercase tracking-widest">Topic Analytics</h3>
              <div className="space-y-2">
                {TOPICS.map(t => (
                  <button key={t.id} onClick={() => setActiveTopic(t.id)}
                    className={`w-full text-left p-3 rounded-xl text-[10px] font-black border transition-all uppercase flex justify-between items-center ${activeTopic === t.id ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' : 'bg-white/5 border-transparent text-gray-500 hover:text-white'}`}
                  >
                    {lang === 'tr' ? t.tr : t.en}
                    {activeTopic === t.id && <div className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan]"></div>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN - CONTENT LIST */}
        <main className="flex-1 bg-black overflow-y-auto no-scrollbar p-6 md:p-12 pb-32">
          <header className="mb-12">
            <span className="text-cyan-500 text-[10px] font-black tracking-[0.4em] mb-3 block uppercase">INSIGHTS & COSMOS</span>
            <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter">
              {activeSign === 'all' ? 'Global' : (ZODIAC_DICT[lang]?.[activeSign] || activeSign)} <span className="text-white/20">Analysis</span>
            </h2>
          </header>

          {loading ? (
             <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-10 h-10 border-2 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin"></div>
             </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
              {filteredInsights.map((item) => (
                <article key={item.id} className="group relative bg-[#050505] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-[#D4AF37]/30 transition-all duration-500">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={`https://gemicha-portal.vercel.app/images/zodiac/${item.zodiac_sign.toLowerCase()}.webp`} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105 opacity-50" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
                    
                    {/* Seslendirme Butonu */}
                    <button 
                      onClick={() => toggleSpeech(item.content_body, item.id)}
                      className={`absolute top-6 right-6 p-4 rounded-2xl border backdrop-blur-md transition-all z-20 ${playingId === item.id ? 'bg-cyan-500 border-cyan-400 text-black' : 'bg-white/5 border-white/10 text-white hover:bg-white/20'}`}
                    >
                      <i className={`fa-solid ${playingId === item.id ? 'fa-stop' : 'fa-play'}`}></i>
                    </button>
                  </div>

                  <div className="p-8">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[#D4AF37] font-black text-[10px] tracking-widest uppercase">{item.zodiac_sign}</span>
                      <span className="bg-white/5 px-3 py-1 rounded-full text-[9px] font-black text-white/40 uppercase">{item.topic}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 uppercase leading-tight group-hover:text-white transition-colors">{item.meta_title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed line-clamp-3 mb-6 font-medium">{item.content_body}</p>
                    <Link 
                      href={`/cosmos/${lang}/${item.topic.toLowerCase()}/${item.zodiac_sign.toLowerCase()}`}
                      className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-cyan-400 hover:text-white transition-colors"
                    >
                      Open Neural Report <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* FOOTER */}
      <footer className="py-10 text-center border-t border-white/5 bg-black shrink-0">
        <p className="text-[9px] text-slate-800 font-black tracking-widest uppercase">© 2026 GEMICHA | ALL CELESTIAL RIGHTS RESERVED</p>
      </footer>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
