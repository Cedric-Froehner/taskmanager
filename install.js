const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('tasks.db');

async function tablecreation() {
	await db.run("PRAGMA foreign_keys = ON;")

	console.log("Creating users table...")
	await db.run(`CREATE TABLE IF NOT EXISTS users (
		user_id TEXT PRIMARY KEY NOT NULL UNIQUE,
		username TEXT NOT NULL,
		password_sha512 TEXT NOT NULL,
		salt TEXT NOT NULL
	  );`);
	console.log("users table creation finished!")

	console.log("Creating tasks table...")
	db.run(`CREATE TABLE IF NOT EXISTS tasks (
		task_id TEXT PRIMARY KEY NOT NULL UNIQUE,
		title STRING NOT NULL,
		description STRING
	);`)
	console.log("tasks table creation finished!")


	console.log("Creating users_tasks table...")
	db.run(`CREATE TABLE IF NOT EXISTS users_tasks (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id TEXT NOT NULL,
		task_id TEXT NOT NULL,
		FOREIGN KEY (user_id) REFERENCES users(user_id),
		FOREIGN KEY (task_id) REFERENCES tasks(task_id)
	);`)
	console.log("users_tasks table creation finished!")
}

tablecreation()
