const Web3 = require('web3');
// create an instance of web3 using the HTTP provider.
// NOTE in mist web3 is already available, so check first if its available before instantiating
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

let deployed = web3.eth.contract([{"constant":false,"inputs":[{"name":"eventType","type":"uint8"},{"name":"severity","type":"int8"},{"name":"location","type":"string"},{"name":"time","type":"uint64"},{"name":"carId","type":"string"}],"name":"logEvent","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"observer","type":"address"},{"indexed":false,"name":"","type":"uint8"},{"indexed":false,"name":"Severity","type":"int8"},{"indexed":false,"name":"location","type":"string"},{"indexed":false,"name":"time","type":"uint64"},{"indexed":false,"name":"carId","type":"string"}],"name":"LogEvent","type":"event"}])
.at('0x333be06ba8bb38c3f137a09015a66f02807b9501');
//console.log(deployed);

// logEvent(LogType eventType, int8 severity, string location, uint64 time, string carId)
deployed.logEvent.sendTransaction(1, 5, "blah", 12342435, "drine id", function(err, response)
{
    console.log(err, response);
});

