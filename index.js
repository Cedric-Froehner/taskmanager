const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('tasks.db');

function selectFromDB(query) {
	return new Promise((resolve, reject) => {
		if (!query.startsWith("SELECT")) {
		  query = "SELECT " + query;
		}
	
		db.all(query, (error, rows) => {
		  if (error) {
			reject(error);
		  } else {
			resolve(rows);
		  }
		});
	  });
}

(async function() {
	try {
	  const testi = await selectFromDB("SELECT * FROM users");
	  console.log(testi);
	} catch (error) {
	  console.error(error);
	} finally {
	  db.close();
	}
  })();