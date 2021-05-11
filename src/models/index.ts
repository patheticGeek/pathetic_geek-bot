import { Sequelize } from "sequelize";
import WatchingVoiceChannel from "./watchingvoicechannel";
import ChannelsByMe from "./channelsbyme";
import CategoriesByMe from "./categoriesbyme";
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json");
let sequelize = new Sequelize("sqlite::memory:", { logging: false });

if (config.use_in_memory) {
  sequelize = new Sequelize("sqlite::memory:", { logging: false });
} else {
  const currentConfig = config[env];
  sequelize = new Sequelize(currentConfig.database, currentConfig.username, currentConfig.password, currentConfig);
}

export type AssociateFunction = (db: any) => void;

let db = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  WatchingVoiceChannelModel: WatchingVoiceChannel(sequelize),
  ChannelsByMeModel: ChannelsByMe(sequelize),
  CategoriesByMeModel: CategoriesByMe(sequelize)
};

export default db;
