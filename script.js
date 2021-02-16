
function cardDragged (ev) {
    cardDraggedId = ev.target.id;
    console.log("dragging",cardDraggedId);
}

function setCardListeners (listenerClass) {
    let cardListener = document.getElementsByClassName(listenerClass);
    for (let i = 0; i < cardListener.length;i++) {
        cardListener[i].addEventListener("dragstart",cardDragged);
    };
}


function displayCardsMain (displayStatus) {
    let ulElement = document.querySelector('.mainContainer');
    ulElement.innerHTML = "";
    var newImage = [];
    for (let i=0; i < abilityCards.length;i++) {
        if (abilityCards[i].cardStatus == displayStatus ) {
            newImage[i] = document.createElement("img");
            newImage[i].src = abilityCards[i].cardImg;
            newImage[i].classList.add("card");
            newImage[i].setAttribute("id",abilityCards[i].cardId);
            ulElement.append(newImage[i]);
        }
    }
    setCardListeners("card");
}




function displayActiveCards () {
    let ulElement = document.querySelector('.activeContainer');
    ulElement.innerHTML = "";
    var newImage = [];
    for (let i=0; i < abilityCards.length;i++) {
        if (abilityCards[i].cardStatus == "active" ) {
            newImage[i] = document.createElement("img");
            newImage[i].classList.add("activeCard");
            newImage[i].src = abilityCards[i].cardImg;
            newImage[i].setAttribute("id",abilityCards[i].cardId)
            ulElement.append(newImage[i]);
        }
    }
    setCardListeners("activeCard");
}



function displayRightA (textToDisplay,valuetoDisplay) {
    let distext = document.querySelector(".rightAText");
    let disvalue = document.querySelector(".rightAValue");
    distext.innerHTML=textToDisplay;
    let cardsInDiscard = 0;
    for (let i=0; i < abilityCards.length;i++) {
        if(abilityCards[i].cardStatus == valuetoDisplay) {
            cardsInDiscard++;
        }
    }
    disvalue.innerHTML=cardsInDiscard;
}


function displayRightB (textToDisplay,valuetoDisplay) {
    let lostText = document.querySelector(".rightBText");
    let lostValue = document.querySelector(".rightBValue");
    lostText.innerHTML=textToDisplay;
    let cardsInLost = 0;
    for (let i=0; i < abilityCards.length;i++) {
        if(abilityCards[i].cardStatus == valuetoDisplay) {
            cardsInLost++;
        }
    }
    lostValue.innerHTML=cardsInLost;
}


function displayItemCards () {
    let ulElement = document.querySelector('.itemContainer');
    ulElement.innerHTML = "";
    var newImage = [];
    for (let i=0; i < itemCards.length;i++) {
        if (itemCards[i].cardStatus == "active" ) {
            newImage[i] = document.createElement("img");
            newImage[i].src = itemCards[i].cardImg;
            newImage[i].onclick = function () {
                newImage[i].classList.toggle("itemUsed")
            }
            newImage[i].classList.add("itemCard");
            newImage[i].setAttribute("id",itemCards[i].cardId);
            newImage[i].setAttribute("draggable", false);
            ulElement.append(newImage[i]);
        }
    }
}


function displayHandMain() {
    let distext = document.querySelector(".mainText");
    distext.innerHTML = "Hand";
    displayCardsMain("hand");
    displayRightA("Discarded","discard");
    displayRightB("Lost","lost");
}

function displayDiscardMain() {
    let distext = document.querySelector(".mainText");
    distext.innerHTML = "Discard";
    displayCardsMain("discard");
    displayRightA("Hand","hand");
    displayRightB("Lost","lost")
}

function displayLostMain() {
    let distext = document.querySelector(".mainText");
    distext.innerHTML = "Lost";
    displayCardsMain("lost");
    displayRightA("Discarded","discard");
    displayRightB("Hand","hand");

}


function displayMainView() {
    if (currentView == "hand") {
        displayHandMain();
    }
    if (currentView =="discard") {
        displayDiscardMain();
    }
    if (currentView=="lost") {
        displayLostMain();
    }
    displayActiveCards();
}

function rightAClicked() {
    if (currentView == "hand" || currentView == "lost") {
        currentView = "discard";
        displayMainView();
        return;
    }

    if (currentView == "discard") {
        currentView = "hand";
        displayMainView();
        return;
    }
}

function rightBClicked() {
    if (currentView == "hand" || currentView == "discard") {
        currentView = "lost";
        displayMainView();
        return;
    }

    if (currentView == "lost") {
        currentView = "hand";
        displayMainView();
        return;
    }
}

