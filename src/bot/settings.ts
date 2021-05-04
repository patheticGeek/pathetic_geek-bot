import { Settings } from "./types/Settings";

const settings: Settings = {
  BOT_TOKEN: process.env.BOT_TOKEN ?? "",
  BOT_OWNER_ID: process.env.OWNER_ID ? process.env.OWNER_ID.split(",") : ["OWNER_ID"],
  PREFIX: process.env.PREFIX ?? "/"
};

export default settings;
