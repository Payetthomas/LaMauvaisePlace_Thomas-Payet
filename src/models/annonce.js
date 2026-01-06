const {Model, DataTypes} = require('sequelize');
const { sequelize } = require('.');

const Annonce = (sequelize, DataTypes) => {
    class Annonce extends Model {}

    Annonce.init(
        {
            title: DataTypes.STRING,
            description: DataTypes.TEXT,
            price: DataTypes.FLOAT,
            filepath: DataTypes.TEXT,
        }, 
        {
            sequelize,
            modelName: "Annonce"
        }
    );
}; 

module.exports = Annonce;