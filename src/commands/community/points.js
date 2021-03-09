const Command = require("../../utils/estructure/Command");


module.exports = class Point extends Command {
  constructor() {
    super("points", "community", ["p"], 5, "/pk!points add <@usuario>");
  }

  async run(client, message, args) {
    let data = args.join(" ");
    let user = this.validate.mentions(data, client);

    if (user) {
      if (user.id === message.author.id) return;
      this.userPoints(client, user, message);
    }

    switch (data) {
      case "top":
        this.topPoints(message);
        break;

      default:
        break;
    }
  }

  async userPoints(client, user, message) {
    await this.db.query(
      `SELECT * FROM points WHERE userid = ?`,
      [user.id],
      async (error, rows) => {
        if (error) return message.channel.send(error.message);

        if (rows.length <= 0) {
          this.addPoints(user, 1);
          return client.guilds.cache
            .get("669963454056235020")
            .channels.cache.get("818963261101047817")
            .send(`Felicidades por tu primer punto <@${user.id}> `);
        } else {
          let newpoint = rows[0].points + 1;
          this.updatePoints(user, newpoint);
          return client.guilds.cache
            .get("669963454056235020")
            .channels.cache.get("818963261101047817")
            .send(
              this.embed(
                "Nuevo Punto",
                `de ${message.author} para <@${user.id}>`,
                "RANDOM"
              )
            );
        } //kamerr
      }
    );
  }

  async addPoints(user, point) {
    let data = {
      userid: user.id,
      points: point,
    };
    this.db.query(`INSERT INTO points set ? `, [data], (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  async updatePoints(user, points) {
    this.db.query(
      `UPDATE points set points = '${points}' WHERE userid = '${user.id}'`,
      (error) => {
        if (error) {
          console.log(error);
        }
      }
    );
  }

  topPoints(message) {
    this.db.query("SELECT * FROM points", (error, user) => {
      const arraySort = require("array-sort");
      const data = arraySort(user, "points", { reverse: true });

      let top = [];
      let lugares = [];
      let i = 0;

      while (i < data.length) {

        if(top.length <= 4) {
            top.push(`${i + 1}. <@${data[i].userid}> por ${data[i].points} \n`)
        }

        lugares.push({position: i, userid: data[i].userid, points: data[i].points})
        i++;
      }

      let position = lugares.filter(user => user.userid === message.author.id).map(user => ({p: user.position, points: user.points}))
      let posicion = position.length > 0 ? `Tu posicion es  ${position[0].p + 1} con ${position[0].points} punto/s` : "A un no tienes puntos"


      return message.channel.send(this.embed("TOP 5", `${posicion} \n\n ${top.join(" ")}`, "GREEN"));
    });
  }
  async removePoints() {}
};
