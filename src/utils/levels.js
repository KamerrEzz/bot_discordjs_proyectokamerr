module.exports = class Niveles {
    constructor() {
        this.db = require('./db')
    }

    /**
     * 
     * @param {String} user La ID del usuario
     * @return {String} Te da el usuario y sus datos
     */
    async levels(user) {
        let userID = user.author.id;
        let xpMin = Math.floor(Math.random() * 10);

        let userDB = await this.getUser(user.author.id);
        if (userDB) {
            let newLevels = await this.addXP(userID, xpMin);
            if (newLevels) return newLevels
        } else {
            this.newUser(userID, 1, 1)
        }
    }


    getUser(user) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM Levels WHERE user = ? `, [user], (error, db) => {
                if (error) return reject(error);
                if (!db || db.length <= 0) return resolve(false)
                return resolve(db[0])
            })
        })
    }

    newUser(user, xp, level) {
        let data = {
            user,
            xp,
            level
        }
        this.db.query(`INSERT INTO Levels SET ? `, [data], (error) => {
            if (error) {
                console.log(error)
            }
        })
    }

    addLevel(user, lvl) {
        this.db.query(`UPDATE Levels SET level = '${lvl}' WHERE user = '${user}'`, (error) => {
            if (error) throw new Error(error);
        })
    }

    getRank() {

    }

    getTop() {

    }

    removeLevel() {

    }


    async addXP(user, xp) {
        return new Promise(async (bien, mal) => {
            let userDB = await this.getUser(user);
            let newLvl = parseInt(userDB.level) + 1;
            let newXP = parseInt(userDB.xp) + parseInt(xp);
            if (userDB.xp >= 100) {
                this.db.query(`UPDATE Levels SET xp = '${1}' WHERE user = '${user}'`, (error) => {
                    if (error) mal(error);
                })
                this.addLevel(user, newLvl)
                this.addRole(user, newLvl)
                return bien(newLvl);
            } else {
                this.db.query(`UPDATE Levels SET xp = '${newXP}' WHERE user = '${user}'`, (error) => {
                    if (error) mal(error);
                })
            }
        })
    }

    removeXP() {

    }

    async addRole() {
    }

    removeRole() {

    }
}