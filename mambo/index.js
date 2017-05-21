/**
 * Created by yiseulcho on 5/3/17.
 */
const request = require('request');
const Drone = require('parrot-minidrone');
const Logger = require('winston');
const clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
const Message = require('azure-iot-device').Message;

const drone = new Drone({
  autoconnect: true,
});

// TODO move this into a separate file/module
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

// TODO async and wait until the connection is done.
// for noe we just need to hope the IoT Huv connection is opened before an alert
client.open(connectCallback);

// connected & take off

drone.on('connected', () => {
  drone.takeOff();
});

// 1) Log the 1st battery level data
// 2) Flip until the battery level drops x%
// 3) Warning about critical battery level
// 4) landing
// 5) Corda payment

var flipped=false;

function consume_battery(){
  drone.on('flightStatusChange', (status) => {
    Logger.info(`Flying status-index.js: ${status}`);
    if (status === 'hovering') {
      var bl = drone.getBatteryLevel();
      Logger.info(`Battery Level-index.js: ${bl}%`);
    }
    if (status == 'emergency'){
      // RPC w/ Blockbox
    }
  });
}

function collect_alert(){
  drone.on('AlertStateChanged', (state) => {
    Logger.info(`Alert state-index.js: ${state}`);
    
    //LogType eventType, int8 severity, string location, uint64 time, string carId
    const data = JSON.stringify({
        deviceId: 'testParrotMinidrone',
        eventType: 1,
        severity: 3,
        location: "40.758438 -73.978912",
        time: 1495352317});

    const message = new Message(data);

    console.log("Sending message: " + message.getData());

    client.sendEvent(message, printResultFor('send'));
  });
}

function land(){
  Logger.info("Now in Land() function.")
  drone.land();
}

setTimeout(consume_battery, 3000);
setTimeout(collect_alert,3000);
setTimeout(land, 15000);

