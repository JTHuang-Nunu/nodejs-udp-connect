var udp = require('dgram');

var serverAddr = {
    address: '192.168.1.115',
    port: '2222'
}

var clientAddr = {
    address: '192.168.1.115',
    port: '55555'
}
// creating a client socket
var client = udp.createSocket('udp4');
client.bind(clientAddr);

//buffer msg
var data = Buffer.from('I am a client');

//sending msg
client.send(data, serverAddr.port, serverAddr.address, function (error) {
    if (error) {
        client.close();
    } else {
        console.log('Data sent !!!');
    }
});

var data1 = Buffer.from('hello');
var data2 = Buffer.from('world');

//sending multiple msg
client.send([data1, data2], serverAddr.port, serverAddr.address, function (error) {
    if (error) {
        client.close();
    } else {
        console.log('Data sent !!!');
    }
});

client.on('message', function (msg, info) {
    console.log('Data received from server : ' + msg.toString());
    console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);
});

client.on('listening', function () {
    var address = client.address();
    var port = address.port;
    var family = address.family;
    var ipaddr = address.address;
    console.log('client is listening at port' + port);
    console.log('client ip :' + ipaddr);
    console.log('client is IP4/IP6 : ' + family);
});