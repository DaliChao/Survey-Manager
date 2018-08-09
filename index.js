const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

mongoose.connect(keys.mongoURI); //connect to MongoDB

require('./models/User');
require('./models/Survey');
require('./services/passport');

const app = express();

app.use(bodyParser.json()); //这个是用来让express server在接受到post请求时，可以把数据也传递进来，放在req.body里，需要使用的时候，直接req.body。

//set cookie
app.use(
  cookieSession({
    maxAge: 30 * 24 * 3600 * 1000,
    keys: [keys.cookieKey] //这里是数组的原因是： 可以放许多key，这样cookiesession会随机从里面选择，更加安全。
  })
);
app.use(passport.initialize()); //tell passport to use cookie
app.use(passport.session()); //tell passport to use cookie

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);
//const authRoutes= require('./routes/authRoutes');
// authRoutes(app);

if (process.env.NODE_ENV === 'production') {
  //Express will serve up production assets, like our main.js file or main.css file.
  app.use(express.static('client/build'));

  //Express will serve up the index.html file if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
