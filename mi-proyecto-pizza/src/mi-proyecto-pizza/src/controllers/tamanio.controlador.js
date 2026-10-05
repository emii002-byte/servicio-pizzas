const express = require('express');
const router = express.Router();
const tamanioRepositorio = require('../repositories/tamanio.repositorio');

// GET /api/tamanios
router.get('/', async (req, res) => {
  try {
    const tamanios = await tamanioRepositorio.obtenerTodos();
    res.json(tamanios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los tamaños", error: error.message });
  }
});

// GET /api/tamanios/:id
router.get('/:id', async (req, res) => {
  try {
    const tamanio = await tamanioRepositorio.obtenerPorId(req.params.id);
    if (!tamanio) return res.status(404).json({ mensaje: "Tamaño no encontrado" });
    res.json(tamanio);
  } catch (error) {
    res.status(400).json({ mensaje: "ID no válido", error: error.message });
  }
});

// POST /api/tamanios
router.post('/', async (req, res) => {
  try {
    const nuevoTamanio = await tamanioRepositorio.crear(req.body);
    res.status(201).json(nuevoTamanio);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear el tamaño", error: error.message });
  }
});

// PUT /api/tamanios/:id
router.put('/:id', async (req, res) => {
  try {
    const tamanioActualizado = await tamanioRepositorio.actualizar(req.params.id, req.body);
    if (!tamanioActualizado) return res.status(404).json({ mensaje: "Tamaño no encontrado" });
    res.json(tamanioActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar el tamaño", error: error.message });
  }
});

// DELETE /api/tamanios/:id
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await tamanioRepositorio.eliminar(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "Tamaño no encontrado" });
    res.json({ mensaje: "Tamaño eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al eliminar el tamaño", error: error.message });
  }
});

module.exports = router;