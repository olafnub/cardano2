const anchor : NodeList = document.querySelectorAll('a');
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

let previousAnchor : HTMLAnchorElement = a[0];
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

const faBars = document.querySelector('.fa-solid.fa-bars-staggered') as HTMLElement;

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
        navBar.classList.add('nav--remove');
    } else if (currentY === 0) {
        navBar.classList.remove('nav--remove');
    } else {
        navBar.classList.remove('nav--remove');
    }
});

};

runThis();

// Using coingecko to get cardano price for shopping price

const priceHTML = document.querySelector('.price') as HTMLParagraphElement;
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

    let shirtPriceAda: string = (Number(priceUsd) / cardanoUsd).toFixed(5) + " ADA";

    return priceHTML.textContent += shirtPriceAda;

}

// get data from reviews
const submitBtn = document.querySelector('#submit') as HTMLButtonElement;
const nameInpt = document.querySelector('#name') as HTMLInputElement;
const descTxt = document.querySelector('#description') as HTMLTextAreaElement;
const frm = document.querySelector('#formId') as HTMLFormElement;

frm.addEventListener('submit', () => {
   alert("Thanks for the submission! Hope you see you browsing again")
})

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