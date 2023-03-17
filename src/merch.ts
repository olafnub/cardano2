let anchor : NodeList = document.querySelectorAll('a');
for (let i = 0; i < anchor.length; i++) {
    let checkAnchor = anchor[i] as HTMLAnchorElement;
    if (checkAnchor.textContent === "Cardano Natives") {
        checkAnchor.href = "index.html";
    }
}
// Repeated code from indexts - in a function because same name variables can't be repeateed
function runThis() {

const navBar = document.querySelector('nav') as HTMLElement;
const ulNav = document.querySelector<HTMLUListElement>("#navUl")!;
const a = document.querySelectorAll<HTMLAnchorElement>('a');

type Current = {
    anchor: HTMLAnchorElement;
    text: string | undefined;
}

a.forEach(x  => {
    x.addEventListener("click", () => {
        giveWhiteTxt({anchor: x, text: x.textContent?.toLowerCase()})
    });
});

function giveWhiteTxt(current : Current) {
    if (current.text === "home" || current.text === "dapps" || current.text === "nfts" || current.text === "tokens") {
        if (previousAnchor !== current.anchor) {
            previousAnchor.classList.remove('selected')
            previousAnchor = current.anchor;
            previousAnchor.classList.add('selected');
        } else return;
    } else return;
}

let faBars = document.querySelector('.fa-solid.fa-bars-staggered') as HTMLElement;

let tryAgain = false;

type Navswitch = {
    display: boolean;
    ul: HTMLUListElement;
};
   
faBars?.addEventListener("click", () => {
    switchCase({display: tryAgain, ul: ulNav});
});

function switchCase(navSwitch: Navswitch) {
    if (navSwitch.display) {
        navSwitch.ul.style.display = "none";
        tryAgain = false;
    }
    else {
        navSwitch.ul.style.display = "flex";
        navSwitch.ul.style.background = "black";
        tryAgain = true;

        };
}

let prevY = 0;
window.addEventListener('scroll', () => {
    setTimeout(() => {
        prevY = currentY;
    }, 100);

    let currentY: number = window.scrollY;

    if (currentY > prevY) {
        navBar.classList.add('nav--appear');
    } else {
        navBar.classList.remove('nav--appear');
    }
});

};
runThis();

// Using coingecko to get cardano price for shopping price

let priceHTML = document.querySelector('.price') as HTMLParagraphElement;
let priceString: string | null = priceHTML.textContent;
let priceUsd:string = "";
if (priceString !== null) {
    for (let i = 0; i < priceString.length; i++) {
        let charCode: any = priceString[i].codePointAt(0);
        if (charCode >= 48 && charCode <=57) {
            priceUsd += String.fromCodePoint(charCode);
        }
    }
} else {
    priceUsd = "0";
};

interface Cardano {
    usd: number;
    tickers: any[];
    converted_last: string[];
}

fetch('https://api.coingecko.com/api/v3/coins/cardano?tickers=true&market_data=true')
.then(response => response.json())
.then(data => returnData(data))
.catch(error => console.log(error));

function returnData(data: Cardano): string {
    const cardanoConversion = data.tickers[0].converted_last;
    const cardanoUsd = cardanoConversion.usd;
    const cardanoBtc = cardanoConversion.btc;
    const cardanoEth = cardanoConversion.eth;

    let shirtPriceAda: string = (Number(priceUsd) * cardanoUsd).toFixed(5) + " ADA";

    return priceHTML.textContent += shirtPriceAda;

}

// to uncheck radio buttons for star rating in reviews

const radioList = document.querySelectorAll('.star-widget > input') as HTMLInputElement;

var radioState = false;

radioList.forEach(x => {
    x.addEventListener('click') {
        
    }
});


