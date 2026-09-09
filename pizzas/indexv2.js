const express = require("express");
const app = express();
const PORT = 3000;

// Ruta de saludo
app.get("/api/saludos", (req, res) => {
  const saludo = { mensaje: "Bienvenido, que va ordenar??" };
  return res.json(saludo);
});

// Ruta de pizza
app.get("/api/v1/pizzas", (req, res) => {
  const pizzas = [
    { id: 1, nombre: "Margarita", ingredientes: ["queso", "jitomate", "albahaca"] },
    { id: 2, nombre: "Pepperoni", ingredientes: ["queso", "pepperoni"] },
    { id: 3, nombre: "Hawaiana", ingredientes: ["queso", "jamón", "piña"] }
  ];
  return res.json(pizzas);
});
const express = require("express");
const app = express();
const PORT = 3000;


app.use(express.json());


let pizzas = [
  { id: 1, nombre: "Margarita", ingredientes: ["queso", "jitomate", "albahaca"] },
  { id: 2, nombre: "Pepperoni", ingredientes: ["queso", "pepperoni"] },
  { id: 3, nombre: "Hawaiana", ingredientes: ["queso", "jamón", "piña"] }
];


app.get("/api/v1/pizzas", (req, res) => {
  res.json(pizzas);
});


app.get("/api/v1/pizzas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pizza = pizzas.find(p => p.id === id);
  if (!pizza) return res.status(404).json({ mensaje: "Pizza no encontrada" });
  res.json(pizza);
});

// AGREGAR nueva pizza
app.post("/api/v1/pizzas", (req, res) => {
  const nuevaPizza = {
    id: pizzas.length + 1,
    nombre: req.body.nombre,
    ingredientes: req.body.ingredientes
  };
  pizzas.push(nuevaPizza);
  res.status(201).json(nuevaPizza);
});

// ACTUALIZAR pizza existente
app.put("/api/v1/pizzas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pizza = pizzas.find(p => p.id === id);
  if (!pizza) return res.status(404).json({ mensaje: "Pizza no encontrada" });

  pizza.nombre = req.body.nombre || pizza.nombre;
  pizza.ingredientes = req.body.ingredientes || pizza.ingredientes;

  res.json(pizza);
});

// BORAR pizza
app.delete("/api/v1/pizzas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = pizzas.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ mensaje: "Pizza no encontrada" });

  const borrada = pizzas.splice(index, 1);
  res.json({ mensaje: "Pizza eliminada", pizza: borrada });
});

// Iniciar servidoir
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
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
