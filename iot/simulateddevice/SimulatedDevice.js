'use strict';

const clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
const Message = require('azure-iot-device').Message;

const connectionString = 'HostName=VirtualBlackBox.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=SKKXIeInycoQDOdat9mXI+BcAxZuj1YxaCFzhtc3kvs=;DeviceId=testParrotMinidrone;SharedAccessKey=4X7xwgXk+AsjLV5qpKlsuDbTJ7PgWBxyAuWjav8dxME=';

const client = clientFromConnectionString(connectionString);

const externallyOwnerAccount = process.argv[2] || '0x2b302b83bb4908329d36b577fe8084bbd1498326';

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
            latitude: "40.758438",
            longitude: "-73.978912",
            time: Date.now(),
            externallyOwnerAccount: externallyOwnerAccount
          });

        const message = new Message(data);

        console.log("Sending message: " + message.getData());

        //client.sendEvent(message, printResultFor('send'));
        client.sendEvent(message, function(err, res) {
          console.log(err, res);
        });
    }, 1000);
  }
};

client.open(connectCallback);