const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Arrondissement = sequelize.define("arrondissement", {
    geom: {
        type: DataTypes.GEOMETRY('MULTIPOLYGON'),
        allowNull: true
    }
},
{
    timestamps: true
});

module.exports = Arrondissement;