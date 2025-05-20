import { Client, GatewayIntentBits } from 'discord.js';
import fs from 'fs';

const TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('messageCreate', (message) => {
  if (message.channelId === CHANNEL_ID && !message.author.bot) {
    const newMessage = {
      content: message.content,
      date: new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })
    };

    let mensajes = [];
    if (fs.existsSync('mensajes.json')) {
      mensajes = JSON.parse(fs.readFileSync('mensajes.json'));
    }

    mensajes.unshift(newMessage);
    mensajes = mensajes.slice(0, 20); // guarda solo los últimos 20

    fs.writeFileSync('mensajes.json', JSON.stringify(mensajes));
  }
});

client.login(TOKEN);
