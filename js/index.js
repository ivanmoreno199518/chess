let counter = 0;
let originImage, originId, originColour, originObject;
const SQUARES_OF_THE_BOARD = "div>div>div, div:nth-child(2)>div";
const SELECT_ORIGIN_SQUARE = "SELECT ORIGIN SQUARE";
const SELECT_DESTINY_SQUARE = "SELECT DESTINY SQUARE";
let state = SELECT_ORIGIN_SQUARE;

$(document).ready(function(){
    $(SQUARES_OF_THE_BOARD).click(function(){
        if (state == SELECT_ORIGIN_SQUARE && isOccupied($(this))) {
            saveOriginFeatures($(this));
            select($(this));
            state = SELECT_DESTINY_SQUARE;
        } else if (state == SELECT_DESTINY_SQUARE && !isChessFromGarbage($(this))) {
            moveChessCard($(this));
            state = SELECT_ORIGIN_SQUARE;
        } else if (state == SELECT_DESTINY_SQUARE && isChessFromGarbage($(this)) && isTheSameCard($(this))) {
            unselect($(this));
            state = SELECT_ORIGIN_SQUARE;
        }
    })
});

function isOccupied (card) {
    return ($(card).css('background-image') != "none")
}

function isTheSameCard (card) {
    return (originId == $(card).attr('id'));
}

function saveOriginFeatures (card) {
    originObject = card;
    originColour = $(card).css('background-color');
    originImage = $(card).css('background-image');
    originId = $(card).attr('id');
}

function emptyOrigin () {
    $("#"+originId).css('background-image', 'none');
    $("#"+originId).css('background-color', originColour);
}

function moveChessCard (card) {
    if(!isTheSameCard(card)) {
        let originSecure = originImage;
        emptyOrigin(); 
        if (isOccupied(card)) moveToGarbage(card);
        $(card).css('background-image', originSecure);
    } else {
        unselect(card);
    }
}

function isChessFromGarbage (id) {
    return ((/^pieza\d{1,2}$/).test($(id).attr('id')));
}

function select (card) {
    $(card).css('background-color','yellow');
}

function unselect (card) {
    $(card).css('background-color', originColour);
}

function moveToGarbage(card) {
    for (let i = 1; i < 32; i++) {
        if ($("#pieza"+i).css("background-image") == "none") {
            $("#pieza"+i).css("background-image",$(card).css('background-image'));
            break;
        }
    }
}
