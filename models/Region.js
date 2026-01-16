const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Region = sequelize.define("region", {
    geom: {
        type: DataTypes.GEOMETRY('MULTIPOLYGON'),
        allowNull: true
    }
},
{
    timestamps: true
});

module.exports = Region;