function Pizza(size, crust, cheese, toppings) {
    this.size = size;
    this.crust = crust;
    this.cheese = cheese;
    this.toppings = toppings;
}
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
    buildButtons();
    $("#start-order").click(function(event) {
        order.push(startAnOrder());
    });
}
function buildButtons() {
    for(var i = 0; i < pizzaIngreds.toppings.length; i++) {
        $("#button-bar").append(" <button class='sm-btn btn-primary toppings' id='toppings-button-"+i+"' type='button'>"+pizzaIngreds.toppings[i]+"</button>");
    }
    for(var i= 0;i< pizzaIngreds.crusts.length; i++) {
        $("#button-bar").append(" <button class='sm-btn btn-primary crusts' id='crusts-button-"+i+"' type='button'>"+pizzaIngreds.crusts[i]+"</button>");
    }
    for(var i = 0;i < pizzaIngreds.cheese.length;i++) {
        $("#button-bar").append(" <button class='sm-btn btn-primary cheese' id='cheese-button-"+i+"' type='button'>"+pizzaIngreds.cheese[i]+"</button>");
    }
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
    cheese: ["Mozzarella","Cheddar","Mixed",]
};
function startAnOrder() {
    var index = 0;
    $(".toppings").show();
    $("#back-button").show();
    $("#next-button").show();
    $("#back-button").prop("disabled",true);
    $("#next-button").click(function(event) {
        switch(index) {
            case 0:
            index = 1;
            $(".toppings").hide();
            $(".crusts").show();
            $(".cheese").hide();
            $("#back-button").prop("disabled",false);
            $("#next-button").prop("disabled",false);
            break;
            case 1:
            index = 2;
            $(".toppings").hide();
            $(".crusts").hide();
            $(".cheese").show();
            $("#back-button").prop("disabled",false);
            $("#next-button").prop("disabled",true);
            break;
            default:
            index = 0;
            console.log("Index was outside of scope: "+index);
            break;
        }
    });
    $("#back-button").click(function(event) {
        switch(index) {
            case 1:
            index = 0;
            $(".toppings").show();
            $(".crusts").hide();
            $(".cheese").hide();
            $("#back-button").prop("disabled",true);
            $("#next-button").prop("disabled",false);
            break;
            case 2:
            index = 1;
            $(".toppings").hide();
            $(".crusts").show();
            $(".cheese").hide();
            $("#back-button").prop("disabled",false);
            $("#next-button").prop("disabled",false);
            break;
            case 3:
            index = 2;
            $(".toppings").hide();
            $(".crusts").hide();
            $(".cheese").show();
            $("#back-button").prop("disabled",false);
            $("#next-button").prop("disabled",true);
            break;
            default:
            index = 0;
            console.log("Index was outside of scope: "+index)
            break;
        }
        
    });
}