
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

function toast(text){
  const el = $('#toast');
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => el.classList.remove('show'), 1900);
}

// Reading progress
function updateProgress(){
  const max = document.documentElement.scrollHeight - innerHeight;
  const pct = max > 0 ? Math.max(0, Math.min(100, scrollY / max * 100)) : 0;
  $('#progressFill').style.width = pct + '%';
  $('#progressPaw').style.left = `calc(${pct}% + 22px)`;
}
addEventListener('scroll', updateProgress, {passive:true});
updateProgress();

// Hero joke button
const jokes = [
  'Барсик считает, что лучший алгоритм — это лечь и не двигаться.',
  'Барсик заранее против любой домашней работы длиннее трёх строк.',
  'Если бы недовольство было олимпиадой, Барсик бы взял диплом.',
  'Барсик уверен, что while(true) — это описание учебного года.'
];
$('#heroJoke').addEventListener('click', () => {
  const text = jokes[Math.floor(Math.random() * jokes.length)];
  $('#heroNote').textContent = text;
});

// Hero tilt
const tilt = $('#tiltCard');
tilt.addEventListener('pointermove', e => {
  const r = tilt.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - .5;
  const y = (e.clientY - r.top) / r.height - .5;
  tilt.style.transform = `perspective(1000px) rotateY(${x*6}deg) rotateX(${-y*6}deg) rotate(1deg)`;
});
tilt.addEventListener('pointerleave', () => {
  tilt.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) rotate(0deg)';
});

// Dialog bubbles
const speeches = $$('.comic-panel .speech');
const dots = $$('#dialogDots i');
let dialogIndex = 0;
$('#nextDialog').addEventListener('click', () => {
  dialogIndex = Math.min(dialogIndex + 1, speeches.length - 1);
  speeches[dialogIndex].classList.add('visible');
  dots.forEach((d, i) => d.classList.toggle('on', i <= dialogIndex));
  if (dialogIndex === speeches.length - 1){
    $('#nextDialog').textContent = 'Барсик официально в курсе ✓';
    toast('И с этого момента назад пути уже не было.');
  }
});

// Benefits tabs
const benefitData = {
  stress: {
    icon: '☁',
    title: 'Снимает напряжение',
    text: 'После тяжёлой задачи короткая шутка или визуальный мем дают группе маленький выдох. Это не ломает урок, а наоборот помогает вернуться к следующему блоку с более живым вниманием.',
    note: 'Лучше всего работает после интенсивной практики или перед новой сложной темой.'
  },
  attention: {
    icon: '↺',
    title: 'Возвращает внимание',
    text: 'Знакомый персонаж меняет ритм урока. После длинного объяснения или кода его появление помогает мягко перезапустить внимание без лишнего давления.',
    note: 'Идеально использовать на переходах между этапами занятия.'
  },
  memory: {
    icon: '✦',
    title: 'Делает тему запоминаемой',
    text: 'Когда Барсик переодевается под тему, образ становится зрительным якорем. Через картинку легче вспомнить идею, чем через абстрактную фразу.',
    note: 'Главное — чтобы связь образа и понятия была очевидной.'
  },
  voice: {
    icon: '?',
    title: 'Говорит за ученика',
    text: 'Барсик может озвучить усталость, страх ошибки или типичное недоумение вместо ребёнка. Это делает затруднение нормальным, а не стыдным.',
    note: 'Очень полезно перед разбором типичных ошибок и сложных мест.'
  },
  arc: {
    icon: '→',
    title: 'Собирает курс в историю',
    text: 'Один персонаж, который живёт с группой весь год, превращает отдельные занятия в маршрут с собственным внутренним сюжетом и ожиданием.',
    note: 'Так курс воспринимается не набором тем, а одной длинной дорогой.'
  }
};

$$('.benefit-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.benefit-tab').forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    const d = benefitData[btn.dataset.key];
    $('#benefitIcon').textContent = d.icon;
    $('#benefitTitle').textContent = d.title;
    $('#benefitText').textContent = d.text;
    $('#benefitNote').textContent = d.note;
  });
});

