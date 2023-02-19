import { CreationOptional, DataTypes, Model } from "sequelize";
import sequelize from "../lib/db";

class Card extends Model {
  declare id: CreationOptional<string>;
  declare titulo: string;
  declare conteudo: string;
  declare lista: string;
}

Card.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conteudo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lista: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Card",
  }
);

export default Card;
