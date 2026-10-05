// src/config/db.js
const { MongoClient } = require('mongodb');

// URI adaptable para Docker o entorno local
const URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const DB_NAME = process.env.DB_NAME || "pizzeria_db";

let client;
let db;

/**
 * Establece la conexión con la base de datos MongoDB.
 * @returns {Promise<Object>} Instancia de la base de datos conectada.
 */
async function conectarDB() {
  if (db) return db;
  try {
    client = new MongoClient(URI);
    await client.connect();
    console.log(" Conectado exitosamente a MongoDB");
    db = client.db(DB_NAME);
    return db;
  } catch (error) {
    console.error(" Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
}

/**
 * Obtiene la colección solicitada de la base de datos.
 * @param {string} coleccionNombre - Nombre de la colección a consultar.
 * @returns {Collection} Instancia de la colección de MongoDB.
 */
function getCollection(coleccionNombre) {
  if (!db) {
    throw new Error("Debe llamar a conectarDB() antes de obtener una colección.");
  }
  return db.collection(coleccionNombre);
}

module.exports = { conectarDB, getCollection };