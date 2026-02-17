const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Departement = sequelize.define("departement", {
    geom: {
        type: DataTypes.GEOMETRY('MULTIPOLYGON'),
        allowNull: true
    },
    adm0_fr: { // Country name in French
        type: DataTypes.STRING,
        allowNull: true
    },
    adm1_fr: { // Region name in French
        type: DataTypes.STRING,
        allowNull: true
    },
    adm2_fr: { // Departement name in French
        type: DataTypes.STRING,
        allowNull: true
    },
},
{
    timestamps: true
});

module.exports = Departement;