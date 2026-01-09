import { Bot } from '@maxhub/max-bot-api';
import dotenv from 'dotenv';

// Загружаем переменные из .env
dotenv.config();

// ДЕБАГ
console.log('=== DIVAO BOT ===');
console.log('BOT_TOKEN from env:', process.env.BOT_TOKEN ? 'YES' : 'NO');
console.log('MAX_BOT_TOKEN from env:', process.env.MAX_BOT_TOKEN ? 'YES' : 'NO');
console.log('All BOT/TOKEN vars:', Object.keys(process.env).filter(k => k.includes('BOT') || k.includes('TOKEN')).join(', '));

// Берем токен из переменных окружения (Bothost инжектит их)
const token = process.env.BOT_TOKEN || process.env.MAX_BOT_TOKEN || process.env.API_TOKEN || process.env.TOKEN;

if (!token) {
  console.error('❌ ERROR: No bot token found in environment variables');
  console.error('Add BOT_TOKEN in Bothost Environment Variables');
  process.exit(1);
}

console.log(`✅ Using token (length: ${token.length})`);

// СОЗДАЕМ БОТА
const bot = new Bot(token);

// БАЗА ОТВЕТОВ
const responses = {
  greeting: `Добрый день! Поддержка DIVAO. График: пн-пт 10:00-19:00`,
  feedback: `Спасибо за отзыв! Мышка - Яндекс доставкой.`,
  activation: `Активация Windows: https://divao.ru/activation-guide`,
  performance: `Ноутбук греется? Это нормально в первые дни.`
};

// КОМАНДЫ
bot.command('start', async (ctx) => {
  await ctx.reply(responses.greeting);
});

bot.command('help', async (ctx) => {
  await ctx.reply('/start /activation /performance /contact');
});

bot.on('message_created', async (ctx) => {
  const text = ctx.message?.body?.text || '';
  if (text.includes('отзыв')) await ctx.reply(responses.feedback);
  else if (text.includes('активация')) await ctx.reply(responses.activation);
  else if (text.includes('греется')) await ctx.reply(responses.performance);
  else if (text && !text.startsWith('/')) await ctx.reply(responses.greeting);
});

// ЗАПУСК
console.log('🚀 Starting bot...');
bot.start()
  .then(() => {
    console.log('✅ BOT STARTED SUCCESSFULLY!');
  })
  .catch(error => {
    console.error('❌ Bot start error:', error.message);
  });
