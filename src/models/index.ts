import { Sequelize } from "sequelize";
import WatchingVoiceChannel from "./watchingvoicechannel";
import ChannelsByMe from "./channelsbyme";
// const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.json")[env];
let sequelize = new Sequelize("sqlite::memory:", { logging: false });

export type AssociateFunction = (db: any) => void;

let db = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  WatchingVoiceChannelModel: WatchingVoiceChannel(sequelize),
  ChannelsByMeModel: ChannelsByMe(sequelize)
};

// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

export default db;
