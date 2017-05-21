'use strict';
const Web3 = require('web3');

const host = "localhost";
const port = "8545";
const defaultContractAddress = "0x4c26fc9869646998b7ae1b88fb6c103757a660a6"
const gas = 1000000;

// create an instance of web3 using the HTTP provider.
const web3 = new Web3(new Web3.providers.HttpProvider(`http://${host}:${port}`));
let blackboxContract;

function init(contractAddress)
{
    const blockboxContractAddress = contractAddress || defaultContractAddress;

    blackboxContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"eventType","type":"string"},{"name":"severity","type":"int8"},{"name":"latitude","type":"string"},{"name":"longitude","type":"string"},{"name":"time","type":"uint64"},{"name":"vehicleId","type":"string"}],"name":"logEvent","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"observer","type":"address"},{"indexed":false,"name":"logType","type":"string"},{"indexed":false,"name":"Severity","type":"int8"},{"indexed":false,"name":"latitude","type":"string"},{"indexed":false,"name":"longitude","type":"string"},{"indexed":false,"name":"time","type":"uint64"},{"indexed":false,"name":"vehicleId","type":"string"}],"name":"LogEvent","type":"event"}])
        .at(blockboxContractAddress);
}

function logEvent(message)
{
    console.log('About to log the following safety event to Ethereum: ' + JSON.stringify(message.body));

    console.log("message.body.eventType = " + message.body.eventType);
    console.log("message.body.severity = " + message.body.severity);
    console.log("message.body.latitude = " + message.body.latitude);
    console.log("message.body.longitude = " + message.body.longitude);
    console.log("message.body.time = " + message.body.time);
    console.log("message.body.deviceId = " + message.body.deviceId);
    console.log("message.body.externallyOwnerAccount = " + message.body.externallyOwnerAccount);

    if (!message.body.externallyOwnerAccount)
    {
        return console.log("No externally owned account passed from device");
    }

    // logEvent(LogType eventType, int8 severity, string location, uint64 time, string carId)
    blackboxContract.logEvent.sendTransaction(message.body.eventType, message.body.severity, message.body.latitude, message.body.longitude, message.body.time, message.body.deviceId,
        {from: message.body.externallyOwnerAccount,
        gas: gas
        },
        function(err, response)
        {
            if (err)
            {
                return console.log("Failed to send transaction to geth. Error: " + err);
            }

            console.log("Call to geth was successful. Response: " + response);
        }
    );
};

module.exports.init = init;
module.exports.logEvent = logEvent;