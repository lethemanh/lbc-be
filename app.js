require('custom-env').env(process.env.NODE_ENV || 'local');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const configs = require('./config/index.js');
const userRouter = require('./modules/users/user.router');
const rollRouter = require('./modules/rolls/roll.router');
const betRouter = require('./modules/bets/bet.router');
const authRouter = require('./modules/auth/auth.router');
const authenticateMw = require('./middlewares/authenticate');
const roleRouter = require('./modules/roles/role.router');
const activateSocket = require('./services/socket');

mongoose.connect(configs.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use('/api/users', authenticateMw.authenticate, userRouter.router);
app.use('/api/roll', authenticateMw.authenticate, rollRouter.router);
app.use('/api/bet', authenticateMw.authenticate, betRouter.router);
app.use('/api/role', authenticateMw.authenticate, roleRouter.router);

app.use('/api/auth', authRouter.router);

const server = require('http').createServer(app);
// Socket IO
const io = require('socket.io')(server, {
  cors: {
    origin: "*"
  }
});

activateSocket(io);

server.listen(process.env.PORT || configs.PORT, function() {
    console.log(`Server listening on port ${configs.PORT}`);
});
