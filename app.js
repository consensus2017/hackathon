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
