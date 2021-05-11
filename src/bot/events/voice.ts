import { VoiceState } from "discord.js";
import Event from "../struct/Event";

abstract class VoiceStateUpdateEvent extends Event {
  constructor() {
    super({
      name: "voiceStateUpdate"
    });
  }

  async exec(oldState: VoiceState, newState: VoiceState) {
    const userJoin = !oldState.channelID && newState.channelID !== null;
    const userLeave = oldState.channelID && !newState.channelID;
    const userMove = oldState.channelID !== newState.channelID;

    if (userJoin || userMove) {
      // Check if channel user joined is `Join to Create` one
      const watchingChannel = await this.client.db.WatchingVoiceChannelModel.findOne({
        where: { serverID: newState.guild.id, channelID: newState.channelID }
      });
      if (watchingChannel) {
        // Create a new channel with users name and give manage permission
        const channelName = `${newState.member?.user.username}'s Channel`;
        const newChannel = await newState.guild?.channels.create(channelName, {
          type: "voice",
          parent: watchingChannel.categoryChannelID,
          permissionOverwrites: [
            {
              id: newState.member?.id || "",
              allow: ["MANAGE_CHANNELS"]
            }
          ]
        });

        // Move user to the new channel
        await newState.setChannel(newChannel);

        // Add channel to list of my channels
        const newMine = { id: Date.now() + newState.guild?.id, serverID: newState.guild?.id || "", channelID: newChannel?.id || "", userID: (newState.member?.id || '') };
        await this.client.db.ChannelsByMeModel.create(newMine);
      } else if ((userLeave || userMove) && oldState.channel?.members.size === 0) {
        // Check if channel was created by me
        const myChannel = await this.client.db.ChannelsByMeModel.destroy({
          where: { serverID: oldState.guild.id, channelID: oldState.channelID }
        });
        if (myChannel > 0) {
          // Delete the channel when no users in it
          await oldState.channel?.delete();
        }
      }
    }
  }
}

export default VoiceStateUpdateEvent;
