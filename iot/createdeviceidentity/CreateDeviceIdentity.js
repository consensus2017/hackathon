'use strict';

const iothub = require('azure-iothub');

const connectionString = 'HostName=VirtualBlackBox.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=SKKXIeInycoQDOdat9mXI+BcAxZuj1YxaCFzhtc3kvs=';

const registry = iothub.Registry.fromConnectionString(connectionString);

const device = new iothub.Device(null);
device.deviceId = 'testParrotMinidrone';
registry.create(device, function(err, deviceInfo, res) {
  if (err) {
    registry.get(device.deviceId, printDeviceInfo);
  }
  if (deviceInfo) {
    printDeviceInfo(err, deviceInfo, res)
  }
});

function printDeviceInfo(err, deviceInfo, res) {
  if (deviceInfo) {
    console.log('Device ID: ' + deviceInfo.deviceId);
    console.log('Device key: ' + deviceInfo.authentication.symmetricKey.primaryKey);
  }
}