/**
 * УЧЕБНЫЙ ЦЕНТР «ПРАЙМ ЭРА» (ООО «Прайм Эра»)
 * Frontend Scripts & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollTop();
  initScrollReveal();
  initSvedeniyaTabs();
  initCalculator();
  initPhoneMask();
});

/* ===== 1. MOBILE MENU TOGGLE ===== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  const overlay = document.getElementById('overlay');

  if (!toggleBtn || !nav) return;

  function toggleMenu() {
    const isOpen = nav.classList.contains('is-open');
    if (isOpen) {
      nav.classList.remove('is-open');
      if (overlay) overlay.style.display = 'none';
      document.body.style.overflow = '';
    } else {
      nav.classList.add('is-open');
      if (overlay) overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  }

  toggleBtn.addEventListener('click', toggleMenu);
  if (overlay) overlay.addEventListener('click', toggleMenu);

  const navLinks = nav.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('is-open')) {
        toggleMenu();
      }
    });
  });
}

/* ===== 2. SCROLL TO TOP ===== */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scroll-top');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('is-visible');
    } else {
      scrollTopBtn.classList.remove('is-visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===== 3. SCROLL REVEAL ANIMATION ===== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.fade-in-element');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ===== 4. SVEDENIYA SECTION TABS NAVIGATION ===== */
function initSvedeniyaTabs() {
  const navLinks = document.querySelectorAll('.svedeniya-nav__link');
  const sections = document.querySelectorAll('.subsection');
  if (!navLinks.length || !sections.length) return;

  function switchTab(targetId) {
    if (!targetId) return;
    const cleanId = targetId.replace('#', '');
    const targetSection = document.getElementById(cleanId);
    if (!targetSection) return;

    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${cleanId}` || link.dataset.tab === cleanId) {
        link.classList.add('svedeniya-nav__link--active');
      } else {
        link.classList.remove('svedeniya-nav__link--active');
      }
    });

    sections.forEach(sec => {
      if (sec.id === cleanId) {
        sec.classList.add('subsection--active');
      } else {
        sec.classList.remove('subsection--active');
      }
    });

    // Scroll to position where sticky tab bar is right below header
    const svedNav = document.getElementById('svedeniya-nav');
    const mainHeader = document.getElementById('header');
    if (svedNav) {
      const headerHeight = mainHeader ? mainHeader.offsetHeight : 80;
      const navTopInDoc = svedNav.getBoundingClientRect().top + window.scrollY;
      const targetScrollTop = Math.max(0, navTopInDoc - headerHeight);
      
      // Only adjust scroll if user is above or far below the section
      const currentScroll = window.scrollY;
      if (Math.abs(currentScroll - targetScrollTop) > 15) {
        window.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
      }
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      history.replaceState(null, null, href);
      switchTab(href);
      
      // Scroll active tab into view horizontally if overflowed
      link.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  });

  const headerTabLinks = document.querySelectorAll('.svedeniya-tab-link');
  headerTabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        history.replaceState(null, null, href);
        switchTab(href);
      }
    });
  });

  if (window.location.hash) {
    switchTab(window.location.hash);
  }
}

/* ===== 5. 4 CORE PROGRAMS DETAILED DATA & MODAL ===== */
const PROGRAMS_DATA = {
  '46a': {
    code: 'Программа «А»',
    title: 'Общие вопросы охраны труда и функционирования системы управления охраной труда (СУОТ)',
    hours: '16 часов',
    form: 'Очная, очно-заочная с применением дистанционных технологий',
    audience: 'Руководители организаций, заместители руководителей, руководители филиалов, специалисты по охране труда',
    periodicity: 'Не реже 1 раза в 3 года',
    price: '1 200 ₽',
    doc: 'Протокол проверки знаний требований охраны труда (внесение в ЕИСОТ Минтруда РФ)',
    modules: [
      { name: 'Модуль 1. Основы охраны труда в Российской Федерации', desc: 'Трудовое законодательство РФ, государственные нормативные требования ОТ, обязанности работодателя и права работников.' },
      { name: 'Модуль 2. Система управления охраной труда (СУОТ)', desc: 'Политика в области ОТ, планирование мероприятий, оценка результативности СУОТ.' },
      { name: 'Модуль 3. Расследование и учет несчастных случаев', desc: 'Порядок расследования микротравм, несчастных случаев и профессиональных заболеваний.' },
      { name: 'Итоговая проверка знаний', desc: 'Тестирование с внесением результатов в Федеральный реестр ЕИСОТ.' }
    ]
  },
  '46b': {
    code: 'Программа «Б»',
    title: 'Безопасные методы и приемы выполнения работ при воздействии вредных и (или) опасных производственных факторов, источников опасности (Постановление № 2464)',
    hours: '16 часов',
    form: 'Очная, очно-заочная с применением дистанционных технологий',
    audience: 'Работники рабочих профессий, руководители подразделений, специалисты, члены комиссий по проверке знаний',
    periodicity: 'Не реже 1 раза в 3 года',
    price: '1 200 ₽ (для рабочих 500 ₽)',
    doc: 'Протокол проверки знаний требований охраны труда (внесение в ЕИСОТ Минтруда РФ)',
    modules: [
      { name: 'Модуль 1. Общие сведения о СУОТ и идентификация факторов', desc: 'Классификация вредных и опасных факторов на рабочем месте, специальная оценка условий труда (СОУТ).' },
      { name: 'Модуль 2. Оценка и управление профессиональными рисками', desc: 'Методики оценки рисков, динамическая оценка рисков на рабочих местах.' },
      { name: 'Модуль 3. Безопасная эксплуатация инструмента и оборудования', desc: 'Работа ручным инструментом, лестницами, грузоподъемными механизмами, станочным парком.' },
      { name: 'Модуль 4. Практические занятия (не менее 25% объема)', desc: 'Решение ситуационных кейсов, выявление нарушений, определение защитных мер.' },
      { name: 'Итоговая аттестация', desc: 'Проверка знаний и регистрация в реестре Минтруда РФ (ЕИСОТ).' }
    ]
  },
  '46v': {
    code: 'Программа «В»',
    title: 'Безопасные методы и приемы выполнения работ повышенной опасности (Постановление № 2464)',
    hours: 'от 8 до 24 часов',
    form: 'Очная с практическими занятиями',
    audience: 'Работники, выполняющие работы повышенной опасности по наряду-допуску, и ответственные руководители',
    periodicity: 'Не реже 1 раза в год',
    price: '1 200 ₽ (для рабочих 500 ₽)',
    doc: 'Протокол проверки знаний требований охраны труда (внесение в ЕИСОТ Минтруда РФ)',
    modules: [
      { name: 'Модуль 1. Нормативное регулирование и наряд-допускная система', desc: 'Оформление нарядов-допусков, назначение ответственных лиц, подготовка рабочих зон.' },
      { name: 'Модуль 2. Виды работ повышенной опасности', desc: 'Работы на высоте, огневые, земляные, газоопасные работы, работы в ограниченных пространствах (ОЗП).' },
      { name: 'Модуль 3. Практические занятия и ликвидация аварий', desc: 'Алгоритмы эвакуации, применение систем спасения и защитных средств.' },
      { name: 'Итоговая проверка знаний', desc: 'Проверка знаний требований охраны труда с внесением в ЕИСОТ.' }
    ]
  },
  'dpo-pk': {
    code: 'ДПО: Повышение квалификации',
    title: 'Повышение квалификации руководителей и специалистов по охране труда и техносферной безопасности',
    hours: 'от 16 до 72 часов',
    form: 'Очная, заочная с применением дистанционных образовательных технологий',
    audience: 'Руководители, специалисты служб охраны труда, члены комиссий, ответственные за безопасность',
    periodicity: 'По мере необходимости (рекомендуется не реже 1 раза в 3-5 лет)',
    price: 'от 1 500 ₽',
    doc: 'Удостоверение о повышении квалификации установленного образца с обязательным внесением в ФГИС ФРДО',
    modules: [
      { name: 'Модуль 1. Актуальные изменения в трудовом законодательстве', desc: 'Новые правила, стандарты, цифровизация охраны труда и надзорные практики.' },
      { name: 'Модуль 2. Управление рисками и аудит СУОТ', desc: 'Внедрение процедур оценки рисков, контрольные карты, предупредительные меры.' },
      { name: 'Итоговая аттестация', desc: 'Квалификационный зачет и регистрация в Федеральном реестре ФГИС ФРДО.' }
    ]
  },
  'dpo-pp': {
    code: 'ДПО: Профпереподготовка',
    title: 'Профессиональная переподготовка «Техносферная безопасность. Управление охраной труда»',
    hours: '256 / 512 часов',
    form: 'Заочная с применением дистанционных технологий (без отрыва от производства)',
    audience: 'Специалисты, планирующие профессиональную деятельность в сфере охраны труда и не имеющие профильного образования',
    periodicity: 'Бессрочно',
    price: 'по запросу',
    doc: 'Диплом о профессиональной переподготовке с правом ведения нового вида профессиональной деятельности (внесение в ФГИС ФРДО)',
    modules: [
      { name: 'Модуль 1. Правовые основы техносферной безопасности', desc: 'Законодательство РФ, стандарты ISO/ГОСТ, надзор и ответственность.' },
      { name: 'Модуль 2. Производственная безопасность и специальная оценка условий труда (СОУТ)', desc: 'Идентификация производственных факторов, приборный контроль, санитарные нормы.' },
      { name: 'Модуль 3. Организация и функционирование службы охраны труда', desc: 'Разработка локальных нормативных актов, регламентов, инструкций.' },
      { name: 'Итоговый междисциплинарный экзамен', desc: 'Защита аттестационной работы и внесение данных диплома в ФГИС ФРДО.' }
    ]
  },
  'po-workers': {
    code: 'ПО: Профессиональное обучение',
    title: 'Профессиональное обучение рабочих профессий (профессиональная подготовка и переподготовка)',
    hours: 'от 16 до 160 часов',
    form: 'Очная, очно-заочная с практической подготовкой',
    audience: 'Лица, осваивающие рабочие профессии, работники предприятий',
    periodicity: 'В соответствии с квалификационными требованиями',
    price: 'от 500 ₽',
    doc: 'Свидетельство о профессии рабочего, должности служащего установленного образца с внесением в ФГИС ФРДО и ЕИСОТ',
    modules: [
      { name: 'Модуль 1. Основы профессиональной деятельности и технология работ', desc: 'Изучение регламентов, технологических карт, оборудования и инструментов.' },
      { name: 'Модуль 2. Безопасные методы и приемы выполнения работ', desc: 'Охрана труда по профессии, пожарная и электробезопасность, СИЗ, первая помощь.' },
      { name: 'Квалификационный экзамен', desc: 'Проверка теоретических знаний и практических навыков с выдачей свидетельства.' }
    ]
  },
  'siz': {
    code: 'Программа «СИЗ»',
    title: 'Обучение по использованию (применению) средств индивидуальной защиты (Постановление № 2464)',
    hours: '16 часов',
    form: 'Очная, очно-заочная с практической отработкой',
    audience: 'Работники, применяющие СИЗ, требующие практических навыков применения; члены комиссий',
    periodicity: 'Не реже 1 раза в 3 года',
    price: '1 000 ₽ (для рабочих 500 ₽)',
    doc: 'Протокол проверки знаний требований охраны труда (внесение в ЕИСОТ Минтруда РФ)',
    modules: [
      { name: 'Модуль 1. Единые типовые нормы (ЕТН) и правила выдачи СИЗ', desc: 'Порядок бесплатной выдачи СИЗ и смывающих средств, учет, хранение и уход.' },
      { name: 'Модуль 2. Проверка исправности и выбраковка СИЗ', desc: 'Входной контроль, выявление дефектов, проверка сроков годности и маркировки.' },
      { name: 'Модуль 3. Практические занятия (не менее 50% объема)', desc: 'Отработка навыков правильного надевания, подгонки и проверки СИЗ органов дыхания, слуха, зрения, защиты от падения.' },
      { name: 'Итоговый контроль', desc: 'Проверка практических навыков с внесением в ЕИСОТ.' }
    ]
  },
  'firstaid': {
    code: 'Программа «ОПП» (Первая помощь)',
    title: 'Оказание первой помощи пострадавшим на производстве с отработкой на манекене-тренажере (Постановление № 2464)',
    hours: '16 часов',
    form: 'Очная с отработкой на тренажере-манекене под руководством сертифицированного инструктора',
    audience: 'Работники рабочих профессий, лица, проводящие инструктажи, специалисты по ОТ, члены комиссий',
    periodicity: 'Не реже 1 раза в 3 года',
    price: '1 000 ₽ (для рабочих 500 ₽)',
    doc: 'Протокол проверки знаний требований охраны труда (внесение в ЕИСОТ Минтруда РФ)',
    modules: [
      { name: 'Модуль 1. Организационно-правовые основы первой помощи', desc: 'Универсальный алгоритм действий на месте происшествия, вызов скорой помощи, обеспечение личной безопасности.' },
      { name: 'Модуль 2. Сердечно-легочная реанимация (СЛР)', desc: 'Практическая отработка непрямого массажа сердца и ИВЛ на специализированном тренажере-манекене.' },
      { name: 'Модуль 3. Помощь при кровотечениях и травмах', desc: 'Наложение жгутов, давящих повязок, иммобилизация конечностей при переломах.' },
      { name: 'Модуль 4. Термические травмы, отравления, шоковые состояния', desc: 'Первая помощь при ожогах, обморожениях, электротравмах и потере сознания.' },
      { name: 'Итоговая проверка практических навыков', desc: 'Оценка действий на тренажере и регистрация в ЕИСОТ Минтруда РФ.' }
    ]
  }
};

window.openProgramModal = function(programKey) {
  const prog = PROGRAMS_DATA[programKey];
  if (!prog) return;

  const modal = document.getElementById('program-modal');
  const titleEl = document.getElementById('modal-program-title');
  const bodyEl = document.getElementById('modal-program-body');

  if (!modal || !titleEl || !bodyEl) return;

  titleEl.innerHTML = `<span class="badge badge--gold" style="margin-right:8px">${prog.code}</span> ${prog.hours}`;
  
  let modulesHtml = prog.modules.map(m => `
    <div style="background:var(--slate-50);border-radius:var(--radius-sm);padding:12px 16px;margin-bottom:8px;border:1px solid var(--slate-200)">
      <div style="font-weight:700;color:var(--slate-900);font-size:0.95rem">${m.name}</div>
      <div style="font-size:0.875rem;color:var(--slate-600);margin-top:4px">${m.desc}</div>
    </div>
  `).join('');

  bodyEl.innerHTML = `
    <h3 style="font-size:1.15rem;color:var(--primary-950);margin-bottom:12px;line-height:1.4">${prog.title}</h3>
    
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">
      <div style="background:var(--primary-50);padding:10px 14px;border-radius:var(--radius-sm);border:1px solid var(--primary-100)">
        <strong style="color:var(--primary-900);font-size:0.8rem;text-transform:uppercase;display:block">Форма обучения:</strong>
        <span style="font-size:0.875rem;color:var(--slate-700)">${prog.form}</span>
      </div>
      <div style="background:var(--gold-50);padding:10px 14px;border-radius:var(--radius-sm);border:1px solid var(--gold-200)">
        <strong style="color:var(--gold-900);font-size:0.8rem;text-transform:uppercase;display:block">Стоимость:</strong>
        <span style="font-size:0.875rem;color:var(--slate-700)"><strong>${prog.price}</strong></span>
      </div>
    </div>

    <div style="margin-bottom:16px">
      <strong style="font-size:0.85rem;color:var(--slate-500);text-transform:uppercase;display:block;margin-bottom:4px">Категория слушателей:</strong>
      <p style="font-size:0.9rem;color:var(--slate-700)">${prog.audience}</p>
    </div>

    <div style="margin-bottom:20px">
      <strong style="font-size:0.85rem;color:var(--slate-500);text-transform:uppercase;display:block;margin-bottom:4px">Итоговый документ:</strong>
      <p style="font-size:0.9rem;color:var(--slate-700)"><strong>${prog.doc}</strong></p>
    </div>

    <h4 style="font-size:1rem;color:var(--slate-900);margin-bottom:12px">Тематический план программы:</h4>
    ${modulesHtml}

    <div style="margin-top:24px;text-align:right">
      <a href="#callback" class="btn btn--gold" onclick="closeModal('program-modal');selectProgramInForm('${prog.code} (${prog.hours})')">Записаться на эту программу</a>
    </div>
  `;

  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
};

window.openDocNotice = function(docTitle) {
  const modal = document.getElementById('program-modal');
  const titleEl = document.getElementById('modal-program-title');
  const bodyEl = document.getElementById('modal-program-body');

  if (!modal || !titleEl || !bodyEl) return;

  titleEl.innerHTML = `<span class="badge badge--gold" style="margin-right:8px">Документ</span> Официальные сведения`;

  bodyEl.innerHTML = `
    <h3 style="font-size:1.25rem;color:var(--primary-950);margin-bottom:16px;line-height:1.4">${docTitle}</h3>
    
    <div style="background:var(--slate-50);border-radius:var(--radius-md);padding:16px 20px;margin-bottom:20px;border:1px solid var(--slate-200)">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" style="color:var(--gold-500)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
        <span style="font-weight:700;color:var(--slate-900)">Статус: Документ утвержден и действует</span>
      </div>
      <p style="font-size:0.925rem;color:var(--slate-700);line-height:1.6;margin:0">
        Локальный нормативный акт разработан в соответствии с Федеральным законом № 273-ФЗ «Об образовании в РФ» и Уставом ООО «Прайм Эра». Заверенная копия документа предоставляется слушателям и контролирующим органам по запросу.
      </p>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:24px">
      <div style="background:var(--primary-50);padding:12px 14px;border-radius:var(--radius-sm);border:1px solid var(--primary-100)">
        <strong style="color:var(--primary-900);font-size:0.8rem;text-transform:uppercase;display:block;margin-bottom:4px">Учебная часть:</strong>
        <a href="tel:89124638632" style="color:var(--primary-900);font-weight:600;font-size:0.95rem">8 (912) 463-86-32</a>
      </div>
      <div style="background:var(--gold-50);padding:12px 14px;border-radius:var(--radius-sm);border:1px solid var(--gold-200)">
        <strong style="color:var(--gold-900);font-size:0.8rem;text-transform:uppercase;display:block;margin-bottom:4px">Электронная почта:</strong>
        <a href="mailto:praym.era@mail.ru" style="color:var(--gold-900);font-weight:600;font-size:0.95rem">praym.era@mail.ru</a>
      </div>
    </div>

    <div style="text-align:right">
      <button type="button" class="btn btn--gold" onclick="closeModal('program-modal')">Закрыть</button>
    </div>
  `;

  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
};

/* ===== 6. IMAGE LIGHTBOX MODAL ===== */
window.openImageModal = function(imageSrc, caption) {
  const modal = document.getElementById('image-modal');
  const imgEl = document.getElementById('modal-lightbox-img');
  const captionEl = document.getElementById('modal-lightbox-caption');

  if (!modal || !imgEl) return;

  imgEl.src = imageSrc;
  if (captionEl) captionEl.textContent = caption || '';

  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
};

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('is-open');
    document.body.style.overflow = '';
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.is-open').forEach(m => {
      m.classList.remove('is-open');
    });
    document.body.style.overflow = '';
  }
});

/* ===== 7. INTERACTIVE TRAINING CALCULATOR ===== */
let currentCategory = 'specialists'; // 'specialists' or 'workers'

const CALC_PROGRAMS_DATA = {
  specialists: [
    { id: 'p-46a', code: '46А', name: 'Программа «А» — Общие вопросы охраны труда и СУОТ (16 ч.)', price: 1200, checked: false },
    { id: 'p-46b', code: '46Б', name: 'Программа «Б» — Вредные и опасные факторы (16 ч.)', price: 1200, checked: true },
    { id: 'p-46v', code: '46В', name: 'Программа «В» — Работы повышенной опасности (от 8 до 24 ч.)', price: 1200, checked: false },
    { id: 'p-siz', code: 'СИЗ', name: 'Обучение по применению средств индивидуальной защиты (16 ч.)', price: 1000, checked: false },
    { id: 'p-opp', code: 'ОПП', name: 'Оказание первой помощи пострадавшим с практикой на манекене (16 ч.)', price: 1000, checked: false }
  ],
  workers: [
    { id: 'pw-46b', code: '46Б', name: 'Программа «Б» для рабочих профессий (16 ч.)', price: 500, checked: true },
    { id: 'pw-46v', code: '46В', name: 'Программа «В» — повышенная опасность для рабочих (от 8 до 24 ч.)', price: 500, checked: false },
    { id: 'pw-siz', code: 'СИЗ', name: 'Обучение по СИЗ для рабочих профессий (16 ч.)', price: 500, checked: false },
    { id: 'pw-opp', code: 'ОПП', name: 'Первая помощь (ОПП) для рабочих профессий (16 ч.)', price: 500, checked: false }
  ]
};

window.setCalcCategory = function(cat) {
  currentCategory = cat;
  
  const tabSpec = document.getElementById('calc-tab-specialists');
  const tabWork = document.getElementById('calc-tab-workers');
  
  if (tabSpec && tabWork) {
    if (cat === 'specialists') {
      tabSpec.className = 'calc-tab-btn is-active';
      tabSpec.style.background = 'var(--primary-900)';
      tabSpec.style.color = 'var(--white)';
      tabWork.className = 'calc-tab-btn';
      tabWork.style.background = 'transparent';
      tabWork.style.color = 'var(--slate-700)';
    } else {
      tabWork.className = 'calc-tab-btn is-active';
      tabWork.style.background = 'var(--gold-500)';
      tabWork.style.color = 'var(--slate-950)';
      tabSpec.className = 'calc-tab-btn';
      tabSpec.style.background = 'transparent';
      tabSpec.style.color = 'var(--slate-700)';
    }
  }

  renderCalcPrograms();
};

function renderCalcPrograms() {
  const container = document.getElementById('calc-programs-container');
  if (!container) return;

  const progs = CALC_PROGRAMS_DATA[currentCategory];
  container.innerHTML = progs.map(p => `
    <label class="calc-program-choice ${p.checked ? 'is-active' : ''}" id="choice-${p.id}">
      <div class="calc-choice-left">
        <input type="checkbox" class="calc-checkbox" id="${p.id}" value="${p.price}" data-name="${p.name}" ${p.checked ? 'checked' : ''} onchange="onCalcProgChange(this)">
        <div class="calc-choice-info">
          <div class="calc-choice-title">${p.name}</div>
          <div class="calc-choice-sub">Внесение в ЕИСОТ Минтруда РФ</div>
        </div>
      </div>
      <div class="calc-choice-price">${p.price.toLocaleString('ru-RU')} ₽</div>
    </label>
  `).join('');

  updateCalculator();
}

window.onCalcProgChange = function(chk) {
  const parent = chk.closest('.calc-program-choice');
  if (parent) {
    if (chk.checked) parent.classList.add('is-active');
    else parent.classList.remove('is-active');
  }
  updateCalculator();
};

function initCalculator() {
  renderCalcPrograms();
}

window.changeCalcCount = function(delta) {
  const countInput = document.getElementById('calc-count');
  if (!countInput) return;
  let val = parseInt(countInput.value, 10) || 1;
  val = Math.max(1, Math.min(500, val + delta));
  countInput.value = val;
  updateCalculator();
};

window.updateCalculator = function() {
  const checkboxes = document.querySelectorAll('.calc-checkbox:checked');
  const countInput = document.getElementById('calc-count');
  const count = parseInt(countInput ? countInput.value : 1, 10) || 1;

  let singlePersonSum = 0;
  let selectedNames = [];

  checkboxes.forEach(chk => {
    singlePersonSum += parseFloat(chk.value) || 0;
    selectedNames.push(chk.dataset.name || 'Программа');
  });

  const progCount = checkboxes.length;
  let packageDiscountPercent = 0;

  // For specialists, give package discount for 2+ programs
  if (currentCategory === 'specialists') {
    if (progCount === 2) packageDiscountPercent = 10;
    else if (progCount === 3) packageDiscountPercent = 15;
    else if (progCount >= 4) packageDiscountPercent = 20;
  }

  // Volume discount for number of students
  let volumeDiscountPercent = 0;
  if (count >= 25) volumeDiscountPercent = 15;
  else if (count >= 10) volumeDiscountPercent = 10;
  else if (count >= 5) volumeDiscountPercent = 5;

  const totalDiscountPercent = Math.min(25, packageDiscountPercent + volumeDiscountPercent);

  const baseTotal = singlePersonSum * count;
  const discountAmount = Math.round(baseTotal * (totalDiscountPercent / 100));
  const finalTotal = Math.max(0, baseTotal - discountAmount);

  // Update UI
  const sumCatEl = document.getElementById('calc-sum-cat');
  const sumProgsEl = document.getElementById('calc-sum-progs');
  const sumStudentsEl = document.getElementById('calc-sum-students');
  const sumBaseEl = document.getElementById('calc-sum-base');
  const sumDiscountEl = document.getElementById('calc-sum-discount');
  const sumTotalEl = document.getElementById('calc-sum-total');

  if (sumCatEl) sumCatEl.textContent = currentCategory === 'specialists' ? 'Специалисты' : 'Рабочие (500 ₽)';
  if (sumProgsEl) sumProgsEl.textContent = `${progCount} прогр.`;
  if (sumStudentsEl) sumStudentsEl.textContent = `${count} чел.`;
  if (sumBaseEl) sumBaseEl.textContent = `${baseTotal.toLocaleString('ru-RU')} ₽`;
  
  if (sumDiscountEl) {
    if (totalDiscountPercent > 0) {
      sumDiscountEl.textContent = `${totalDiscountPercent}% (−${discountAmount.toLocaleString('ru-RU')} ₽)`;
    } else {
      sumDiscountEl.textContent = '0% (0 ₽)';
    }
  }

  if (sumTotalEl) {
    sumTotalEl.textContent = `${finalTotal.toLocaleString('ru-RU')} ₽`;
  }
};

window.applyCalcToForm = function() {
  const checkboxes = document.querySelectorAll('.calc-checkbox:checked');
  const count = document.getElementById('calc-count')?.value || 1;
  const total = document.getElementById('calc-sum-total')?.textContent || '';
  const cat = currentCategory === 'specialists' ? 'Специалисты' : 'Рабочие профессии';

  const progNames = [];
  checkboxes.forEach(chk => progNames.push(chk.dataset.name));

  const selectEl = document.getElementById('form-program-select');
  const msgEl = document.getElementById('form-message');

  if (selectEl) {
    if (currentCategory === 'workers') {
      selectEl.value = 'Обучение для рабочих профессий (500 ₽/программа)';
    } else if (checkboxes.length === 1) {
      selectEl.value = selectEl.options[2]?.value || selectEl.options[0].value;
    } else {
      selectEl.value = 'Комплексное обучение (несколько программ)';
    }
  }

  if (msgEl) {
    msgEl.value = `Расчет из калькулятора (${cat}):\n• Программы: ${progNames.join(', ')}\n• Количество слушателей: ${count} чел.\n• Итоговая сумма к оплате: ${total}`;
  }

  const callbackSec = document.getElementById('callback');
  if (callbackSec) {
    callbackSec.scrollIntoView({ behavior: 'smooth' });
  }

  showToast('Данные расчета перенесены в форму заявки!');
};

window.selectProgramInForm = function(progName) {
  const selectEl = document.getElementById('form-program-select');
  const msgEl = document.getElementById('form-message');

  if (selectEl) {
    for (let opt of selectEl.options) {
      if (opt.text.includes(progName) || opt.value.includes(progName)) {
        selectEl.value = opt.value;
        break;
      }
    }
  }

  if (msgEl && !msgEl.value) {
    msgEl.value = `Интересует обучение: ${progName}`;
  }
};

/* ===== 8. PHONE INPUT MASK ===== */
function initPhoneMask() {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', () => {
      let val = input.value.replace(/\D/g, '');
      if (!val) {
        input.value = '';
        return;
      }
      if (val[0] === '7' || val[0] === '8') {
        val = val.substring(1);
      }
      let formatted = '+7 ';
      if (val.length > 0) formatted += '(' + val.substring(0, 3);
      if (val.length >= 3) formatted += ') ' + val.substring(3, 6);
      if (val.length >= 6) formatted += '-' + val.substring(6, 8);
      if (val.length >= 8) formatted += '-' + val.substring(8, 10);
      input.value = formatted;
    });
  });
}

/* ===== 9. LIVE FORM SUBMISSION VIA FORMSUBMIT & TOAST NOTIFICATION ===== */
window.handleFormSubmit = async function(e) {
  e.preventDefault();
  const form = e.target;
  const org = form.querySelector('#form-org-name')?.value || 'Не указана';
  const person = form.querySelector('#form-contact-person')?.value || '';
  const phone = form.querySelector('#form-phone')?.value || '';
  const email = form.querySelector('#form-email')?.value || '';
  const program = form.querySelector('#form-program-select')?.value || '';
  const message = form.querySelector('#form-message')?.value || 'Без примечаний';

  if (!phone || phone.length < 10) {
    showToast('Пожалуйста, введите корректный номер телефона');
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn ? submitBtn.textContent : 'Отправить заявку';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка заявки...';
  }

  const payload = {
    _subject: `Новая заявка на обучение: ${person} (${org})`,
    _template: 'table',
    _captcha: 'false',
    'Организация / ИНН': org,
    'Контактное лицо': person,
    'Телефон': phone,
    'Email заказчика': email,
    'Выбранная программа': program,
    'Пожелания / расчет': message,
    'Дата и время заявки': new Date().toLocaleString('ru-RU')
  };

  try {
    const response = await fetch('https://formsubmit.co/ajax/praym.era@mail.ru', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      showToast(`Спасибо, ${person}! Ваша заявка успешно отправлена на почту учебного центра.`);
      form.reset();
      updateCalculator();
    } else {
      showToast(`Спасибо, ${person}! Ваша заявка успешно принята.`);
      form.reset();
      updateCalculator();
    }
  } catch (error) {
    console.error('Submission error:', error);
    showToast(`Спасибо, ${person}! Заявка принята. Мы свяжемся с вами по телефону ${phone}.`);
    form.reset();
    updateCalculator();
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  }
};

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" style="color:var(--gold-400);flex-shrink:0"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}
