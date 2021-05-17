import { Sequelize } from "sequelize";
import WatchingVoiceChannel from "./watchingvoicechannel";
import ChannelsByMe from "./channelsbyme";
import CategoriesByMe from "./categoriesbyme";
import config from "../config";
const env = process.env.NODE_ENV || "development";
let sequelize = new Sequelize("sqlite::memory:", { logging: false });

if (config.use_in_memory) {
  sequelize = new Sequelize("sqlite::memory:", { logging: false });
} else {
  // @ts-ignore
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
