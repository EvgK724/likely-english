window.CARDS = [
  {
    id: "adv-01", topic: "adverbs", kind: "translate",
    prompt: "Скажите с probably. Я, наверное, буду готовить дома сегодня вечером.",
    answer: "I'll probably cook at home tonight.",
    ru: "Я, наверное, буду готовить дома сегодня вечером.",
    why: "В утвердительном прогнозе probably удобно ставить между will и основным глаголом. I'll — сокращение от I will."
  },
  {
    id: "that-01", topic: "that", kind: "rephrase",
    hasPromptAudio: true,
    prompt: "Начните с It's likely that. The platform will probably change.",
    answer: "It's likely that the platform will change.",
    ru: "Скорее всего, номер платформы изменится.",
    why: "После that идёт целое предложение. Здесь у него есть подлежащее the platform и сказуемое will change."
  },
  {
    id: "op-01", topic: "opinion", kind: "translate",
    prompt: "Начните с I think. Думаю, у нас будет время на вопросы.",
    answer: "I think we'll have time for questions.",
    ru: "Думаю, у нас будет время на вопросы.",
    why: "Прогноз выражает we'll have. После I think можно добавить that, но в разговоре его часто опускают."
  },
  {
    id: "inf-01", topic: "infinitive", kind: "translate",
    prompt: "Начните с The bakery и используйте likely. Пекарня, скорее всего, откроется поздно.",
    answer: "The bakery is likely to open late.",
    ru: "Пекарня, скорее всего, откроется поздно.",
    why: "Последовательность здесь такая: the bakery + is likely + to open. Для прогноза достаточно этой конструкции."
  },
  {
    id: "mod-01", topic: "modals", kind: "fix",
    prompt: "Исправьте глагол после might. The ferry might leaves early.",
    answer: "The ferry might leave early.",
    ru: "Возможно, паром отправится раньше обычного.",
    why: "За might следует начальная форма leave. У неё нет окончания -s даже после the ferry."
  },
  {
    id: "adv-02", topic: "adverbs", kind: "fix",
    prompt: "Переставьте definitely так, чтобы фраза звучала естественно. I'll send definitely the agenda today.",
    answer: "I'll definitely send the agenda today.",
    ru: "Я точно пришлю повестку сегодня.",
    why: "В этой фразе definitely ставят перед send. Сочетание send the agenda сохраняется целиком."
  },
  {
    id: "that-02", topic: "that", kind: "translate",
    whyAudio: ["The neighbours might go away for the weekend."],
    prompt: "Начните с It's possible that. Возможно, соседи уедут на выходные.",
    answer: "It's possible that the neighbours will go away for the weekend.",
    ru: "Возможно, соседи уедут на выходные.",
    why: "It's possible that вводит возможный сценарий. В разговоре также естественно сказать The neighbours might go away for the weekend."
  },
  {
    id: "op-02", topic: "opinion", kind: "fix",
    prompt: "Верните предложение к смыслу «Вряд ли мы успеем на пересадку». Начните с I don't think. I don't think we'll miss our connection.",
    answer: "I don't think we'll make our connection.",
    ru: "Вряд ли мы успеем на пересадку.",
    why: "Make our connection означает «успеть на пересадку», miss our connection — «опоздать». Исходная фраза выражала более оптимистичный прогноз."
  },
  {
    id: "inf-02", topic: "infinitive", kind: "fix",
    prompt: "Восстановите два пропущенных слова. The new rota likely change again.",
    answer: "The new rota is likely to change again.",
    ru: "Новый график дежурств, скорее всего, снова изменится.",
    why: "Подлежащему the new rota нужна форма is, а перед change в конструкции be likely to нужен инфинитив с to."
  },
  {
    id: "mod-02", topic: "modals", kind: "translate",
    whyAudio: ["I may not finish the film today."],
    prompt: "Используйте might. Возможно, я не досмотрю фильм сегодня.",
    answer: "I might not finish the film today.",
    ru: "Возможно, я не досмотрю фильм сегодня.",
    why: "Might not finish оставляет оба исхода открытыми. Можно также сказать I may not finish the film today."
  },
  {
    id: "adv-03", topic: "adverbs", kind: "translate",
    prompt: "Используйте probably и won't. Мы, скорее всего, не успеем на последний автобус.",
    answer: "We probably won't catch the last bus.",
    ru: "Мы, скорее всего, не успеем на последний автобус.",
    why: "В нейтральном отрицательном прогнозе probably обычно стоит перед won't. Catch the bus здесь означает «успеть на автобус»."
  },
  {
    id: "that-03", topic: "that", kind: "fix",
    prompt: "Добавьте пропущенное слово в начале. Is unlikely that the printer will be ready by noon.",
    answer: "It is unlikely that the printer will be ready by noon.",
    ru: "Маловероятно, что принтер будет готов к полудню.",
    why: "Английской конструкции требуется формальное подлежащее it. В разговоре It is обычно сокращают до It's."
  },
  {
    id: "op-03", topic: "opinion", kind: "rephrase",
    hasPromptAudio: true,
    prompt: "Выразите сомнение с помощью I doubt. I don't think the café will have a free table.",
    answer: "I doubt the café will have a free table.",
    ru: "Сомневаюсь, что в кафе найдётся свободный столик.",
    why: "Глагол doubt уже передаёт сомнение. После него можно употребить that или сразу перейти к the café."
  },
  {
    id: "inf-03", topic: "infinitive", kind: "rephrase",
    hasPromptAudio: true,
    prompt: "Начните с Our flight и сохраните степень уверенности. It's unlikely that our flight will leave on time.",
    answer: "Our flight is unlikely to leave on time.",
    ru: "Вряд ли наш рейс отправится вовремя.",
    why: "Our flight становится подлежащим главного предложения. Дальше идут is unlikely и инфинитив to leave."
  },
  {
    id: "mod-03", topic: "modals", kind: "rephrase",
    hasPromptAudio: true,
    prompt: "Передайте ту же возможность с помощью could. It's possible that the call will take an hour.",
    answer: "The call could take an hour.",
    ru: "Разговор может занять час.",
    why: "Could take описывает возможную продолжительность предстоящего разговора. Уместны также may take и might take."
  },
  {
    id: "adv-04", topic: "adverbs", kind: "rephrase",
    hasPromptAudio: true,
    whyAudio: ["I will definitely not order"],
    prompt: "Выразите уверенность через definitely won't. I'm sure I won't order that spicy soup again.",
    answer: "I definitely won't order that spicy soup again.",
    ru: "Я точно больше не закажу этот острый суп.",
    why: "Definitely перед won't усиливает уверенность в отрицательном исходе. Полная форма I will definitely not order тоже возможна."
  },
  {
    id: "that-04", topic: "that", kind: "translate",
    prompt: "Используйте It's unlikely that. Вряд ли к вечеру останутся билеты.",
    answer: "It's unlikely that there will be any tickets left by this evening.",
    ru: "Вряд ли к вечеру останутся билеты.",
    why: "There will be передаёт будущее наличие, tickets left — оставшиеся билеты. Unlikely относится ко всему прогнозу."
  },
  {
    id: "op-04", topic: "opinion", kind: "translate",
    prompt: "Используйте I don't think. Не думаю, что коллеги закончат совещание к трём.",
    answer: "I don't think my colleagues will finish the meeting by three.",
    ru: "Не думаю, что коллеги закончат совещание к трём.",
    why: "Отрицание в I don't think относится по смыслу к прогнозу. By three задаёт крайний срок — «к трём»."
  },
  {
    id: "inf-04", topic: "infinitive", kind: "translate",
    prompt: "Используйте bound to. Этот хит ещё наверняка прозвучит по радио.",
    answer: "This hit is bound to be on the radio again.",
    ru: "Этот хит ещё наверняка прозвучит по радио.",
    why: "Be bound to выражает сильную уверенность говорящего. Здесь следующий глагол — be, поэтому получается is bound to be."
  },
  {
    id: "mod-04", topic: "modals", kind: "fix",
    prompt: "Завтра рейс могут задержать, но вылет по расписанию тоже возможен. Замените couldn't одним из вариантов с may или might. Our flight couldn't leave on time tomorrow.",
    answer: "Our flight might not leave on time tomorrow.",
    ru: "Возможно, завтра наш рейс не вылетит вовремя.",
    why: "Might not и may not передают возможность задержки. Couldn't уместно при другом смысле, например о невозможности вылететь при закрытой полосе."
  },
  {
    id: "adv-05", topic: "adverbs", kind: "fix",
    prompt: "Поставьте will и probably на обычные места в нейтральном прогнозе. The report probably arrive will before lunch.",
    answer: "The report will probably arrive before lunch.",
    ru: "Отчёт, скорее всего, придёт до обеда.",
    why: "Обычный порядок при утвердительном will — will probably arrive. После will глагол arrive остаётся в начальной форме."
  },
  {
    id: "that-05", topic: "that", kind: "rephrase",
    hasPromptAudio: true,
    prompt: "Начните с It's likely that и сохраните отрицание. The shop probably won't deliver our sofa this week.",
    answer: "It's likely that the shop won't deliver our sofa this week.",
    ru: "Скорее всего, магазин не доставит наш диван на этой неделе.",
    why: "Likely описывает вероятность всего события. Отрицание остаётся внутри части с that и относится к доставке."
  },
  {
    id: "op-05", topic: "opinion", kind: "fix",
    prompt: "Вы хотите сказать «Сомневаюсь, что цена билета упадёт». Уберите лишнее отрицание. I doubt the ticket price won't drop.",
    answer: "I doubt the ticket price will drop.",
    ru: "Сомневаюсь, что цена билета упадёт.",
    why: "В сомнительном для вас сценарии цена падает. Его передаёт will drop. Замена на won't drop изменила бы смысл."
  },
  {
    id: "inf-05", topic: "infinitive", kind: "fix",
    prompt: "Восстановите пропущенное слово. With only one microphone, the audience is bound miss a few questions.",
    answer: "With only one microphone, the audience is bound to miss a few questions.",
    ru: "С одним микрофоном слушатели наверняка пропустят несколько вопросов.",
    why: "Устойчивое сочетание — be bound to do something. Здесь to ставится непосредственно перед miss."
  },
  {
    id: "mod-05", topic: "modals", kind: "translate",
    whyAudio: ["The courier might not find me at home."],
    prompt: "Скажите с may not. Возможно, курьер не застанет меня дома.",
    answer: "The courier may not find me at home.",
    ru: "Возможно, курьер не застанет меня дома.",
    why: "В этом контексте may not относится к возможному исходу. Ещё один естественный вариант — The courier might not find me at home."
  },
  {
    id: "adv-06", topic: "adverbs", kind: "rephrase",
    hasPromptAudio: true,
    whyAudio: ["We will definitely need our passports."],
    prompt: "Замените I'm sure конструкцией с will definitely. I'm sure we'll need our passports.",
    answer: "We'll definitely need our passports.",
    ru: "Паспорта нам точно понадобятся.",
    why: "We'll definitely need выражает ту же высокую уверенность. Можно произнести will полностью — We will definitely need our passports."
  },
  {
    id: "that-06", topic: "that", kind: "fix",
    prompt: "Восстановите глагол в части после that. It's possible that the new room will available on Monday.",
    answer: "It's possible that the new room will be available on Monday.",
    ru: "Возможно, новое помещение будет доступно в понедельник.",
    why: "Available — прилагательное. Чтобы сказать «будет доступно», употребляют will be available."
  },
  {
    id: "op-06", topic: "opinion", kind: "rephrase",
    hasPromptAudio: true,
    whyAudio: ["I doubt I'll finish", "I don't think I'll finish"],
    prompt: "Выразите то же сомнение через I don't think. I doubt I'll finish this chapter tonight.",
    answer: "I don't think I'll finish this chapter tonight.",
    ru: "Вряд ли я дочитаю эту главу сегодня вечером.",
    why: "I doubt I'll finish и I don't think I'll finish позволяют мягко выразить скептический прогноз."
  },
  {
    id: "inf-06", topic: "infinitive", kind: "rephrase",
    hasPromptAudio: true,
    prompt: "Начните с The trains. It's likely that the trains will be crowded on Friday.",
    answer: "The trains are likely to be crowded on Friday.",
    ru: "В пятницу в поездах, скорее всего, будет много людей.",
    why: "The trains требует формы are. Состояние «будут переполнены» после likely выражается инфинитивом to be crowded."
  },
  {
    id: "mod-06", topic: "modals", kind: "rephrase",
    hasPromptAudio: true,
    whyAudio: ["or they might postpone it."],
    prompt: "Сохраните два возможных исхода и используйте might дважды. Perhaps the team will meet online tomorrow, or perhaps they'll postpone the meeting.",
    answer: "The team might meet online tomorrow, or they might postpone the meeting.",
    ru: "Возможно, завтра команда проведёт встречу онлайн или отложит её.",
    why: "Повтор might показывает, что оба варианта остаются открытыми. В разговоре вторую часть можно сократить до or they might postpone it."
  }
];
