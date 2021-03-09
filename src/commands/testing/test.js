const Command = require("../../utils/estructure/Command");
const fetch = require('node-fetch')

module.exports = class Point extends Command {
  constructor() {
    super("test", "points", [], "/pk!points add <@usuario>");
  }

  async run(client, message, args) {
    fetch("https://api.twitch.tv/helix/search/channels?query=a_seagull", {
        headers: {
            "client-id": "wf7oq6djg9qsnvj7jks4meub06owaa",
        }
    }).then(res => {
        return res.json()
    }).then(res => {
        console.log(res);
    })
  }

};
