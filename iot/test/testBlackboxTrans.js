const Web3 = require('web3');

//const host = "52.184.156.8";
const host = "localhost";
const port = "8545";

// create an instance of web3 using the HTTP provider.
const web3 = new Web3(new Web3.providers.HttpProvider(`http://${host}:${port}`));

let deployed = web3.eth.contract([{"constant":false,"inputs":[{"name":"eventType","type":"string"},{"name":"severity","type":"int8"},{"name":"latitude","type":"string"},{"name":"longitude","type":"string"},{"name":"time","type":"uint64"},{"name":"vehicleId","type":"string"}],"name":"logEvent","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"observer","type":"address"},{"indexed":false,"name":"logType","type":"string"},{"indexed":false,"name":"Severity","type":"int8"},{"indexed":false,"name":"latitude","type":"string"},{"indexed":false,"name":"longitude","type":"string"},{"indexed":false,"name":"time","type":"uint64"},{"indexed":false,"name":"vehicleId","type":"string"}],"name":"LogEvent","type":"event"}])
.at('0x4c26fc9869646998b7ae1b88fb6c103757a660a6');

//logEvent(string eventType, int8 severity, string latitude, string longitude, uint64 time, string vehicleId)
deployed.logEvent.sendTransaction(1, 5, "40.758438", "-73.978912", Date.now(), "drone id",
    {from: '0xea05224ff34bc59a103c85c96ae1ec16431e4fcc',
     gas:1000000
    },
    function(err, response)
    {
        console.log(err, response);
    }
);
