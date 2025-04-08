'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false, // Sequelize valida que no sea null
      unique: {
        args: true,
        msg: 'El correo electrónico ya está registrado'
      },     // Sequelize valida que sea único antes de guardar
      validate: {
        notEmpty: {args: true,
          msg: 'Por favor ingrese un correo electrónico'},       // No permitir strings vacíos
        isEmail: {args: true,
          msg: 'Por favor ingrese un correo electrónico válido'}         // Valida que sea un email válido
      }
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};