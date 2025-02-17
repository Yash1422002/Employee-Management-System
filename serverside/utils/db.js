import mysql from "mysql2"

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employeems"
})

con.connect((err) => {
    if (err) {
        console.log("connection error");
    } else {
        console.log("Connected");
    }
})

export default con