'use strict';

const EventHubClient = require('azure-event-hubs').Client;

const connectionString = 'HostName=VirtualBlackBox.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=SKKXIeInycoQDOdat9mXI+BcAxZuj1YxaCFzhtc3kvs=';

const printError = function (err) {
  console.log(err.message);
};

const printMessage = function (message) {
  console.log('Message received: ');
  console.log(JSON.stringify(message.body));
  console.log('');
};

const client = EventHubClient.fromConnectionString(connectionString);
client.open()
    .then(client.getPartitionIds.bind(client))
    .then(function (partitionIds) {
        return partitionIds.map(function (partitionId) {
            return client.createReceiver('$Default', partitionId, { 'startAfterTime' : Date.now()}).then(function(receiver) {
                console.log('Created partition receiver: ' + partitionId)
                receiver.on('errorReceived', printError);
                receiver.on('message', printMessage);
            });
        });
    })
    .catch(printError);
