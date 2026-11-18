'use strict';
const $ = id => document.getElementById(id);
const topicLabels = {
  adverbs: ['will', 'Will и наречия'],
  that: ['that', 'Прогноз с that'],
  opinion: ['I think', 'Личное мнение'],
  infinitive: ['to', 'Прогноз с to'],
  modals: ['might', 'Модальные глаголы']
};
const typeLabels = { translate: 'Перевод', fix: 'Исправление', rephrase: 'Перефразирование' };
const forecasts = [
  ['Вряд ли', 'is unlikely to', 'Вряд ли поезд прибудет до шести.'],
  ['Возможно', 'might', 'Возможно, поезд прибудет до шести.'],
  ['Скорее всего', 'will probably', 'Скорее всего, поезд прибудет до шести.'],
  ['Наверняка', 'is bound to', 'Поезд наверняка прибудет до шести.']
];
const day = 86400000;
const delays = [1, 3, 7, 14];
const prefix = 'likely-en-v1.';
let hasStorage = true;
function unavailable() {
  hasStorage = false;
  $('storage-status').hidden = false;
  $('storage-status').textContent = 'Браузер ограничил сохранение. В этой вкладке можно продолжать занятие.';
}
function read(key, fallback) {
  try {
    const value = localStorage.getItem(prefix + key);
    return value === null ? fallback : JSON.parse(value);
  } catch { return fallback; }
}
function write(key, value) {
  try { localStorage.setItem(prefix + key, JSON.stringify(value)); }
  catch { unavailable(); }
}
const submitted = read('reviews', {});
const reviews = submitted && typeof submitted === 'object' && !Array.isArray(submitted) ? submitted : {};
const session = read('session', {}) || {};
let sequence = Number(session.sequence) || 0;
let topic = Object.hasOwn(topicLabels, session.topic) ? session.topic : 'all';
let current = CARDS.find(c => c.id === session.id && (topic === 'all' || c.topic === topic));
let activeMode = '';
let player = null;
let activeButton = null;
let soundMessageTimer;
function el(tag, className, content) {
  const result = document.createElement(tag);
  if (className) result.className = className;
  if (content !== undefined) result.textContent = content;
  return result;
}
function button(label, handler, style) {
  const result = el('button', style, label);
  result.type = 'button';
  result.addEventListener('click', handler);
  return result;
}
function english(element) { element.lang = 'en'; return element; }
function stopSound() {
  if (player) { player.pause(); player = null; }
  if (activeButton) {
    activeButton.classList.remove('playing');
    activeButton.setAttribute('aria-pressed', 'false');
    activeButton = null;
  }
}
function audioButton(sentence) {
  const control = button('', () => {
    const same = activeButton === control;
    stopSound();
    if (same) return;
    const sound = new Audio(VOICES[sentence]);
    player = sound; activeButton = control;
    control.classList.add('playing');
    control.setAttribute('aria-pressed', 'true');
    const done = () => { if (player === sound) stopSound(); };
    sound.addEventListener('ended', done, { once: true });
    sound.play().catch(() => {
      if (player !== sound) return;
      done();
      $('audio-status').hidden = false;
      $('audio-status').textContent = 'Запись не запустилась. Нажмите ещё раз.';
      clearTimeout(soundMessageTimer);
      soundMessageTimer = setTimeout(() => { $('audio-status').hidden = true; }, 3500);
    });
  }, 'speaker');
  control.title = 'Слушать · Microsoft Ryan';
  control.setAttribute('aria-label', 'Слушать · Ryan · ' + sentence);
  control.setAttribute('aria-pressed', 'false');
  control.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9a4.5 4.5 0 0 1 0 6m2-9a8 8 0 0 1 0 12"/></svg>';
  return control;
}
function showForecast(index) {
  stopSound();
  const [, pattern, ru] = forecasts[index];
  const rest = ' arrive before six.';
  $('forecast-en').replaceChildren('The train ', el('strong', '', pattern), rest);
  $('forecast-ru').textContent = ru;
  $('forecast-audio').replaceChildren(audioButton($('forecast-en').textContent));
  [...$('scale').children].forEach((child, i) => child.setAttribute('aria-pressed', String(index === i)));
}
forecasts.forEach(([label], i) => $('scale').append(button(label, () => showForecast(i))));
showForecast(2);

