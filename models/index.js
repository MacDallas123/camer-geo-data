

const sequelize = require("../sequelize");
const Region = require("./Region");
const Departement = require("./Departement");
const Arrondissement = require("./Arrondissement");


module.exports = {
    Region,
    Departement,
    Arrondissement,
    sequelize
};