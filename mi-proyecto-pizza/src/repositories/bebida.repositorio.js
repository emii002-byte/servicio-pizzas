const { ObjectId } = require('mongodb');
const { getCollection } = require('../config/db'); // Importa el acceso a la base de datos[cite: 7]

const COLECCION = 'bebidas'; // Nombre de la colección dentro de MongoDB

/**
 * Consulta y devuelve todos los registros de la colección 'bebidas'.
 */
async function obtenerTodas() {
  const collection = getCollection(COLECCION);
  // find({}) selecciona todos los documentos y .toArray() los convierte en un arreglo de objetos JSON[cite: 4]
  return await collection.find({}).toArray();
}

/**
 * Busca una bebida por su identificador único (_id).
 * @param {string} id - ID en formato texto recibido desde la URL[cite: 4]
 */
async function obtenerPorId(id) {
  const collection = getCollection(COLECCION);
  // new ObjectId(id) convierte el string en la estructura nativa de ID que maneja MongoDB[cite: 4]
  return await collection.findOne({ _id: new ObjectId(id) });
}

/**
 * Inserta un nuevo documento de bebida en la base de datos.
 * @param {Object} datosBebida - Datos recibidos del cliente (ej. nombre, marca, precio)[cite: 4]
 */
async function crear(datosBebida) {
  const collection = getCollection(COLECCION);
  const resultado = await collection.insertOne(datosBebida); // Inserta el objeto en la colección[cite: 4]
  // Retorna el objeto creado agregándole el _id asignado automáticamente por MongoDB[cite: 4]
  return { _id: resultado.insertedId, ...datosBebida };
}

/**
 * Actualiza los datos de una bebida existente.
 * @param {string} id - ID de la bebida a modificar[cite: 4]
 * @param {Object} nuevosDatos - Objeto con las propiedades a actualizar[cite: 4]
 */
async function actualizar(id, nuevosDatos) {
  const collection = getCollection(COLECCION);
  const resultado = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },    // Condición para encontrar el registro[cite: 4]
    { $set: nuevosDatos },        // $set reemplaza o agrega solo los campos indicados[cite: 4]
    { returnDocument: 'after' }   // Opción para que devuelva el objeto ya modificado[cite: 4]
  );
  return resultado.value || resultado;
}

/**
 * Elimina un registro de la colección por su ID.
 * @param {string} id - ID del documento a remover[cite: 4]
 */
async function eliminar(id) {
  const collection = getCollection(COLECCION);
  const resultado = await collection.deleteOne({ _id: new ObjectId(id) }); // Ejecuta la eliminación[cite: 4]
  return resultado.deletedCount > 0; // Retorna true si se borró algún elemento[cite: 4]
}

module.exports = {
  obtenerTodas,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};