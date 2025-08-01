import { DataTypes } from "sequelize";
import sequelize from "../../../config/database.js";

const EnderecoModel = sequelize.define(
  "Endereco",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "usuario",
        key: "id"
      }
    },
    rua: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: { msg: "O campo rua deve ser preenchido!" },
        len: {
          args: [1, 150],
          msg: "A rua deve ter no máximo 150 caracteres!"
        }
      }
    },
    numero: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notEmpty: { msg: "O campo número deve ser preenchido!" },
        len: {
          args: [1, 10],
          msg: "O número deve ter no máximo 10 caracteres!"
        }
      }
    },
    bairro: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "O campo bairro deve ser preenchido!" },
        len: {
          args: [1, 100],
          msg: "O bairro deve ter no máximo 100 caracteres!"
        }
      }
    },
    cidade: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "O campo cidade deve ser preenchido!" },
        len: {
          args: [1, 100],
          msg: "A cidade deve ter no máximo 100 caracteres!"
        }
      }
    },
    estado: {
      type: DataTypes.STRING(2),
      allowNull: false,
      validate: {
        notEmpty: { msg: "O campo estado deve ser preenchido!" },
        len: {
          args: [2, 2],
          msg: "O estado deve ter 2 caracteres!"
        }
      }
    },
    cep: {
      type: DataTypes.STRING(9),
      allowNull: false,
      validate: {
        notEmpty: { msg: "O campo CEP deve ser preenchido!" },
        len: {
          args: [8],
          msg: "O cep deve ter 8 caracteres, exemplo:12345678. Sem hifen!"
        }
      }
    }
  },
  {
    tableName: "endereco",
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
    deletedAt: "deletado_em"
  }
);

// Relacionamento 1:N (um usuário tem muitos endereços)
UsuarioModel.hasMany(EnderecoModel, { foreignKey: "user_id" });
EnderecoModel.belongsTo(UsuarioModel, { foreignKey: "user_id" });

export default EnderecoModel;