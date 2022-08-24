const Sequelize = require('sequelize')
const database = require("../config/dbConnect")

const Localidade = database.define('localidades', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true

    },

    nome: {
        type: Sequelize.STRING,
        allowNull:false
        
    },

    distancia:{
        type: Sequelize.DECIMAL,
        allowNull:false

    }

    
});


module.exports = Localidade;