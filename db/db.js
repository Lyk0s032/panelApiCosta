const { Sequelize, Op} = require('sequelize');

const modelCall = require('./model/call'); // Modelo de Screenshots


const entorno = false;

const dburl = entorno ? 'postgresql://postgres:nGMSzKGuSRUaMbRduDlCRbLFQsUwKTdY@viaduct.proxy.rlwy.net:35801/railway' : 'postgres:postgres:123@localhost:5432/costacall'

const sequelize = new Sequelize(dburl, {
    logging: false,
    native: false,
});

modelCall(sequelize);

const { call } = sequelize.models;


// Exportamos.

module.exports = {
    ...sequelize.models,
    db: sequelize,
    Op
}