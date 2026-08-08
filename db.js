import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
console.log("HOST:", process.env.DB_HOST);
console.log("USER:", process.env.DB_USER);
console.log("DB:", process.env.DB_NAME);

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log("Connection Failed");
        console.error(err);
        return;
    }

    console.log("MySQL Connected");
});

export default connection;