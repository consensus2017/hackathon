const Web3 = require('web3');
// create an instance of web3 using the HTTP provider.
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

let deployed = web3.eth.contract([{"constant":false,"inputs":[{"name":"eventType","type":"string"},{"name":"severity","type":"int8"},{"name":"latitude","type":"string"},{"name":"longitude","type":"string"},{"name":"time","type":"uint64"},{"name":"vehicleId","type":"string"}],"name":"logEvent","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"observer","type":"address"},{"indexed":false,"name":"logType","type":"string"},{"indexed":false,"name":"Severity","type":"int8"},{"indexed":false,"name":"latitude","type":"string"},{"indexed":false,"name":"longitude","type":"string"},{"indexed":false,"name":"time","type":"uint64"},{"indexed":false,"name":"vehicleId","type":"string"}],"name":"LogEvent","type":"event"}])
.at('0x522ecd1b07d13d3dd96886936f5ab5ec641c0d65');

//logEvent(string eventType, int8 severity, string latitude, string longitude, uint64 time, string vehicleId)
deployed.logEvent.sendTransaction(1, 5, "40.758438", "-73.978912", Date.now(), "drone id",
    {from: '0x51d5d0a51579f00988ec40edc04c591ad96fe1e6',
     gas:1000000
    },
    function(err, response)
    {
        console.log(err, response);
    }
);
