import Command from "../struct/Command";
import { Message } from "discord.js";

abstract class SetupCommand extends Command {
  constructor() {
    super({
      name: "setup",
      aliases: ["s"],
      description: "Setup a channel for join to create",
      userPermissions: ["ADMINISTRATOR"]
    });
  }

  async exec(message: Message) {
    const newChannel = await message.guild?.channels.create("Join to Create", { type: "voice" });

    const newWatch = { serverID: message.guild?.id || "", channelID: newChannel?.id || "" };
    await this.client.db.WatchingVoiceChannelModel.create(newWatch);

    return message.reply("Voice channel created!");
  }
}

export default SetupCommand;
