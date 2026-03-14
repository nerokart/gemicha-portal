import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
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

// EKSİKSİZ 46 DİL ZODYAK SÖZLÜĞÜ
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

// EKSİKSİZ 46 DİL KONU (TOPIC) SÖZLÜĞÜ
const TOPICS_DICT: Record<string, Record<string, string>> = {
  tr: { all: 'TÜMÜ', ask: 'AŞK', kariyer: 'KARİYER', saglik: 'SAĞLIK', para: 'PARA' },
  en: { all: 'ALL', ask: 'LOVE', kariyer: 'CAREER', saglik: 'HEALTH', para: 'FINANCE' },
  ar: { all: 'الكل', ask: 'الحب', kariyer: 'المهنة', saglik: 'الصحة', para: 'المال' },
  de: { all: 'ALLE', ask: 'LIEBE', kariyer: 'KARRIERE', saglik: 'GESUNDHEIT', para: 'FINANZEN' },
  es: { all: 'TODO', ask: 'AMOR', kariyer: 'CARRERA', saglik: 'SALUD', para: 'FINANZAS' },
  fr: { all: 'TOUT', ask: 'AMOUR', kariyer: 'CARRIÈRE', saglik: 'SANTÉ', para: 'FINANCES' },
  it: { all: 'TUTTO', ask: 'AMORE', kariyer: 'CARRIERA', saglik: 'SALUTE', para: 'FINANZA' },
  pt: { all: 'TUDO', ask: 'AMOR', kariyer: 'CARREIRA', saglik: 'SAÚDE', para: 'FINANÇAS' },
  ru: { all: 'ВСЕ', ask: 'ЛЮБОВЬ', kariyer: 'КАРЬЕРА', saglik: 'ЗДОРОВЬЕ', para: 'ФИНАНСЫ' },
  zh: { all: '全部', ask: '爱情', kariyer: '事业', saglik: '健康', para: '财务' },
  ja: { all: 'すべて', ask: '恋愛', kariyer: 'キャリア', saglik: '健康', para: '財務' },
  ko: { all: '전체', ask: '사랑', kariyer: '경력', saglik: '건강', para: '재무' },
  nl: { all: 'ALLES', ask: 'LIEFDE', kariyer: 'CARRIÈRE', saglik: 'GEZONDHEID', para: 'FINANCIËN' },
  pl: { all: 'WSZYSTKO', ask: 'MIŁOŚĆ', kariyer: 'KARIERA', saglik: 'ZDROWIE', para: 'FINANSE' },
  sv: { all: 'ALLA', ask: 'KÄRLEK', kariyer: 'KARRIÄR', saglik: 'HÄLSA', para: 'EKONOMI' },
  da: { all: 'ALLE', ask: 'KÆRLIGHED', kariyer: 'KARRIERE', saglik: 'SUNDHED', para: 'ØKONOMI' },
  fi: { all: 'KAIKKI', ask: 'RAKKAUS', kariyer: 'URA', saglik: 'TERVEYS', para: 'TALOUS' },
  no: { all: 'ALLE', ask: 'KJÆRLIGHET', kariyer: 'KARRIERE', saglik: 'HELSE', para: 'ØKONOMI' },
  cs: { all: 'VŠE', ask: 'LÁSKA', kariyer: 'KARIÉRA', saglik: 'ZDRAVÍ', para: 'FINANCE' },
  hu: { all: 'ÖSSZES', ask: 'SZERELEM', kariyer: 'KARRIER', saglik: 'EGÉSZSÉG', para: 'PÉNZÜGY' },
  ro: { all: 'TOATE', ask: 'DRAGOSTE', kariyer: 'CARIERĂ', saglik: 'SĂNĂTATE', para: 'FINANȚE' },
  el: { all: 'ΟΛΑ', ask: 'ΑΓΑΠΗ', kariyer: 'ΚΑΡΙΕΡΑ', saglik: 'ΥΓΕΙΑ', para: 'ΟΙΚΟΝΟΜΙΚΑ' },
  he: { all: 'הכל', ask: 'אהבה', kariyer: 'קריירה', saglik: 'בריאות', para: 'כספים' },
  hi: { all: 'सभी', ask: 'प्रेम', kariyer: 'करियर', saglik: 'स्वास्थ्य', para: 'वित्त' },
  bn: { all: 'সব', ask: 'প্রেম', kariyer: 'পেশা', saglik: 'স্বাস্থ্য', para: 'অর্থ' },
  id: { all: 'SEMUA', ask: 'CINTA', kariyer: 'KARIR', saglik: 'KESEHATAN', para: 'KEUANGAN' },
  ms: { all: 'SEMUA', ask: 'CINTA', kariyer: 'KERJAYA', saglik: 'KESIHATAN', para: 'KEWANGAN' },
  th: { all: 'ทั้งหมด', ask: 'ความรัก', kariyer: 'การงาน', saglik: 'สุขภาพ', para: 'การเงิน' },
  vi: { all: 'TẤT CẢ', ask: 'TÌNH YÊU', kariyer: 'SỰ NGHIỆP', saglik: 'SỨC KHỎE', para: 'TÀI CHÍNH' },
  uk: { all: 'ВСЕ', ask: 'КОХАННЯ', kariyer: 'КАР\'ЄРА', saglik: 'ЗДОРОВ\'Я', para: 'ФІНАНСИ' },
  fa: { all: 'همه', ask: 'عشق', kariyer: 'شغل', saglik: 'سلامتی', para: 'مالی' },
  ur: { all: 'سب', ask: 'محبت', kariyer: 'کیریئر', saglik: 'صحت', para: 'مالیات' },
  ta: { all: 'அனைத்தும்', ask: 'காதல்', kariyer: 'தொழில்', saglik: 'ஆரோக்கியம்', para: 'நிதி' },
  te: { all: 'అన్నీ', ask: 'ప్రేమ', kariyer: 'కెరీర్', saglik: 'ఆరోగ్యం', para: 'ఆర్థిక' },
  bg: { all: 'ВСИЧКИ', ask: 'ЛЮБОВ', kariyer: 'КАРИЕРА', saglik: 'ЗДРАВЕ', para: 'ФИНАНСИ' },
  tl: { all: 'LAHAT', ask: 'PAG-IBIG', kariyer: 'KARERA', saglik: 'KALUSUGAN', para: 'PANANALAPI' },
  hr: { all: 'SVE', ask: 'LJUBAV', kariyer: 'KARIJERA', saglik: 'ZDRAVLJE', para: 'FINANCIJE' },
  sr: { all: 'СВЕ', ask: 'ЉУБАВ', kariyer: 'КАРИЈЕРА', saglik: 'ЗДРАВЉЕ', para: 'ФИНАНСИЈЕ' },
  sk: { all: 'VŠETKY', ask: 'LÁSKA', kariyer: 'KARIÉRA', saglik: 'ZDRAVIE', para: 'FINANCIE' },
  sl: { all: 'VSE', ask: 'LJUBEZEN', kariyer: 'KARIERA', saglik: 'ZDRAVJE', para: 'FINANCE' },
  et: { all: 'KÕIK', ask: 'ARMASTUS', kariyer: 'KARJÄÄR', saglik: 'TERVIS', para: 'RAHANDUS' },
  lv: { all: 'VISI', ask: 'MĪLESTĪBA', kariyer: 'KARJERA', saglik: 'VESELĪBA', para: 'FINANSES' },
  lt: { all: 'VISI', ask: 'MEILĖ', kariyer: 'KARJERA', saglik: 'SVEIKATA', para: 'FINANSAI' },
  ca: { all: 'TOT', ask: 'AMOR', kariyer: 'CARRERA', saglik: 'SALUT', para: 'FINANCES' },
  az: { all: 'HAMISI', ask: 'SEVGİ', kariyer: 'KARYERA', saglik: 'SAĞLAMLIQ', para: 'MALİYYƏ' },
  kk: { all: 'БАРЛЫҒЫ', ask: 'МАХАББАТ', kariyer: 'МАНСАП', saglik: 'ДЕНСАУЛЫҚ', para: 'ҚАРЖЫ' }
};


