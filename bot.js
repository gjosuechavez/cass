const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent
  ] 
});

client.on('ready', () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.channelId === CHANNEL_ID && !message.author.bot) {
    const newMessage = {
      content: message.content,
      date: new Date().toLocaleDateString('es-MX', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
      })
    };

    let mensajes = [];
    if (fs.existsSync('mensajes.json')) {
      try {
        mensajes = JSON.parse(fs.readFileSync('mensajes.json', 'utf8'));
      } catch (error) {
        console.error('Error leyendo mensajes.json:', error);
        mensajes = [];
      }
    }

    mensajes.unshift(newMessage);
    mensajes = mensajes.slice(0, 20); // guarda solo los últimos 20

    try {
      fs.writeFileSync('mensajes.json', JSON.stringify(mensajes, null, 2));
      console.log('Mensaje guardado:', newMessage.content);
    } catch (error) {
      console.error('Error guardando mensaje:', error);
    }
  }
});

client.on('error', (error) => {
  console.error('Error del cliente Discord:', error);
});

if (!TOKEN) {
  console.error('ERROR: BOT_TOKEN no está definido en las variables de entorno');
  process.exit(1);
}

if (!CHANNEL_ID) {
  console.error('ERROR: CHANNEL_ID no está definido en las variables de entorno');
  process.exit(1);
}

client.login(TOKEN).catch(error => {
  console.error('Error al hacer login:', error);
});
