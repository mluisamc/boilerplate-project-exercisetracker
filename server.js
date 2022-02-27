const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema } = mongoose;
const userSchema = new Schema({
  username:  String
});

let User = mongoose.model('User', userSchema);


app.post('/api/users', function(req, res) {
  var user = new User({username: req.body.username});

  user.save(function(err, data) {
    if (err) return console.error(err);
    res.json({ username : data.username, _id: data._id})
  });
  
});

app.get('/api/users', function(req,res) {
  User.find({}, function (err, users) {
    if (err) return console.log(err);
    res.json(users)
  });  
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
