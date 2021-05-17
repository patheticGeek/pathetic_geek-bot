import { DataTypes, Sequelize, Model } from "sequelize";

interface CategoriesByMeAttributes {
  name: string;
  serverID: string;
  channelID: string;
  id: string;
  userID: string;
}

interface CategoriesByMeInstance extends Model<CategoriesByMeAttributes>, CategoriesByMeAttributes {}

export default (sequelize: Sequelize) => {
  const CategoriesByMeModel = sequelize.define<CategoriesByMeInstance>("CategoriesByMe", {
    id: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    serverID: {
      type: DataTypes.STRING
    },
    channelID: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    userID: {
      type: DataTypes.STRING
    }
  });
  CategoriesByMeModel.sync();

  return CategoriesByMeModel;
};
