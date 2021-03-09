const mysql = require("mysql");

let con = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
});
con.connect(error => {
    if(error) return console.log(error);
})

con.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('DB disconnected attempting reconnection')
        con.connect((err) => {
            if (err) throw err;
            console.log('DB reconnected!')
        });
    } else {
        throw err;
    }
})
con.on('connect', () => {
    console.log(`Connected!`)
})

module.exports = con;