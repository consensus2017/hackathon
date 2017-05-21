if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://52.184.156.8:8545"));
}

var accounts = web3.eth.accounts;
console.log(accounts);

var coinbase = web3.eth.coinbase;
console.log(coinbase);

var balance = web3.eth.getBalance(coinbase);
console.log(balance.toString(10));

// define contract object
var BlockBox = web3.eth.contract([{"constant":false,"inputs":[],"name":"testEvent","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"eventType","type":"string"},{"name":"severity","type":"uint256"},{"name":"speed","type":"uint256"},{"name":"location","type":"string"},{"name":"time","type":"uint256"},{"name":"carId","type":"string"}],"name":"logEvent","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"observer","type":"address"},{"indexed":false,"name":"EventType","type":"string"},{"indexed":false,"name":"Severity","type":"uint256"},{"indexed":false,"name":"Speed","type":"uint256"},{"indexed":false,"name":"location","type":"string"},{"indexed":false,"name":"time","type":"uint256"},{"indexed":false,"name":"carId","type":"string"}],"name":"LogEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"observer","type":"address"}],"name":"TestEvent","type":"event"}]);
// instantiate by address
var blockbox = BlockBox.at("0x44d86cefb22485d4ae24fd0898b2084c3a53107a");

// define events object for all contract events
var events = blockbox.allEvents();

// watch for events
events.watch(function(error, event){
  if (!error)
    console.log(event);
    addEvent(event);
});

jQuery(document).ready(function () {
    var blueToken = $('.blueSection .value').text();
    var redToken = $('.RedSection .value').text();
    $('.eoa').each(function(i){
      $(this).text(accounts[i+1]);
    });
    // $('.value').each(function(i){
    //   $(this).text(web3.eth.getBalance(accounts[i]));
    // });
    var trigger = 0;
    $('.stepheader .carButton').click(function () {
      var time = Date.now();
        if (trigger == 0) {
            $('.animationSection .carTrack.carTrack2 .blueCar').addClass('firstStep');
            logEvent('Speeding', 2, 120, '30 Rockefeller Pl', time, $('.vid').text(), accounts[1]);
            trigger++;
        } else if (trigger == 1) {
            $('.animationSection .carTrack.carTrack2 .blueCar').addClass('secondStep');
            $('.section3 img').addClass('active');
            logEvent('Merging', 1, 80, '30 Rockefeller Pl', time, $('.vid').text(), accounts[1]);
            setTimeout(function () {
              logEvent('Tailgating', 4, 80, '30 Rockefeller Pl', time, $('.vid').text(), accounts[2]);
            }, 3000);
            trigger++;
        } else if (trigger == 2) {

        }
    });
    $('.stepheader .restcarButton').click(function () {
        $('.animationSection .carTrack.carTrack2 .blueCar').removeClass('firstStep secondStep');
        $('.section3 img').removeClass('active');
        $('#eventList').html("<h2>Events Log</h2>");
        $('.blueSection .value').text(blueToken);
        $('.RedSection .value').text(redToken);
        trigger = 0;
    });
});

function logEvent(type, severity, speed, location, time, car_id, fromAddr){
  blockbox.logEvent.sendTransaction(type, severity, speed, location, time, car_id, {'from': fromAddr}, function(error, result){
    if(!error) {
      console.log(result)
    } else {
      console.log(error)
    }
  });
}

function addEvent(event){
  var blockNum = event.blockNumber;
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
  var speed = event.args.Speed.c[0];
  var location = event.args.location;
  var observer = event.args.observer;
  var carId = event.args.carId;
  console.log("New " + eventType + " event recorded at " + eventTime + " located at " + location + " with a " + severityString + " severity rating")
  var $div = $("<div>", {"class": "tokenWrap panel panel-default"});
  $("#eventList").append($div);
  var $head = $("<div>", {"class": "panel-heading"});
  $div.append($head);
  var $body = $("<div>", {"class": "panel-body"});
  $div.append($body);
  var $block = $("<div>", {id: "block"});
  $block.html("Block Number: "+blockNum);
  $head.append($block);
  var $time = $("<div>", {id: "time"});
  $time.html("Event: "+eventTime);
  $body.append($time);
  var $location = $("<div>", {id: "location"});
  $location.html("Location: "+location);
  $body.append($location);
  var $type = $("<div>", {id: "type"});
  $type.html("Type: "+eventType);
  $body.append($type);
  var $severity = $("<div>", {id: "severity"});
  $severity.html("Severity: "+severityString);
  $body.append($severity);
  var $speed = $("<div>", {id: "speed"});
  $speed.html("Speed: "+speed+" km/h");
  $body.append($speed);
  var $carId = $("<div>", {id: "carId"});
  $carId.html("Vehicle ID: "+carId);
  $body.append($carId);
  var $observer = $("<div>", {id: "observer"});
  $observer.html("Observer ETH Address: "+observer);
  $body.append($observer);
}
