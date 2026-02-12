
const images = [
  'images/jan.jpg','images/feb.jpg','images/mar.jpg','images/apr.jpg',
  'images/may.jpg','images/jun.jpg','images/jul.jpg','images/aug.jpg',
  'images/sep.jpg','images/oct.jpg','images/nov.jpg','images/dec.jpg'
];

const poems = {
  en: [
    "Pushkin — Winter morning shines bright.",
    "Yesenin — The birch whispers softly.",
    "Mayakovsky — A shout of the city soul.",
    "Brodsky — Time flows like water."
  ],
  ru: [
    "Пушкин — Мороз и солнце; день чудесный!",
    "Есенин — Белая берёза под моим окном.",
    "Маяковский — Послушайте!",
    "Бродский — Не выходи из комнаты."
  ]
};

const horoscope = {
  en: [
    "Leo: Today is perfect for confidence.",
    "Leo: Trust your instincts.",
    "Leo: Shine without fear.",
    "Leo: Focus on yourself."
  ],
  ru: [
    "Лев: Сегодня день уверенности.",
    "Лев: Доверься интуиции.",
    "Лев: Смело сияй.",
    "Лев: Сфокусируйся на себе."
  ]
};

let lang = 'en';
let date = new Date();

const monthYear = document.getElementById('monthYear');
const calendarBody = document.getElementById('calendarBody');
const weekdays = document.getElementById('weekdays');
const bg = document.getElementById('background');

const poemText = document.getElementById('poemText');
const poemTitle = document.getElementById('poemTitle');
const horoscopeText = document.getElementById('horoscopeText');
const horoscopeTitle = document.getElementById('horoscopeTitle');

const daysEn = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const daysRu = ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'];

function render() {
  calendarBody.innerHTML = '';
  weekdays.innerHTML = '';
  const days = lang === 'en' ? daysEn : daysRu;

  days.forEach(d => weekdays.innerHTML += `<th>${d}</th>`);

  monthYear.innerText = date.toLocaleString(lang === 'en' ? 'en' : 'ru', { month: 'long', year: 'numeric' });
  bg.style.backgroundImage = `url(${images[date.getMonth()]})`;

  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  let totalDays = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();

  let row = document.createElement('tr');
  for(let i=0;i<firstDay;i++) row.innerHTML += '<td></td>';

  for(let d=1; d<=totalDays; d++){
    if(row.children.length === 7){
      calendarBody.appendChild(row);
      row = document.createElement('tr');
    }
    const cell = document.createElement('td');
    cell.innerText = d;
    if(d === new Date().getDate()) cell.classList.add('active');
    cell.onclick = () => updateInfo(d);
    row.appendChild(cell);
  }
  calendarBody.appendChild(row);

  updateInfo(new Date().getDate());
}

function updateInfo(day){
  poemTitle.innerText = lang === 'en' ? 'Poem of the day' : 'Стих дня';
  horoscopeTitle.innerText = lang === 'en' ? 'Leo Horoscope' : 'Гороскоп Льва';

  poemText.innerText = poems[lang][day % poems[lang].length];
  horoscopeText.innerText = horoscope[lang][day % horoscope[lang].length];
}

document.getElementById('prevMonth').onclick = () => { date.setMonth(date.getMonth()-1); render(); };
document.getElementById('nextMonth').onclick = () => { date.setMonth(date.getMonth()+1); render(); };
document.getElementById('langToggle').onclick = () => { lang = lang === 'en' ? 'ru' : 'en'; render(); };

render();
