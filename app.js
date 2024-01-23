const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require("mongoose");
const dbURI = "mongodb://localhost:27017";
const User = require("./models/user.js");

mongoose
	.connect(dbURI)
	.then((result) => {
		console.log("Connected to DB");
		app.listen(PORT);
	})
	.catch((err) => console.log(err));

app.get("/", (req, res) => {
	res.sendFile("./views/Home.html", { root: __dirname });
});

app.get("/login", (req, res) => {
	res.sendFile("./views/login.html", { root: __dirname });
});
app.get("/signup", (req, res) => {
	res.sendFile("./views/signup.html", { root: __dirname });
});
app.get("/dashboard", (req, res) => {
	res.sendFile("./views/Dashboard.html", { root: __dirname });
});

app.get("/logout", (req, res) => {
	res.redirect("/");
});
app.post("/submit", (req, res) => {
	console.log(req.body);

	const user = new User({
		email: req.body.email,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		password: req.body.password,
	});
	user
		.save()
		.then((result) => {
			res.status(200).redirect("/dashboard");
			console.log("it works");
		})
		.catch((err) => {
			console.log(err);
		});
});

app.use((req, res) => {
	res.status(404).send("<h1>Error, this page does not exist</h1>");
});
