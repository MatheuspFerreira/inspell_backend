const Sequelize = require('sequelize')
const database = require("../config/dbConnect")

const Truck = database.define('trucks', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true

    },

    apelido: {
        type: Sequelize.STRING,
        allowNull:false
    },

    placa:{
        type: Sequelize.STRING,
        allowNull:false,
        unique: true

    },

    ano: {
        type: Sequelize.INTEGER,
        allowNull:false

    },

    cor: {
        type: Sequelize.STRING,
        allowNull:false

    },
    rendimento: {
        type: Sequelize.DECIMAL,
        allowNull:false
    }

    

});


module.exports = Truck;