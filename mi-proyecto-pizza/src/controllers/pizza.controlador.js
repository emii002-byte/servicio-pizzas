// src/pizza.controlador.js
const express = require('express');
const router = express.Router();
const pizzaRepositorio = require('../repositories/pizza.repositorio');

// GET /api/pizzas
router.get('/', async (req, res) => {
  try {
    const pizzas = await pizzaRepositorio.obtenerTodas();
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las pizzas", error: error.message });
  }
});

// GET /api/pizzas/:id
router.get('/:id', async (req, res) => {
  try {
    const pizza = await pizzaRepositorio.obtenerPorId(req.params.id);
    if (!pizza) return res.status(404).json({ mensaje: "Pizza no encontrada" });
    res.json(pizza);
  } catch (error) {
    res.status(400).json({ mensaje: "ID no válido", error: error.message });
  }
});

// POST /api/pizzas
router.post('/', async (req, res) => {
  try {
    const nuevaPizza = await pizzaRepositorio.crear(req.body);
    res.status(201).json(nuevaPizza);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear la pizza", error: error.message });
  }
});

// PUT /api/pizzas/:id
router.put('/:id', async (req, res) => {
  try {
    const pizzaActualizada = await pizzaRepositorio.actualizar(req.params.id, req.body);
    if (!pizzaActualizada) return res.status(404).json({ mensaje: "Pizza no encontrada" });
    res.json(pizzaActualizada);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar la pizza", error: error.message });
  }
});

// DELETE /api/pizzas/:id
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await pizzaRepositorio.eliminar(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "Pizza no encontrada" });
    res.json({ mensaje: "Pizza eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al eliminar la pizza", error: error.message });
  }
});

module.exports = router;