const sqlite3 = require("sqlite3").verbose();

// Connect to the SQLite database
const db = new sqlite3.Database("listDB.sqlite");

// Create a table for storing posts if it doesn't exist
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, text TEXT)"
  );


  db.run("DELETE FROM posts", (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("All data deleted successfully!");
    }
  });
});



module.exports = db;
