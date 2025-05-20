import express from 'express';
import fs from 'fs';
import './bot.js'; // Inicia el bot al arrancar el server

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/pensamientos', (req, res) => {
  const mensajes = fs.existsSync('mensajes.json')
    ? JSON.parse(fs.readFileSync('mensajes.json'))
    : [];
  res.json(mensajes);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
