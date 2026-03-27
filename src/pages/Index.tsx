import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  {
    label: "РЕШЕНИЯ",
    href: "#solutions",
    children: [
      { group: "По типу клиента", items: ["Проектировщикам", "Водоканалам", "Тепловым компаниям", "Застройщикам", "УК | ТСЖ", "Сервис-компаниям", "Промпредприятиям", "Ритейлу", "Городам"] },
      { group: "По технологии", items: ["Проводные решения", "Беспроводные решения", "для Затопляемых колодцев"] },
      { group: "По ресурсу", items: ["Учёт Воды", "Учёт Тепла", "Учёт Газа", "Учёт Электроэнергии", "Комплексный учёт"] },
    ],
  },
  {
    label: "ПРОДУКТЫ",
    href: "#products",
    children: [
      { group: "Оборудование", items: ["Приборы учёта | Датчики", "Устройства передачи данных"] },
      { group: "Разработка", items: ["Программное обеспечение", "Проектирование АСКУЭ / АСУПР", "Изготовление OEM | ODM"] },
    ],
  },
  {
    label: "СОФТ",
    href: "#software",
    children: [
      { group: "Программное обеспечение", items: ["ПО для Диспетчеризации", "ПО для Расчётов с абонентами", "Серверное ПО", "ПО для Управления Инжинирингом"] },
      { group: "Услуги", items: ["Адаптация ПО под специфику", "ПО для Пусконаладочных работ", "Обучение настройке и работе с ПО", "Техподдержка 24/7", "Разработка ПО под заказ", "Тест-драйв ПО"] },
    ],
  },
  {
    label: "ПОДДЕРЖКА",
    href: "#support",
    children: [
      { group: "Для специалистов", items: ["Проектировщикам", "Монтажникам | ПН", "Партнёрам | Дилерам", "Пользователям ПО"] },
      { group: "Ресурсы", items: ["Вопросы-ответы | FAQ", "Документация", "Обучение"] },
      { group: "Обращения", items: ["Заказать звонок", "Задать вопрос", "Заявка на ремонт", "Направить претензию", "Восстановить паспорт", "Техподдержка 24/7"] },
    ],
  },
  {
    label: "ИНФОЦЕНТР",
    href: "#info",
    children: [
      { group: "Материалы", items: ["Мероприятия", "Статьи и новости", "Видео", "База знаний", "Отзывы"] },
      { group: "Документация", items: ["Рекламные материалы", "Паспорта | Руководства", "Сертификаты | Лицензии", "Реквизиты предприятия", "Медиа-кит"] },
    ],
  },
  {
    label: "КОМПАНИЯ",
    href: "#company",
    children: [
      { group: "О нас", items: ["О компании", "Новости", "Мероприятия", "Публикации", "Отзывы"] },
      { group: "Сотрудничество", items: ["Поставщикам", "Вакансии", "Документы", "Контакты"] },
    ],
  },
  { label: "КОНТАКТЫ", href: "#contact", children: [] },
];

