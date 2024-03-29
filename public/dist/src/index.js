"use strict";
// cmd shift p -> typescript restart server | check if code is right or not for red squigly
const urlByTerm = 'ByTerm?term=';
const cardanoUrl = 'https://us-central1-builtoncardano.cloudfunctions.net/api/projects';
let terms = ["defi", "nft collections", "industry solutions"];
terms.forEach(term => {
    fetch(cardanoUrl + urlByTerm + term)
        .then(response => {
        if (response.ok) {
            return response.json();
        }
        else {
            console.log('Unsucessful');
        }
    })
        .then(data => {
        createLists(data, term);
    })
        .catch(error => console.log('ERROR: ' + error));
});
// Used these for getting each card info
// [0].createdAt
// [0].updatedAt
// [0].description
// [0].industries - Tags
// [0].url
// [0].name
// [0].logoUrl
function createLists(data, term) {
    let objectData = Object.values(data);
    for (let i = 0; i < 10; i++) {
        let lists = document.createElement('li');
        createInsideCard(term, lists, 'h3', objectData[i].name, "title");
        createInsideCard(term, lists, 'img', objectData[i].logoUrl, "logo");
        createInsideCard(term, lists, 'p', objectData[i].createdAt, "created");
        createInsideCard(term, lists, 'p', objectData[i].updatedAt, "updated");
        createInsideCard(term, lists, 'p', objectData[i].description, "description");
        createInsideCard(term, lists, 'p', objectData[i].industries, "industries");
        createInsideCard(term, lists, 'a', objectData[i].url, "link");
    }
}
function createInsideCard(term, lists, element, elementText, stringElement) {
    if (stringElement == "created" || stringElement == "updated") {
        elementText = elementText.slice(0, 10);
    }
    // to make sure there's an image for each card
    let createElementTitle = document.createElement(element);
    if (element !== 'img') {
        if (stringElement === "link") {
            if (elementText === '') {
                elementText = 'n/a';
            }
        }
        if (stringElement === "description") {
            if (elementText === 'We recommend atleast 500 words. This is your opportunity to speak to our audiance. You will always be able to edit your content. View examples of styles below o' || elementText === "") {
                elementText = 'n/a';
            }
        }
        let createElementText = document.createTextNode(stringElement + " : " + elementText);
        createElementTitle.appendChild(createElementText);
    }
    else {
        createElementTitle.setAttribute('src', elementText);
    }
    lists.appendChild(createElementTitle);
    let termUl;
    if (term === "defi") {
        termUl = document.querySelector('#defiUl');
    }
    else if (term === "nft collections") {
        termUl = document.querySelector('#nftUl');
    }
    else {
        termUl = document.querySelector('#industryUl');
    }
    termUl.appendChild(lists);
}
// Navbar scroll away when scrolling down
const navBar = document.querySelector('nav');
const ulNav = document.querySelector("#navUl");
const a = document.querySelectorAll('a');
let prevY = 0;
window.addEventListener('scroll', () => {
    setTimeout(() => {
        prevY = currentY;
    }, 100);
    let currentY = window.scrollY;
    if (currentY <= 60 || currentY == 0) {
        navBar.classList.remove('nav--remove');
    }
    else if (currentY > prevY) {
        navBar.classList.add('nav--remove');
    }
    else {
        navBar.classList.remove('nav--remove');
    }
});
let previousAnchor = a[0];
a.forEach(x => {
    x.addEventListener("click", () => {
        var _a;
        giveWhiteTxt({ anchor: x, text: (_a = x.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase() });
    });
});
function giveWhiteTxt(current) {
    if (current.text === "home" || current.text === "defi" || current.text === "nfts" || current.text === "solutions") {
        if (previousAnchor !== current.anchor) {
            previousAnchor.classList.remove('selected');
            previousAnchor = current.anchor;
            previousAnchor.classList.add('selected');
        }
        else
            return;
    }
    else
        return;
}
// Hamburger menu show when clicked & not clicked
let faBars = document.querySelector('.fa-solid.fa-bars-staggered');
let tryAgain = false;
faBars === null || faBars === void 0 ? void 0 : faBars.addEventListener("click", () => {
    switchCase({ display: tryAgain, ul: ulNav });
});
function switchCase(navSwitch) {
    if (navSwitch.display) {
        navSwitch.ul.style.display = "none";
        tryAgain = false;
    }
    else {
        navSwitch.ul.style.display = "flex";
        navSwitch.ul.style.background = "black";
        tryAgain = true;
    }
    ;
}
// Guide the picture on main page to scroll when arrows are clicked
const faLeft = document.querySelector('.fa-solid.fa-arrow-left-long');
const faRight = document.querySelector('.fa-solid.fa-arrow-right-long');
const box = document.querySelector('.box');
let centerX = document.documentElement.clientWidth;
;
let arrows = [faLeft, faRight];
arrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
        if (arrow.className === "fa-solid fa-arrow-right-long") {
            box.scrollLeft += centerX / 1.7;
        }
        else {
            box.scrollLeft -= centerX / 1.7;
        }
        ;
    });
});
