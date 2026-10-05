import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { check } from 'k6';
import http from 'k6/http';

// 1. esta URL es la dirección local del API de Pizzas
const baseUrl = 'http://localhost:3000/api/pizzas'; // Ejemplo: cambia el puerto/ruta según tu proyecto

export default function () {
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // --- ENDPOINT 1: GET (Obtener todas las pizzas) ---
    const resGetTodos = http.get(baseUrl);
    check(resGetTodos, {
        'GET Todos status 200': (r) => r.status === 200,
    });

    // --- ENDPOINT 2: GET Por ID (Obtener una pizza específica) ---
    const resGetPorId = http.get(`${baseUrl}/1`); // Cambia '1' por un ID válido
    check(resGetPorId, {
        'GET Por ID status 200': (r) => r.status === 200,
    });

    // --- ENDPOINT 3: POST (Agregar una nueva pizza) ---
    const nuevaPizza = JSON.stringify({
        nombre: 'Pizza Pepperoni K6',
        precio: 150,
        ingredientes: ['Queso', 'Pepperoni']
    });

    const resPost = http.post(baseUrl, nuevaPizza, params);
    check(resPost, {
        'POST Agregar status 200 o 201': (r) => r.status === 200 || r.status === 201,
    });

    // --- ENDPOINT 4: PUT o DELETE (Actualizar o eliminar) ---
    // Opción A: PUT (Actualizar pizza)
    const pizzaActualizada = JSON.stringify({
        nombre: 'Pizza Pepperoni Especial',
        precio: 175
    });
    const resPut = http.put(`${baseUrl}/1`, pizzaActualizada, params);
    check(resPut, {
        'PUT Actualizar status 200': (r) => r.status === 200,
    });


}

// Generación del reporte HTML automático
export function handleSummary(data) {
    return {
        "index.html": htmlReport(data)
    };
}