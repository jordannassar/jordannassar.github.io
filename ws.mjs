import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
let messages = [];
wss.on('connection', function connection(ws) {
  messages.forEach(message => {
    ws.send(JSON.stringify({
      type: 'message',
      value: {
        message: message.message,
        username: message.username
      }
    }));
  });
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
    data = JSON.parse(data.toString());
    if(data.type === 'message'){
      messages.push({message: data.value, username: ws.username});
      wss.clients.forEach(client => {
          if(client.OPEN && client !== ws){
            client.send(JSON.stringify({
              type: 'message',
              value: {
                message: data.value,
                username: ws.username
              }
            }));
          }
      });
    } else if(data.type === 'username'){
      ws.username = data.value;
    }
  });
});