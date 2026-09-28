// src/app.js
const express = require('express');
const { conectarDB } = require('./db');
const pizzaControlador = require('./pizza.controlador');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Montar el controlador de pizzas en la ruta base /api/pizzas
app.use('/api/pizzas', pizzaControlador);

// Conectar a la BD antes de levantar el servidor
conectarDB().then(() => {
  app.listen(PORT, () => {
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
  });
});