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

// List all students
app.get('/students', function(req, res) {
	db.Student.findAll({ include: [ { model: db.Course } ] })
	  .then(function(dbStudents){
		console.log(dbStudents);
		res.render("students/index", { ejsStudents: dbStudents } );
	  });
});

// Render form to create student
app.get('/students/new', function(req, res) {
	res.render('students/new');
});

// Create student
app.post('/students', function(req, res) {
	db.Student.create({name: req.body.name, age: req.body.age, CourseId: req.body.course_id})
	  .then(function(dbStudent){
	  	console.log("\nn\n\n\nn\n\nTHIS IS STUDENT", dbStudent);
	  	res.redirect('/students');
	  })
});

// Show student
app.get('/students/:id', function(req, res) {
	var id = req.params.id;

	res.render('students/show', { student: students[id - 1], id: id });
});

// Render form to edit student
app.get('/students/:id/edit', function(req, res) {
	var id = req.params.id;

	res.render('edit', { student: students[id - 1], id: id });
});

// Update student
app.patch('/students/:id', function(req, res) {
	var id = req.params.id;

	// Updates the student
	students[id - 1] = req.body;

	res.redirect('/students/' + id);
});

// Delete student
app.delete('/students/:id', function(req, res) {
	var id = req.params.id;

	// Delete the student
	students.splice(id - 1, 1);

	res.redirect('/students');
});

// Create course
app.post('/courses', function(req, res) {
	db.Course.create({name: req.body.name, description: req.body.description})
	   .then(function(dbCourse){
	   	console.log("\n\n\n\n\nTHIS IS DB COURSE", dbCourse);
			res.redirect('/');
	   });
});

// Render form to create student
app.get('/courses/new', function(req, res) {
	res.render('courses/new');
});

// Start server
db.sequelize.sync().then(function() {
	app.listen(3000, function() {
		console.log('Server listening on port 3000');
	});
});
