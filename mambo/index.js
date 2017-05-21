/**
 * Created by yiseulcho on 5/3/17.
 */
const request = require('request');
const Drone = require('parrot-minidrone');
const Logger = require('winston');
const iotHubClient = require("./iotHubClient");

const drone = new Drone({
  autoconnect: true,
});

const externallyOwnerAccount = process.argv[2] || '0xe519926ab8a47455e38b2bd603723012de8f8371';
console.log("Using externally owned account " + externallyOwnerAccount);

// establish connection to Azure IoT Hubs
iotHubClient.init(externallyOwnerAccount);

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
      iotHubClient.sendEvent(5);
    }
  });
}

function collect_alert(){
  drone.on('AlertStateChanged', (state) => {
    Logger.info(`Alert state-index.js: ${state}`);

    // send 
    iotHubClient.sendEvent(2);
  });
}

function land(){
  Logger.info("Now in Land() function.")
  drone.land();
}

setTimeout(consume_battery, 3000);
setTimeout(collect_alert,3000);
setTimeout(land, 15000);

setTimeout(function()
{
   iotHubClient.sendEvent(2);
}, 2000);
