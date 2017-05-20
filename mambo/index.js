/**
 * Created by yiseulcho on 5/3/17.
 */
const request = require('request');
const Drone = require('parrot-minidrone');
const Logger = require('winston');
const drone = new Drone({
  autoconnect: true,
});

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
  });
}

function land(){
  Logger.info("Now in Land() function.")
  drone.land();
}



setTimeout(consume_battery, 3000);
setTimeout(collect_alert,3000);
setTimeout(land, 15000);



