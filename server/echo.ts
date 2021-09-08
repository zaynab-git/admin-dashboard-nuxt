
var wss = new (require('ws')).Server({port: (process.env.PORT || 8080)});
var users: { [key: string]: any } = {};
var msgpack = require('@msgpack/msgpack');


console.log('listening on port: ' + 8080);

wss.on('connection', function connection(ws: any, req: any) {
    var userID: string = req.url.substr(1);
    users[userID] = ws;
    console.log(userID);
    var receiver: any;
    if ('support' in users) {
        users['support'].send(msgpack.encode({header: 'users',message: Object.keys(users)}))
    }
    
	ws.on('message', function(message: any) {

        var msg = msgpack.decode(message);
		console.log(msg);

        if ( msg['sender'] in users ) {
            receiver = users[msg['sender']];
            receiver.send(msgpack.encode({header: 'message',message: msg} as object));
            if ( msg['receiver'] in users ) {
                receiver = users[msg['receiver']];
                receiver.send(msgpack.encode({header: 'message',message: msg} as object));
            }
        }
	});

	console.log('new client connected!');

});