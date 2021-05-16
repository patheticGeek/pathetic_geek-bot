import Command from "../struct/Command";
import Discord ,{ Message } from "discord.js";

abstract class WhoIsCommand extends Command {
  constructor() {
    super({
      name: "whois",
      aliases: ["who"],
      requiredArgs: 1,
      description: "Get info of a user with discord user id or username",
      userPermissions: ['ADMINISTRATOR']
    });
  }

  async exec(message: Message) {
    if(message.mentions.users.size > 0) {
      const usersToGet = message.mentions.users.map((user) => user);

      for(const userToGet of usersToGet) {
        const guildUser = message.guild?.members.resolve(userToGet);
        
        if(guildUser) {
          const userDetailsEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${guildUser.user.username}#${guildUser?.user.discriminator}`)
            .setDescription('Some description here')
            .setThumbnail(guildUser.user.displayAvatarURL({format: 'jpg'}) || '')
            .addFields(
              { name: 'User roles', value: `${guildUser.roles.cache.map((role) => `<@&${role.id}>`).join(', ')}` },
              { name: 'User permissions', value: `${guildUser.permissions.toArray().map((permission) => `${permission}`).join(', ')}` },
              { name: 'Joined At', value: `${guildUser.joinedAt?.toLocaleString()}`, inline: true },
            )
            .setFooter(`User id: ${guildUser.id}`);
            if (guildUser.lastMessage) {
              userDetailsEmbed.addField('Last Message At', guildUser.lastMessage.createdAt.toLocaleString());
              userDetailsEmbed.addField('Last Message Url', guildUser.lastMessage.url);
            }
          if (guildUser.voice.channel) {
            userDetailsEmbed.addField('Currently in', guildUser.voice.channel?.name);
          }
          await message.channel.send(userDetailsEmbed);
        } else {
          await message.channel.send(`Cannot find the user`);
        }
      }
    } else {
      const userId = message.content.split(' ')[1];

      if(userId) {
        const guildUser = message.guild?.members.resolve(userId);

        if(guildUser) {
          const userDetailsEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${guildUser.user.username}#${guildUser?.user.discriminator} (${guildUser.nickname})`)
            .setThumbnail(guildUser.user.displayAvatarURL({format: 'jpg'}) || '')
            .addFields(
              { name: 'User roles', value: `${guildUser.roles.cache.map((role) => `<@&${role.id}>`).join(', ')}` },
              { name: 'User permissions', value: `${guildUser.permissions.toArray().map((permission) => `${permission}`).join(', ')}` },
              { name: 'Joined At', value: `${guildUser.joinedAt?.toLocaleString()}`, inline: true },
            )
            .setFooter(`User id: ${guildUser.id}`);
          if (guildUser.lastMessage) {
            userDetailsEmbed.addField('Last Message At', guildUser.lastMessage.createdAt.toLocaleString());
            userDetailsEmbed.addField('Last Message Url', guildUser.lastMessage.url);
          }
          if (guildUser.voice.channel) {
            userDetailsEmbed.addField('Currently in', guildUser.voice.channel?.name);
          }
          await message.channel.send(userDetailsEmbed);
        } else {
          await message.channel.send(`Cannot find user with id ${userId}`);
        }
      }
    }
  }
}

export default WhoIsCommand;
