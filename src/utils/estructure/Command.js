const discord = require("discord.js");
const db = require("../db");
module.exports = class Command {
  constructor(name, category, aliases, coldown, use) {
    this.name = name;
    this.category = category;
    this.aliases = aliases;
    this.cooldown = coldown;
    this.use = use;
    this.db = db;
    this.validate = {
      mentions: (mention, client) => {
        if (!mention) return;

        if (mention.startsWith("<@") && mention.endsWith(">")) {
          mention = mention.slice(2, -1);

          if (mention.startsWith("!")) {
            mention = mention.slice(1);
          }

          return client.users.cache.get(mention);
        }
      },
      hasPermission: (message, permission) => {
        if (!message.member.hasPermission(permission)) return;

        return true;
      },
      hasPermissionBot: (message, permission) => {
        if (!message.guild.me.hasPermission(permission)) return;

        return true;
      },
      rolId: (message, id) => {
        if (!message.member.roles.cache.has(id)) return;

        return true;
      },
      rolName: (message, name) => {
        if (!message.member.roles.cache.some((role) => role.name === name))
          return;

        return true;
      },
    };
    this.embed = (title, desc, color, image) => {
      let embed = new discord.MessageEmbed()
        .setTitle(title)
        .setDescription(desc)
        .setColor(color)
        .setImage(image);

      return embed;
    };
  }
};
