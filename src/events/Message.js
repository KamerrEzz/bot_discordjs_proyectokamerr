const Event = require("../utils/estructure/Event");
const Levels = require('../utils/levels')
const Discord = require("discord.js");

const level = new Levels();
const cooldowns = new Discord.Collection();

module.exports = class Message extends Event {
  constructor() {
    super("message");
  }

  async run(client, message) {
    if (message.author.bot && message.author.id === "817521733363564615")
      return;

      this.worldDelete(message)

      // level.levels(message.author.id)

    let prefix = client.prefix;
    if (message.content.startsWith(prefix)) {
      const [cmdName, ...cmdArgs] = message.content
        .slice(prefix.length)
        .trim()
        .split(/\s+/);
      const command = client.commands.get(cmdName);

      if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
      }

      const now = Date.now();
      const timestamps = cooldowns.get(command.name);
      const cooldownAmount = (command.cooldown || 3) * 1000;

      if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return message.reply(`espera ${timeLeft.toFixed(1)} para usar \`${command.name}\`.`);
        }
      }
    
      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

      if (command) {
        command.run(client, message, cmdArgs);
      }
    }
  }

 /**
  * 
  * @param {String} message Mensaje que sera eliminado por ser una mala palabra
  */
  async worldDelete(message){
    let bad = ["puto", "pto"];

    if(bad.some(msg => message.content.includes(msg))){
      message.delete()
      message.channel.send("Grosero").then(msg => msg.delete({ timeout: 5000 }))
    }

  }
};
