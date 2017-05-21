'use strict';
const EventHubClient = require('azure-event-hubs').Client;
const Web3 = require('web3');

const connectionString = 'HostName=VirtualBlackBox.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=SKKXIeInycoQDOdat9mXI+BcAxZuj1YxaCFzhtc3kvs=';
const gas = 1000000;

// create an instance of web3 using the HTTP provider.
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

let blackboxContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"testEvent","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"eventType","type":"uint8"},{"name":"severity","type":"int8"},{"name":"location","type":"string"},{"name":"time","type":"uint64"},{"name":"carId","type":"string"}],"name":"logEvent","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"observer","type":"address"},{"indexed":false,"name":"","type":"uint8"},{"indexed":false,"name":"Severity","type":"int8"},{"indexed":false,"name":"location","type":"string"},{"indexed":false,"name":"time","type":"uint64"},{"indexed":false,"name":"carId","type":"string"}],"name":"LogEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"observer","type":"address"}],"name":"TestEvent","type":"event"}])
.at('0xf71ca8f7a14aa5c929d5391994dce35b30078c3b');

const printError = function (err) {
  console.log(err.message);
};

const logEvent = function (message)
{
    console.log('About to log the following safety event to Ethereum: ' + JSON.stringify(message.body));

    // logEvent(LogType eventType, int8 severity, string location, uint64 time, string carId)
    blackboxContract.logEvent.sendTransaction(message.body.eventType, message.body.severity, message.body.location, message.body.time, message.body.deviceId,
        // TODO move EOA to parameter
        {from: '0xea7004f0f9d701a2bd29145979b62b9767719f49',
        gas:gas
        },
        function(err, response)
        {
            console.log(err, response);
        }
    );
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
                receiver.on('message', logEvent);
            });
        });
    })
    .catch(printError);
