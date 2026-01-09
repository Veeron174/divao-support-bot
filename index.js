import { Bot } from '@maxhub/max-bot-api';
import dotenv from 'dotenv';

// Загружаем переменные
dotenv.config();

// Токен должен быть в переменных окружения Bothost
const token = process.env.BOT_TOKEN;

if (!token) {
  // Никаких console.log - только exit
  process.exit(1);
}

const bot = new Bot(token);

// БАЗА ОТВЕТОВ DIVAO
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

📞 Дополнительная помощь: +79952205567`
};

// КОМАНДЫ
bot.command('start', async (ctx) => {
  await ctx.reply(responses.greeting);
});

bot.command('help', async (ctx) => {
  await ctx.reply(`Доступные команды:
/start - начать диалог
/activation - проблемы с активацией Windows
/performance - ноутбук тормозит/греется
/contact - контакты поддержки

📞 +79952205567 (пн-пт 10:00-19:00)`);
});

bot.command('activation', async (ctx) => {
  await ctx.reply(responses.activation);
});

bot.command('performance', async (ctx) => {
  await ctx.reply(responses.performance);
});

bot.command('contact', async (ctx) => {
  await ctx.reply('📞 Контакты DIVAO:\nТелефон: +79952205567\nГрафик: пн-пт 10:00-19:00\nEmail: support@divao.ru\nСайт: https://divao.ru');
});

// АВТООТВЕТЫ
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
  } else {
    await ctx.reply(responses.greeting);
  }
});

// ЗАПУСК БОТА
bot.start().catch(() => {
  // Без сообщений об ошибке
  process.exit(1);
});
