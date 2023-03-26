// import {v4 as uuidv4} from 'uuid'
// cmd shift p -> typescript restart server | check if code is right or not for red squigly
let urlByTerm: string = 'ByTerm?term=';
let urlByName: string = 'Name?slug=';
let cardanoUrl: string = 'https://us-central1-builtoncardano.cloudfunctions.net/api/projects';

let terms: string[] = ["defi", "nft collections", "industry solutions"];
terms.forEach(term => {
    fetch(cardanoUrl + urlByTerm + term)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.log('Unsucessful')
        }
    })
    .then(data => {
        createLists(data, term);
    })
    .catch(error => console.log('ERROR: ' + error));

})

// Used these for getting each card info
// [0].createdAt
// [0].updatedAt
// [0].description
// [0].industries - Tags
// [0].url
// [0].name
// [0].logoUrl

function createLists(data: object, term: string): void {
    let objectData = Object.values(data);
    for (let i = 0; i < 10; i++) {
        let lists = document.createElement('li') as HTMLLIElement;

        createInsideCard(term, lists, 'h3', objectData[i].name, "title");
        createInsideCard(term, lists, 'img', objectData[i].logoUrl, "logo");
        createInsideCard(term, lists, 'p', objectData[i].createdAt, "created");
        createInsideCard(term, lists, 'p', objectData[i].updatedAt, "updated");
        createInsideCard(term, lists, 'p', objectData[i].description, "description");
        createInsideCard(term, lists, 'p', objectData[i].industries, "industries");
        createInsideCard(term, lists, 'a', objectData[i].url, "link");

    }
}



function createInsideCard(term: string, lists: HTMLLIElement, element: string, elementText: string, stringElement: string): void {
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
                elementText = 'n/a'
            }
        }
        let createElementText = document.createTextNode(stringElement + " : " + elementText);
        createElementTitle.appendChild(createElementText);
    }
    else {
        createElementTitle.setAttribute('src', elementText);
    }
    lists.appendChild(createElementTitle);
    let termUl: any;
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

// To let to navbar scroll away when scrolling
const navBar = document.querySelector('nav') as HTMLElement;
const ulNav = document.querySelector<HTMLUListElement>("#navUl")!;
const a = document.querySelectorAll<HTMLAnchorElement>('a');

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
    }else {
        navBar.classList.remove('nav--remove');
    }
});


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

function giveWhiteTxt(current : Current): void {
    if (current.text === "home" || current.text === "defi" || current.text === "nfts" || current.text === "solutions") {
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

function switchCase(navSwitch: Navswitch): void {
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

const faLeft = document.querySelector('.fa-solid.fa-arrow-left-long') as HTMLElement;
const faRight = document.querySelector<HTMLElement>('.fa-solid.fa-arrow-right-long') as HTMLElement;
const box = document.querySelector('.box') as HTMLElement;
let centerX: number = document.documentElement.clientWidth;;
let arrows : HTMLElement[] = [faLeft, faRight];

arrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
        if (arrow.className === "fa-solid fa-arrow-right-long") {
            box.scrollLeft += centerX/1.7;
        }
        else {
            box.scrollLeft -= centerX/1.7;
        };
    })
});