function example(en, ru) {
  const row = el('div', 'example');
  const text = el('div');
  text.append(english(el('p', 'en-chip', en)), el('p', 'translation', ru));
  row.append(text, audioButton(en));
  return row;
}
function showRules() {
  for (const rule of RULES) {
    const detail = el('details');
    detail.id = 'rule-' + rule.id;
    const header = el('summary');
    const marker = el('span', 'expand');
    marker.setAttribute('aria-hidden', 'true');
    header.append(english(el('span','rule-tag',topicLabels[rule.id][0])),
      el('span','rule-title',rule.title), marker);
    const body = el('div', 'rule-body');
    body.append(el('p','pattern',rule.pattern), el('p','explanation',rule.explanation));
    for (const pair of rule.examples) body.append(example(pair.en, pair.ru));
    body.append(el('p', 'tip', rule.tip), button('Тренировать эту тему', () => {
      changeTopic(rule.id);
      location.hash = 'practice';
    }, 'action'));
    detail.append(header, body);
    detail.addEventListener('toggle', () => {
      if (!detail.open && activeButton && detail.contains(activeButton)) stopSound();
    });
    $('rules').append(detail);
    $('topic-select').add(new Option(topicLabels[rule.id][1], rule.id));
  }
}
showRules();

function storeSession() { write('session', { topic, id: current?.id || null, sequence }); }
function pool() { return CARDS.filter(c => topic === 'all' || c.topic === topic); }
function chooseNext(cards) {
  const now = Date.now();
  const sorted = cards.filter(c => reviews[c.id]?.due <= now)
    .sort((a, b) => reviews[a.id].due - reviews[b.id].due);
  return sorted.find(c => (reviews[c.id].after || 0) <= sequence)
    || cards.find(c => !reviews[c.id])
    || sorted[0];
}
function changeTopic(value) {
  topic = value; current = undefined;
  $('topic-select').value = topic;
  renderPractice();
}
function mark(remembered) {
  stopSound();
  const previous = reviews[current.id];
  sequence++;
  const step = remembered ? Math.min(delays.length, (previous?.step || 0) + 1) : 0;
  const due = remembered ? Date.now() + day * delays[step - 1] : Date.now();
  reviews[current.id] = { step, due, after: remembered ? 0 : sequence + 2 };
  write('reviews', reviews);
  current = undefined;
  renderPractice(true);
}
function makeAnswer(c) {
  const answer = el('div', 'answer');
  answer.id = 'model-answer'; answer.hidden = true;
  const actions = el('div', 'actions');
  actions.append(button('Ещё раз', () => mark(false)), button('Вспомнил', () => mark(true), 'action'));
  answer.append(example(c.answer, c.ru), el('p', 'why', c.why), actions);
  return answer;
}
function renderPractice(focus = false) {
  stopSound();
  const cards = pool();
  current = current || chooseNext(cards);
  storeSession();
  const box = $('practice-card');
  box.replaceChildren();
  if (!current) {
    const due = Math.min(...cards.map(c => reviews[c.id]?.due || Infinity));
    const when = new Date(due).toLocaleString('ru', { day:'numeric',month:'long',hour:'2-digit',minute:'2-digit' });
    box.append(el('h2', '', 'Пока всё повторили'), el('p','translation', 'Следующий повтор — ' + when + '.'));
    const early = button('Повторить досрочно', () => {
      current = [...cards].sort((a,b) => reviews[a.id].due - reviews[b.id].due)[0];
      renderPractice(true);
    }, 'action reveal');
    box.append(early);
    if (focus) early.focus({preventScroll:true});
  } else {
    const c = current;
    const header = el('div','card-head');
    header.append(el('span','overline',typeLabels[c.kind]),el('span','topic-tag',topicLabels[c.topic][1]));
    const split = c.prompt.indexOf('. ');
    const heading = el('h2','',split < 0 ? c.prompt : c.prompt.slice(0,split + 1));
    heading.tabIndex = -1;
    box.append(header, heading);
    if (split >= 0) {
      const remainder = c.prompt.slice(split + 2);
      const prompt = el('p',/^[A-Za-z]/.test(remainder) ? 'prompt-english' : 'prompt-context',remainder);
      if (prompt.className === 'prompt-english') english(prompt);
      box.append(prompt);
    }
    const answer = makeAnswer(c);
    const reveal = button('Показать ответ', () => {
      answer.hidden = !answer.hidden;
      reveal.setAttribute('aria-expanded', String(!answer.hidden));
      reveal.textContent = answer.hidden ? 'Показать ответ' : 'Скрыть ответ';
      if (answer.hidden) stopSound();
    },'action reveal');
    reveal.setAttribute('aria-controls', answer.id);
    reveal.setAttribute('aria-expanded','false');
    box.append(reveal, answer);
    if (focus) heading.focus({preventScroll:true});
  }
  const total = cards.length, remaining = cards.filter(c => !reviews[c.id] || reviews[c.id].due <= Date.now()).length;
  $('review-note').textContent = remaining + ' из ' + total + ' к повторению сейчас. «Ещё раз» вернёт карточку в это занятие. «Вспомнил» отложит её на 1, 3, 7 или 14 дней.';
  if (hasStorage) $('review-note').textContent += ' Прогресс хранится на этом устройстве.';
}
$('topic-select').value = topic;
$('topic-select').addEventListener('change', () => changeTopic($('topic-select').value));
function navigate() {
  const mode = location.hash === '#practice' ? 'practice' : 'learn';
  if (activeMode === mode) return;
  stopSound();
  for (const candidate of ['learn','practice']) {
    $(candidate + '-view').hidden = mode !== candidate;
    const link = $(candidate + '-tab');
    if (mode === candidate) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  if (mode === 'practice') renderPractice();
  const wasActive = Boolean(activeMode);
  activeMode = mode;
  if (wasActive) {
    const heading = $(mode === 'learn' ? 'lesson-title' : 'practice-title');
    heading.tabIndex = -1;
    heading.focus({ preventScroll:true });
    window.scrollTo(0, 0);
  }
}
window.addEventListener('hashchange', navigate);
navigate();
function fontSize(large) {
  document.documentElement.classList.toggle('large', large);
  const title = large ? 'Уменьшить шрифт' : 'Увеличить шрифт';
  $('type-button').setAttribute('aria-label',title);
  $('type-button').title = title;
  $('type-button').setAttribute('aria-pressed', String(large));
}
fontSize(read('large', false) === true);
$('type-button').addEventListener('click', () => {
  const large = !document.documentElement.classList.contains('large');
  fontSize(large); write('large',large);
});

const offline = $('offline-status');
function showOfflineFailure() {
  offline.textContent = 'Для сохранения офлайн-версии откройте приложение при подключении к интернету.';
}
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js', {updateViaCache:'none'}).then(registration => {
    function observe() {
      const worker = registration.installing;
      if (worker) worker.addEventListener('statechange', () => {
        if (worker.state === 'redundant' && !registration.active) showOfflineFailure();
      });
    }
    observe();
    registration.addEventListener('updatefound', observe);
    return navigator.serviceWorker.ready;
  }).then(() => {
    offline.textContent = 'Готово офлайн · урок и озвучка сохранены';
    offline.classList.add('ready');
  }).catch(showOfflineFailure);
} else { offline.textContent = 'Офлайн-сохранение недоступно в этом браузере.'; }
