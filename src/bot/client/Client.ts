import { Client, Collection } from "discord.js";
import { CommandRegistry, EventRegistry } from "../struct/registries/export/RegistryIndex";
import { CommandOptions, EventOptions } from "../types/Options";
import settings from "../settings";
import db from "../../models/index";

class Bot extends Client {
  public prefix: string;
  public db;

  public commands = new Collection<string, CommandOptions>();

  public cooldowns = new Collection<string, Collection<string, number>>();

  public events = new Collection<string, EventOptions>();

  public constructor() {
    super({
      /* Discord JS Client Options */
      disableMentions: "everyone"
    });

    this.prefix = settings.PREFIX;
    this.db = db;
  }

  public start() {
    CommandRegistry(this);
    EventRegistry(this);
    super.login(settings.BOT_TOKEN);
  }
}

export default Bot;
