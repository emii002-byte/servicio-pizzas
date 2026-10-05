const { ObjectId } = require('mongodb');
const { getCollection } = require('../config/db'); // Carga la conexión centralizada de la base de datos[cite: 7]

const COLECCION = 'clientes'; // Nombre de la colección en MongoDB

/**
 * Obtiene todos los clientes registrados en la base de datos.
 */
async function obtenerTodos() {
  const collection = getCollection(COLECCION);
  return await collection.find({}).toArray(); // Retorna un array con todos los clientes[cite: 4]
}

/**
 * Busca un cliente en específico por su ID de MongoDB.
 * @param {string} id - ID del cliente recibido por parámetro de ruta[cite: 4]
 */
async function obtenerPorId(id) {
  const collection = getCollection(COLECCION);
  return await collection.findOne({ _id: new ObjectId(id) });
}

/**
 * Agrega un cliente nuevo a la base de datos.
 * @param {Object} datosCliente - Información del cliente (nombre, teléfono, dirección, etc.)[cite: 4]
 */
async function crear(datosCliente) {
  const collection = getCollection(COLECCION);
  const resultado = await collection.insertOne(datosCliente);
  return { _id: resultado.insertedId, ...datosCliente }; // Retorna el nuevo cliente con su ID generado[cite: 4]
}

/**
 * Modifica la información guardada de un cliente.
 * @param {string} id - ID del cliente a editar[cite: 4]
 * @param {Object} nuevosDatos - Nuevos valores recibidos[cite: 4]
 */
async function actualizar(id, nuevosDatos) {
  const collection = getCollection(COLECCION);
  const resultado = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: nuevosDatos },
    { returnDocument: 'after' } // Retorna el documento actualizado[cite: 4]
  );
  return resultado.value || resultado;
}

/**
 * Borra a un cliente de la colección por su ID.
 * @param {string} id - ID a eliminar[cite: 4]
 */
async function eliminar(id) {
  const collection = getCollection(COLECCION);
  const resultado = await collection.deleteOne({ _id: new ObjectId(id) });
  return resultado.deletedCount > 0;
}

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};