// Flip cards
$$('[data-flip]').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
});

// Timeline
$$('.month').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.month').forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    $('#monthTitle').textContent = btn.dataset.title;
    $('#monthText').textContent = btn.dataset.text;
  });
});

$('#promiseBtn').addEventListener('click', () => {
  $('#promiseBox').classList.toggle('show');
  $('#promiseBtn').textContent = $('#promiseBox').classList.contains('show')
    ? 'Скрыть обещание Сережи'
    : 'Показать обещание Сережи';
});

// Theme switcher
const themeData = {
  theory: {
    img: 'assets/theory.webp',
    title: 'Теория игр',
    text: 'Барсик надевает золотую цепь, садится как важный стратег и сразу превращает тему в зрительный якорь: решения, ходы, преимущества, выбор действий. Мем становится частью объяснения.',
    note: 'Чем очевиднее связь образа и понятия, тем легче потом вернуться к теме через эту картинку.'
  },
  recursion: {
    img: 'assets/recursion.webp',
    title: 'Рекурсия',
    text: 'Один Барсик внутри другого, в зеркале, снова внутри Барсика — и внезапно идея рекурсии начинает объяснять себя сама. Весело и очень запоминается.',
    note: 'Здесь визуальная шутка буквально повторяет структуру самого понятия.'
  },
  oracle: {
    img: 'assets/oracle.webp',
    title: 'Предсказание программы',
    text: 'Когда нужно определить, что выведет программа, Барсик становится почти мистическим оракулом. Хрустальный шар делает сухой тип задачи намного живее.',
    note: 'Такой образ работает как эмоциональный ярлык для повторяющегося типа задания.'
  },
  counting: {
    img: 'assets/counting.webp',
    title: 'Подсчёты',
    text: 'Барсик пересчитывает сосиски, ворчит, снова пересчитывает, использует счёты и всё равно выглядит так, будто его попросили страдать вручную.',
    note: 'Даже бытовой объект может стать сильным мемом, если он связан с действием ученика.'
  }
};

$$('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.theme-btn').forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    const d = themeData[btn.dataset.key];
    const img = $('#themeImage');
    img.animate([{opacity:1, transform:'scale(1)'},{opacity:.15, transform:'scale(.985)'},{opacity:1, transform:'scale(1)'}], {duration:360, easing:'ease-out'});
    setTimeout(() => { img.src = d.img; }, 120);
    $('#themeTitle').textContent = d.title;
    $('#themeText').textContent = d.text;
    $('#themeNote').textContent = d.note;
  });
});

// Recursion lab
let count = 0;
function updateMeter(){
  $('#meterFill').style.width = `${count / 24 * 100}%`;
  $('#meterText').textContent = `Барсиков: ${count} / 24`;
}
$('#spawnBtn').addEventListener('click', () => {
  const field = $('#catField');
  if (count >= 24){
    toast('RecursionError: Барсиков уже слишком много.');
    return;
  }
  const img = document.createElement('img');
  img.className = 'spawned';
  img.src = 'assets/spawn.webp';
  const maxX = Math.max(10, field.clientWidth - 98);
  const maxY = Math.max(34, field.clientHeight - 98);
  img.style.left = `${Math.random() * maxX}px`;
  img.style.top = `${26 + Math.random() * (maxY - 26)}px`;
  img.style.transform = `rotate(${Math.random() * 28 - 14}deg)`;
  field.appendChild(img);
  count++;
  updateMeter();
  if (count === 8) toast('Похоже, рекурсия начала себя вести как рекурсия.');
  if (count === 16) toast('Барсик явно вышел из-под методического контроля.');
});
$('#clearBtn').addEventListener('click', () => {
  $$('.spawned', $('#catField')).forEach(x => x.remove());
  count = 0;
  updateMeter();
});
updateMeter();

