module.exports = class Niveles {
    constructor() {
        this.db = require('./db')
    }

    /**
     * 
     * @param {String} user La ID del usuario
     * @return {String} Te da el usuario y sus datos
     */
    levels(user) {
        let xpNew = 0;
        let LevelNew = 0;
        let xpLimit = 100;
        let xp = Math.floor(Math.random() * xpLimit);
        let xpMax = Math.floor(Math.random() * 50);
        let xpMin = Math.floor(Math.random() * 10);

        let userDB = this.getUser(user)
        console.log(userDB);

        // if (xp > 50) {

        //     if(userDB) {

        //     } else {
        //         this.newUser(user, xpMax, 0)
        //     }

        //     // console.log("Max", xpMax)
        // } else {

        //     if(userDB) {

        //     } else {
        //         this.newUser(user, xpMin, 0)
        //     }
        //     // console.log("Min", xpMin)
        // }

        // if (user.level >= xpLimit * user.level) {
        //     console.log("Has subido de nivel")
        //     // reiniciar el XP
        // }

        /**
         * Guardar en la base de datos
         */
        /**
         * user: 1234567890
         * xp: 0
         * level: 0
         */
    }

    getUser(user) {
        this.db.query(`SELECT * FROM Levels WHERE user = ? `, [user], (error, db) => {
            return db
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



    newLevel() {

        //NUEVO NIVEL - User new level 2

    }

    getRank() {

    }

    getTop() {

    }

    addLevel() {

    }

    removeLevel() {

    }


    addXP(user, xp) {
        let userDB = this.getUser(user);
        if (userDB) {

        } else {
            this.newUser(user, xp, 0)
        }
    }

    removeXP() {

    }

    addRole() {

    }

    removeRole() {

    }

}