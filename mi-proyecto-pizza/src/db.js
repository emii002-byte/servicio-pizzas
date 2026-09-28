// src/db.js
const { MongoClient } = require('mongodb');

// Cadena de conexión copiada de MongoDB Compass
const URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const DB_NAME = "pizzeria_db";

let client;
let db;

async function conectarDB() {
  if (db) return db;
  try {
    client = new MongoClient(URI);
    await client.connect();
    console.log(" Connectado exitosamente a MongoDB");
    db = client.db(DB_NAME);
    return db;
  } catch (error) {
    console.error(" Error al conectar a MongoDB:", error);
    process.exit(1);
  }
}

function getCollection(coleccionNombre) {
  if (!db) {
    throw new Error("Debe llamar a conectarDB() antes de obtener una colección.");
  }
  return db.collection(coleccionNombre);
}

module.exports = { conectarDB, getCollection };