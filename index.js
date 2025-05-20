const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();
const port = process.env.PORT || 3000;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.login(process.env.DISCORD_BOT_TOKEN);

let latestMessage = "Aquí aparecerán tus mensajes de Discord";

client.on('messageCreate', message => {
  if (!message.author.bot) {
    latestMessage = `**${message.author.username}** dijo: ${message.content}`;
    console.log(latestMessage);
  }
});

app.get('/latest', (req, res) => {
  res.send(latestMessage);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});