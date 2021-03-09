const Event = require('../utils/estructure/Event')
module.exports = class Ready extends Event {
    constructor(){
        super("ready")
    }

    async run (client) {
        console.log(client.user.tag + " has logged in");
    }


}