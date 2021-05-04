import { DataTypes, Sequelize, Model } from "sequelize";

interface ChannelsByMeAttributes {
  serverID: string;
  channelID: string;
  id: string;
}

interface ChannelsByMeInstance extends Model<ChannelsByMeAttributes>, ChannelsByMeAttributes {}

export default (sequelize: Sequelize) => {
  const ChannelsByMeModel = sequelize.define<ChannelsByMeInstance>("ChannelsByMe", {
    id: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    serverID: {
      type: DataTypes.STRING
    },
    channelID: {
      type: DataTypes.STRING
    }
  });
  ChannelsByMeModel.sync();

  return ChannelsByMeModel;
};