const PRODUCTS = [
  {
    id: "CW-Ultra",
    category: "Учёт воды",
    title: "CW-Ultra DN15–50",
    desc: "Ультразвуковой счётчик холодной/горячей воды. Диапазон DN 15–50. Класс точности 2 (R800). Ресурс батареи — 16 лет. Протоколы: M-Bus, LoRa, NB-IoT опция.",
    specs: ["DN 15–50", "Класс R800 (C)", "Батарея 16 лет", "M-Bus / LoRa"],
    tag: "Новинка",
    icon: "Droplets",
  },
  {
    id: "CW-Pro",
    category: "Учёт воды",
    title: "CW-Pro DN50–250",
    desc: "Электромагнитный счётчик для коммерческого учёта холодной воды. DN 50–250. Погрешность ±0,5%. Защита IP68. Подходит для затопляемых колодцев.",
    specs: ["DN 50–250", "±0,5% точность", "IP68", "RS-485 / Modbus"],
    tag: "Хит",
    icon: "Waves",
  },
  {
    id: "CH-Compact",
    category: "Учёт тепла",
    title: "CH-Compact",
    desc: "Компактный ультразвуковой теплосчётчик для квартирного и коммерческого учёта. DN 15–32. Встроенный M-Bus. Внесён в Госреестр СИ.",
    specs: ["DN 15–32", "Класс 2", "M-Bus встроен", "Госреестр СИ"],
    tag: "",
    icon: "Flame",
  },
  {
    id: "CH-Magnum",
    category: "Учёт тепла",
    title: "CH-Magnum DN32–200",
    desc: "Промышленный ультразвуковой теплосчётчик для ИТП и котельных. DN 32–200. Погрешность ±0,5%. Вычислитель с архивом 12 месяцев. HART, RS-485.",
    specs: ["DN 32–200", "±0,5%", "12 мес архив", "HART / RS-485"],
    tag: "",
    icon: "Thermometer",
  },
  {
    id: "GS-Membrane",
    category: "Учёт газа",
    title: "GS-M G4–G25",
    desc: "Мембранный счётчик газа для коммунального и промышленного учёта. Типоразмеры G4, G6, G10, G16, G25. Класс точности 1,5%. Температурная коррекция (опция).",
    specs: ["G4–G25", "Класс 1,5%", "Температурная коррекция", "Импульсный выход"],
    tag: "",
    icon: "Wind",
  },
  {
    id: "ES-Smart",
    category: "Учёт электроэнергии",
    title: "ES-Smart 1Ф / 3Ф",
    desc: "Многотарифный АСКУЭ-счётчик электроэнергии. 1-фазный (5–60А) и 3-фазный (5–100А). Тарифов до 8. Интерфейсы RS-485, PLC G3-Prime, оптопорт.",
    specs: ["До 8 тарифов", "RS-485 / PLC", "Класс 1.0 / 0.5S", "СОРМ-3"],
    tag: "",
    icon: "Zap",
  },
  {
    id: "MDM-NB",
    category: "Передача данных",
    title: "MDM-NB (NB-IoT / LTE-M)",
    desc: "Беспроводной модем для дистанционного снятия показаний. Поддержка NB-IoT и LTE-M. Протоколы MQTT, DLMS/COSEM. Батарейное питание до 10 лет. IP67.",
    specs: ["NB-IoT / LTE-M", "MQTT / DLMS", "Батарея 10 лет", "IP67"],
    tag: "Хит",
    icon: "Radio",
  },
  {
    id: "MDM-GSM",
    category: "Передача данных",
    title: "MDM-RS (RS-485 / GSM)",
    desc: "Проводной модем-концентратор с GSM каналом. До 16 устройств на шине RS-485. Совместим с приборами любых производителей. Din-рейка. Питание 220В.",
    specs: ["До 16 устройств", "RS-485 / GSM", "Din-рейка", "Любые протоколы"],
    tag: "",
    icon: "Cpu",
  },
  {
    id: "SW-Dispatch",
    category: "Программное обеспечение",
    title: "Chronos SCADA",
    desc: "Платформа диспетчеризации и визуализации данных со всех типов счётчиков. Веб-интерфейс, мобильное приложение, REST API. Поддержка облака и on-premise.",
    specs: ["Веб + мобильное", "REST API", "Облако / On-premise", "ГИС ЖКХ интеграция"],
    tag: "Популярно",
    icon: "Monitor",
  },
];

const SOLUTIONS = [
  { icon: "Droplets", title: "Водоканалам", desc: "Коммерческий учёт воды, мониторинг утечек, диспетчеризация сетей водоснабжения и водоотведения." },
  { icon: "Flame", title: "Тепловым компаниям", desc: "Учёт тепловой энергии, балансировка тепловых сетей, расчёты с абонентами в ЖКХ." },
  { icon: "Building2", title: "УК | ТСЖ", desc: "Автоматизированный сбор показаний, личный кабинет жильца, интеграция с ГИС ЖКХ." },
  { icon: "Factory", title: "Промпредприятиям", desc: "Учёт всех ресурсов на производстве. АСКУЭ, оптимизация энергопотребления, аналитика." },
  { icon: "Building", title: "Застройщикам", desc: "Проектирование систем учёта с нуля. Комплексное оснащение новостроек приборами учёта." },
  { icon: "Cpu", title: "Городам", desc: "Умный город: единая платформа учёта всех коммунальных ресурсов, открытые данные, API." },
];

const STATS = [
  { value: "20+", label: "лет на рынке" },
  { value: "500 000+", label: "установленных приборов" },
  { value: "1 200+", label: "партнёров по России" },
  { value: "47", label: "регионов присутствия" },
];

