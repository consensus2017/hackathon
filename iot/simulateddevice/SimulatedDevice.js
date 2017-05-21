'use strict';

const clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
const Message = require('azure-iot-device').Message;

const connectionString = 'HostName=VirtualBlackBox.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=SKKXIeInycoQDOdat9mXI+BcAxZuj1YxaCFzhtc3kvs=;DeviceId=testParrotMinidrone;SharedAccessKey=4X7xwgXk+AsjLV5qpKlsuDbTJ7PgWBxyAuWjav8dxME=';

const client = clientFromConnectionString(connectionString);

function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}

var connectCallback = function (err) {
  if (err) {
    console.log('Could not connect: ' + err);
  } else {
    console.log('Client connected');

    // Create a message and send it to the IoT Hub every second
    setInterval(function()
    {
        //LogType eventType, int8 severity, string location, uint64 time, string carId
        const data = JSON.stringify({
            deviceId: 'testParrotMinidrone',
            eventType: 1,
            severity: 3,
            location: "40.758438 -73.978912",
            time: 1495352317});

        const message = new Message(data);
        message.properties.add('severityProp', 3);

        console.log("Sending message: " + message.getData());

        client.sendEvent(message, printResultFor('send'));
    }, 1000);
  }
};

client.open(connectCallback);