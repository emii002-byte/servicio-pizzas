// src/repositories/pizza.repositorio.js
const { ObjectId } = require('mongodb');
const { getCollection } = require('../config/db');

const COLECCION = 'pizzas';

/**
 * Obtiene todas las pizzas almacenadas en la base de datos Mongo.
 * @returns {Promise<Array>} Devuelve una promesa que resuelve con la lista completa de objetos pizza.
 */
async function obtenerTodas() {
  const collection = getCollection(COLECCION);
  return await collection.find({}).toArray();
}

/**
 * Busca una pizza por su ID único de MongoDB.
 * @param {string} id - El ID de la pizza a buscar (ObjectId de MongoDB).
 * @returns {Promise<Object|null>} Devuelve la pizza encontrada o null si no existe.
 */
async function obtenerPorId(id) {
  const collection = getCollection(COLECCION);
  return await collection.findOne({ _id: new ObjectId(id) });
}

/**
 * Crea e inserta una nueva pizza en la colección.
 * @param {Object} datosPizza - Objeto con los datos de la pizza (ej. { nombre, precio, ingredientes }).
 * @returns {Promise<Object>} Devuelve la pizza creada incluyendo su nuevo _id generado por MongoDB.
 */
async function crear(datosPizza) {
  const collection = getCollection(COLECCION);
  const resultado = await collection.insertOne(datosPizza);
  return { _id: resultado.insertedId, ...datosPizza };
}

/**
 * Actualiza los datos de una pizza existente por su ID.
 * @param {string} id - El ID de la pizza a actualizar.
 * @param {Object} nuevosDatos - Objeto con los campos a actualizar.
 * @returns {Promise<Object|null>} Devuelve el objeto actualizado o null si no se encontró.
 */
async function actualizar(id, nuevosDatos) {
  const collection = getCollection(COLECCION);
  const resultado = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: nuevosDatos },
    { returnDocument: 'after' }
  );
  return resultado.value || resultado;
}

/**
 * Elimina una pizza de la base de datos por su ID.
 * @param {string} id - El ID de la pizza a eliminar.
 * @returns {Promise<boolean>} Devuelve true si fue eliminada con éxito, false si no se encontró.
 */
async function eliminar(id) {
  const collection = getCollection(COLECCION);
  const resultado = await collection.deleteOne({ _id: new ObjectId(id) });
  return resultado.deletedCount > 0;
}

module.exports = {
  obtenerTodas,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};