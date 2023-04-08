"use strict";
const anchor = document.querySelectorAll('a');
for (let i = 0; i < anchor.length; i++) {
    let checkAnchor = anchor[i];
    if (checkAnchor.textContent === "Cardano Natives") {
        checkAnchor.href = "index.html";
    }
}
// Repeated code from indexts - in a function because same name variables can't be repeateed
function runThis() {
    const navBar = document.querySelector('nav');
    const ulNav = document.querySelector("#navUl");
    const a = document.querySelectorAll('a');
    let previousAnchor = a[0];
    a.forEach(x => {
        x.addEventListener("click", () => {
            var _a;
            giveWhiteTxt({ anchor: x, text: (_a = x.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase() });
        });
    });
    function giveWhiteTxt(current) {
        if (current.text === "home" || current.text === "dapps" || current.text === "nfts" || current.text === "tokens") {
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
    const faBars = document.querySelector('.fa-solid.fa-bars-staggered');
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
    let prevY = 0;
    window.addEventListener('scroll', () => {
        setTimeout(() => {
            prevY = currentY;
        }, 100);
        let currentY = window.scrollY;
        if (currentY > prevY) {
            navBar.classList.add('nav--remove');
        }
        else if (currentY === 0) {
            navBar.classList.remove('nav--remove');
        }
        else {
            navBar.classList.remove('nav--remove');
        }
    });
}
;
runThis();
// Using coingecko to get cardano price for shopping price
const priceHTML = document.querySelector('.price');
let priceString = priceHTML.textContent;
let priceUsd = "";
if (priceString !== null) {
    for (let i = 0; i < priceString.length; i++) {
        let charCode = priceString[i].codePointAt(0);
        if (charCode >= 48 && charCode <= 57) {
            priceUsd += String.fromCodePoint(charCode);
        }
    }
}
else {
    priceUsd = "0";
}
;
fetch('https://api.coingecko.com/api/v3/coins/cardano?tickers=true&market_data=true')
    .then(response => response.json())
    .then(data => returnData(data))
    .catch(error => console.log(error));
function returnData(data) {
    const cardanoConversion = data.tickers[0].converted_last;
    const cardanoUsd = cardanoConversion.usd;
    const cardanoBtc = cardanoConversion.btc;
    const cardanoEth = cardanoConversion.eth;
    let shirtPriceAda = (Number(priceUsd) / cardanoUsd).toFixed(5) + " ADA";
    return priceHTML.textContent += shirtPriceAda;
}
// get data from reviews
const submitBtn = document.querySelector('#submit');
const nameInpt = document.querySelector('#name');
const descTxt = document.querySelector('#description');
const frm = document.querySelector('#formId');
frm.addEventListener('click', (e) => {
    e.preventDefault();
});
// submitBtn?.addEventListener('click', getInfo);
// const baseUrl = 'http://localhost:8888/';
// async function getInfo(event: any) {
//     console.log('hi');
//     event.preventDefault();
//     // const res = await fetch(baseUrl, {
//     //     method: 'GET'
//     // });
//     // console.log(res);
// };