// Finale
let goodFinal = true;
$('#swapFinal').addEventListener('click', () => {
  goodFinal = !goodFinal;
  $('#finalImage').src = goodFinal ? 'assets/finale.webp' : 'assets/tearing.webp';
  $('#finalBubble').textContent = goodFinal ? 'Я ДОЖИЛ.' : 'И ЭТО БЫЛО ЛИЧНОЕ.';
  $('#swapFinal').textContent = goodFinal ? 'Показать более злую версию финала' : 'Вернуть праздничный финал';
});
$('#celebrateBtn').addEventListener('click', () => {
  const box = $('#finalFigure');
  const btn = $('#celebrateBtn');
  playFanfare();
  playVisualFanfare();
  btn.classList.remove('fanfare-active');
  void btn.offsetWidth;
  btn.classList.add('fanfare-active');
  $('#finalBubble').textContent = 'ВОТ ТЕПЕРЬ Я ДОВОЛЕН.';
  for (let i = 0; i < 42; i++){
    const c = document.createElement('i');
    c.className = 'confetti';
    c.style.background = ['#ef8a34','#ffd56a','#f4a07a','#ce6318'][i % 4];
    c.style.left = `${35 + Math.random() * 36}%`;
    c.style.top = `${20 + Math.random() * 36}%`;
    c.style.setProperty('--x', `${(Math.random() - .5) * 620}px`);
    c.style.setProperty('--y', `${(Math.random() - .12) * 420}px`);
    box.appendChild(c);
    setTimeout(() => c.remove(), 1100);
  }
  toast('Фанфары! Барсик официально празднует.');
  setTimeout(() => btn.classList.remove('fanfare-active'), 1500);
});

// Rule cards
$$('.rule-card').forEach(card => {
  card.addEventListener('click', () => toast(card.dataset.toast));
});


// v6: tiny fanfare with Web Audio API
let barsikAudioCtx = null;
function playTone(freq, start, duration, type='triangle', gainValue=0.05){
  if (!barsikAudioCtx) return;
  const osc = barsikAudioCtx.createOscillator();
  const gain = barsikAudioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(barsikAudioCtx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

function playFanfare(){
  try{
    if (!barsikAudioCtx){
      barsikAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (barsikAudioCtx.state === 'suspended'){
      barsikAudioCtx.resume();
    }
    const t = barsikAudioCtx.currentTime + 0.02;
    // cheerful mini-fanfare
    const notes = [
      [523.25, 0.00, 0.16], // C5
      [659.25, 0.12, 0.16], // E5
      [783.99, 0.24, 0.18], // G5
      [1046.50,0.40, 0.34], // C6
      [783.99, 0.78, 0.16], // G5
      [880.00, 0.90, 0.16], // A5
      [1046.50,1.04, 0.30], // C6
    ];
    notes.forEach(([freq, offset, dur], i) => {
      playTone(freq, t + offset, dur, i < 4 ? 'triangle' : 'sawtooth', i < 4 ? 0.045 : 0.035);
    });
  }catch(e){
    console.log('Fanfare unavailable', e);
  }
}


function playVisualFanfare(){
  const layer = $('#fanfareLayer');
  const stars = $('#fanfareStars');
  stars.innerHTML = '';

  const symbols = ['★','✦','✧','✨','🎉','⭐'];
  for(let i=0;i<28;i++){
    const star = document.createElement('i');
    star.className = 'fanfare-star';
    star.textContent = symbols[i % symbols.length];

    const angle = Math.random() * Math.PI * 2;
    const distance = 120 + Math.random() * 360;
    star.style.setProperty('--sx', `${Math.cos(angle) * distance}px`);
    star.style.setProperty('--sy', `${Math.sin(angle) * distance}px`);
    star.style.setProperty('--sr', `${Math.random()*720-360}deg`);
    star.style.animationDelay = `${Math.random()*.18}s`;
    stars.appendChild(star);
  }

  layer.classList.remove('show');
  void layer.offsetWidth;
  layer.classList.add('show');

  setTimeout(()=>{
    layer.classList.remove('show');
    stars.innerHTML = '';
  }, 1500);
}
