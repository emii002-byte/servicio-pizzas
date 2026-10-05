const express = require('express');
const router = express.Router();
const bebidaRepositorio = require('../repositories/bebida.repositorio');

// GET /api/bebidas -> Obtener la lista completa de bebidas[cite: 3]
router.get('/', async (req, res) => {
  try {
    const bebidas = await bebidaRepositorio.obtenerTodas();
    res.json(bebidas); // Responde con estado 200 y el listado en JSON[cite: 3]
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las bebidas", error: error.message });
  }
});

// GET /api/bebidas/:id -> Consultar una bebida por su ID[cite: 3]
router.get('/:id', async (req, res) => {
  try {
    const bebida = await bebidaRepositorio.obtenerPorId(req.params.id);
    if (!bebida) return res.status(404).json({ mensaje: "Bebida no encontrada" }); // Si no existe, devuelve 404[cite: 3]
    res.json(bebida);
  } catch (error) {
    res.status(400).json({ mensaje: "ID no válido", error: error.message });
  }
});

// POST /api/bebidas -> Crear una nueva bebida[cite: 3]
router.post('/', async (req, res) => {
  try {
    // req.body contiene el objeto enviado en el JSON de Postman[cite: 3]
    const nuevaBebida = await bebidaRepositorio.crear(req.body);
    res.status(201).json(nuevaBebida); // Devuelve estado 201 (Created)[cite: 3]
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear la bebida", error: error.message });
  }
});

// PUT /api/bebidas/:id -> Modificar una bebida existente[cite: 3]
router.put('/:id', async (req, res) => {
  try {
    const bebidaActualizada = await bebidaRepositorio.actualizar(req.params.id, req.body);
    if (!bebidaActualizada) return res.status(404).json({ mensaje: "Bebida no encontrada" });
    res.json(bebidaActualizada);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar la bebida", error: error.message });
  }
});

// DELETE /api/bebidas/:id -> Eliminar una bebida por su ID[cite: 3]
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await bebidaRepositorio.eliminar(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "Bebida no encontrada" });
    res.json({ mensaje: "Bebida eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al eliminar la bebida", error: error.message });
  }
});

module.exports = router;