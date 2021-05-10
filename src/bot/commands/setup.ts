import Command from "../struct/Command";
import { Message } from "discord.js";

abstract class SetupCommand extends Command {
  constructor() {
    super({
      name: "setup",
      aliases: ["s"],
      description: "Setup a channel for join to create",
      category: 'Main',
      userPermissions: ["ADMINISTRATOR"],
      clientPermissions: ["MANAGE_CHANNELS"]
    });
  }

  async exec(message: Message) {
    const newCategory = await message.guild?.channels.create("Join to Create", { type: "category" });
    const newChannel = await message.guild?.channels.create("Join to Create", { type: "voice", parent: newCategory?.id });

    const newWatch = { serverID: message.guild?.id || "", channelID: newChannel?.id || "", categoryChannelID: newCategory?.id || "" };
    await this.client.db.WatchingVoiceChannelModel.create(newWatch);

    return message.reply("Voice channel created!");
  }
}

export default SetupCommand;
