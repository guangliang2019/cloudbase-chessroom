import { init } from '@cloudbase/node-sdk';
const app = init({
  env: 'chessroom-6gsvjk6y92d4274e',
  secretId: 'AKID3wa4KK5cuwjGYbOwEH4btwjHaeS1LQFo',
  secretKey: 'MSJuFLBm7E6i4A1cy5wXtzqRnt78uQgh',
});

import { Server } from 'socket.io';
const io = new Server(2333, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

const gamePalyerNumArray = [2, 1, 1, 1, 1, 1, 1];

const gameMatchQueue = [[]];
const gameMatchSet = {};

const match = (gameId) => {
  // 匹配队列到所需长度时，先除去无效用户
  if (gameMatchQueue[gameId].length >= gamePalyerNumArray[gameId]) {
    const userSet = new Set();
    gameMatchQueue[gameId] = gameMatchQueue[gameId].filter((user) => {
      if (userSet.has(user)) {
        return false;
      } else {
        userSet.add(user);
        if (gameMatchSet[user] !== gameId) {
          return false;
        }
      }
      return true;
    });
  }
  console.log(gameMatchQueue[gameId]);
  // 如果匹配队列仍满足长度，为前一组用户创建房间并发送信息
  if (gameMatchQueue[gameId].length >= gamePalyerNumArray[gameId]) {
    // 创建房间，发送匹配消息，发送房间号
    let users = {};
    let order = [];
    for (let i = 0; i < gamePalyerNumArray[gameId]; i++) {
      order.unshift(gameMatchQueue[gameId].shift());
      users[order[0]] = true;
    }
    app
      .callFunction({
        name: 'room-C',
        data: {
          users: users,
          gameId: gameId,
        },
      })
      .then((res) => {
        for (const user in users) {
          console.log('匹配成功 用户为 ' + user);
          io.sockets.emit(user + '-match', {
            users: users,
            roomId: res.result.roomId,
            order: order,
          });
        }
      });
  }
};

io.on('connection', (socket) => {
  // 进入游戏房间的事件
  socket.on('game', (userName, gameId) => {
    console.log('用户 ' + userName + ' 进入了游戏 ID 为 ' + gameId + ' 的游戏');
    gameMatchSet[userName] = gameId;
    gameMatchQueue[gameId].push(userName);
    socket.on(userName + '-send', (args) => {
      io.sockets.emit(args.roomId + '-update', 'shouldUpdate');
    });
    socket.on(userName + '-game-update', (args) => {
      const { roomId, ...data } = { ...args };
      io.sockets.emit(roomId + '-game-update', data);
    });
    match(gameId);
  });

  // 进入聊天室的事件
  socket.on('chat', (userName) => {
    // 注册用户专属的事件
    socket.on(userName + '-send', (args) => {
      io.sockets.emit(args.roomId + '-update', 'shouldUpdate');
    });
    // 用户进入聊天室，返回他需要的数据
    app
      .callFunction({
        name: 'chat-R',
        data: {
          userName,
        },
      })
      .then((res) => {
        socket.emit(userName + '-chatList', res.result);
      });
  });
});
