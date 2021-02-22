
function cardDragged (ev) {
    cardDraggedId = ev.target.id;
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
    cardsInView = 0;
    for (let i=0; i < abilityCards.length;i++) {
        if (abilityCards[i].cardStatus == displayStatus) {
            cardsInView++;
        }
    }
    
    for (let i=0; i < abilityCards.length;i++) {
        if (abilityCards[i].cardStatus == displayStatus ) {
            newImage[i] = document.createElement("img");
            newImage[i].src = abilityCards[i].cardImg;
            newImage[i].onclick = function () {
                newImage[i].classList.toggle("cardSelected")
            }
            if (cardsInView > 12) {
                newImage[i].classList.add("smallCard");
            } else {
                newImage[i].classList.add("card");
            }
            
            newImage[i].setAttribute("id",abilityCards[i].cardId);
            ulElement.append(newImage[i]);
        }
    }
    if (cardsInView <= 12) {
        setCardListeners("card");
    } else {
        setCardListeners("smallCard");
    }

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
    displayCardsMain("hand");

    if (cardsInView <= maxCards) { 
        distext.innerHTML = "Hand";
    } else {
        distext.innerHTML = `Hand - Lose Down to ${maxCards}`;
    }
    displayRightA("Discard","discard");
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
    displayRightA("Discard","discard");
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
    // ev.preventDefault();
    // abilityCards[cardDraggedId].cardStatus = currentView;
    // displayMainView();
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

function returnDiscards () {
    for (let i=0; i < abilityCards.length;i++) {
        if (abilityCards[i].cardStatus == "discard") {
            abilityCards[i].cardStatus = "hand";
        }
    }
    currentView = "hand";
    displayMainView();    
}


function shortRest () {
        let idArray =[];
        for (let i = 0;i < abilityCards.length;i++) {
            if (abilityCards[i].cardStatus == "discard") {
                idArray.push(abilityCards[i].cardId);
            }
        }
        let cardToLose = Math.floor(Math.random() * (idArray.length));
        if (confirm(`${abilityCards[idArray[cardToLose]].cardName} will be lost`)) {
            abilityCards[idArray[cardToLose]].cardStatus="lost";
            returnDiscards();
        }
}

function demoCardClicked() {
    maxCards = 9;
    abilityCards = demoCards;
    itemCards = demoItemCards;
    currentView = "hand";
    displayItemCards();
    displayMainView();
}

function hatchCardClicked () {
    maxCards = 10;
    abilityCards = hatchCards;
    itemCards = hatchItemCards;
    currentView = "hand";
    displayItemCards();
    displayMainView();
}

function redCardClicked () {
    maxCards = 10;
    abilityCards = redCards;
    itemCards = redItemCards;
    currentView = "hand";
    displayItemCards();
    displayMainView();
}

function voidCardClicked () {
    maxCards = 11;
    abilityCards = voidCards;
    itemCards = voidItemCards;
    currentView = "hand";
    displayItemCards();
    displayMainView();
}





//***** */ main code

// Setup Object


const demoCards = [
    {
        cardId: 0,
        cardStatus: "hand",
        cardImg: "images/Demolitionist/cards-lev1/crushing-weight.png",
        cardName: "Crushing Weight",
    },
    {
        cardId: 1,
        cardStatus: "hand",
        cardImg: "images/Demolitionist/cards-lev1/explode.png",
        cardName: "Explode",
    },   
    {
        cardId: 2,
        cardStatus: "hand",
        cardImg: "images/Demolitionist/cards-lev1/explosive-blitz.png",
        cardName: "Explosive Blitz",

    },
    {
        cardId: 3,
        cardStatus: "hand",
        cardImg: "images/Demolitionist/cards-lev1/implode.png",
        cardName: "Implode"
    },  
    {
        cardId: 4,
        cardStatus: "hand",
        cardImg: "images/Demolitionist/cards-lev1/knock-out-the-support.png",
        cardName: "Knock Out The Support",
    },
    {
        cardId: 5,
        cardStatus: "hand",
        cardImg: "images/Demolitionist/cards-lev1/one-two-punch.png",
        cardName: "One-Two Punch",
    },   
    {
        cardId: 6,
        cardStatus: "hand",
        cardImg: "images/Demolitionist/cards-lev1/piston-punch.png",
        cardName: "Piston Punch",
    },
    {
        cardId: 7,
        cardStatus: "hand",
        cardImg: "images/Demolitionist/cards-lev1/the-big-one.png",
        cardName: "The Big One",
    },   
    {
        cardId: 8,
        cardStatus: "hand",
        cardImg: "images/Demolitionist/cards-lev1/windup.png",
        cardName: "Windup"
    },   
    {
        cardId: 9,
        cardStatus: "hand",
        cardImg: "images/Demolitionist/cards-x/level.png",
        cardName: "Level",
    },
    {
        cardId: 10,
        cardStatus: "hand",
        cardImg: "images/Demolitionist/cards-x/lobbed-charge.png",
        cardName: "Lobbed Charge",
    },   
    {
        cardId: 11,
        cardStatus: "hand",
        cardImg: "images/Demolitionist/cards-x/rubble.png",
        cardName: "Rubble",
    },   
]

const hatchCards = [
    {
        cardId: 0,
        cardStatus: "hand",
        cardImg: "images/Hatchet/cards-lev1/center-mass.png",
        cardName: "Center Mass",
    },
    {
        cardId: 1,
        cardStatus: "hand",
        cardImg: "images/Hatchet/cards-lev1/close-cuts.png",
        cardName: "Close Cuts",
    },   
    {
        cardId: 2,
        cardStatus: "hand", 
        cardImg: "images/Hatchet/cards-lev1/disorienting-barrage.png",
        cardName: "Disorienting Barrage",
    },
    {
        cardId: 3,
        cardStatus: "hand",
        cardImg: "images/Hatchet/cards-lev1/double-throw.png",
        cardName: "Double Throw",
    },  
    {
        cardId: 4,
        cardStatus: "hand",
        cardImg: "images/Hatchet/cards-lev1/follow-through.png",
        cardName: "Follow Through",
    },
    {
        cardId: 5,
        cardStatus: "hand",
        cardImg: "images/Hatchet/cards-lev1/power-pitch.png",
        cardName: "Power Pitch",
    },   
    {
        cardId: 6,
        cardStatus: "hand",
        cardImg: "images/Hatchet/cards-lev1/retrieval.png",
        cardName: "Retrieval",
    },
    {
        cardId: 7,
        cardStatus: "hand",
        cardImg: "images/Hatchet/cards-lev1/second-wind.png",
        cardName: "Second Wind",
    },   
    {
        cardId: 8,
        cardStatus: "hand",
        cardImg: "images/Hatchet/cards-lev1/stopping-power.png",
        cardName: "Stopping Power",
    },   
    {
        cardId: 9,
        cardStatus: "hand",
        cardImg: "images/Hatchet/cards-lev1/the-favorite.png",
        cardName: "The Favorite",
    },  
    {
        cardId: 10,
        cardStatus: "hand",
        cardImg: "images/Hatchet/cards-x/care-package.png",
        cardName: "Care Package",
    },   
    {
        cardId: 11,
        cardStatus: "hand",
        cardImg: "images/Hatchet/cards-x/extra-lift.png",
        cardName: "Extra Life",
    },   
    {
        cardId: 12,
        cardStatus: "hand",
        cardImg: "images/Hatchet/cards-x/fancy-hat.png",
        cardName: "Fancy Hat",
    },  
]


const redCards = [
    {
        cardId: 0,
        cardStatus: "hand",
        cardImg: "images/RedGuard/cards-lev1/blinding-sickle.png",
        cardName: "Blinding Sickle"
    },
    {
        cardId: 1,
        cardStatus: "hand",
        cardImg: "images/RedGuard/cards-lev1/desert-night.png",
        cardName: "Desert Night",
    },   
    {
        cardId: 2,
        cardStatus: "hand",
        cardImg: "images/RedGuard/cards-lev1/flame-shroud.png",
        cardName: "Flame Shroud",
    },
    {
        cardId: 3,
        cardStatus: "hand",
        cardImg: "images/RedGuard/cards-lev1/flaming-sickle.png",
        cardName: "Flaming Sickle",
    },  
    {
        cardId: 4,
        cardStatus: "hand",
        cardImg: "images/RedGuard/cards-lev1/healing-sands.png",
        cardName: "Healing Sands",
    },
    {
        cardId: 5,
        cardStatus: "hand",
        cardImg: "images/RedGuard/cards-lev1/shield-of-the-desert.png",
        cardName: "Shield Of The Desert",
    },   
    {
        cardId: 6,
        cardStatus: "hand",
        cardImg: "images/RedGuard/cards-lev1/shield-spikes.png",
        cardName: "Shield Spikes",
    },
    {
        cardId: 7,
        cardStatus: "hand",
        cardImg: "images/RedGuard/cards-lev1/shocking-advance.png",
        cardName: "Shocking Advance",

    },   
    {
        cardId: 8,
        cardStatus: "hand",
        cardImg: "images/RedGuard/cards-lev1/strangling-chain.png",
        cardName: "Strangling Chain",
    },   
    {
        cardId: 9,
        cardStatus: "hand",
        cardImg: "images/RedGuard/cards-lev1/swift-strength.png",
        cardName: "Swift Strength",
    },  
    {
        cardId: 10,
        cardStatus: "hand",
        cardImg: "images/RedGuard/cards-x/blade-dance.png",
        cardName: "Blade Dance",

    },   
    {
        cardId: 11,
        cardStatus: "hand",
        cardImg: "images/RedGuard/cards-x/precision-strike.png",
        cardName: "Precision Strike",
    },   
    {
        cardId: 12,
        cardStatus: "hand",
        cardImg: "images/RedGuard/cards-x/warrior-of-the-sun.png",
        cardName: "Warrior Of The Sun",
    },  

]



const voidCards = [
    {
        cardId: 0,
        cardStatus: "hand",
        cardImg: "images/VoidWarden/cards-lev1/black-boon.png",
        cardName: "Black Boon",
    },
    {
        cardId: 1,
        cardStatus: "hand",
        cardImg: "images/VoidWarden/cards-lev1/close-to-the-abyss.png",
        cardName: "Close To The Abyss",
    },   
    {
        cardId: 2,
        cardStatus: "hand",
        cardImg: "images/VoidWarden/cards-lev1/freeze-the-soul.png",
        cardName: "Freeze The Soul",
    },
    {
        cardId: 3,
        cardStatus: "hand",
        cardImg: "images/VoidWarden/cards-lev1/gift-of-the-void.png",
        cardName: "Gift Of The Void",

    },
    {
        cardId: 4,
        cardStatus: "hand",
        cardImg: "images/VoidWarden/cards-lev1/grasp-of-doom.png",
        cardName: "Grasp Of Doom",
    },
    {
        cardId: 5,
        cardStatus: "hand",
        cardImg: "images/VoidWarden/cards-lev1/lure-of-the-void.png",
        cardName: "Lure Of The Void",
    },   
    {
        cardId: 6,
        cardStatus: "hand",
        cardImg: "images/VoidWarden/cards-lev1/master-influence.png",
        cardName: "Master Influence",
    },
    {
        cardId: 7,
        cardStatus: "hand",
        cardImg: "images/VoidWarden/cards-lev1/signs-of-the-void.png",
        cardName: "Signs Of The Void",

    },
    {
        cardId: 8,
        cardStatus: "hand",
        cardImg: "images/VoidWarden/cards-lev1/suggestion.png",
        cardName: "Suggestion",
    },
    {
        cardId: 9,
        cardStatus: "hand",
        cardImg: "images/VoidWarden/cards-lev1/turn-out-the-lights.png",
        cardName: "Turn Out The Lights",

    },
    {
        cardId: 10,
        cardStatus: "hand",
        cardImg: "images/VoidWarden/cards-lev1/wicked-scratch.png",
        cardName: "Wicked Scratch",

    },
    {
        cardId: 11,
        cardStatus: "hand",
        cardImg: "images/VoidWarden/cards-x/cold-embrace.png",
        cardName: "Cold Embrace",
    },
    {
        cardId: 12,
        cardStatus: "hand",
        cardImg: "images/VoidWarden/cards-x/resigned-frenzy.png",
        cardName: "Resigned Frenzy",

    },
    {
        cardId: 13,
        cardStatus: "hand",
        cardImg: "images/VoidWarden/cards-x/sap-warmth.png",
        cardName: "Sap Warmth",

    },
    
]

const demoItemCards = [
    {
        cardId: 0,
        cardStatus: "active",
        cardImg: "images/Items/iron-helmet.png"
    },
    {
        cardId: 1,
        cardStatus: "active",
        cardImg: "images/Items/healing-potion.png"
    },
    
]

const hatchItemCards = [
    {
        cardId: 0,
        cardStatus: "active",
        cardImg: "images/Items/eagle-eye-goggles.png"
    },
    
]
const redItemCards = [
    {
        cardId: 0,
        cardStatus: "active",
        cardImg: "images/Items/iron-spear.png"
    },
    {
        cardId: 1,
        cardStatus: "active",
        cardImg: "images/Items/fateful-compass.png"
    },
    
]
const voidItemCards = [
    {
        cardId: 0,
        cardStatus: "active",
        cardImg: "images/Items/heater-shield.png"
    },
    
]

var maxCards = 11;
var abilityCards = voidCards;
var itemCards = demoItemCards;
var currentView = "hand";
var cardsInView = 0;
var cardDraggedId = null;

const rightButtonAPressed = document.querySelector(".rightAButton");
const rightButtonBPressed = document.querySelector(".rightBButton");
const returnDiscardsPressed = document.querySelector(".returnDiscardsButton")
const shortRestPressed = document.querySelector(".shortRestButton");
const mainArea = document.querySelector(".mainContainer");
const rightAArea = document.querySelector(".rightAContainer");
const rightBArea = document.querySelector(".rightBContainer");
const rightCArea = document.querySelector(".rightCContainer");
const demoCard = document.querySelector(".demoCardImg");
const hatchCard = document.querySelector(".hatchCardImg");
const redCard = document.querySelector(".redCardImg");
const voidCard = document.querySelector(".voidCardImg");


rightButtonAPressed.addEventListener("click",rightAClicked);
rightButtonBPressed.addEventListener("click",rightBClicked);
returnDiscardsPressed.addEventListener("click",returnDiscards)
shortRestPressed.addEventListener("click",shortRest);
mainArea.addEventListener("dragover", elementDraggedOver);
mainArea.addEventListener("drop", maindropped);
rightAArea.addEventListener("dragover", elementDraggedOver);
rightAArea.addEventListener("drop", rightAdropped);
rightBArea.addEventListener("dragover", elementDraggedOver);
rightBArea.addEventListener("drop", rightBdropped);
rightCArea.addEventListener("dragover", elementDraggedOver);
rightCArea.addEventListener("drop", rightCdropped);
demoCard.addEventListener("click", demoCardClicked);
hatchCard.addEventListener("click", hatchCardClicked);
redCard.addEventListener("click", redCardClicked);
voidCard.addEventListener("click", voidCardClicked);


displayItemCards();
displayMainView();
displayActiveCards();



