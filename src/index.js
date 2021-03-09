require("dotenv").config();
const Discord = require("discord.js");
const Client = new Discord.Client();
const { registerCommands, registerEvents } = require("./utils/registry");

const load = async () => {
  Client.commands = new Map();
  Client.events = new Map();
  Client.prefix = process.env.DISCORD_BOT_PREFIX;
  await registerCommands(Client, "../commands");
  await registerEvents(Client, "../events");
  await Client.login(process.env.DISCORD_BOT_TOKEN);
};
load()