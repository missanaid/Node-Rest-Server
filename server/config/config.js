// ===============================
// Puerto
// ===============================

process.env.PORT = process.env.PORT || 3000;

// ===============================
// Entorno
// ===============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===============================
// Vencimiento del Token
// ===============================
//30 dias
process.env.CADUCIDAD_TOKEN = 0 * 60 * 24 * 30;

// ===============================
// SEED de autenticación
// ===============================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


// ============================
//  Base De Datos
// ============================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = 'mongodb+srv://LadyAnaid:h6jFgUZk0UhfCTc8@cluster0-o3i67.mongodb.net/test?retryWrites=true&w=majority'
}

process.env.URLBD = urlDB;