function elementDraggedOver(ev) {
    ev.preventDefault();
} 
function maindropped (ev) {
    ev.preventDefault();
    abilityCards[cardDraggedId].cardStatus = currentView;
    displayMainView();
}

function rightAdropped (ev) {
    ev.preventDefault();
    if (currentView == "hand" || currentView == "lost") {
        abilityCards[cardDraggedId].cardStatus = "discard";
        displayMainView();
        return;
    }
    if (currentView == "discard") {
        abilityCards[cardDraggedId].cardStatus = "hand";
        displayMainView();
        return;    
    }
}


function rightBdropped (ev) {
    ev.preventDefault();
    if (currentView == "hand" || currentView == "discard") {
        abilityCards[cardDraggedId].cardStatus = "lost";
        displayMainView();
        return;
    }
    if (currentView == "lost") {
        abilityCards[cardDraggedId].cardStatus = "hand";
        displayMainView();
        return;    
    }}

function rightCdropped (ev) {
    ev.preventDefault();
    abilityCards[cardDraggedId].cardStatus = "active";
    displayMainView();    
}


//***** */ main code

// Setup Object
var abilityCards = [
    {
        cardId: 0,
        cardStatus: "hand",
        cardImg: "images/VoidWarden/black-boon.png"
    },
    {
        cardId: 1,
        cardStatus: "hand",
        cardImg: "images/VoidWarden/close-to-the-abyss.png"
    },   
    {
        cardId: 2,
        cardStatus: "hand",
        cardImg: "images/VoidWarden/freeze-the-soul.png"
    },
    {
        cardId: 3,
        cardStatus: "hand",
        cardImg: "images/VoidWarden/gift-of-the-void.png"

    },
    {
        cardId: 4,
        cardStatus: "hand",
        cardImg: "images/VoidWarden/grasp-of-doom.png"
    },
    {
        cardId: 5,
        cardStatus: "hand",
        cardImg: "images/VoidWarden/lure-of-the-void.png"
    },   
    {
        cardId: 6,
        cardStatus: "hand",
        cardImg: "images/VoidWarden/master-influence.png"
    },
    {
        cardId: 7,
        cardStatus: "hand",
        cardImg: "images/VoidWarden/signs-of-the-void.png"

    },
    {
        cardId: 8,
        cardStatus: "hand",
        cardImg: "images/VoidWarden/suggestion.png"
    },
    {
        cardId: 9,
        cardStatus: "hand",
        cardImg: "images/VoidWarden/turn-out-the-lights.png"

    },
    {
        cardId: 10,
        cardStatus: "hand",
        cardImg: "images/VoidWarden/wicked-scratch.png"

    },
    
]

var itemCards = [
    {
        cardId: 0,
        cardStatus: "active",
        cardImg: "images/Items/chain-armor.png"
    },
    {
        cardId: 1,
        cardStatus: "active",
        cardImg: "images/Items/eagle-eye-goggles.png"
    },
    {
        cardId: 2,
        cardStatus: "active",
        cardImg: "images/Items/healing-potion.png"
    },
    {
        cardId: 3,
        cardStatus: "active",
        cardImg: "images/Items/heater-shield.png"
    },
    {
        cardId: 4,
        cardStatus: "active",
        cardImg: "images/Items/iron-helmet.png"
    },
    {
        cardId: 5,
        cardStatus: "active",
        cardImg: "images/Items/iron-spear.png"
    },
]

var currentView = "hand";
var cardDraggedId = null;

const rightButtonAPressed = document.querySelector(".rightAButton");
const rightButtonBPressed = document.querySelector(".rightBButton");
const mainArea = document.querySelector(".mainContainer");
const rightAArea = document.querySelector(".rightAContainer");
const rightBArea = document.querySelector(".rightBContainer");
const rightCArea = document.querySelector(".rightCContainer");



rightButtonAPressed.addEventListener("click",rightAClicked);
rightButtonBPressed.addEventListener("click",rightBClicked);
mainArea.addEventListener("dragover", elementDraggedOver);
mainArea.addEventListener("drop", maindropped);
rightAArea.addEventListener("dragover", elementDraggedOver);
rightAArea.addEventListener("drop", rightAdropped);
rightBArea.addEventListener("dragover", elementDraggedOver);
rightBArea.addEventListener("drop", rightBdropped);
rightCArea.addEventListener("dragover", elementDraggedOver);
rightCArea.addEventListener("drop", rightCdropped);



displayItemCards();
displayMainView();
displayActiveCards();



