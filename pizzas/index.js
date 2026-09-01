const express = require("express");
const app = express();
const PORT = 3000;

// Ruta de saludo
app.get("/api/saludos", (req, res) => {
  const saludo = { mensaje: "Un gusto antenderle, que va llevar??" };
  return res.json(saludo);
});

// Ruta de pizzas
app.get("/api/v1/pizzas", (req, res) => {
  const pizzas = [
    { id: 1, nombre: "Margarita", ingredientes: ["queso", "jitomate", "albahaca"] },
    { id: 2, nombre: "Pepperoni", ingredientes: ["queso", "pepperoni"] },
    { id: 3, nombre: "Hawaiana", ingredientes: ["queso", "jamón", "piña"] }
  ];
  return res.json(pizzas);
});

// Ruta de tamaños
app.get("/api/v1/tamanios", (req, res) => {
  const tamanios = [
    { id: 1, nombre: "Chico" },
    { id: 2, nombre: "Mediano" },
    { id: 3, nombre: "Grande" }
  ];
  return res.json(tamanios);
});

// Ruta de bebidas
app.get("/api/v1/bebidas", (req, res) => {
  const bebidas = [
    { id: 1, nombre: "Refresco" },
    { id: 2, nombre: "Agua" },
    { id: 3, nombre: "Cerveza" }
  ];
  return res.json(bebidas);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
