require('dotenv').config();
const {Pool} = require("pg");
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});
//const controller = require("./controllers/piController.js")

app.use(express.static("public"));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/keys', key_sig_info);
app.get('/timesignatures', time_sig_info);
app.get('/accidentals', accidental_info);
app.get('/createStaff', createStaff);
app.listen(port, function() {
console.log('Server listening on: ' + port);
});

//Controller

function key_sig_info(req, res){
  var sql = "SELECT name FROM key_sig";
  var key_sig_string = "";
  pool.query(sql, function(err, db_res) {
    if(err){
      throw err;
    } else {
      console.log("came back with data from DB");
      console.log(db_res.rows);
      var results = db_res.rows;
      results.forEach((v)=>{
        key_sig_string += "<option value='"+ v.name +"'>"+ v.name + "</option>\n";
      });
      res.write(key_sig_string);
      res.end();
    }
  });
}

function time_sig_info(req, res){
  var sql = "SELECT signature FROM time_sig";
  var time_sig_string = "";
  pool.query(sql, function(err, db_res) {
    if(err){
      throw err;
    } else {
      console.log("came back with data from DB");
      console.log(db_res.rows);
      var results = db_res.rows;

      results.forEach((v)=>{
        time_sig_string += "<option value='"+ v.signature +"'>"+ v.signature + "</option>\n";
      });
      res.write(time_sig_string);
      res.end();
    }
  });
}

function accidental_info(req, res) {
  var sql = "SELECT accidental FROM accidental";
  var accidental_string = "";
  pool.query(sql, function(err, db_res) {
    if(err){
      throw err;
    } else {
      console.log("came back with data from DB");
      console.log(db_res.rows);
      var results = db_res.rows;
      results.forEach((v)=>{
      accidental_string += "<input type='radio' name='accidental' value='"+ v.accidental +"'>  " + v.accidental + "<br>\n";
      });
      res.write(accidental_string);
      res.end();
    }
  });
}

function createStaff(req, res){
  const time_sig = req.query.tSignature;
  const key_sig = req.query.kSignature;
  const accidental = req.query.accSignature;

  const params = {time_sig: time_sig, key_sig: key_sig, accidental: accidental};

  res.render('pages/buildQuiz', params);
}
