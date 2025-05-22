const express = require('express');
const fs = require('fs');
const path = require('path');

// Inicia el bot al arrancar el servidor
require('./bot.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware para CORS si necesitas acceder desde el frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/pensamientos', (req, res) => {
  try {
    const mensajesPath = path.join(__dirname, 'mensajes.json');
    let mensajes = [];
    
    if (fs.existsSync(mensajesPath)) {
      const data = fs.readFileSync(mensajesPath, 'utf8');
      mensajes = JSON.parse(data);
    }
    
    res.json(mensajes);
  } catch (error) {
    console.error('Error leyendo mensajes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.json({ message: 'Servidor funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
