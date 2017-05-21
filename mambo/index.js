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

const externallyOwnerAccount = process.argv[2];

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
var landingcalled=false;

function consume_battery(){
  drone.on('flightStatusChange', (status) => {
    Logger.info(`Flying status-index.js: ${status}`);
    if (status === 'hovering') {
      var bl = drone.getBatteryLevel();
      Logger.info(`Battery Level-index.js: ${bl}%`);
    }
    if (status == 'landed' ){
      if (!landingcalled){
        drone.takeOff();
        Logger.info(`takeoff called again - index.js`);
      }
    }
    if (status == 'emergency')
    {
      // Send blockchain transactions
      iotHubClient.sendEvent(4);
      landingcalled = true;
    }
  });
}

function collect_alert(){
  drone.on('AlertStateChanged', (state) => {
    Logger.info(`Alert state-index.js: ${state}`);

    // Send blockchain transactions
    iotHubClient.sendEvent(2);
  });
}

function land(){
  Logger.info("Now in Land() function.")
  drone.land();
  landingcalled = true;
}

setTimeout(consume_battery, 3000);
setTimeout(collect_alert,3000);
setTimeout(land, 25000);

// setTimeout(function()
// {
//    iotHubClient.sendEvent(2);
// }, 2000);
