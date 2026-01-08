import { Bot } from '@maxhub/max-bot-api';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.BOT_TOKEN) {
  console.error('❌ ОШИБКА: Токен бота не найден в .env файле');
  process.exit(1);
}

const bot = new Bot(process.env.BOT_TOKEN);

const responses = {
  greeting: `Добрый день! Спасибо за обращение в службу поддержки DIVAO.

Пожалуйста, пришлите скрин заказа и подробно (а лучше с видео или фото) напишите о цели обращения.
- мы поможем Вам настроить ноутбук
- установим дополнительные программы
- оперативно решим все вопросы

⏰ График работы: пн-пт 10:00 до 19:00`,

  feedback: `Здравствуйте! Большое спасибо за отзыв.

Мышку отправляем яндекс доставкой.
Для оформления доставки напишите адрес и телефон получателя.`,

  activation: `К сожалению, сейчас происходят сбои с активацией Windows.

Подготовили файл для активации и инструкцию:
https://divao.ru/activation-guide

📞 Если не работает: +79952205567`,

  performance: `В первые дни возможны:
• Нагрев
• Шум вентилятора
• Быстрая разрядка

Это нормально - идут обновления.

✅ Рекомендации:
1. Подключите к сети на 4-6 часов
2. Не прерывайте обновления
3. Проверьте через 2-3 дня`
};

bot.command('start', async (ctx) => {
  await ctx.reply(responses.greeting);
});

bot.command('help', async (ctx) => {
  await ctx.reply(`Доступные команды:
/start - начать
/activation - активация Windows
/performance - проблемы с ноутбуком
/contact - контакты`);
});

bot.command('activation', async (ctx) => {
  await ctx.reply(responses.activation);
});

bot.command('performance', async (ctx) => {
  await ctx.reply(responses.performance);
});

bot.command('contact', async (ctx) => {
  await ctx.reply('📞 +79952205567 (пн-пт 10:00-19:00)');
});

bot.on('message_created', async (ctx) => {
  const text = ctx.message?.body?.text || '';
  
  if (text.includes('отзыв') || text.includes('мыш')) {
    await ctx.reply(responses.feedback);
  } else if (text.includes('активация') || text.includes('windows')) {
    await ctx.reply(responses.activation);
  } else if (text.includes('греется') || text.includes('тормозит') || text.includes('шум')) {
    await ctx.reply(responses.performance);
  } else if (text && !text.startsWith('/')) {
    await ctx.reply(responses.greeting);
  }
});

bot.start().then(() => {
  console.log('✅ Бот запущен');
}).catch(error => {
  console.error('❌ Ошибка:', error.message);
});