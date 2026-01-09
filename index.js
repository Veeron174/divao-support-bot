import { Bot } from '@maxhub/max-bot-api';

// ДЕБАГ: Все переменные окружения
console.log('=== BOTHOST ENVIRONMENT ===');
const allVars = Object.keys(process.env);
console.log('Total env vars:', allVars.length);

// Ищем токен
const tokenKeys = ['BOT_TOKEN', 'MAX_BOT_TOKEN', 'API_TOKEN', 'TOKEN', 'TELEGRAM_BOT_TOKEN', 'MAX_TOKEN'];
let foundToken = null;
let foundKey = null;

for (const key of tokenKeys) {
  if (process.env[key]) {
    foundToken = process.env[key];
    foundKey = key;
    console.log(`✅ Found token in ${key}: ${foundToken.substring(0, 15)}... (length: ${foundToken.length})`);
    break;
  }
}

if (!foundToken) {
  console.error('❌ NO BOT TOKEN FOUND!');
  console.error('Available env vars:', allVars.join(', '));
  process.exit(1);
}

console.log(`✅ Using token from ${foundKey}`);

// СОЗДАЕМ БОТА
const bot = new Bot(foundToken);
console.log('✅ Bot instance created');

// БАЗА ЗНАНИЙ АВТООТВЕТОВ DIVAO
const autoResponses = {
  // Приветствие (основное)
  greeting: `Добрый день! 👋
Спасибо за обращение в службу поддержки DIVAO.

Пожалуйста, пришлите скрин заказа и подробно (а лучше с видео или фото) напишите о цели обращения.
- мы поможем Вам настроить ноутбук и установить дополнительные программы
- оперативно решим все вопросы, связанные с нашей техникой.

Наши специалисты уже спешат на помощь! ⚡

⏰ График работы: пн-пт 10:00 до 19:00`,

  // Автоответ №1 - Отзыв и доставка мышки
  feedback: `Здравствуйте! 🙏
Большое спасибо за отзыв. Будем очень благодарны, если дополните его примером использования с фото или видео.

📦 Мышку отправляем яндекс доставкой.
Для оформления доставки (куда, контакты) напишите, пожалуйста нам адрес и тел получателя`,

  // Автоответ №2 - Активация Windows
  activation: `К сожалению, сейчас происходят сбои с активацией предустановленной Windows 😔

📎 Подготовили для Вас файл для активации и инструкцию. Скачать по ссылке:
https://divao.ru/activation-guide

📞 Если ссылка не работает: +79952205567`,

  // Автоответ №3 - Проблемы с производительностью
  performance: `Так как Вы только начали использовать ноутбук, то в первые дни возможны повышенная нагрузка на аккумулятор, нагрев, шум вентилятора. Это связано со скачиванием и установкой обновлений.

✅ Рекомендации:
1. Подключите ноутбук к сети на 4–6 часов для завершения процессов
2. Не прерывайте обновления — даже если кажется, что система «зависла»
3. Проверьте состояние через 2–3 дня — обычно к этому времени фоновая активность полностью прекращается

📞 Дополнительная помощь: +79952205567`,

  // Доставка
  delivery: `🚚 Информация по доставке DIVAO:
• Доставка Яндекс/СДЭК 1-3 дня
• Самовывоз из пунктов выдачи
• Курьерская доставка до двери

Для уточнения деталей отправьте:
1. Номер заказа
2. Город доставки
3. Контактный телефон

📞 +79952205567`,

  // Гарантия
  warranty: `🔧 Гарантийное обслуживание DIVAO:
• Гарантия 12 месяцев
• Бесплатный ремонт при заводском браке
• Диагностика в течение 3 дней

Для обращения пришлите:
1. Видео/фото проблемы
2. Серийный номер
3. Чек о покупке

📞 +79952205567`
};

// КОМАНДА /start
bot.command('start', async (ctx) => {
  console.log(`User ${ctx.user()?.name} started bot`);
  await ctx.reply(autoResponses.greeting);
});

