const Sequelize = require("sequelize")
const db = {}
const sequelize = new Sequelize("mb","admin","password", {
    host: 'mb.cfj64mlbq1sg.us-east-2.rds.amazonaws.com',
    dialect: 'mysql',
    operatorsAliases: false,
    port:'3306',
    pool: {
        max: 200,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
    
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db 
