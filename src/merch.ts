// TESTING - REMOVE WHEN READY TO PUBLISH
fetch("http://localhost:8888/merch.json")
.then(res => res.json())
.then(data => {
    console.log(data);
    })
.catch(err => console.log(err));

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

// Thank user for submitting a form review
const frm = document.querySelector('#formId') as HTMLFormElement;
frm.addEventListener('submit', () => {
   alert("Thanks for the submission! Hope you see you browsing again")
});

// Description of user's purchase || send selectBox & qtyValue
let selectBox: string | null = "";
let previousBox: HTMLDivElement | null;
const sizeBox: NodeListOf<HTMLDivElement> = document.querySelectorAll('.size-box');
sizeBox.forEach(box => {
    box.addEventListener('click', () => {
        if (previousBox !== box) {
            box.style.color = 'white';
            box.style.background = 'var(--primary-color)';
            if (previousBox != null) {
                previousBox.style.color = 'black';
                previousBox.style.background = 'rgba(var(--color-gray), 40%)';
            }
            selectBox = box.textContent;
            previousBox = box;
        } else {
            previousBox.style.color = 'black';
            previousBox.style.background = 'rgba(var(--color-gray), 40%)';
            previousBox = null;
            selectBox = "";
        }
    })
});

const qtySelect = document.querySelector('#quantity-list') as HTMLSelectElement;
let qtyValue: number = 1;
qtySelect.addEventListener('change', () => {
    qtyValue = Number(qtySelect.value);
});

// Added to your cart function
const addCart = document.querySelector("#add-to-cart") as HTMLButtonElement;
addCart.addEventListener('click', () => {
    if (selectBox == '') {
        return alert("Please select size");
    } else {
        alert("Added to your cart");
        const order = {size: selectBox, qty: qtyValue}
        const options = {
            method: "post",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(order)
        }
        fetch("http://localhost:8888/create-checkout-session", options)
        .then(res => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        })
        .then(({ url }) => {
            window.location = url
        })
        .catch(err => console.log(err));
    }
});
