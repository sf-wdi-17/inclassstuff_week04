// Require the modules we're going to need:
var express = require("express"),
    ejs = require("ejs"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override");

var db = require('./models');
// Now instantiate our express app:
var app = express();

// Tell express to use EJS as its view engine
app.set("view engine", "ejs");

// Tell express to use method override
app.use(methodOverride('_method'));

// Set up body parser
app.use(bodyParser.urlencoded({ extended: false }));


// Set a root route
app.get('/', function(req,res){
	res.send("Home");
});

// List all classmates
app.get('/classmates', function(req, res) {
	db.Student.all().then(function(students){
		res.render("index", { classmates: students } );
	});
});

// Render form to create classmate
app.get('/classmates/new', function(req, res) {
	res.render('new');
});

// Create classmate
app.post('/classmates', function(req, res) {
	db.Student.create({name: req.body.name, age: req.body.age, courseId: req.body.course_id})
	  .then(function(dbStudent){
	  	console.log("\nn\n\n\nn\n\nTHIS IS STUDENT", dbStudent);
	  	res.redirect('/classmates');
	  })
});

// Show classmate
app.get('/classmates/:id', function(req, res) {
	var id = req.params.id;

	res.render('show', { classmate: classmates[id - 1], id: id });
});

// Render form to edit classmate
app.get('/classmates/:id/edit', function(req, res) {
	var id = req.params.id;

	res.render('edit', { classmate: classmates[id - 1], id: id });
});

// Update classmate
app.patch('/classmates/:id', function(req, res) {
	var id = req.params.id;

	// Updates the classmate
	classmates[id - 1] = req.body;

	res.redirect('/classmates/' + id);
});

// Delete classmate
app.delete('/classmates/:id', function(req, res) {
	var id = req.params.id;

	// Delete the classmate
	classmates.splice(id - 1, 1);

	res.redirect('/classmates');
});

// Create course
app.post('/courses', function(req, res) {
	db.Course.create({name: req.body.name, description: req.body.description})
	   .then(function(dbCourse){
	   	console.log("\n\n\n\n\nTHIS IS DB COURSE", dbCourse);
			res.redirect('/');
	   });
});

// Render form to create classmate
app.get('/courses/new', function(req, res) {
	res.render('courses/new');
});

// Start server
db.sequelize.sync().then(function() {
	app.listen(3000, function() {
		console.log('Server listening on port 3000');
	});
});
