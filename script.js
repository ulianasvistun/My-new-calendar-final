let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentDay = currentDate.getDate();
let currentLanguage = localStorage.getItem("lang") || "en";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const monthlyPoems = {
  en: {
    0: `The air stands still,\nas if listening to itself.\nSnow holds the world together,\nevery step a quiet promise.`,
    1: `Cold sharpens thought.\nWindows glow warmer than words.\nHold on — not tightly,\nbut honestly.`,
    2: `The earth exhales.\nSomething restless moves underfoot.\nMarch is not gentle —\nit is sincere.`,
    3: `The days grow careless.\nRain forgets where it was going.\nHope enters quietly,\npretending it has always been here.`,
    4: `Everything begins to listen.\nLeaves, voices, open windows.\nMay asks only one thing:\nbe open.`,
    5: `Light stretches endlessly.\nTime slows down,\nnot to stop —\nbut to let you notice\nwhat matters.`,
    6: `Warm air carries unsaid things.\nWater mirrors the sky without effort.\nJuly lives in pauses,\nbetween heartbeats and long evenings.`,
    7: `Everything ripens at once.\nJoy and fatigue share the same space.\nNotice them.\nThey will not repeat.`,
    8: `The world becomes clearer.\nEdges sharpen.\nSilence gains meaning.\nSeptember does not rush — it understands.`,
    9: `Wind interrupts thoughts.\nThe city speaks louder.\nChange feels unavoidable.\nThis month demands honesty.`,
    10: `The light withdraws.\nNovember is thoughtful.\nListen closely.`,
    11: `Time folds inward.\nThe year exhales.\nRest.\nYou have carried enough.`
  },
  ru: {
    0: `Воздух замирает,\nсловно прислушивается к себе.\nСнег скрепляет мир,\nкаждый шаг — тихое обещание.`,
    1: `Холод обостряет мысли.\nОкна светлее слов.\nДержись — не крепко,\nа честно.`,
    2: `Земля выдыхает.\nЧто-то неспокойное движется под ногами.\nМарт не мягок — он искренен.`,
    3: `Дни становятся беспечными.\nДождь забывает путь.\nНадежда приходит тихо,\nсловно всегда была здесь.`,
    4: `Всё начинает слушать.\nЛистья, голоса, открытые окна.\nМай просит лишь одно:\nбудь открытым.`,
    5: `Свет растягивается бесконечно.\nВремя замедляется,\nне чтобы остановиться —\nа чтобы заметить главное.`,
    6: `Тёплый воздух несёт несказанное.\nВода отражает небо без усилий.\nИюль живёт в паузах —\nмежду ударами сердца.`,
    7: `Всё созревает сразу.\nРадость и усталость делят пространство.\nЗаметь их.\nОни не повторятся.`,
    8: `Мир становится яснее.\nГрани остры.\nТишина приобретает смысл.\nСентябрь не спешит — он понимает.`,
    9: `Ветер прерывает мысли.\nГород говорит громче.\nПеремены неизбежны.\nЭтот месяц требует честности.`,
    10: `Свет уходит.\nНоябрь задумчив.\nСлушай внимательно.`,
    11: `Время сворачивается внутрь.\nГод выдыхает.\nОтдохни.\nТы нёс достаточно.`
  }
};

const leoHoroscope = {
  en: [
    "Today is about calm confidence. You don’t need to rush.",
    "Focus on what truly matters today. Small decisions count.",
    "Let reflection guide your choices, not haste.",
    "Your energy is noticed, even in silence.",
    "Finish what you’ve postponed with gentle attention.",
    "Lead with patience. Strength comes from calm.",
    "Creativity flows best without forcing results.",
    "Someone may seek your reassurance. Offer it freely.",
    "Trust your intuition; it knows more than you think.",
    "Today favors clear boundaries and self-respect."
  ],
  ru: [
    "Сегодня день спокойной уверенности. Не спеши.",
    "Сфокусируйся на действительно важном. Малые решения важны.",
    "Пусть размышления направляют твои шаги, а не спешка.",
    "Твоя энергия замечается, даже в тишине.",
    "Закончите то, что откладывали, с аккуратностью.",
    "Веди мягко. Сила сегодня — в спокойствии.",
    "Творчество течет лучше без насилия над результатом.",
    "Кто-то ищет твоего ободрения. Дай его свободно.",
    "Доверяй интуиции; она знает больше, чем ты думаешь.",
    "Сегодня важны ясные границы и уважение к себе."
  ]
};

const leoPowerDays = [1,5,8,10,14,17,19,22,25,28];

// DOM элементы
const monthTitle = document.getElementById("monthTitle");
const poemMonth = document.getElementById("poemMonth");
const poemText = document.getElementById("poemText");
const horoscopeEl = document.getElementById("horoscope");
const languageToggle = document.getElementById("languageToggle");

// Обновление месяца и гороскопа
function updatePoem() {
  monthTitle.textContent = months[currentMonth];
  poemMonth.textContent = months[currentMonth];
  poemText.textContent = monthlyPoems[currentLanguage][currentMonth] || "";
  updateHoroscope(currentDay);
}

function updateHoroscope(day) {
  const index = day % leoHoroscope.en.length;
  horoscopeEl.classList.remove("fade-horoscope");
  void horoscopeEl.offsetWidth;
  horoscopeEl.classList.add("fade-horoscope");
  horoscopeEl.innerHTML = `
    <strong>Leo Horoscope</strong><br>
    <em>Message for day ${day}:</em><br>
    ${leoHoroscope[currentLanguage][index]}
  `;
}

// Кнопка смены языка
languageToggle.onclick = () => {
  currentLanguage = currentLanguage === "en" ? "ru" : "en";
  localStorage.setItem("lang", currentLanguage);
  languageToggle.textContent = currentLanguage.toUpperCase();
  updatePoem();
};

// Кнопки смены месяца
document.getElementById("prevMonth").onclick = () => {
  currentMonth = (currentMonth - 1 + 12) % 12;
  updatePoem();
};
document.getElementById("nextMonth").onclick = () => {
  currentMonth = (currentMonth + 1) % 12;
  updatePoem();
};

// Выбор дня
function selectDay(day) {
  currentDay = day;
  updateHoroscope(day);
}

updatePoem();
