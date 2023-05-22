"use strict";
// Fetchs data from own server to bypass CORS
const success = (data) => {
    console.log(data);
};
fetch("http://localhost:8888/merch.json")
    .then(res => res.json())
    .then(data => {
    success(data);
})
    .catch(err => console.log(err));
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
// Thank user for submitting a form review
const frm = document.querySelector('#formId');
frm.addEventListener('submit', () => {
    alert("Thanks for the submission! Hope you see you browsing again");
});
// Description of user's purchase || send selectBox & qtyValue
let selectBox = "";
let previousBox;
const sizeBox = document.querySelectorAll('.size-box');
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
        }
        else {
            previousBox.style.color = 'black';
            previousBox.style.background = 'rgba(var(--color-gray), 40%)';
            previousBox = null;
            selectBox = "";
        }
    });
});
const qtySelect = document.querySelector('#quantity-list');
let qtyValue = "";
qtySelect.addEventListener('click', () => {
    qtyValue = qtySelect.value;
});
// Added to your cart function
const addCart = document.querySelector("#add-to-cart");
addCart.addEventListener('click', () => {
    if (selectBox == '') {
        alert("Please select size");
    }
    else {
        alert("Added to your cart");
    }
});
