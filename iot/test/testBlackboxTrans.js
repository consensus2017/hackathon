const Web3 = require('web3');

const host = "52.184.156.8";
//const host = "localhost";
const port = "8545";

// create an instance of web3 using the HTTP provider.
const web3 = new Web3(new Web3.providers.HttpProvider(`http://${host}:${port}`));

let deployed = web3.eth.contract([{"constant":false,"inputs":[{"name":"eventType","type":"string"},{"name":"severity","type":"int8"},{"name":"latitude","type":"string"},{"name":"longitude","type":"string"},{"name":"time","type":"uint64"},{"name":"vehicleId","type":"string"}],"name":"logEvent","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"observer","type":"address"},{"indexed":false,"name":"logType","type":"string"},{"indexed":false,"name":"Severity","type":"int8"},{"indexed":false,"name":"latitude","type":"string"},{"indexed":false,"name":"longitude","type":"string"},{"indexed":false,"name":"time","type":"uint64"},{"indexed":false,"name":"vehicleId","type":"string"}],"name":"LogEvent","type":"event"}])
.at('0x70090d6c6f53144918edc14c1ca00625249e87c5');

//logEvent(string eventType, int8 severity, string latitude, string longitude, uint64 time, string vehicleId)
deployed.logEvent.sendTransaction(1, 5, "40.758438", "-73.978912", Date.now(), "drone id",
    {from: '0x2b302b83bb4908329d36b577fe8084bbd1498326',
     gas:1000000
    },
    function(err, response)
    {
        console.log(err, response);
    }
);
