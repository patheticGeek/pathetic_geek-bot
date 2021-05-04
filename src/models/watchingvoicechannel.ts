import { DataTypes, Sequelize, Model } from "sequelize";

interface WatchingVoiceChannelAttributes {
  serverID: string;
  channelID: string;
}

interface WatchingVoiceChannelInstance extends Model<WatchingVoiceChannelAttributes>, WatchingVoiceChannelAttributes {}

export default (sequelize: Sequelize) => {
  const WatchingVoiceChannelModel = sequelize.define<WatchingVoiceChannelInstance>("WatchingVoiceChannel", {
    serverID: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    channelID: {
      type: DataTypes.STRING
    }
  });
  WatchingVoiceChannelModel.sync();

  return WatchingVoiceChannelModel;
};
