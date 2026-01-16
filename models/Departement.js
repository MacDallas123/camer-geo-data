const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Departement = sequelize.define("departement", {
    geom: {
        type: DataTypes.GEOMETRY('MULTIPOLYGON'),
        allowNull: true
    }
},
{
    timestamps: true
});

module.exports = Departement;