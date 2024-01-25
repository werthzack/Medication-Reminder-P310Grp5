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

// Routes
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
app.post("/signup", (req, res) => {
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
			res.status(200).redirect("/login");
			console.log("it works");
		})
		.catch((err) => {
			console.log(err);
		});
});

app.post("/login", async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	// Retrieve user data from MongoDB based on the provided email
	const user = await User.findOne({ email });

	if (user) {
		console.log("user found.");
		// Compare the input password with the stored password
		if (password === user.password) {
			console.log("They match");
			res.redirect("/dashboard");
		} else {
			res.status(401).send("Incorrect password");
		}
	} else {
		res.status(404).send("User not found");
	}
});

app.use((req, res) => {
	res.status(404).send("<h1>404 (Error)<br>This page does not exist.</h1>");
});
