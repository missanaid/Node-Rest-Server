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
process.env.CADUCIDAD_TOKEN = '72h';

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
    urlDB = process.env.MONGO_URI;
}

process.env.URLBD = urlDB;

// ============================
//  Google Cliente Id
// ============================

process.env.CLIENT_ID = process.env.CLIENT_ID || '389297459348-44f3sfpugirg5nn2v075pmlqh27gh90c.apps.googleusercontent.com';