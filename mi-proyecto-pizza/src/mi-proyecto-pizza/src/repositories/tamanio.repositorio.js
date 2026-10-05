// src/repositories/tamanio.repositorio.js
const { ObjectId } = require('mongodb');
const { getCollection } = require('../config/db'); // Importa la función para acceder a la colección en la BD

const COLECCION = 'tamanios'; // Nombre de la colección en MongoDB

/**
 * Obtiene todos los tamaños registrados en la base de datos.
 * @returns {Promise<Array>} Promesa que resuelve con la lista completa de tamaños.
 */
async function obtenerTodos() {
  const collection = getCollection(COLECCION);
  // find({}) busca todos los documentos y toArray() los convierte a un arreglo de JS
  return await collection.find({}).toArray();
}

/**
 * Busca un tamaño específico por su ID de MongoDB.
 * @param {string} id - ID del tamaño en formato texto/hexadecimal.
 * @returns {Promise<Object|null>} Devuelve el documento encontrado o null si no existe.
 */
async function obtenerPorId(id) {
  const collection = getCollection(COLECCION);
  // Convierte el string id a un tipo ObjectId de MongoDB para poder buscarlo
  return await collection.findOne({ _id: new ObjectId(id) });
}

/**
 * Inserta un nuevo tamaño en la colección.
 * @param {Object} datosTamanio - Datos del tamaño (ej. { nombre: 'Grande', porciones: 8 }).
 * @returns {Promise<Object>} Devuelve el objeto del nuevo tamaño junto con su _id generado.
 */
async function crear(datosTamanio) {
  const collection = getCollection(COLECCION);
  const resultado = await collection.insertOne(datosTamanio);
  // Retorna el ID asignado por MongoDB junto con los datos guardados
  return { _id: resultado.insertedId, ...datosTamanio };
}

/**
 * Actualiza la información de un tamaño existente por su ID.
 * @param {string} id - ID del tamaño a actualizar.
 * @param {Object} nuevosDatos - Campos que se actualizarán.
 * @returns {Promise<Object|null>} Devuelve el documento actualizado.
 */
async function actualizar(id, nuevosDatos) {
  const collection = getCollection(COLECCION);
  // findOneAndUpdate busca por _id y aplica $set con los nuevos campos
  // returnDocument: 'after' asegura que devuelva el objeto ya modificado
  const resultado = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: nuevosDatos },
    { returnDocument: 'after' }
  );
  return resultado.value || resultado;
}

/**
 * Elimina un tamaño de la base de datos por su ID.
 * @param {string} id - ID del tamaño a eliminar.
 * @returns {Promise<boolean>} Devuelve true si se eliminó correctamente, false si no.
 */
async function eliminar(id) {
  const collection = getCollection(COLECCION);
  const resultado = await collection.deleteOne({ _id: new ObjectId(id) });
  // deletedCount indica cuántos documentos se borraron (debe ser 1 si tuvo éxito)
  return resultado.deletedCount > 0;
}

// Exporta las funciones para ser utilizadas por los controladores
module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};