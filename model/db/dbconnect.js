const mysql = require("mysql");
const connection = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "",
      database: "customerdb",
});

module.exports = connection;
