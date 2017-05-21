'use strict';
const BlockboxEthClient = require('./BlockboxEthClient');
const EventHubClient = require('azure-event-hubs').Client;
const Web3 = require('web3');

const connectionString = 'HostName=VirtualBlackBox.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=SKKXIeInycoQDOdat9mXI+BcAxZuj1YxaCFzhtc3kvs=';

// create an instance of web3 using the HTTP provider.
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

BlockboxEthClient.init();

const printError = function (err) {
  console.log(err.message);
};

const client = EventHubClient.fromConnectionString(connectionString);
client.open()
    .then(client.getPartitionIds.bind(client))
    .then(function (partitionIds) {
        return partitionIds.map(function (partitionId) {
            return client.createReceiver('$Default', partitionId, { 'startAfterTime' : Date.now()}).then(function(receiver) {
                console.log('Created partition receiver: ' + partitionId)
                receiver.on('errorReceived', printError);
                // TODO this should really put a message on a queue or service bus for processing by a web job
                receiver.on('message', BlockboxEthClient.logEvent);
            });
        });
    })
    .catch(printError);
