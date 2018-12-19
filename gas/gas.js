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

//      ARRAYS
var indexes = ['CAD', 'MXN', 'USD'];

//      STRINGS/CHAR
var RapidAPI = "37145f54b9mshda39c23a63a99d9p11f1dajsn7ba7fab03fc0";
var currencyURL = "https://currency-exchange.p.rapidapi.com/exchange?q=1.0&from=";

//      BOOLEAN


// ------------------------------------------------------------

$(document).ready(function () {

    const rates = $("#rates");

    function updateScreen() {
        for (var i in indexes) {
            switch (i) {
                case '0':
                    var newIndex1 = $("<div>").attr('data-currency', 'cad2mxn').html('<b>$1 ' + indexes[i] + '</b> = $' + cad2mxn + ' ' + indexes[1]).appendTo(rates);
                    var newIndex2 = $("<div>").attr('data-currency', 'cad2usd').html('<b>$1 ' + indexes[i] + '</b> = $' + cad2usd + ' ' + indexes[2]).appendTo(rates);
                    break;

                case '1':
                    var newIndex1 = $("<div>").attr('data-currency', 'cad2mxn').html('<b>$1 ' + indexes[i] + '</b> = $' + mxn2cad + ' ' + indexes[0]).appendTo(rates);
                    var newIndex2 = $("<div>").attr('data-currency', 'cad2usd').html('<b>$1 ' + indexes[i] + '</b> = $' + mxn2usd + ' ' + indexes[2]).appendTo(rates);
                    break;

                case '2':
                    var newIndex1 = $("<div>").attr('data-currency', 'cad2mxn').html('<b>$1 ' + indexes[i] + '</b> = $' + usd2cad + ' ' + indexes[0]).appendTo(rates);
                    var newIndex2 = $("<div>").attr('data-currency', 'cad2usd').html('<b>$1 ' + indexes[i] + '</b> = $' + usd2mxn + ' ' + indexes[1]).appendTo(rates);
                    break;
            }
        }
    }

    function getIndex(from, to, saveTo) {

        $.ajax({
            url: currencyURL + from + "&to=" + to,
            headers: {
                "X-RapidAPI-Key": RapidAPI
            },
            method: "GET"
        }).then(function (response) {
            console.log(currencyURL + from + "&to=" + to);
            index = parseFloat(response).toFixed(4);
            console.log('Value of index: ' + index);
        });
        var xx = saveTo;
            // console.log('Value of index: ' + index);
    }

    // getIndex(indexes[0], indexes[1], cad2mxn);
    // getIndex(indexes[0], indexes[2], cad2usd);
    // getIndex(indexes[1], indexes[0], mxn2cad);
    // getIndex(indexes[1], indexes[2], mxn2usd);
    // getIndex(indexes[2], indexes[0], usd2cad);
    // getIndex(indexes[2], indexes[1], usd2mxn);

    var test = getIndex(indexes[0], indexes[1]);
    console.log('Value: ' + test);

    updateScreen();


    $.ajax({
        url: currencyURL + indexes[0] + "&to=" + indexes[1],
        headers: {
            "X-RapidAPI-Key": RapidAPI
        },
        method: "GET"
    }).then(function (response) {
        console.log(currencyURL + indexes[0] + "&to=" + indexes[1]);
        var index = parseFloat(response).toFixed(4);
        cad2mxn = index;
        console.log(index);
    });




});