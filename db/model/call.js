const { DataTypes, INTEGER } = require('sequelize');

module.exports = sequelize => {
    sequelize.define('call', { 
        // Wallpaper
        name:{
            type: DataTypes.STRING
        },
        number: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        // Description
        state: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        // FROM
        from: {
            type: DataTypes.STRING
        }
    })
}   