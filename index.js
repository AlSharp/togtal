const express = require('express');
const path =require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
require('./models/user');
require('./models/groceryStore');
require('./models/productOrigin');
const sessionManager = require('./services/sessionManager');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(sessionManager());

require('./routes/authRoutes')(app);
require('./routes/groceryStoreRoutes')(app);
require('./routes/productOriginRoutes')(app);

app.get('/', (res, req) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
})

const PORT = process.env.PORT || 5000;
app.listen(PORT);