'use strict';

const clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
const Message = require('azure-iot-device').Message;

// connect to IoT Hub
const connectionString = 'HostName=VirtualBlackBox.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=SKKXIeInycoQDOdat9mXI+BcAxZuj1YxaCFzhtc3kvs=;DeviceId=testParrotMinidrone;SharedAccessKey=4X7xwgXk+AsjLV5qpKlsuDbTJ7PgWBxyAuWjav8dxME=';
const client = clientFromConnectionString(connectionString);

var connectCallback = function (err) {
  if (err) {
    console.log('Could not connect: ' + err);
  } else {
    console.log('Client connected');
  }
};

let externallyOwnerAccount;

function init(eoa)
{
    // TODO async and wait until the connection is done.
    // for noe we just need to hope the IoT Huv connection is opened before an alert
    client.open(connectCallback);

    externallyOwnerAccount = eoa;
}

function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}

function sendEvent(severity)
{
    //LogType eventType, int8 severity, string location, uint64 time, string carId
    const data = JSON.stringify({
        deviceId: 'testParrotMinidrone',
        eventType: 1,
        severity: severity,
        latitude: "40.758438",
        longatude: "-73.978912",
        time: Date.now(),
        externallyOwnerAccount: externallyOwnerAccount});

    const message = new Message(data);

    console.log("Sending message: " + message.getData());

    client.sendEvent(message, printResultFor('send'));
}

module.exports.init = init;
module.exports.sendEvent = sendEvent;