const NEWS = [
  {
    date: "15 марта 2026",
    category: "Новости",
    title: "Chronosmeter представил новую линейку ультразвуковых счётчиков воды на выставке Aqua-Therm",
    excerpt: "На крупнейшей выставке водоснабжения и теплоснабжения компания показала счётчики серии CW-Ultra с расширенным диапазоном расходов.",
  },
  {
    date: "02 марта 2026",
    category: "Статья",
    title: "Как автоматизировать учёт воды в МКД: полное руководство для УК и ТСЖ",
    excerpt: "Разбираем все этапы: от выбора приборов учёта до настройки диспетчерского ПО и интеграции с ГИС ЖКХ.",
  },
  {
    date: "18 февраля 2026",
    category: "Мероприятие",
    title: "Вебинар: NB-IoT решения для удалённого учёта ресурсов в 2026 году",
    excerpt: "Обзор беспроводных технологий передачи данных, которые применяются в современных системах учёта.",
  },
];

function TopBar() {
  return (
    <div className="bg-[#1a3a6b] text-white text-sm py-2 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-blue-300 text-xs uppercase tracking-wide font-medium">Отдел продаж</span>
            <a href="tel:+74951457626" className="hover:text-blue-300 transition-colors font-medium">+7 495 145 7626</a>
            <span className="text-gray-400">|</span>
            <a href="mailto:sales@chronosmeter.ru" className="hover:text-blue-300 transition-colors">sales@chronosmeter.ru</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-300 text-xs uppercase tracking-wide font-medium">Техподдержка 24/7</span>
            <a href="tel:+79836200964" className="hover:text-blue-300 transition-colors font-medium">+7 983 620 0964</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border border-blue-400/40 rounded px-2 py-0.5">
            <span className="font-medium cursor-pointer">RU</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-400 cursor-pointer hover:text-white">EN</span>
          </div>
          <a href="#" className="flex items-center gap-1.5 hover:text-blue-300 transition-colors">
            <Icon name="User" size={14} />
            <span>Личный кабинет</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function Header({ scrolled }: { scrolled: boolean }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(label);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 150);
  };

  return (
    <header className={`sticky top-0 z-50 bg-white border-b border-gray-200 transition-shadow ${scrolled ? "header-scrolled" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 bg-[#1a3a6b] rounded flex items-center justify-center">
            <span className="text-white font-black text-lg leading-none">C</span>
          </div>
          <div className="leading-tight">
            <div className="font-black text-[#1a3a6b] text-lg tracking-tight uppercase">Chronosmeter</div>
            <div className="text-[10px] text-gray-500 tracking-wide uppercase">Приборы учёта</div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children.length > 0 && handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href={item.href}
                className={`flex items-center gap-1 px-3 py-5 text-sm font-medium tracking-wide uppercase transition-colors border-b-2 ${openMenu === item.label ? "text-[#1a3a6b] border-[#e63329]" : "text-gray-700 border-transparent hover:text-[#1a3a6b] hover:border-[#e63329]"}`}
              >
                {item.label}
                {item.children.length > 0 && <Icon name="ChevronDown" size={12} className={`transition-transform ${openMenu === item.label ? "rotate-180" : ""}`} />}
              </a>

              {/* Mega Dropdown */}
              {item.children.length > 0 && openMenu === item.label && (
                <div className="dropdown-menu absolute top-full left-0 bg-white border border-gray-200 shadow-2xl min-w-[520px] z-50 rounded-b-lg overflow-hidden">
                  <div className="grid grid-cols-3 gap-0 p-6">
                    {item.children.map((group) => (
                      <div key={group.group}>
                        <div className="text-xs font-bold text-[#e63329] uppercase tracking-widest mb-3 pb-2 border-b border-gray-100">{group.group}</div>
                        <ul className="space-y-1.5">
                          {group.items.map((subitem) => (
                            <li key={subitem}>
                              <a href="#" className="text-sm text-gray-600 hover:text-[#1a3a6b] hover:font-medium transition-colors flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0"></span>
                                {subitem}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-600 hover:text-[#1a3a6b] transition-colors">
            <Icon name="Search" size={20} />
          </button>
          <a href="tel:+74951457626" className="hidden xl:flex items-center gap-2 bg-[#e63329] text-white px-4 py-2 rounded text-sm font-medium hover:bg-red-700 transition-colors">
            <Icon name="Phone" size={14} />
            Позвонить
          </a>
          {/* Mobile burger */}
          <button className="lg:hidden p-2 text-gray-700" onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 max-h-[80vh] overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="border-b border-gray-100">
              <a href={item.href} className="block px-4 py-3 font-medium text-gray-700 uppercase tracking-wide text-sm hover:bg-gray-50 hover:text-[#1a3a6b]">
                {item.label}
              </a>
              {item.children.length > 0 && (
                <div className="bg-gray-50 px-4 pb-3">
                  {item.children.map((group) => (
                    <div key={group.group} className="mt-2">
                      <div className="text-xs font-bold text-[#e63329] uppercase mb-1">{group.group}</div>
                      {group.items.map((s) => (
                        <a key={s} href="#" className="block text-sm text-gray-600 py-0.5 hover:text-[#1a3a6b]">{s}</a>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="p-4">
            <a href="tel:+74951457626" className="block text-center bg-[#1a3a6b] text-white py-3 rounded font-medium">+7 495 145 7626</a>
          </div>
        </div>
      )}
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#0d2347] via-[#1a3a6b] to-[#0a1e3d] text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 border border-white rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 border border-white rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] border border-white/30 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#e63329]/20 border border-[#e63329]/40 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-[#e63329] rounded-full animate-pulse"></span>
              <span className="text-sm text-red-300 font-medium">Производитель приборов учёта</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 tracking-tight">
              Умный учёт<br />
              <span className="text-[#e63329]">ресурсов</span><br />
              для вашего бизнеса
            </h1>
            <p className="text-lg text-blue-200 mb-8 max-w-lg leading-relaxed">
              Приборы учёта воды, тепла, газа и электроэнергии. Беспроводные системы диспетчеризации. Программное обеспечение для ЖКХ и промышленности.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#products" className="bg-[#e63329] text-white px-8 py-3.5 rounded font-bold text-sm uppercase tracking-wide hover:bg-red-700 transition-colors">
                Смотреть продукты
              </a>
              <a href="#contact" className="border-2 border-white/40 text-white px-8 py-3.5 rounded font-bold text-sm uppercase tracking-wide hover:border-white transition-colors">
                Получить консультацию
              </a>
            </div>
            {/* Quick stats */}
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-black text-[#e63329]">{s.value}</div>
                  <div className="text-xs text-blue-300 uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "Droplets", label: "Учёт воды", color: "bg-blue-500/20 border-blue-400/30" },
                { icon: "Flame", label: "Учёт тепла", color: "bg-orange-500/20 border-orange-400/30" },
                { icon: "Zap", label: "Электроэнергия", color: "bg-yellow-500/20 border-yellow-400/30" },
                { icon: "Wind", label: "Учёт газа", color: "bg-green-500/20 border-green-400/30" },
              ].map((card) => (
                <div key={card.label} className={`${card.color} border rounded-xl p-6 flex flex-col items-center justify-center gap-3 backdrop-blur-sm`}>
                  <Icon name={card.icon as string} size={40} className="text-white opacity-80" />
                  <span className="text-sm font-medium text-blue-100 text-center">{card.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-white/10 border border-white/20 rounded-xl p-5 flex items-center gap-4 backdrop-blur-sm">
              <div className="w-12 h-12 bg-[#e63329] rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Wifi" size={24} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-sm">Беспроводная диспетчеризация</div>
                <div className="text-xs text-blue-300">NB-IoT · LoRaWAN · GSM/GPRS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const TABS = ["Все", "Учёт воды", "Учёт тепла", "Учёт газа", "Учёт электроэнергии", "Передача данных", "Программное обеспечение"];

function ProductsSection() {
  const [activeTab, setActiveTab] = useState("Все");
  const filtered = activeTab === "Все" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeTab);

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-[#e63329] text-sm font-bold uppercase tracking-widest mb-2">Каталог</div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Продукты</h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-[#1a3a6b] font-medium hover:text-[#e63329] transition-colors">
            Весь каталог <Icon name="ArrowRight" size={16} />
          </a>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === tab ? "bg-[#1a3a6b] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div key={p.id} className="group border border-gray-200 rounded-xl overflow-hidden hover:border-[#1a3a6b] hover:shadow-lg transition-all flex flex-col">
              {/* Card image area */}
              <div className="h-44 bg-gradient-to-br from-[#0d2347] to-[#1a3a6b] relative flex flex-col items-center justify-center gap-2 px-6">
                <Icon name={p.icon as string} size={52} className="text-white/30" />
                <span className="text-white/80 font-mono text-xs tracking-widest uppercase">{p.id}</span>
                {p.tag && (
                  <div className="absolute top-3 left-3 bg-[#e63329] text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                    {p.tag}
                  </div>
                )}
              </div>
              {/* Card body */}
              <div className="p-5 flex flex-col flex-1">
                <div className="text-xs text-[#e63329] font-bold uppercase tracking-widest mb-1">{p.category}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{p.desc}</p>
                {/* Specs */}
                <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                  {p.specs.map((spec) => (
                    <span key={spec} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full border border-gray-200">
                      {spec}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a href="#" className="flex-1 text-center bg-[#1a3a6b] text-white py-2 rounded text-sm font-medium hover:bg-[#0d2347] transition-colors">
                    Подробнее
                  </a>
                  <a href="#contact" className="flex-1 text-center border border-[#1a3a6b] text-[#1a3a6b] py-2 rounded text-sm font-medium hover:bg-[#1a3a6b] hover:text-white transition-colors">
                    Запросить КП
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a href="#" className="inline-flex items-center gap-2 border-2 border-[#1a3a6b] text-[#1a3a6b] px-8 py-3 rounded font-bold text-sm uppercase tracking-wide hover:bg-[#1a3a6b] hover:text-white transition-colors">
            Смотреть весь каталог <Icon name="ArrowRight" size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function SolutionsSection() {
  return (
    <section id="solutions" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <div className="text-[#e63329] text-sm font-bold uppercase tracking-widest mb-2">Для кого</div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Решения</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Комплексные системы учёта ресурсов для разных отраслей — от водоканалов до розничных сетей</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS.map((s) => (
            <a key={s.title} href="#" className="group bg-white rounded-xl p-7 border border-gray-200 hover:border-[#1a3a6b] hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-[#1a3a6b]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#1a3a6b] transition-colors">
                <Icon name={s.icon as string} size={24} className="text-[#1a3a6b] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#1a3a6b] transition-colors">{s.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#1a3a6b] opacity-0 group-hover:opacity-100 transition-opacity">
                Подробнее <Icon name="ArrowRight" size={14} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  const features = [
    { icon: "Award", title: "Собственное производство", desc: "Полный цикл — от разработки до серийного выпуска. Контроль качества на каждом этапе." },
    { icon: "ShieldCheck", title: "Сертификация", desc: "Все приборы сертифицированы и внесены в Госреестр средств измерений РФ." },
    { icon: "Headphones", title: "Техподдержка 24/7", desc: "Служба технической поддержки работает круглосуточно. Время реакции — до 2 часов." },
    { icon: "PackageCheck", title: "Гарантия 5 лет", desc: "Расширенная гарантия на все приборы учёта. Бесплатный ремонт и замена в случае дефекта." },
    { icon: "Globe", title: "Работаем по всей России", desc: "47 регионов присутствия. Дилерская сеть более 1200 партнёров в каждом федеральном округе." },
    { icon: "Layers", title: "Интеграция с любыми АСУ", desc: "API, MQTT, DLMS/COSEM, ModBus, СОРМ-3. Готовые интеграции с 1С, SAP, ГИС ЖКХ." },
  ];

  return (
    <section className="py-20 bg-[#1a3a6b] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <div className="text-red-300 text-sm font-bold uppercase tracking-widest mb-2">Преимущества</div>
          <h2 className="text-4xl font-black tracking-tight mb-4">Почему выбирают Chronosmeter</h2>
          <p className="text-blue-200 max-w-2xl mx-auto">Мы производим приборы учёта с 2005 года и знаем, что важно нашим клиентам</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-white/5 border border-white/10 rounded-xl p-7 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-[#e63329]/20 rounded-xl flex items-center justify-center mb-5">
                <Icon name={f.icon as string} size={24} className="text-red-300" />
              </div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-blue-200 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsSection() {
  return (
    <section id="info" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-[#e63329] text-sm font-bold uppercase tracking-widest mb-2">Инфоцентр</div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Новости и статьи</h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-[#1a3a6b] font-medium hover:text-[#e63329] transition-colors">
            Все материалы <Icon name="ArrowRight" size={16} />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS.map((n, i) => (
            <a key={n.title} href="#" className={`group rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg hover:border-[#1a3a6b] transition-all ${i === 0 ? "md:col-span-1" : ""}`}>
              <div className={`h-44 flex items-center justify-center ${i === 0 ? "bg-gradient-to-br from-[#1a3a6b] to-[#0d2347]" : i === 1 ? "bg-gradient-to-br from-gray-700 to-gray-900" : "bg-gradient-to-br from-[#e63329] to-red-800"}`}>
                <Icon name={i === 0 ? "Newspaper" : i === 1 ? "BookOpen" : "PlayCircle"} size={48} className="text-white/40" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold text-[#e63329] uppercase tracking-widest">{n.category}</span>
                  <span className="text-xs text-gray-400">{n.date}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#1a3a6b] transition-colors leading-snug">{n.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{n.excerpt}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SoftwareSection() {
  const items = [
    { icon: "Monitor", title: "Диспетчеризация", desc: "Веб-платформа сбора и визуализации данных со счётчиков в реальном времени. Карты, графики, журналы." },
    { icon: "Calculator", title: "Расчёты с абонентами", desc: "Автоматический расчёт платежей по тарифам. Интеграция с 1С, формирование квитанций." },
    { icon: "Server", title: "Серверное ПО", desc: "Надёжный бэкенд для хранения и обработки данных. Поддержка облака и on-premise." },
    { icon: "Settings", title: "Управление инжинирингом", desc: "Планирование, монтаж, ПНР. Цифровой паспорт объекта, маршруты обхода." },
  ];
  return (
    <section id="software" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-[#e63329] text-sm font-bold uppercase tracking-widest mb-2">Цифровые решения</div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-6">Программное обеспечение</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Собственная экосистема ПО для полного цикла управления учётом ресурсов. От пусконаладки до автоматических расчётов с абонентами.
            </p>
            <div className="space-y-5">
              {items.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-10 h-10 bg-[#1a3a6b] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon as string} size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-0.5">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex gap-4">
              <a href="#" className="bg-[#1a3a6b] text-white px-6 py-3 rounded font-bold text-sm hover:bg-[#0d2347] transition-colors">
                Тест-драйв ПО
              </a>
              <a href="#" className="border border-[#1a3a6b] text-[#1a3a6b] px-6 py-3 rounded font-bold text-sm hover:bg-[#1a3a6b] hover:text-white transition-colors">
                Демо по запросу
              </a>
            </div>
          </div>
          <div className="bg-[#1a3a6b] rounded-2xl p-8 text-white">
            <div className="text-sm font-bold text-blue-300 uppercase tracking-widest mb-4">Тест-драйв ПО</div>
            <h3 className="text-2xl font-black mb-4">Попробуйте бесплатно 30 дней</h3>
            <p className="text-blue-200 text-sm mb-6">Полный доступ ко всем модулям. Тестовые данные предоставляем мы. Поддержка при настройке включена.</p>
            <ul className="space-y-3 mb-8">
              {["Диспетчеризация в браузере", "Мобильное приложение", "API для интеграций", "Техподдержка при онбординге"].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <Icon name="CheckCircle" size={16} className="text-green-400 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a href="#contact" className="block text-center bg-[#e63329] text-white py-3 rounded font-bold text-sm hover:bg-red-700 transition-colors">
              Начать тест-драйв
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", type: "question" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="text-[#e63329] text-sm font-bold uppercase tracking-widest mb-2">Связаться</div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-6">Контакты</h2>
            <p className="text-gray-600 mb-10 leading-relaxed">
              Наши специалисты помогут подобрать оборудование, ответят на технические вопросы и подготовят коммерческое предложение.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#1a3a6b]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" size={18} className="text-[#1a3a6b]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Отдел продаж</div>
                  <a href="tel:+74951457626" className="font-bold text-gray-900 hover:text-[#1a3a6b] text-lg">+7 495 145 7626</a>
                  <div className="text-sm text-gray-500">пн–пт, 9:00–18:00 МСК</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#1a3a6b]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Headphones" size={18} className="text-[#1a3a6b]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Техподдержка 24/7</div>
                  <a href="tel:+79836200964" className="font-bold text-gray-900 hover:text-[#1a3a6b] text-lg">+7 983 620 0964</a>
                  <div className="text-sm text-gray-500">круглосуточно, без выходных</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#1a3a6b]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" size={18} className="text-[#1a3a6b]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email</div>
                  <a href="mailto:sales@chronosmeter.ru" className="font-bold text-gray-900 hover:text-[#1a3a6b]">sales@chronosmeter.ru</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Icon name="CheckCircle" size={32} className="text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Заявка отправлена!</h3>
                <p className="text-gray-600">Мы свяжемся с вами в течение 2 рабочих часов.</p>
                <button onClick={() => setSent(false)} className="mt-6 text-[#1a3a6b] font-medium hover:underline">Отправить ещё</button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Оставьте заявку</h3>
                <p className="text-sm text-gray-500 mb-6">Ответим в течение 2 часов в рабочее время</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-700 uppercase tracking-wide block mb-1">Имя *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a3a6b] transition-colors"
                        placeholder="Иван Петров"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700 uppercase tracking-wide block mb-1">Телефон *</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a3a6b] transition-colors"
                        placeholder="+7 (999) 000-00-00"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700 uppercase tracking-wide block mb-1">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a3a6b] transition-colors"
                      placeholder="email@company.ru"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700 uppercase tracking-wide block mb-1">Тема обращения</label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a3a6b] transition-colors bg-white"
                    >
                      <option value="question">Задать вопрос</option>
                      <option value="quote">Запросить КП</option>
                      <option value="call">Заказать звонок</option>
                      <option value="repair">Заявка на ремонт</option>
                      <option value="partner">Стать партнёром</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700 uppercase tracking-wide block mb-1">Сообщение</label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a3a6b] transition-colors resize-none"
                      placeholder="Опишите вашу задачу..."
                    />
                  </div>
                  <button type="submit" className="w-full bg-[#e63329] text-white py-3 rounded font-bold text-sm uppercase tracking-wide hover:bg-red-700 transition-colors">
                    Отправить заявку
                  </button>
                  <p className="text-xs text-gray-400 text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0d1e3d] text-white">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-[#e63329] rounded flex items-center justify-center">
                <span className="text-white font-black text-lg">C</span>
              </div>
              <div>
                <div className="font-black text-white text-lg tracking-tight uppercase">Chronosmeter</div>
                <div className="text-[10px] text-blue-400 tracking-wide uppercase">Приборы учёта</div>
              </div>
            </div>
            <p className="text-blue-300 text-sm leading-relaxed mb-5 max-w-xs">
              Производство и разработка приборов учёта, оборудования для диспетчеризации МКД и объектов с 2005 года.
            </p>
            <div className="flex gap-3">
              {["Youtube", "Send", "Linkedin"].map((icon) => (
                <a key={icon} href="#" className="w-9 h-9 bg-white/10 rounded flex items-center justify-center hover:bg-[#e63329] transition-colors">
                  <Icon name={icon as string} size={15} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: "Продукты", links: ["Счётчики воды", "Теплосчётчики", "Счётчики газа", "Электросчётчики", "Модемы и устройства", "ПО для АСКУЭ"] },
            { title: "Решения", links: ["Водоканалам", "Тепловым компаниям", "УК | ТСЖ", "Промпредприятиям", "Застройщикам", "Городам"] },
            { title: "Компания", links: ["О компании", "Новости", "Вакансии", "Поставщикам", "Партнёрам", "Контакты"] },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">{col.title}</div>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-blue-200 hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-blue-400">© 2005–2026 Chronosmeter. Все права защищены.</div>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-blue-400 hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="text-xs text-blue-400 hover:text-white transition-colors">Пользовательское соглашение</a>
            <a href="#" className="text-xs text-blue-400 hover:text-white transition-colors">Карта сайта</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Index() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <TopBar />
      <Header scrolled={scrolled} />
      <HeroSection />
      <ProductsSection />
      <SolutionsSection />
      <WhyUsSection />
      <SoftwareSection />
      <NewsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}