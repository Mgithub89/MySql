const inquirer = require("inquirer");
const mysql = require("mysql");

//create database connection
const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "yourRootPassword",
    database: "topsongs_db"
});

connection.connect(function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log("connected as id " + connection.threadId);
        start();
    }
})

function start() {
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "find song by artist",
                "find all artist who appear more than once",
                "find data with in a specific range",
                "find songs by songname",
                "Exit"
            ]

        }])
        .then(answer => {
            switch (answer.action) {
                case "find song by artist":
                    return artistSearch();
                    break;
                case "find all artist who appear more than once":
                    return multiSearch();
                    break;
                case "find data with in a specific range":
                    return rangeSearch();
                    break;
                case "find songs by songname":
                    return songSearch();
                    break;
                case "Exit":
                    connection.end();
            }

        })
}

function artistSearch() {
    inquirer.prompt(
        {
            type: "input",
            name: "name",
            message: "submit artist name"

        }
    ).then(answer => {
        let sql = "SELECT * FROM Top5000 WHERE artist_name = ?"
        connection.query(sql, [answer.name], (err, data) => {
            if (err) throw err;
            for (const song of data) {
                console.log(`${song.position} | ${song.song_name} | ${song.year}`)
            }
            start();
        })

    })

}

function multiSearch() {

    let multi = "SELECT * FROM Top5000 GROUP BY artist_name HAVING COUNT(artist_name) > 1"
    connection.query(multi, (err, data) => {
        if (err) throw err;
        for (const song of data) {
            console.log(`${song.artist_name}`)
        }
        start();
    })
}

function rangeSearch() {
    inquirer.prompt([{
        type: "input",
        name: "start",
        message: "search starting position"
    },
    {
        type: "input",
        name: "end",
        message: "search end position"
    }])
        .then(answer => {
            let range = "SELECT * FROM Top5000 WHERE position BETWEEN ? AND ?"
            connection.query(range, [answer.start, answer.end], (err, data) => {
                if (err) throw err;
                for (const song of data) {
                    console.log(`${song.position} | ${song.song_name} | ${song.year}`)
                }
                start();
            })
        })

}

function songSearch() {
    inquirer.prompt({
        type: "input",
        name: "song",
        message: "Enter song name pls"
    }).then(answer => {
        let song = "SELECT * FROM Top5000 WHERE song_name = ?"
        connection.query(song, [answer.song], (err, data) => {
            if (err) throw err;
            for (const song of data) {
                console.log(`${song.position} | ${song.song_name}`)
            }
            start();
        })
    })

}