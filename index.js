import { Bot } from '@maxhub/max-bot-api';
import dotenv from 'dotenv';

// Включаем тихий режим dotenv чтобы убрать его сообщения
dotenv.config({ quiet: true });

// Проверяем переменные
const token = process.env.BOT_TOKEN;

if (!token || token === '${BOT_TOKEN_FROM_BOTHOST}') {
  console.error('ERROR: BOT_TOKEN not set in Bothost Environment Variables');
  console.error('Go to Bothost → Environment Variables → Add BOT_TOKEN=your_max_token');
  process.exit(1);
}

console.log('Starting DIVAO bot with token length:', token.length);

const bot = new Bot(token);

// Простейшие команды
bot.command('start', async (ctx) => {
  await ctx.reply('Добрый день! Поддержка DIVAO. Чем могу помочь?');
});

bot.command('help', async (ctx) => {
  await ctx.reply('Доступные команды: /start, /contact');
});

bot.command('contact', async (ctx) => {
  await ctx.reply('📞 +79952205567 (пн-пт 10:00-19:00)');
});

// Запуск
bot.start()
  .then(() => {
    console.log('✅ DIVAO bot started successfully');
  })
  .catch(error => {
    console.error('❌ Bot error:', error.message);
  });
