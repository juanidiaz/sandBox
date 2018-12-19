// VARIABLES --------------------------------------------

//      OBJECTS

//      NUMBER/INTEGER
var index = 0;
var cad2mxn = 0;
var cad2usd = 0;
var mxn2cad = 0;
var mxn2usd = 0;
var usd2cad = 0;
var usd2mxn = 0;
const ltr2gal = 0.264172;
const gal2ltr = 1 / ltr2gal;

//      ARRAYS
var indexes = ['CAD', 'MXN', 'USD'];

//      STRINGS/CHAR
var RapidAPI = "37145f54b9mshda39c23a63a99d9p11f1dajsn7ba7fab03fc0";
var currencyURL = "https://currency-exchange.p.rapidapi.com/exchange?q=1.0&from=";

//      BOOLEAN


// ------------------------------------------------------------

$(document).ready(function () {

    const rates = $("#rates");
    const convert = $("#convert");

    $('#update').on('click', function () {
        getIndexes();
    })

    $('.price').on('input', function () {
        var value = parseFloat(this.value);
        console.log(value);
        var priceType = this.id;
        console.log(this.id);
        var calculation = 0;
        switch (priceType) {
            case 'cadpl':
                $('#cadpl').css('color', 'red');
                $('#mxnpl').css('color', 'black').val((value * cad2mxn).toFixed(2));
                $('#usdpg').css('color', 'black').val(((value * cad2usd) / ltr2gal).toFixed(2));
                break;

            case 'mxnpl':
                $('#cadpl').css('color', 'black').val((value * mxn2cad).toFixed(2));
                $('#mxnpl').css('color', 'red');
                $('#usdpg').css('color', 'black').val(((value * mxn2usd) / ltr2gal).toFixed(2));
                break;

            case 'usdpg':
                $('#cadpl').css('color', 'black').val(((value * usd2cad) / gal2ltr).toFixed(2));
                $('#mxnpl').css('color', 'black').val(((value * usd2mxn) / gal2ltr).toFixed(2));
                $('#usdpg').css('color', 'red');
                break;
        }
    })

    function getIndexes() {

        rates.empty();

        var dt = new Date();
        rates.append('<b>Last update: </b>' + dt);

        // Get CAD2MXN
        $.ajax({
            url: currencyURL + indexes[0] + "&to=" + indexes[1],
            headers: {
                "X-RapidAPI-Key": RapidAPI
            },
            method: "GET"
        }).then(function (response) {
            index = parseFloat(response).toFixed(4);
            console.log("cad2mxn: " + index);
            cad2mxn = index;
            var newIndex1 = $("<div>").attr('data-currency', 'cad2mxn').html('<b>$1 ' + indexes[0] + '</b> = $' + cad2mxn + ' ' + indexes[1]).appendTo(rates);
        });

        // Get CAD2USD
        $.ajax({
            url: currencyURL + indexes[0] + "&to=" + indexes[2],
            headers: {
                "X-RapidAPI-Key": RapidAPI
            },
            method: "GET"
        }).then(function (response) {
            index = parseFloat(response).toFixed(4);
            console.log("cad2usd: " + index);
            cad2usd = index;
            var newIndex2 = $("<div>").attr('data-currency', 'cad2usd').html('<b>$1 ' + indexes[0] + '</b> = $' + cad2usd + ' ' + indexes[2]).appendTo(rates);
        });

        // Get MXN2CAD
        $.ajax({
            url: currencyURL + indexes[1] + "&to=" + indexes[0],
            headers: {
                "X-RapidAPI-Key": RapidAPI
            },
            method: "GET"
        }).then(function (response) {
            index = parseFloat(response).toFixed(4);
            console.log("mxn2cad: " + index);
            mxn2cad = index;
            var newIndex3 = $("<div>").attr('data-currency', 'cad2mxn').html('<b>$1 ' + indexes[1] + '</b> = $' + mxn2cad + ' ' + indexes[0]).appendTo(rates);
        });

        // Get MXN2USD
        $.ajax({
            url: currencyURL + indexes[1] + "&to=" + indexes[2],
            headers: {
                "X-RapidAPI-Key": RapidAPI
            },
            method: "GET"
        }).then(function (response) {
            index = parseFloat(response).toFixed(4);
            console.log("mxn2usd: " + index);
            mxn2usd = index;
            var newIndex4 = $("<div>").attr('data-currency', 'cad2usd').html('<b>$1 ' + indexes[1] + '</b> = $' + mxn2usd + ' ' + indexes[2]).appendTo(rates);
        });

        // Get USD2CAD
        $.ajax({
            url: currencyURL + indexes[2] + "&to=" + indexes[0],
            headers: {
                "X-RapidAPI-Key": RapidAPI
            },
            method: "GET"
        }).then(function (response) {
            index = parseFloat(response).toFixed(4);
            console.log("usd2cad: " + index);
            usd2cad = index;
            var newIndex5 = $("<div>").attr('data-currency', 'cad2mxn').html('<b>$1 ' + indexes[2] + '</b> = $' + usd2cad + ' ' + indexes[0]).appendTo(rates);
        });

        // Get USD2MXN
        $.ajax({
            url: currencyURL + indexes[2] + "&to=" + indexes[1],
            headers: {
                "X-RapidAPI-Key": RapidAPI
            },
            method: "GET"
        }).then(function (response) {
            index = parseFloat(response).toFixed(4);
            console.log("usd2mxn: " + index);
            usd2mxn = index;
            var newIndex6 = $("<div>").attr('data-currency', 'cad2usd').html('<b>$1 ' + indexes[2] + '</b> = $' + usd2mxn + ' ' + indexes[1]).appendTo(rates);
        });
    }
    getIndexes();
});