// КОМАНДА /help
bot.command('help', async (ctx) => {
  const helpText = `📋 Поддержка DIVAI - Доступные команды:

/start - Начать диалог
/help - Эта справка
/activation - Проблемы с активацией Windows
/performance - Ноутбук тормозит/греется
/delivery - Вопросы по доставке
/warranty - Гарантия и ремонт
/contact - Контакты поддержки

📞 Телефон: +79952205567
⏰ График: пн-пт 10:00 до 19:00`;
  
  await ctx.reply(helpText);
});

// БЫСТРЫЕ КОМАНДЫ
bot.command('activation', async (ctx) => {
  await ctx.reply(autoResponses.activation);
});

bot.command('performance', async (ctx) => {
  await ctx.reply(autoResponses.performance);
});

bot.command('delivery', async (ctx) => {
  await ctx.reply(autoResponses.delivery);
});

bot.command('warranty', async (ctx) => {
  await ctx.reply(autoResponses.warranty);
});

bot.command('contact', async (ctx) => {
  await ctx.reply(`📞 Контакты поддержки DIVAO:
  
Телефон: +79952205567
График: пн-пт 10:00-19:00
Email: support@divao.ru
Сайт: https://divao.ru`);
});

// АВТООТВЕТЫ НА СООБЩЕНИЯ
bot.on('message_created', async (ctx) => {
  const message = ctx.message?.body?.text || '';
  const user = ctx.user();
  
  // Пропускаем команды
  if (!message || message.startsWith('/')) return;
  
  console.log(`Message from ${user?.name}: ${message.substring(0, 50)}`);
  
  // Определяем категорию
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('отзыв') || lowerMsg.includes('мыш') || lowerMsg.includes('подарок')) {
    await ctx.reply(autoResponses.feedback);
  } else if (lowerMsg.includes('активация') || lowerMsg.includes('windows') || lowerMsg.includes('win11')) {
    await ctx.reply(autoResponses.activation);
  } else if (lowerMsg.includes('медленно') || lowerMsg.includes('тормозит') || lowerMsg.includes('греется') || 
             lowerMsg.includes('шум') || lowerMsg.includes('вентилятор') || lowerMsg.includes('батарея')) {
    await ctx.reply(autoResponses.performance);
  } else if (lowerMsg.includes('доставк') || lowerMsg.includes('приедет') || lowerMsg.includes('трек')) {
    await ctx.reply(autoResponses.delivery);
  } else if (lowerMsg.includes('гарантия') || lowerMsg.includes('ремонт') || lowerMsg.includes('брак')) {
    await ctx.reply(autoResponses.warranty);
  } else {
    // Любое другое сообщение
    await ctx.reply(autoResponses.greeting);
  }
});

// ОБРАБОТКА МЕДИАФАЙЛОВ
bot.on('message_created', async (ctx) => {
  if (ctx.message?.body?.attachments?.length > 0) {
    await ctx.reply(`✅ Получили ваш файл! Спасибо за подробности.

Специалист ознакомится и ответит в ближайшее время.
⏳ Обычно ответ занимает 10-15 минут в рабочее время.`);
  }
});

// ЗАПУСК БОТА
console.log('🚀 Starting DIVAO Support Bot for MAX...');
bot.start()
  .then(() => {
    console.log('✅ DIVAO BOT STARTED SUCCESSFULLY!');
    console.log('📞 Support phone: +79952205567');
    console.log('⏰ Working hours: Mon-Fri 10:00-19:00');
    console.log('🔗 Bot link: https://max.ru/id232103141393_1_bot');
  })
  .catch(error => {
    console.error('❌ BOT START ERROR:');
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    
    // Дополнительная диагностика
    if (error.message.includes('token')) {
      console.error('⚠️ Token problem detected');
      console.error('Token used:', foundToken?.substring(0, 20) + '...');
      console.error('Token length:', foundToken?.length);
    }
  });
