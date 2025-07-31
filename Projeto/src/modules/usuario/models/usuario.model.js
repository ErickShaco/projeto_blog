import { DataTypes } from "sequelize";
import sequelize from "../../../config/database.js";

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 100],
          msg: "O nome deve ter no minimo de 2 caracteres e de no maximo 100!!",
        },
        notEmpty: {
          msg: "O campo deve ser preenchido!!",
        },
        is: {
          args: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+$/,
          msg: "O nome não deve conter caracteres especiais!!",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: {
          msg: "O email deve ser válido!",
        },
      },
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "O campo deve ser preenchido!!",
        },
        len: {
          args: [8],
          msg: "O campo deve ter no minimo 8 caracteres!",
        },
      },
    },
    foto_perfil: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: "O Url deve ser válido!",
        },
      },
    },
  },
  {
    tableName: "usuario",
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  }
);

export default Usuario;
