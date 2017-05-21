if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

var accounts = web3.eth.accounts;
console.log(accounts);

var coinbase = web3.eth.coinbase;
console.log(coinbase);

var balance = web3.eth.getBalance(coinbase);
console.log(balance.toString(10));

// define contract object
var BlockBox = web3.eth.contract([{"constant":false,"inputs":[],"name":"testEvent","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"eventType","type":"string"},{"name":"severity","type":"uint256"},{"name":"location","type":"string"},{"name":"time","type":"uint256"},{"name":"carId","type":"string"}],"name":"logEvent","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"observer","type":"address"},{"indexed":false,"name":"EventType","type":"string"},{"indexed":false,"name":"Severity","type":"uint256"},{"indexed":false,"name":"location","type":"string"},{"indexed":false,"name":"time","type":"uint256"},{"indexed":false,"name":"carId","type":"string"}],"name":"LogEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"observer","type":"address"}],"name":"TestEvent","type":"event"}]);
// instantiate by address
var blockbox = BlockBox.at("0x8ad00979f3879295f855d44a1c95ae6a41772766");

// define events object for all contract events
var events = blockbox.allEvents();

// watch for events
events.watch(function(error, event){
  if (!error)
    console.log(event);
    var eventType = event.args.EventType;
    var eventTime = new Date(event.args.time.c[0]).toString();
    var severity = event.args.Severity.c[0];
    var severityString;
    if (severity <= 1) {
      severityString = "low"
    } else if (severity <= 3) {
      severityString = "medium"
    } else {
      severityString = "high"
    }
    var location = event.args.location;
    var observer = event.args.observer;
    var carId = event.args.carId;
    console.log("New " + eventType + " event recorded at " + eventTime + " located at " + location + " with a " + severityString + " severity rating")
    var $div = $("<div>", {"class": "tokenWrap"});
    $("#eventList").append($div);
    var $time = $("<div>", {id: "time"});
    $time.html("Time: "+eventTime);
    $div.append($time);
    var $location = $("<div>", {id: "location"});
    $location.html("Location: "+location);
    $div.append($location);
    var $type = $("<div>", {id: "type"});
    $type.html("Type: "+eventType);
    $div.append($type);
    var $severity = $("<div>", {id: "severity"});
    $severity.html("Severity: "+severityString);
    $div.append($severity);
    var $carId = $("<div>", {id: "carId"});
    $carId.html("Vehicle ID: "+carId);
    $div.append($carId);
    var $observer = $("<div>", {id: "observer"});
    $observer.html("Observer EOA: "+observer);
    $div.append($observer);
});

jQuery(document).ready(function () {
    var blueToken = $('.blueSection .value').text();
    var redToken = $('.RedSection .value').text();
    $('.eoa').each(function(i){
      $(this).text(accounts[i]);
    });
    $('.value').each(function(i){
      $(this).text(web3.eth.getBalance(accounts[i]));
    });
    var trigger = 0;
    $('.stepheader .carButton').click(function () {
        if (trigger == 0) {
            $('.animationSection .carTrack.carTrack2 .blueCar').addClass('firstStep');
            trigger++;
        } else if (trigger == 1) {
            $('.animationSection .carTrack.carTrack2 .blueCar').addClass('secondStep');
            $('.section3 img').addClass('active');
            var time = Date.now();
            logEvent('Indicator', 3, '30 Rockefeller Pl', time, coinbase.toString());
            setTimeout(function () {
                var totalBlueToken = parseInt(blueToken) - 1;
                var totalRedToken = parseInt(redToken) + 1;
                $('.blueSection .value').text(totalBlueToken);
                $('.RedSection .value').text(totalRedToken);
            }, 2000);
        }
    });
    $('.stepheader .restcarButton').click(function () {
        $('.animationSection .carTrack.carTrack2 .blueCar').removeClass('firstStep secondStep');
        $('.section3 img').removeClass('active');
        $('.blueSection .value').text(blueToken);
        $('.RedSection .value').text(redToken);
        trigger = 0;
    });
});

function logEvent(type, severity, location, time, car_id){
  blockbox.logEvent.sendTransaction(type, severity, location, time, car_id, {'from': coinbase}, function(error, result){
    if(!error) {
      console.log(result)
    } else {
      console.log(error)
    }
  });
}
