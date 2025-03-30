const TelegramBot = require('node-telegram-bot-api');

const token = '7890895297:AAGkUWuQVKUXvfzjQIJs4ACAx5CIw5IRvsM';
const bot = new TelegramBot(token, { polling: true });

const groupChatId = '-4777083824';

bot.onText(/\/reclamar_insignia/, (msg) => {
  const userName = msg.from.first_name;
  const badge = 'Insignia Ganada 🏅'; 

  bot.sendMessage(groupChatId, `${userName} ha reclamado la ${badge}! 🎉`);
});
