require('dotenv').config();
const {Pool} = require("pg");
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});
//const controller = require("./controllers/piController.js")

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/QuizBuilder', getQuizBuilder);
app.listen(port, function() {
  console.log('Server listening on: ' + port);
});

function getQuizBuilder(req, res) {
  time = time_sig_info();
  key = key_sig_info();
  accidental = accidental_info();
  //res.write(time);
  //res.write(time_sig_info());
  //res.write(key_sig_info());
  //res.write(accidental_info());
  console.log(time);
  console.log(key);
  console.log(accidental);
  res.write("Please View the Console");
  res.end();
}

function key_sig_info(){
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
        key_sig_string += "<option value='"+ v.name +"'>"+ v.name + "</option>";
      });
      return key_sig_string;
    }
  });
}

function time_sig_info(){
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
        time_sig_string += "<option value='"+ v.signature +"'>"+ v.signature + "</option>";
      });

      return time_sig_string;
    }
  });
}

function accidental_info() {
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
        accidental_string += "<input type='radio' name='accidental' value='"+ v.accidental +"'>";
      });
      return accidental_string;
    }
  });
}
