const { Model, DataTypes } = require('sequelize');

const User = (sequelize, DataTypes) => {

    class User extends Model {
        static associate(models) {
            this.hasMany(models.Annonce, {
                foreignKey: 'user_id',
                as: 'Annonces'
            })
        }
    }

    User.init(
        {
            firstname: DataTypes.STRING,
            lastname: DataTypes.STRING,
            profil_picture: DataTypes.STRING,
            phone_number: DataTypes.STRING, 
            address: DataTypes.STRING,
            zip_code: DataTypes.STRING, 
            city: DataTypes.STRING, 
            token: DataTypes.TEXT,
            role: {
                type: DataTypes.ENUM,
                values: ['admin', 'seller'],
                defaultValue: 'seller'
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            password: DataTypes.STRING
        },
        {
            sequelize,
            modelName: "User"
        }
    )

    return User; 
}; 

module.exports = User;