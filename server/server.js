const express = require('express')
// const utils = require('utility');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

const models = require('./model');
const User = models.getModel('user');
const Chat = models.getModel('chat');

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', function(socket) {
    socket.on('sendmsg', function(data) {
        const {from, to, msg} = data;
        const chatid = [from, to].sort().join('_');
        Chat.create({chatid, from, to, content:msg}, function(err, doc) {
            io.emit('recvmsg',Object.assign({}, doc._doc));
        })
    })
})

const userRouter = require('./user');

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/user', userRouter);

server.listen(9093, function () {
    console.log('node app start at port 9093')
})

