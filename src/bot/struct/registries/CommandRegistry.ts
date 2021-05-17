import Bot from "../../client/Client";
import Command from "../../struct/Command";
import { sync } from "glob";
import { resolve } from "path";

const registerCommands: Function = (client: Bot) => {
  const pattren = process.env.NODE_ENV === "production" ? "dist/bot/commands/**/*" : "src/bot/commands/**/*";
  const commandFiles = sync(resolve(pattren));
  commandFiles.forEach((file) => {
    if (/\.(j|t)s$/iu.test(file)) {
      const File = require(file).default;
      if (File && File.prototype instanceof Command) {
        const command: Command = new File();
        command.client = client;
        client.commands.set(command.name, command);
        command.aliases.forEach((alias) => client.commands.set(alias, command));
      }
    }
  });
};

export default registerCommands;
