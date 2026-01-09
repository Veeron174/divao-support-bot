import { Bot } from '@maxhub/max-bot-api';
import dotenv from 'dotenv';

dotenv.config();

console.log('=== ДЕБАГ ИНФО ===');
console.log('BOT_TOKEN длина:', process.env.BOT_TOKEN?.length);
console.log('MAX_BOT_TOKEN длина:', process.env.MAX_BOT_TOKEN?.length);
console.log('Токен:', process.env.BOT_TOKEN?.substring(0, 10) + '...');

if (!process.env.BOT_TOKEN) {
  console.error('вќЊ РћРЁРР‘РљРђ: РўРѕРєРµРЅ Р±РѕС‚Р° РЅРµ РЅР°Р№РґРµРЅ РІ .env С„Р°Р№Р»Рµ');
  process.exit(1);
}

const bot = new Bot(process.env.MAX_BOT_TOKEN || process.env.BOT_TOKEN);

const responses = {
  greeting: `Р”РѕР±СЂС‹Р№ РґРµРЅСЊ! РЎРїР°СЃРёР±Рѕ Р·Р° РѕР±СЂР°С‰РµРЅРёРµ РІ СЃР»СѓР¶Р±Сѓ РїРѕРґРґРµСЂР¶РєРё DIVAO.

РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РїСЂРёС€Р»РёС‚Рµ СЃРєСЂРёРЅ Р·Р°РєР°Р·Р° Рё РїРѕРґСЂРѕР±РЅРѕ (Р° Р»СѓС‡С€Рµ СЃ РІРёРґРµРѕ РёР»Рё С„РѕС‚Рѕ) РЅР°РїРёС€РёС‚Рµ Рѕ С†РµР»Рё РѕР±СЂР°С‰РµРЅРёСЏ.
- РјС‹ РїРѕРјРѕР¶РµРј Р’Р°Рј РЅР°СЃС‚СЂРѕРёС‚СЊ РЅРѕСѓС‚Р±СѓРє
- СѓСЃС‚Р°РЅРѕРІРёРј РґРѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Рµ РїСЂРѕРіСЂР°РјРјС‹
- РѕРїРµСЂР°С‚РёРІРЅРѕ СЂРµС€РёРј РІСЃРµ РІРѕРїСЂРѕСЃС‹

вЏ° Р“СЂР°С„РёРє СЂР°Р±РѕС‚С‹: РїРЅ-РїС‚ 10:00 РґРѕ 19:00`,

  feedback: `Р—РґСЂР°РІСЃС‚РІСѓР№С‚Рµ! Р‘РѕР»СЊС€РѕРµ СЃРїР°СЃРёР±Рѕ Р·Р° РѕС‚Р·С‹РІ.

РњС‹С€РєСѓ РѕС‚РїСЂР°РІР»СЏРµРј СЏРЅРґРµРєСЃ РґРѕСЃС‚Р°РІРєРѕР№.
Р”Р»СЏ РѕС„РѕСЂРјР»РµРЅРёСЏ РґРѕСЃС‚Р°РІРєРё РЅР°РїРёС€РёС‚Рµ Р°РґСЂРµСЃ Рё С‚РµР»РµС„РѕРЅ РїРѕР»СѓС‡Р°С‚РµР»СЏ.`,

  activation: `Рљ СЃРѕР¶Р°Р»РµРЅРёСЋ, СЃРµР№С‡Р°СЃ РїСЂРѕРёСЃС…РѕРґСЏС‚ СЃР±РѕРё СЃ Р°РєС‚РёРІР°С†РёРµР№ Windows.

РџРѕРґРіРѕС‚РѕРІРёР»Рё С„Р°Р№Р» РґР»СЏ Р°РєС‚РёРІР°С†РёРё Рё РёРЅСЃС‚СЂСѓРєС†РёСЋ:
https://divao.ru/activation-guide

рџ“ћ Р•СЃР»Рё РЅРµ СЂР°Р±РѕС‚Р°РµС‚: +79952205567`,

  performance: `Р’ РїРµСЂРІС‹Рµ РґРЅРё РІРѕР·РјРѕР¶РЅС‹:
вЂў РќР°РіСЂРµРІ
вЂў РЁСѓРј РІРµРЅС‚РёР»СЏС‚РѕСЂР°
вЂў Р‘С‹СЃС‚СЂР°СЏ СЂР°Р·СЂСЏРґРєР°

Р­С‚Рѕ РЅРѕСЂРјР°Р»СЊРЅРѕ - РёРґСѓС‚ РѕР±РЅРѕРІР»РµРЅРёСЏ.

вњ… Р РµРєРѕРјРµРЅРґР°С†РёРё:
1. РџРѕРґРєР»СЋС‡РёС‚Рµ Рє СЃРµС‚Рё РЅР° 4-6 С‡Р°СЃРѕРІ
2. РќРµ РїСЂРµСЂС‹РІР°Р№С‚Рµ РѕР±РЅРѕРІР»РµРЅРёСЏ
3. РџСЂРѕРІРµСЂСЊС‚Рµ С‡РµСЂРµР· 2-3 РґРЅСЏ`
};

bot.command('start', async (ctx) => {
  await ctx.reply(responses.greeting);
});

bot.command('help', async (ctx) => {
  await ctx.reply(`Р”РѕСЃС‚СѓРїРЅС‹Рµ РєРѕРјР°РЅРґС‹:
/start - РЅР°С‡Р°С‚СЊ
/activation - Р°РєС‚РёРІР°С†РёСЏ Windows
/performance - РїСЂРѕР±Р»РµРјС‹ СЃ РЅРѕСѓС‚Р±СѓРєРѕРј
/contact - РєРѕРЅС‚Р°РєС‚С‹`);
});

bot.command('activation', async (ctx) => {
  await ctx.reply(responses.activation);
});

bot.command('performance', async (ctx) => {
  await ctx.reply(responses.performance);
});

bot.command('contact', async (ctx) => {
  await ctx.reply('рџ“ћ +79952205567 (РїРЅ-РїС‚ 10:00-19:00)');
});

bot.on('message_created', async (ctx) => {
  const text = ctx.message?.body?.text || '';
  
  if (text.includes('РѕС‚Р·С‹РІ') || text.includes('РјС‹С€')) {
    await ctx.reply(responses.feedback);
  } else if (text.includes('Р°РєС‚РёРІР°С†РёСЏ') || text.includes('windows')) {
    await ctx.reply(responses.activation);
  } else if (text.includes('РіСЂРµРµС‚СЃСЏ') || text.includes('С‚РѕСЂРјРѕР·РёС‚') || text.includes('С€СѓРј')) {
    await ctx.reply(responses.performance);
  } else if (text && !text.startsWith('/')) {
    await ctx.reply(responses.greeting);
  }
});

bot.start().then(() => {
  console.log('вњ… Р‘РѕС‚ Р·Р°РїСѓС‰РµРЅ');
}).catch(error => {
  console.error('вќЊ РћС€РёР±РєР°:', error.message);
});
