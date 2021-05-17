import Command from "../struct/Command";
import { Message } from "discord.js";

abstract class CategoryCommand extends Command {
  constructor() {
    super({
      name: "category",
      aliases: ["c"],
      description: "Manage categories (create | anhilate | move | list)",
      requiredArgs: 1,
      category: "Main",
      clientPermissions: ["MANAGE_CHANNELS"]
    });
  }

  async exec(message: Message) {
    const command = message.content.split(" ")[1];
    // @ts-ignore
    if (typeof this[command] === "function") {
      // @ts-ignore
      return this[command](message);
    } else {
      return message.reply("No such command exists");
    }
  }

  async create(message: Message) {
    if ((message.member?.permissions.missing("MANAGE_CHANNELS") || []).length > 0) {
      return message.reply("You need to have MANAGE_CHANNELS permission");
    }
    const intr = message.content.split(" ");
    intr.splice(0, 2);
    const categoryName = intr.join(" ");
    const newChannel = await message.guild?.channels.create(categoryName, {
      type: "category",
      permissionOverwrites: [{ id: message.guild?.id, deny: ["VIEW_CHANNEL"] }]
    });
    const newCategory = {
      id: Date.now() + (message.guild?.id || ""),
      serverID: message.guild?.id || "",
      channelID: newChannel?.id || "",
      name: categoryName,
      userID: message.member?.id || ""
    };
    await this.client.db.CategoriesByMeModel.create(newCategory);
    return message.reply("Category created!");
  }

  async move(message: Message) {
    if (!message.member?.voice.channelID) {
      return message.reply("You need to be in a voice channel first");
    }
    const voiceChannelData = await this.client.db.ChannelsByMeModel.findOne({
      where: { serverID: message.guild?.id || "", channelID: message.member.voice?.channelID, userID: message.member.id }
    });
    if (!voiceChannelData) {
      return message.reply("You're in a VC that wasn't created by me");
    }
    if (voiceChannelData.userID !== message.member.id && message.member.permissions.missing("MANAGE_CHANNELS").length > 0) {
      return message.reply("Only the creator can move channel");
    }
    const intr = message.content.split(" ");
    intr.splice(0, 2);
    const categoryName = intr.join(" ");
    const requestedCategory = await this.client.db.CategoriesByMeModel.findOne({ where: { name: categoryName } });
    if (!requestedCategory) {
      return message.reply(`The category \`${categoryName}\` dosen't exists`);
    }

    // If all conditions satisfy move the user's VC to requested category
    await message.member.voice.channel?.setParent(requestedCategory.channelID);
    return message.reply("Moved to category!");
  }

  async anhilate(message: Message) {
    const intr = message.content.split(" ");
    intr.splice(0, 2);
    const categoryName = intr.join(" ");
    const destroyedCategories = await this.client.db.CategoriesByMeModel.destroy({ where: { name: categoryName } });
    if (destroyedCategories > 0) {
      return message.reply("Category deleted!");
    } else {
      return message.reply("No such category");
    }
  }

  async list(message: Message) {
    const categories = await this.client.db.CategoriesByMeModel.findAll({ where: { serverID: message.guild?.id } });
    const reply = `*Channels in this server:*\n${categories.map((category) => `${category.name}`).join("\n")}`;
    return message.reply(reply);
  }
}

export default CategoryCommand;
