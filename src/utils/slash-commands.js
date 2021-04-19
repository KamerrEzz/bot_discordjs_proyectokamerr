const discord = require('discord.js')
module.exports = (client) => {

    client.api.applications("817521733363564615").guilds('739306480586588241').commands.post({
        data: {
            name: "embed",
            description: "Echos your text as an embed!",
            options: [
                {
                    name: "content",
                    description: "Content of the embed",
                    type: 3,
                    required: true
                }
            ]
        }
    });
    client.api.applications("817521733363564615").guilds('739306480586588241').commands.post({
        data: {
            name: "point",
            description: "Echos your text as an embed!",
            options: [
                {
                    "name": "get",
                    "description": "Ver puntos",
                    "type": 2, // 2 is type SUB_COMMAND_GROUP
                    "options": [
                        {
                            "name": "user",
                            "description": "Usuario al cual vera sus puntos",
                            "type": 1, // 1 is type SUB_COMMAND
                            "options": [
                                {
                                    "name": "user",
                                    "description": "Usuario",
                                    "type": 6, // 6 is type USER
                                    "required": true
                                }
                            ]
                        },
                    ]
                },
                {
                    "name": "top",
                    "description": "Ver el top 5",
                    "type": 3
                }
            ]
        }
    });


    client.ws.on('INTERACTION_CREATE', async interaction => {
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;
        console.log(command);
        console.log(args);


        if (command == 'point') {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "Hello World!"
                    }
                }
            });
        }
        if (command == 'hello') {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "Hello World!"
                    }
                }
            });
        }

        if (command == "echo") {
            const description = args.find(arg => arg.name.toLowerCase() == "content").value;
            const embed = new discord.MessageEmbed()
                .setTitle("Echo!")
                .setDescription(description)
                .setAuthor(interaction.member.user.username);

            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: await createAPIMessage(interaction, embed, client)
                }
            });
        }
    });

}

async function createAPIMessage(interaction, content, client) {
    const apiMessage = await discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
        .resolveData()
        .resolveFiles();

    return { ...apiMessage.data, files: apiMessage.files };
}
// module.exports = (token, id) => {
//     const interactions = require("discord-slash-commands-client");

//     const client = new interactions.Client(
//         token,
//         id
//     );
//     // list all your existing commands.
//     client.getCommands({
//         commandID: "827624517366054963",
//         guildID: "739306480586588241"
//       }).then(console.log).catch(console.error)

//     client
//         .createCommand({
//             name: "kamerr",
//             description: "Informacion de kamerr sobre proyectos, eventos, etc.",
//         })
//         .then(console.log)
//         .catch(console.error);
// }