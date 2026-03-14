export const LANG_NAMES = {
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

export const ZODIAC_SIGNS = [
  { id: 'koc' }, { id: 'boga' }, { id: 'ikizler' }, { id: 'yengec' },
  { id: 'aslan' }, { id: 'basak' }, { id: 'terazi' }, { id: 'akrep' },
  { id: 'yay' }, { id: 'oglak' }, { id: 'kova' }, { id: 'balik' }
];

export const ZODIAC_DICT: Record<string, Record<string, string>> = {
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
  bn: { koc: 'মেষ', boga: 'বৃষ', ikizler: 'মিথুন', yengec: 'কর্কট', aslan: 'সিংহ', basak: 'কন্যা', terazi: 'তুला', akrep: 'বৃশ্চিক', yay: 'ধনু', oglak: 'মকর', kova: 'কুম্ভ', balik: 'মীন' },
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

export const TOPICS_DICT: Record<string, Record<string, string>> = {
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

export const UI_DICT: Record<string, any> = {
  tr: { home: "Ana Sayfa", char: "Karakterler", priv: "Gizlilik Politikası", terms: "Hizmet Şartları", support: "RESMİ DESTEK", back: "LİSTEYE DÖN", legal: "Yasal Uyarı", warning: "Bu analizler yapay zeka tarafından üretilmiştir. Finansal veya tıbbi tavsiye içermez.", quote: '"Yıldızlar mecbur kılmaz, sadece teşvik eder. Bu sizin kişisel kozmik hava durumunuzdur."', filter_new: "EN YENİ", filter_old: "EN ESKİ", filter_title: "FİLTRELE" },
  en: { home: "Home", char: "Characters", priv: "Privacy Policy", terms: "Terms of Service", support: "OFFICIAL SUPPORT", back: "BACK TO GRID", legal: "Legal Disclaimer", warning: "These analyses are AI-generated. They do not constitute financial or medical advice.", quote: '"The stars do not compel, they impel. This is your personal cosmic weather report."', filter_new: "NEWEST", filter_old: "OLDEST", filter_title: "FILTER" },
  ar: { home: "الرئيسية", char: "الشخصيات", priv: "سياسة الخصوصية", terms: "شروط الخدمة", support: "الدعم الرسمي", back: "العودة للقائمة", legal: "إخلاء المسؤولية", warning: "هذه التحليلات يتم إنشاؤها بواسطة الذكاء الاصطناعي ولا تشكل نصيحة مالية.", quote: '"النجوم لا تجبر، بل تحفز. هذا هو تقرير الطقس الكوني الخاص بك."', filter_new: "الأحدث", filter_old: "الأقدم", filter_title: "تصفية" },
  de: { home: "Startseite", char: "Charaktere", priv: "Datenschutz", terms: "Nutzungsbedingungen", support: "OFFIZIELLER SUPPORT", back: "ZURÜCK", legal: "Haftungsausschluss", warning: "Diese Analysen werden von KI generiert und stellen keine Beratung dar.", quote: '"Die Sterne zwingen nicht, sie treiben an. Dies ist Ihr persönlicher kosmischer Wetterbericht."', filter_new: "NEUESTE", filter_old: "ÄLTESTE", filter_title: "FILTERN" },
  es: { home: "Inicio", char: "Personajes", priv: "Política de Privacidad", terms: "Términos", support: "SOPORTE OFICIAL", back: "VOLVER", legal: "Aviso Legal", warning: "Estos análisis son generados por IA y no constituyen asesoramiento.", quote: '"Las estrellas no obligan, impulsan. Este es tu reporte del clima cósmico."', filter_new: "MÁS NUEVO", filter_old: "MÁS ANTIGUO", filter_title: "FILTRAR" },
  fr: { home: "Accueil", char: "Personnages", priv: "Confidentialité", terms: "Conditions", support: "SUPPORT OFFICIEL", back: "RETOUR", legal: "Avertissement Légal", warning: "Ces analyses sont générées par l'IA et ne constituent pas des conseils.", quote: '"Les étoiles ne contraignent pas, elles impulsent. Voici votre météo cosmique."', filter_new: "PLUS RÉCENT", filter_old: "PLUS ANCIEN", filter_title: "FILTRER" },
  it: { home: "Home", char: "Personaggi", priv: "Privacy", terms: "Termini", support: "SUPPORTO UFFICIALE", back: "INDIETRO", legal: "Avviso Legale", warning: "Queste analisi sono generate dall'IA e non costituiscono consigli.", quote: '"Le stelle non costringono, spingono. Questo è il tuo meteo cosmico."', filter_new: "PIÙ RECENTE", filter_old: "PIÙ VECCHIO", filter_title: "FILTRA" },
  pt: { home: "Início", char: "Personagens", priv: "Privacidade", terms: "Termos", support: "SUPORTE OFICIAL", back: "VOLTAR", legal: "Aviso Legal", warning: "Essas análises são geradas por IA e não constituem aconselhamento.", quote: '"As estrelas não obrigam, impulsionam. Este é o seu clima cósmico."', filter_new: "MAIS RECENTE", filter_old: "MAIS ANTIGO", filter_title: "FILTRAR" },
  ru: { home: "Главная", char: "Персонажи", priv: "Приватность", terms: "Условия", support: "ПОДДЕРЖКА", back: "НАЗАД", legal: "Отказ от ответственности", warning: "Анализы созданы ИИ и не являются рекомендациями.", quote: '"Звезды не принуждают, они направляют. Это ваш космический прогноз."', filter_new: "НОВЫЕ", filter_old: "СТАРЫЕ", filter_title: "ФИЛЬТР" },
  zh: { home: "首页", char: "角色", priv: "隐私政策", terms: "服务条款", support: "官方支持", back: "返回", legal: "法律免责声明", warning: "这些分析由AI生成，不构成财务或医疗建议。", quote: '"星星不强迫，只推动。这是您的个人宇宙天气预报。"', filter_new: "最新", filter_old: "最旧", filter_title: "筛选" },
  ja: { home: "ホーム", char: "キャラクター", priv: "プライバシー", terms: "利用規約", support: "公式サポート", back: "戻る", legal: "免責事項", warning: "これらの分析はAIによって生成されたものであり、アドバイスではありません。", quote: '"星は強制せず、促す。これはあなたの宇宙の天気予報です。"', filter_new: "最新", filter_old: "最古", filter_title: "フィルター" },
  ko: { home: "홈", char: "캐릭터", priv: "개인정보", terms: "이용 약관", support: "공식 지원", back: "뒤로", legal: "면책 조항", warning: "이 분석은 AI가 생성한 것으로, 전문적인 조언이 아닙니다.", quote: '"별은 강제하지 않고, 이끌어줍니다. 이것은 당신의 우주 날씨 예보입니다."', filter_new: "최신", filter_old: "오래된", filter_title: "필터" },
  nl: { home: "Home", char: "Karakters", priv: "Privacy", terms: "Voorwaarden", support: "OFFICIËLE ONDERSTEUNING", back: "TERUG", legal: "Juridische Disclaimer", warning: "Deze analyses zijn gegenereerd door AI en vormen geen advies.", quote: '"De sterren dwingen niet, ze drijven aan. Dit is uw kosmische weerbericht."', filter_new: "NIEUWSTE", filter_old: "OUDSTE", filter_title: "FILTER" },
  pl: { home: "Start", char: "Postacie", priv: "Prywatność", terms: "Warunki", support: "WSPARCIE", back: "WSTECZ", legal: "Zastrzeżenie prawne", warning: "Te analizy są generowane przez AI i nie stanowią porady.", quote: '"Gwiazdy nie zmuszają, lecz popychają. To Twoja kosmiczna pogoda."', filter_new: "NAJNOWSZE", filter_old: "NAJSTARSZE", filter_title: "FILTR" },
  sv: { home: "Hem", char: "Karaktärer", priv: "Integritet", terms: "Villkor", support: "OFFICIELL SUPPORT", back: "TILLBAKA", legal: "Ansvarsfriskrivning", warning: "Dessa analyser genereras av AI och utgör inte rådgivning.", quote: '"Stjärnorna tvingar inte, de driver på. Detta är ditt kosmiska väder."', filter_new: "NYASTE", filter_old: "ÄLDSTA", filter_title: "FILTER" },
  da: { home: "Hjem", char: "Karakterer", priv: "Privatliv", terms: "Vilkår", support: "OFFICIEL SUPPORT", back: "TILBAGE", legal: "Ansvarsfraskrivelse", warning: "Disse analyser er AI-genererede og udgør ikke rådgivning.", quote: '"Stjernerne tvinger ikke, de tilskynder. Dette er dit kosmiske vejr."', filter_new: "NYESTE", filter_old: "ÆLDSTE", filter_title: "FILTER" },
  fi: { home: "Koti", char: "Hahmot", priv: "Tietosuoja", terms: "Ehdot", support: "VIRALLINEN TUKI", back: "TAKAISIN", legal: "Vastuuvapauslauseke", warning: "Nämä analyysit ovat tekoälyn tuottamia, eivätkä ne ole neuvoja.", quote: '"Tähdet eivät pakota, ne kannustavat. Tämä on kosminen sääsi."', filter_new: "UUSIN", filter_old: "VANHIN", filter_title: "SUODATIN" },
  no: { home: "Hjem", char: "Karakterer", priv: "Personvern", terms: "Vilkår", support: "OFFISIELL STØTTE", back: "TILBAKE", legal: "Ansvarsfraskrivelse", warning: "Disse analysene er AI-generert og utgjør ikke råd.", quote: '"Stjernene tvinger ikke, de driver på. Dette er ditt kosmiske vær."', filter_new: "NYESTE", filter_old: "ELDSTE", filter_title: "FILTER" },
  cs: { home: "Domů", char: "Postavy", priv: "Soukromí", terms: "Podmínky", support: "OFICIÁLNÍ PODPORA", back: "ZPĚT", legal: "Právní omezení", warning: "Tyto analýzy jsou generovány umělou inteligencí a nepředstavují radu.", quote: '"Hvězdy nenutí, pobízejí. Toto je vaše kosmické počasí."', filter_new: "NEJNOVĚJŠÍ", filter_old: "NEJSTARŠÍ", filter_title: "FILTR" },
  hu: { home: "Főoldal", char: "Karakterek", priv: "Adatvédelem", terms: "Feltételek", support: "HIVATALOS TÁMOGATÁS", back: "VISSZA", legal: "Jogi nyilatkozat", warning: "Ezeket az elemzéseket az MI generálja, és nem minősülnek tanácsnak.", quote: '"A csillagok nem kényszerítenek, csak ösztönöznek. Ez az Ön kozmikus időjárása."', filter_new: "LEGÚJABB", filter_old: "LEGRÉGEBBI", filter_title: "SZŰRŐ" },
  ro: { home: "Acasă", char: "Personaje", priv: "Privacitate", terms: "Termeni", support: "SUPORT OFICIAL", back: "ÎNAPOI", legal: "Avertisment Legal", warning: "Aceste analize sunt generate de AI și nu constituie sfaturi.", quote: '"Stelele nu obligă, ele impun. Aceasta este vremea ta cosmică."', filter_new: "CELE MAI NOI", filter_old: "CELE MAI VECHI", filter_title: "FILTRU" },
  el: { home: "Αρχική", char: "Χαρακτήρες", priv: "Απόρρητο", terms: "Όροι", support: "ΕΠΙΣΗΜΗ ΥΠΟΣΤΗΡΙΞΗ", back: "ΠΙΣΩ", legal: "Αποποίηση ευθυνών", warning: "Αυτές οι αναλύσεις δημιουργούνται από τεχνητή νοημοσύνη.", quote: '"Τα άστρα δεν αναγκάζουν, ωθούν. Αυτός είναι ο κοσμικός σας καιρός."', filter_new: "ΝΕΟΤΕΡΑ", filter_old: "ΠΑΛΑΙΟΤΕΡΑ", filter_title: "ΦΙΛΤΡΟ" },
  he: { home: "בית", char: "דמויות", priv: "פרטיות", terms: "תנאים", support: "תמיכה רשמית", back: "חזרה", legal: "הצהרה משפטית", warning: "ניתוחים אלה נוצרו על ידי AI ואינם מהווים עצה.", quote: '"הכוכבים אינם מכריחים, הם מניעים. זהו מזג האוויר הקוסמי שלך."', filter_new: "החדש ביותר", filter_old: "הישן ביותר", filter_title: "סנן" },
  hi: { home: "होम", char: "पात्र", priv: "गोपनीयता", terms: "शर्तें", support: "आधिकारिक समर्थन", back: "वापस", legal: "कानूनी अस्वीकरण", warning: "ये विश्लेषण एआई-जनित हैं और सलाह नहीं बनाते हैं।", quote: '"तारे मजबूर नहीं करते, वे प्रेरित करते हैं। यह आपका लौकिक मौसम है।"', filter_new: "नवीनतम", filter_old: "सबसे पुराना", filter_title: "फ़िल्टर" },
  bn: { home: "হোম", char: "চরিত্র", priv: "গোপনীয়তা", terms: "শর্তাবলী", support: "অফিসিয়াল সাপোর্ট", back: "ফিরে যান", legal: "আইনি দাবিত্যাগ", warning: "এই বিশ্লেষণগুলি এআই দ্বারা তৈরি।", quote: '"তারা বাধ্য করে না, চালিত করে। এটি আপনার মহাজাগতিক আবহাওয়া।"', filter_new: "নতুন", filter_old: "পুরানো", filter_title: "ফিল্টার" },
  id: { home: "Beranda", char: "Karakter", priv: "Privasi", terms: "Ketentuan", support: "DUKUNGAN RESMI", back: "KEMBALI", legal: "Penyangkalan Hukum", warning: "Analisis ini dibuat oleh AI dan bukan merupakan saran medis/keuangan.", quote: '"Bintang tidak memaksa, mereka mendorong. Ini adalah cuaca kosmik Anda."', filter_new: "TERBARU", filter_old: "TERLAMA", filter_title: "FILTER" },
  ms: { home: "Utama", char: "Watak", priv: "Privasi", terms: "Syarat", support: "SOKONGAN RASMI", back: "KEMBALI", legal: "Penafian Undang-undang", warning: "Analisis ini dijana AI dan bukan nasihat kewangan.", quote: '"Bintang tidak memaksa, mereka mendorong. Ini cuaca kosmik anda."', filter_new: "TERBARU", filter_old: "TERLAMA", filter_title: "PENAPIS" },
  th: { home: "หน้าแรก", char: "ตัวละคร", priv: "ความเป็นส่วนตัว", terms: "เงื่อนไข", support: "การสนับสนุน", back: "กลับ", legal: "ข้อสงวนสิทธิ์", warning: "บทวิเคราะห์เหล่านี้สร้างโดย AI", quote: '"ดวงดาวไม่ได้บังคับ แต่ผลักดัน นี่คือสภาพอากาศในอวกาศของคุณ"', filter_new: "ใหม่ล่าสุด", filter_old: "เก่าที่สุด", filter_title: "กรอง" },
  vi: { home: "Trang chủ", char: "Nhân vật", priv: "Bảo mật", terms: "Điều khoản", support: "HỖ TRỢ CHÍNH THỨC", back: "QUAY LẠI", legal: "Tuyên bố từ chối", warning: "Những phân tích này do AI tạo ra và không phải là lời khuyên.", quote: '"Các vì sao không ép buộc, chúng thúc đẩy. Đây là thời tiết vũ trụ của bạn."', filter_new: "MỚI NHẤT", filter_old: "CŨ NHẤT", filter_title: "LỌC" },
  uk: { home: "Головна", char: "Персонажі", priv: "Приватність", terms: "Умови", support: "ОФІЦІЙНА ПІДТРИМКА", back: "НАЗАД", legal: "Відмова від відповідальності", warning: "Ці аналізи створені ШІ та не є порадою.", quote: '"Зірки не примушують, вони спонукають. Це ваша космічна погода."', filter_new: "НОВІ", filter_old: "СТАРІ", filter_title: "ФІЛЬТР" },
  fa: { home: "خانه", char: "شخصیت‌ها", priv: "حریم خصوصی", terms: "شرایط", support: "پشتیبانی رسمی", back: "بازگشت", legal: "سلب مسئولیت", warning: "این تحلیل‌ها توسط هوش مصنوعی تولید شده‌اند.", quote: '"ستارگان مجبور نمی‌کنند، بلکه تشویق می‌کنند. این آب و هوای کیهانی شماست."', filter_new: "جدیدترین", filter_old: "قدیمی‌ترین", filter_title: "فیلتر" },
  ur: { home: "ہوم", char: "کردار", priv: "رازداری", terms: "شرائط", support: "سرکاری مدد", back: "واپس", legal: "قانونی دستبرداری", warning: "یہ تجزیے مصنوعی ذہانت سے تیار کردہ ہیں۔", quote: '"ستارے مجبور نہیں کرتے، وہ تحریک دیتے ہیں۔ یہ آپ کا کائناتی موسم ہے۔"', filter_new: "نئی", filter_old: "پرانی", filter_title: "فلٹر" },
  ta: { home: "முகப்பு", char: "கதாபாத்திரங்கள்", priv: "தனியுரிமை", terms: "விதிமுறைகள்", support: "ஆதரவு", back: "திரும்பு", legal: "பொறுப்புத் துறப்பு", warning: "இவை AI உருவாக்கியவை.", quote: '"நட்சத்திரங்கள் கட்டாயப்படுத்துவதில்லை, உந்துகின்றன. இது உங்கள் வானிலை."', filter_new: "புதியவை", filter_old: "பழையவை", filter_title: "வடிகட்டி" },
  te: { home: "హోమ్", char: "పాత్రలు", priv: "గోప్యత", terms: "నిబంధనలు", support: "మద్దతు", back: "వెనుకకు", legal: "నిరాకరణ", warning: "ఇవి AI ద్వారా సృష్టించబడినవి.", quote: '"నక్షత్రాలు బలవంతం చేయవు, ప్రోత్సహిస్తాయి. ఇది మీ కాస్మిక్ వాతావరణం."', filter_new: "కొత్తవి", filter_old: "పాతవి", filter_title: "ఫిల్టర్" },
  bg: { home: "Начало", char: "Герои", priv: "Поверителност", terms: "Условия", support: "ОФИЦИАЛНА ПОДДРЪЖКА", back: "НАЗАД", legal: "Отказ от отговорност", warning: "Тези анализи са генерирани от ИИ.", quote: '"Звездите не принуждават, те подтикват. Това е вашето космическо време."', filter_new: "НАЙ-НОВИ", filter_old: "НАЙ-СТАРИ", filter_title: "ФИЛТЪР" },
  tl: { home: "Home", char: "Mga Karakter", priv: "Privacy", terms: "Mga Tuntunin", support: "OPISYAL NA SUPORTA", back: "BUMALIK", legal: "Disclaimer", warning: "Ang mga pagsusuring ito ay binuo ng AI.", quote: '"Ang mga bituin ay hindi pumipilit, sila ay nagtutulak. Ito ang iyong cosmic na panahon."', filter_new: "PINAKABAGO", filter_old: "PINAKALUMA", filter_title: "FILTER" },
  hr: { home: "Početna", char: "Likovi", priv: "Privatnost", terms: "Uvjeti", support: "SLUŽBENA PODRŠKA", back: "NATRAG", legal: "Odricanje", warning: "Ove analize generira AI.", quote: '"Zvijezde ne prisiljavaju, one potiču. Ovo je vaše kozmičko vrijeme."', filter_new: "NAJNOVIJE", filter_old: "NAJSTARIJE", filter_title: "FILTER" },
  sr: { home: "Почетна", char: "Ликови", priv: "Приватност", terms: "Услови", support: "ЗВАНИЧНА ПОДРШКА", back: "НАЗАД", legal: "Одрицање", warning: "Ове анализе генерише АИ.", quote: '"Звезде не приморавају, оне подстичу. Ово је ваше космичко време."', filter_new: "НАЈНОВИЈЕ", filter_old: "НАЈСТАРИЈЕ", filter_title: "ФИЛТЕР" },
  sk: { home: "Domov", char: "Postavy", priv: "Súkromie", terms: "Podmienky", support: "OFICIÁLNA PODPORA", back: "SPÄŤ", legal: "Zrieknutie sa", warning: "Tieto analýzy sú generované AI.", quote: '"Hviezdy nenútia, oni poháňajú. Toto je vaše kozmické počasie."', filter_new: "NAJNOVŠIE", filter_old: "NAJSTARŠIE", filter_title: "FILTER" },
  sl: { home: "Domov", char: "Liki", priv: "Zasebnost", terms: "Pogoji", support: "URADNA PODPORA", back: "NAZAJ", legal: "Zavrnitev odgovornosti", warning: "Te analize ustvarja AI.", quote: '"Zvezde ne silijo, one spodbujajo. To je vaše vesoljsko vreme."', filter_new: "NAJNOVEJŠE", filter_old: "NAJSTAREJŠE", filter_title: "FILTER" },
  et: { home: "Avaleht", char: "Tegelased", priv: "Privaatsus", terms: "Tingimused", support: "AMETLIK TUGI", back: "TAGASI", legal: "Lahtiütlus", warning: "Need analüüsid on AI loodud.", quote: '"Tähed ei sunni, nad tõukavad. See on teie kosmiline ilm."', filter_new: "UUSIM", filter_old: "VANIM", filter_title: "FILTER" },
  lv: { home: "Sākums", char: "Tēli", priv: "Privātums", terms: "Noteikumi", support: "OFICIĀLAIS ATBALSTS", back: "ATPAKAĻ", legal: "Atruna", warning: "Šīs analīzes ģenerē AI.", quote: '"Zvaigznes nespiež, tās mudina. Šie ir jūsu kosmiskie laikapstākļi."', filter_new: "JAUNĀKAIS", filter_old: "VECĀKAIS", filter_title: "FILTRS" },
  lt: { home: "Pradžia", char: "Personažai", priv: "Privatumas", terms: "Sąlygos", support: "OFICIALI PAGALBA", back: "ATGAL", legal: "Atsakomybės atsisakymas", warning: "Šias analizes generuoja AI.", quote: '"Žvaigždės neverčia, jos skatina. Tai jūsų kosminis oras."', filter_new: "NAUJAUSI", filter_old: "SENIAUSI", filter_title: "FILTRAS" },
  ca: { home: "Inici", char: "Personatges", priv: "Privacitat", terms: "Termes", support: "SUPORT OFICIAL", back: "TORNAR", legal: "Avís Legal", warning: "Aquestes anàlisis són generades per IA.", quote: '"Les estrelles no obliguen, impulsen. Aquest és el teu clima còsmic."', filter_new: "MÉS NOU", filter_old: "MÉS ANTIC", filter_title: "FILTRAR" },
  az: { home: "Ana Səhifə", char: "Personajlar", priv: "Məxfilik", terms: "Şərtlər", support: "RƏSMİ DƏSTƏK", back: "GERİ QAYIT", legal: "Hüquqi Xəbərdarlıq", warning: "Bu analizlər süni intellekt tərəfindən yaradılıb.", quote: '"Ulduzlar məcbur etmir, təşviq edir. Bu sizin kosmik hava durumunuzdur."', filter_new: "ƏN YENİ", filter_old: "ƏN KÖHNƏ", filter_title: "FİLTR" },
  kk: { home: "Басты бет", char: "Кейіпкерлер", priv: "Құпиялылық", terms: "Шарттар", support: "РЕСМИ ҚОЛДАУ", back: "АРТҚА", legal: "Жауапкершіліктен бас тарту", warning: "Бұл талдауларды жасанды интеллект жасайды.", quote: '"Жұлдыздар мәжбүрлемейді, олар итермелейді. Бұл сіздің ғарыштық ауа райыңыз."', filter_new: "ЕҢ ЖАҢА", filter_old: "ЕҢ ЕСКІ", filter_title: "СҮЗГІ" }
};

// URL'leri bozmadan, sadece özel karakterleri ve boşlukları dönüştüren fonksiyon
export const slugify = (str: string) => {
    const map: any = { 'ç':'c', 'ğ':'g', 'ı':'i', 'ö':'o', 'ş':'s', 'ü':'u', 'ñ':'n', 'é':'e', 'á':'a', 'í':'i', 'ó':'o', 'ú':'u', 'â':'a', 'î':'i', 'û':'u' };
    return str.toLowerCase().replace(/[çğıöşüñéáíóúâîû]/g, match => map[match] || match).replace(/\s+/g, '-').replace(/^-|-$/g, '');
};

// Tersine çevirici
export const getBaseIdFromLocalized = (dict: any, lang: string, localizedSlug: string) => {
  const langDict = dict[lang] || dict['en'];
  for (const [key, value] of Object.entries(langDict)) {
    if (slugify(value as string) === localizedSlug) return key;
  }
  return localizedSlug;
};

export const getUIString = (dict: any, lang: string, key: string, fallback: string) => {
  return dict[lang]?.[key] || dict['en']?.[key] || fallback;
};

// Akıllı Büyük Harf Fonksiyonu
export const safeUpper = (text: string, lang: string) => {
    if (!text) return "";
    return text.toLocaleUpperCase(lang === 'tr' ? 'tr-TR' : 'en-US');
};
