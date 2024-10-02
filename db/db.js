const { Sequelize, Op} = require('sequelize');

const modelCall = require('./model/call'); // Modelo de llamadas
const modelQr = require('./model/qr');      // QR


const entorno = true;

const dburl = entorno ? 'postgresql://postgres:pjKSVrpxGnsewnqhnFUvGjStwBwyvUZu@postgres.railway.internal:5432/railway' : 'postgres:postgres:123@localhost:5432/costacall'

const sequelize = new Sequelize(dburl, {
    logging: false,
    native: false,
});

modelCall(sequelize);
modelQr(sequelize);

const { call, QR } = sequelize.models;


// Exportamos.

module.exports = { 
    ...sequelize.models,
    db: sequelize,
    Op
}