// VARIABLES --------------------------------------------

//      OBJECTS



//      ARRAYS



//      STRINGS/CHAR
var key = "37145f54b9mshda39c23a63a99d9p11f1dajsn7ba7fab03fc0";
var currencyURL = "https://currency-exchange.p.rapidapi.com/exchange?q=1.0&from=CAD&to=USD";



//      NUMBER/INTEGER



//      BOOLEAN



// ------------------------------------------------------------

$(document).ready(function () {

    function getIndex(from, to) {
        $.ajax({
            url: "https://currency-exchange.p.rapidapi.com/exchange?q=1.0&from=" + from.toUpperCase() + "&to=" + to.toUpperCase(),
            headers: {
                "X-RapidAPI-Key": key
            },
            method: "GET"
        }).then(function (response) {
            var index = parseFloat(response).toFixed(4);
            console.log("$1 " + from.toUpperCase() + " = $" + index + " " + to.toUpperCase());

        });
    }

    getIndex("usd", "cad");
    getIndex("cad", "usd");
    getIndex("usd", "mxn");

    var d = new Date();
    console.log(d);

});