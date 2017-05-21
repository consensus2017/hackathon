'use strict';
const Web3 = require('web3');

const gas = 1000000;

// create an instance of web3 using the HTTP provider.
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
let blackboxContract;

function init(contractAddress)
{
    const blockboxContractAddress = contractAddress || '0xf71ca8f7a14aa5c929d5391994dce35b30078c3b';

    blackboxContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"testEvent","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"eventType","type":"uint8"},{"name":"severity","type":"int8"},{"name":"location","type":"string"},{"name":"time","type":"uint64"},{"name":"carId","type":"string"}],"name":"logEvent","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"observer","type":"address"},{"indexed":false,"name":"","type":"uint8"},{"indexed":false,"name":"Severity","type":"int8"},{"indexed":false,"name":"location","type":"string"},{"indexed":false,"name":"time","type":"uint64"},{"indexed":false,"name":"carId","type":"string"}],"name":"LogEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"observer","type":"address"}],"name":"TestEvent","type":"event"}])
        .at(blockboxContractAddress);
}

function logEvent(message)
{
    console.log('About to log the following safety event to Ethereum: ' + JSON.stringify(message.body));

    if (!message.body.externallyOwnerAccount)
    {
        return console.log("No externally owned account passed from device");
    }

    // logEvent(LogType eventType, int8 severity, string location, uint64 time, string carId)
    blackboxContract.logEvent.sendTransaction(message.body.eventType, message.body.severity, message.body.location, message.body.time, message.body.deviceId,
        // TODO move EOA to parameter
        {from: message.body.externallyOwnerAccount,
        gas:gas
        },
        function(err, response)
        {
            console.log(err, response);
        }
    );
};

module.exports.init = init;
module.exports.logEvent = logEvent;