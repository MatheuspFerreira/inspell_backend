const Sequelize = require('sequelize');

const sequelize = new Sequelize( {
    dialect: 'postgres',
    host: 'ec2-54-86-106-48.compute-1.amazonaws.com',
    port: 5432,
    database: 'df1sv2d8avpsqu',
    username: 'npuzopocngjzsq',
    password: 'cf82572f00c2d5e54b85385f3cf41a1f84f286df5bfd527fede81e71d920d7da',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});


module.exports = sequelize;