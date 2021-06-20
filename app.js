const express = require('express');
const app = express();
const mongoose = require('mongoose');
const configs = require('./config/index.js');
const userRouter = require('./modules/users/user.router');
const betRouter = require('./modules/bets/bet.router');
const rollRouter = require('./modules/rolls/roll.router');

mongoose.connect(configs.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
// API routers
app.use('/api/users', userRouter.router);
app.use('/api/bets', betRouter.router);
app.use('/api/rolls', rollRouter.router);

// Static file router
app.use('/', express.static(__dirname + '/views'));

app.listen(configs.PORT, function() {
    console.log(`Server listening on port ${configs.PORT}`);
});