// URL kelimesini Veritabanı ID'sine çeviren fonksiyon (Reverse Lookup)
const getBaseIdFromLocalized = (dict: any, lang: string, localizedSlug: string) => {
  const langDict = dict[lang] || dict['en'];
  for (const [key, value] of Object.entries(langDict)) {
    if ((value as string).toLowerCase().replace(/\s+/g, '-') === localizedSlug) return key;
  }
  return localizedSlug;
};

// Veritabanı ID'sinden UI ismini bulan fonksiyon
const getUIString = (dict: any, lang: string, key: string) => {
  return dict[lang]?.[key] || dict['en']?.[key] || key;
};

// URL linki oluşturmak için
const getLocalSlug = (dict: any, lang: string, key: string) => {
  return (dict[lang]?.[key] || dict['en']?.[key] || key).toLowerCase().replace(/\s+/g, '-');
};

type PageParams = { lang: string; topic: string; sign: string };
type SearchParams = { date?: string };

export default async function ZodiacArticle({ params, searchParams }: { params: Promise<PageParams>, searchParams: Promise<SearchParams> }) {
  
  const resolvedParams = await params; 
  const resolvedSearch = await searchParams;

  if (!resolvedParams) return null;

  const rawLang = decodeURIComponent(resolvedParams.lang || 'en').trim();
  const rawTopic = decodeURIComponent(resolvedParams.topic || '').trim();
  const rawSign = decodeURIComponent(resolvedParams.sign || '').trim();
  const rawDate = resolvedSearch?.date || null;

  const dbTopic = getBaseIdFromLocalized(TOPICS_DICT, rawLang, rawTopic);
  const dbSign = getBaseIdFromLocalized(ZODIAC_DICT, rawLang, rawSign);

  // ANA VERİ SORGUSU
  let mainQuery = supabase
    .from('gemicha_insights')
    .select('*')
    .ilike('language', rawLang)
    .ilike('topic', dbTopic)
    .ilike('zodiac_sign', dbSign)
    .order('target_date', { ascending: false })
    .limit(1);

  if (rawDate) mainQuery = mainQuery.eq('target_date', rawDate);

  const { data: insights, error } = await mainQuery;
  const insight = insights?.[0];

  // BLOG STİLİ NEXT / PREV SORGULARI
  let prevUrl = null;
  let nextUrl = null;
  let prevTitle = null;
  let nextTitle = null;

  if (insight) {
    const localTopicSlug = getLocalSlug(TOPICS_DICT, rawLang, dbTopic);
    const localSignSlug = getLocalSlug(ZODIAC_DICT, rawLang, dbSign);

    const { data: prevData } = await supabase.from('gemicha_insights').select('*')
      .ilike('language', rawLang).ilike('topic', dbTopic).ilike('zodiac_sign', dbSign)
      .lt('target_date', insight.target_date).order('target_date', { ascending: false }).limit(1);
    
    const { data: nextData } = await supabase.from('gemicha_insights').select('*')
      .ilike('language', rawLang).ilike('topic', dbTopic).ilike('zodiac_sign', dbSign)
      .gt('target_date', insight.target_date).order('target_date', { ascending: true }).limit(1);

    if (prevData?.[0]) {
      prevUrl = `/cosmos/${rawLang}/${localTopicSlug}/${localSignSlug}?date=${prevData[0].target_date}`;
      prevTitle = `${prevData[0].target_date} Analysis`;
    }
    if (nextData?.[0]) {
      nextUrl = `/cosmos/${rawLang}/${localTopicSlug}/${localSignSlug}?date=${nextData[0].target_date}`;
      nextTitle = `${nextData[0].target_date} Analysis`;
    }
  }

  let faqData = [];
  try {
    if (insight?.faq_schema) faqData = typeof insight.faq_schema === 'string' ? JSON.parse(insight.faq_schema) : insight.faq_schema;
  } catch (e) {}

  if (!insight || error) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10 font-['Plus_Jakarta_Sans',sans-serif]">
        <h1 className="text-[#D4AF37] text-4xl font-black mb-4 uppercase italic">Data Missing</h1>
        <p className="text-white/40 text-sm mb-8 italic">The stars could not find data for this specific alignment.</p>
        <Link href="/cosmos" className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase hover:bg-white/10 transition">Return to Cosmos</Link>
      </div>
    );
  }

  const displaySign = getUIString(ZODIAC_DICT, rawLang, dbSign);
  const displayTopic = getUIString(TOPICS_DICT, rawLang, dbTopic);

  return (
    <div className="bg-black text-white min-h-screen font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#D4AF37] selection:text-black flex flex-col overflow-x-hidden">
      
      {/* STANDART NAV BAR */}
      <nav className="h-20 flex items-center border-b border-white/5 sticky top-0 z-50 bg-black/95 px-6 backdrop-blur-md shrink-0">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link href="/cosmos" className="flex items-center gap-3 group">
            <img src="https://gemicha-portal.vercel.app/logo.png" alt="Logo" className="h-10 w-auto rounded-lg" />
            <span className="text-xl font-black tracking-widest uppercase text-white">GEMICHA</span>
          </Link>
          
          <div className="flex items-center gap-6">
             <Link href="/cosmos" className="text-[10px] font-black uppercase text-white/50 hover:text-white transition hidden md:block">
               <i className="fa-solid fa-arrow-left mr-2"></i> BACK TO GRID
             </Link>
             <div className="h-4 w-[1px] bg-white/10 hidden md:block"></div>
             
             {/* SİTE STANDART DİL SEÇİCİSİ */}
             <select 
                defaultValue={rawLang}
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
        
        {/* SIDEBAR */}
        <aside className="w-full md:w-[450px] bg-[#020202] border-r border-white/5 p-8 md:p-16 flex flex-col shrink-0">
           <div className="mb-8">
              <span className="bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-[0.3em] mb-8 inline-block">
                NEURAL {displayTopic} REPORT
              </span>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.85] mb-6">
                {displaySign} <br/>
                <span className="text-white/10">Insight</span>
              </h1>
              <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <i className="fa-regular fa-calendar"></i> {insight.target_date}
              </p>
           </div>

           <div className="relative rounded-[2rem] overflow-hidden border border-white/5 mb-8 group">
              <img 
                src={`https://gemicha-portal.vercel.app/images/zodiac/${dbSign}.webp`} 
                className="w-full h-64 object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105" 
                alt={dbSign}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent"></div>
           </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 bg-black p-8 md:p-20 overflow-y-auto relative pb-40">
          <div className="max-w-3xl mx-auto">
            
            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-8 uppercase text-white/90">{insight.meta_title}</h2>
              <p className="text-2xl md:text-3xl font-light italic text-[#D4AF37] leading-relaxed opacity-90 border-l-4 border-[#D4AF37] pl-8">
                "The stars do not compel, they impel. This is your personal cosmic weather report."
              </p>
            </div>

            <article className="prose prose-invert max-w-none">
              <div className="text-xl leading-[2.1] text-white/70 space-y-12 first-letter:text-8xl first-letter:font-black first-letter:text-[#D4AF37] first-letter:mr-5 first-letter:float-left first-letter:mt-3">
                {insight.content_body}
              </div>
            </article>

            {/* İLERİ / GERİ BUTONLARI (Blog Mantığı) */}
            <div className="mt-20 flex gap-4 pt-10 border-t border-white/5">
                {prevUrl ? (
                  <Link href={prevUrl} className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all group">
                    <span className="block text-cyan-400 font-black text-[9px] tracking-widest uppercase mb-2">PREVIOUS STORY</span>
                    <span className="block text-white font-bold group-hover:text-cyan-300 transition-colors">{prevTitle}</span>
                  </Link>
                ) : <div className="flex-1"></div>}
                
                {nextUrl ? (
                  <Link href={nextUrl} className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all group text-right">
                    <span className="block text-cyan-400 font-black text-[9px] tracking-widest uppercase mb-2">NEXT STORY</span>
                    <span className="block text-white font-bold group-hover:text-cyan-300 transition-colors">{nextTitle}</span>
                  </Link>
                ) : <div className="flex-1"></div>}
            </div>

            {/* FAQ */}
            <section className="mt-32 pt-20 border-t border-white/5">
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

      {/* YENİ: STANDART GEMICHA FOOTER */}
      <footer className="py-12 text-center border-t border-white/5 bg-black mt-auto shrink-0 z-50">
          <div className="max-w-7xl mx-auto flex flex-col gap-8 px-6 text-[10px] uppercase tracking-[0.4em] text-slate-600 font-bold">
              <nav className="flex justify-center flex-wrap gap-8">
                  <Link href="/" className="hover:text-white transition">Home</Link>
                  <Link href="/characters" className="hover:text-white transition">Characters</Link>
                  <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
                  <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
              </nav>
              <p className="text-slate-700 tracking-[0.3em] uppercase">Official Support</p>
              <a href="mailto:support@gemicha.com" className="text-sm text-white/80 hover:text-cyan-400 transition lowercase tracking-normal font-medium">support@gemicha.com</a>
              
              <div className="mt-4 border-t border-white/5 pt-8 flex flex-col items-center">
                <p className="text-[10px] font-black tracking-[0.5em] text-[#D4AF37] uppercase mb-2">GEMICHA NEURAL ENGINE v3.0</p>
                <p className="text-[9px] text-slate-800 tracking-[0.6em] uppercase">© 2026 GEMICHA | ALL CELESTIAL RIGHTS RESERVED</p>
              </div>
          </div>
      </footer>
    </div>
  );
}
