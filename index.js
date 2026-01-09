import { Bot } from '@maxhub/max-bot-api';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get token from environment
const token = process.env.BOT_TOKEN || process.env.MAX_BOT_TOKEN || process.env.API_TOKEN;

if (!token) {
  // Silent fail for Bothost
  process.exit(1);
}

// Create bot instance
const bot = new Bot(token);

// DIVAO Support Knowledge Base
const responses = {
  greeting: `Добрый день! 👋
Спасибо за обращение в службу поддержки DIVAO.

Пожалуйста, пришлите скрин заказа и подробно (а лучше с видео или фото) напишите о цели обращения.
- мы поможем Вам настроить ноутбук и установить дополнительные программы
- оперативно решим все вопросы, связанные с нашей техникой.

Наши специалисты уже спешат на помощь! ⚡

⏰ График работы: пн-пт 10:00 до 19:00`,

  feedback: `Здравствуйте! 🙏
Большое спасибо за отзыв. Будем очень благодарны, если дополните его примером использования с фото или видео.

📦 Мышку отправляем яндекс доставкой.
Для оформления доставки (куда, контакты) напишите, пожалуйста нам адрес и тел получателя`,

  activation: `К сожалению, сейчас происходят сбои с активацией предустановленной Windows 😔

📎 Подготовили для Вас файл для активации и инструкцию. Скачать по ссылке:
https://divao.ru/activation-guide

📞 Если ссылка не работает: +79952205567`,

  performance: `Так как Вы только начали использовать ноутбук, то в первые дни возможны повышенная нагрузка на аккумулятор, нагрев, шум вентилятора. Это связано со скачиванием и установкой обновлений.

✅ Рекомендации:
1. Подключите ноутбук к сети на 4–6 часов для завершения процессов
2. Не прерывайте обновления — даже если кажется, что система «зависла»
3. Проверьте состояние через 2–3 дня — обычно к этому времени фоновая активность полностью прекращается

📞 Дополнительная помощь: +79952205567`,

  delivery: `🚚 Информация по доставке DIVAO:
• Доставка Яндекс/СДЭК 1-3 дня
• Самовывоз из пунктов выдачи
• Курьерская доставка до двери

Для уточнения деталей отправьте:
1. Номер заказа
2. Город доставки
3. Контактный телефон

📞 +79952205567`,

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

// Command handlers
bot.command('start', async (ctx) => {
  await ctx.reply(responses.greeting);
});

bot.command('help', async (ctx) => {
  await ctx.reply(`📋 Поддержка DIVAO - Команды:

/start - Начать диалог
/help - Справка
/activation - Активация Windows
/performance - Проблемы с ноутбуком
/delivery - Доставка
/warranty - Гарантия
/contact - Контакты

📞 +79952205567 (пн-пт 10:00-19:00)`);
});

bot.command('activation', async (ctx) => {
  await ctx.reply(responses.activation);
});

bot.command('performance', async (ctx) => {
  await ctx.reply(responses.performance);
});

bot.command('delivery', async (ctx) => {
  await ctx.reply(responses.delivery);
});

bot.command('warranty', async (ctx) => {
  await ctx.reply(responses.warranty);
});

bot.command('contact', async (ctx) => {
  await ctx.reply('📞 Контакты DIVAO:\nТелефон: +79952205567\nГрафик: пн-пт 10:00-19:00\nEmail: support@divao.ru\nСайт: https://divao.ru');
});

// Auto-responses
bot.on('message_created', async (ctx) => {
  const text = ctx.message?.body?.text || '';
  if (!text || text.startsWith('/')) return;
  
  const lower = text.toLowerCase();
  
  if (lower.includes('отзыв') || lower.includes('мыш') || lower.includes('подарок')) {
    await ctx.reply(responses.feedback);
  } else if (lower.includes('активация') || lower.includes('windows') || lower.includes('win11')) {
    await ctx.reply(responses.activation);
  } else if (lower.includes('медленно') || lower.includes('тормозит') || lower.includes('греется') || 
             lower.includes('шум') || lower.includes('вентилятор') || lower.includes('батарея')) {
    await ctx.reply(responses.performance);
  } else if (lower.includes('доставк') || lower.includes('приедет') || lower.includes('трек')) {
    await ctx.reply(responses.delivery);
  } else if (lower.includes('гарантия') || lower.includes('ремонт') || lower.includes('брак')) {
    await ctx.reply(responses.warranty);
  } else {
    await ctx.reply(responses.greeting);
  }
});

// Start bot
bot.start().catch(() => {
  process.exit(1);
});
