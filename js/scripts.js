function Pizza(size, crust, cheese, toppings) {
    this.size = size;
    this.crust = crust;
    this.cheese = cheese;
    this.toppings = toppings;
    this.cost = function () {
        return ((this.toppings.length * 1) + 7);
    };
}
Pizza.prototype.cost = function() {
    return ((this.toppings.length * 1) + 7);
};
var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'k6DA_WwO90c',
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {}

function stopVideo() {
    player.stopVideo();
}

function dumbVideo() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

$(document).ready(function (event) {
    $("#dumb-video-button").click(function () {
        dumbVideo();
    });
    main();
});

function main() {
    var order = [];
    pizzaArr = [];
    buildButtons();
    $("#start-order").click(function (event) {
        order.push(startAnOrder());
    });
    $("#done-button").click(function (event) {

        pizzaArr.push(donePizza());
        console.log(pizzaArr);
    });
    $("#order-button").click(function (event) {
        if (pizzaArr[0] !== undefined) {
            placeOrder(pizzaArr);
        } else {
            alert("Oops, looks like we misplaced your order.");
        }
    });
}

function buildButtons() {
    for (var i = 0; i < pizzaIngreds.toppings.length; i++) {
        $("#button-bar").append("<label class='btn btn-primary toppings active' ><input type='checkbox' class='toppings' name='" + pizzaIngreds.toppings[i] + "' autocomplete='off'>" + pizzaIngreds.toppings[i] + "</label>");
    }
    for (var i = 0; i < pizzaIngreds.crusts.length; i++) {
        $("#button-bar").append("<label class='btn btn-primary crusts active'><input type='checkbox' class='crusts' name='" + pizzaIngreds.crusts[i] + "'autocomplete='off'>" + pizzaIngreds.crusts[i] + "</label>");
    }
    for (var i = 0; i < pizzaIngreds.cheese.length; i++) {
        $("#button-bar").append("<label class='btn btn-primary cheese active'><input type='checkbox' class='cheese' name='" + pizzaIngreds.cheese[i] + "'autocomplete='off'>" + pizzaIngreds.cheese[i] + "</label>");
    }
}

function placeOrder(pizzaArr) {
    console.log(pizzaArr);
    var cost = 0;
    html = "";
    for (var i = 0; i < pizzaArr.length; i++) {
        html +='<br><div class="col-sm-12"><h5>Pizza ' + (i + 1) + '</h5></div>'+"<div class='row'><div class='col-md-auto' id='crusts-output'>"+"<p><strong>Crusts:</strong></p>"+"<ol>";
        for (var o = 0; o < pizzaArr[i].crust.length; o++) {
            html += "<li>" + pizzaArr[i].crust[o] + "</li>";
        }
        html += "</ol></div>"+"<div class='col-md-auto' id='cheese-output'>"+"<p><strong>Cheese:</strong></p>"+"<ol>";
        for (var u = 0; u < pizzaArr[i].cheese.length; u++) {
            html+="<li>" + pizzaArr[i].cheese[u] + "</li>";
        }
        html +="</ol></div>"+"<div class='col-md-auto' id='topping-output'>"+"<p><strong>Toppings:</strong></p>"+"<ol>";
        for (var y = 0; y < pizzaArr[i].toppings.length; y++) {
            html += "<li>" + pizzaArr[i].toppings[y] + "</li>";
        }
        html+="</div></div></div>";
        if (pizzaArr[i+1] !== undefined) {
            html +="<hr>";
        }
        cost += pizzaArr[i].cost();
    }
    $(".output").show();
    $(".input").hide();
    $(".pizza-output").append(html+"</ol><br><div class='col-sm-12'><h2><strong>Total cost: "+cost+"$</strong></div>");
    console.log(html);
}

var pizzaIngreds = {
    toppings: ["Pepperoni",
        "Mushrooms",
        "Onions",
        "Sausage",
        "Bacon",
        "Extra cheese",
        "Black olives",
        "Green peppers",
        "Pineapple",
        "Spinach"
    ],
    crusts: [
        "Pan Crust", "Thin Crust", "Hand Tossed Crust", "Stuffed Crust"
    ],
    cheese: ["Mozzarella", "Cheddar", "Mixed", ]
};

function donePizza() {
    var toppings = $('.toppings:checkbox:checked').map(function () {
        $(this).prop('checked', false);
        return this.name;
    }).get();
    var crusts = $('.crusts:checkbox:checked').map(function () {
        $(this).prop('checked', false);
        return this.name;
    }).get();
    var cheese = $('.cheese:checkbox:checked').map(function () {
        $(this).prop('checked', false);
        return this.name;
    }).get();
    if ((toppings[0] === undefined) || (crusts[0] === undefined) || (cheese[0] === undefined)) {
        alert("You're missing some ingredients.");
        return;
    }
    //console.log(toppings, crusts, cheese);
    var pizza = new Pizza("Medium", crusts, cheese, toppings);
    $(".button-row").hide();
    $("#back-button").hide();
    $("#next-button").hide();
    $("#done-button").hide();
    $("#start-order").prop("disabled", false);
    $("#next-button").prop("disabled", false);
    $("#order-button").show();
    return pizza;
}

function startAnOrder() {
    $(".button-row").show();
    $("#start-order").prop("disabled", true);
    var index = 0;
    $(".toppings").show();
    $(".crusts").hide();
    $(".cheese").hide();
    $("#back-button").show();
    $("#next-button").show();
    $("#next-button").prop("disabled", false);
    $("#back-button").prop("disabled", true);
    $("#next-button").click(function (event) {
        switch (index) {
            case 0:
                index = 1;
                $(".toppings").hide();
                $(".crusts").show();
                $(".cheese").hide();
                $("#back-button").prop("disabled", false);
                $("#next-button").prop("disabled", false);
                break;
            case 1:
                index = 2;
                $(".toppings").hide();
                $(".crusts").hide();
                $(".cheese").show();
                $("#back-button").prop("disabled", false);
                $("#next-button").prop("disabled", true);
                $("#done-button").show();
                break;
            default:
                index = 0;
                break;
        }
    });
    $("#back-button").click(function (event) {
        switch (index) {
            case 1:
                index = 0;
                $(".toppings").show();
                $(".crusts").hide();
                $(".cheese").hide();
                $("#back-button").prop("disabled", true);
                $("#next-button").prop("disabled", false);
                break;
            case 2:
                index = 1;
                $(".toppings").hide();
                $(".crusts").show();
                $(".cheese").hide();
                $("#back-button").prop("disabled", false);
                $("#next-button").prop("disabled", false);
                $("#done-button").hide();
                break;
            case 3:
                index = 2;
                $(".toppings").hide();
                $(".crusts").hide();
                $(".cheese").show();
                $("#back-button").prop("disabled", false);
                $("#next-button").prop("disabled", true);
                break;
            default:
                index = 0;
                break;
        }

    });
}