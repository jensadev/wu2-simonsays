let boxes = [];
let gameRounds = 4;
let overlayText = document.getElementById("overlayText");
let overlaySecondary = document.getElementById("overlaySecondary");
let overlay = document.getElementById("overlay");
let currentOrder;
let clickCount = 0;
let playerClicks = [];

boxes.push(document.getElementById("box0"));
boxes.push(document.getElementById("box1"));
boxes.push(document.getElementById("box2"));
boxes.push(document.getElementById("box3"));

// setup

window.addEventListener('load', function() {
    boxes.forEach(box => {
        box.addEventListener("click", function(e) {   
            toggle(box, "active");
            playClick(box);
        }, false);
    });
    currentOrder = generateRound(gameRounds);
    init();
})

function generateRound(rounds) {
    let temp = [];
    for(let i = 0; i < rounds; i++) {
        temp.push(getRandomInt(0, 4));
    }
    return temp;
}

function showOrder(order, rounds) {
    for (let i = 0; i < rounds; i++) {
        setTimeout( function timer(){
            toggle(boxes[order[i]], "active")
        }, i * 1000 );
    }    
}

function toggle(element, css) {
    let oldText = element.textContent;
    element.textContent = "clicked";
    element.classList.add(css);
    setTimeout(function timer() {
        element.classList.remove(css);
        element.textContent = oldText;
    }, 300);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function init() {
    playerClicks = [];
    clickCount = 0;
    overlay.classList.remove("hide");
    overlayText.textContent = "Click to start";
    overlay.addEventListener("click", function start() {
        countDown(overlay, overlayText);
        overlay.removeEventListener("click", start);
    }, false);
}

function playClick(box) {
    clickCount++;
    playerClicks.push(box.id.substr(3));
    if(clickCount == gameRounds) {
        let win = isEqual(playerClicks, currentOrder);
        if (win) {
            overlay.classList.remove("hide");
            overlayText.textContent = "You won!"
            overlaySecondary.textContent = "With " + gameRounds + " clicks, keep going!";
            currentOrder.push(getRandomInt(0, 4));
            gameRounds++;
            setTimeout(init, 2000);
        } else {
            overlay.classList.remove("hide");
            overlayText.textContent = "You lost!"
            overlaySecondary.textContent = "At " + gameRounds + " clicks, try again!";
            gameRounds = 4;
            setTimeout(init, 2000);
        }
    }
}

function countDown(parent, element) {
    for (let i = 0; i < 7; i++) {
        setTimeout( function timer(){
            if (i == 6) {
                parent.classList.add("hide");
                showOrder(currentOrder, gameRounds);
            } else if (i == 5) {
                element.textContent = "GO!";
            } else {
                element.textContent = 5 - i;
            }
        }, i * 500 );
    }
}

function isEqual(playerOrder, correctOrder) {
    for(var i = 0; i < playerOrder.length; i++) {
        if(playerOrder[i] != correctOrder[i])
            return false;
    }
    return true;
}