const { DataTypes, INTEGER } = require('sequelize');

module.exports = sequelize => {
    sequelize.define('qr', { 
        // Wallpaper
        name:{
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        // Description
        empresa: {
            type: DataTypes.STRING
        },
        // Phone
        phone: {
            type: DataTypes.STRING
        },
    })
}   