const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); 

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.get('/register', (req, res) => {
    res.render('register');
  });
  app.get('/login', (req, res) => {
    res.render('login'); 
  });

  app.get('/home', (req, res) => {
    res.render('home'); 
  });
  
mongoose.connect(process.env.MONGO_URI, {  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.render('index'); 
});
app.use(express.static('public'));
app.listen(3000, () => console.log('Server started on port 3000'));
