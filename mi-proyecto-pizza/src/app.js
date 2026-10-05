const express = require('express');
const { conectarDB } = require('./config/db'); // Carga la función para conectar a MongoDB[cite: 7]

// Carga de controladores
const pizzaControlador = require('./controllers/pizza.controlador');
const tamanioControlador = require('./controllers/tamanio.controlador');
const bebidaControlador = require('./controllers/bebida.controlador');
const clienteControlador = require('./controllers/cliente.controlador');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para transformar el cuerpo de las peticiones en JSON
app.use(express.json());

// Registro de las rutas base de la API[cite: 1]
app.use('/api/pizzas', pizzaControlador);     // Rutas para Pizzas[cite: 1]
app.use('/api/tamanios', tamanioControlador); // Rutas para Tamaños
app.use('/api/bebidas', bebidaControlador);   // Rutas para Bebidas
app.use('/api/clientes', clienteControlador); // Rutas para Clientes

// Inicialización de la base de datos y arranque del servidor HTTP[cite: 1]
conectarDB().then(() => {
  app.listen(PORT, () => {
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
  });
});