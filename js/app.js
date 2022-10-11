let noAutoScroll = true;

function setupNavbar() {
    // After initiating the DOM this function collects all card-headings and adds a navbar element for each
    const chapters = document.querySelectorAll(".card");
    const navbarWrapper = document.querySelector(".navbar");
    let navBarList = document.createElement("ul");
    for (const chapter of chapters) {
        let addingElement = document.createElement("li");
        addingElement.classList.add("navbar-element");
        addingElement.innerText = chapter.firstElementChild.textContent
        navBarList.appendChild(addingElement);
        addingElement.addEventListener('click',navbarElementClicked);
    };
    navbarWrapper.appendChild(navBarList);
}

function selectRelevantCard(clickedElement,wasClicked) {
    // This function highlights the card corresponding to the clicked section and de-highlights if not selected
    const elements = document.querySelectorAll('.card');
    const clickedText = clickedElement.textContent;
    for (const element of elements) {
        const compareText = element.firstElementChild.textContent;
        if (compareText === clickedText & wasClicked===false ) {
            element.classList.add("highlight");
            element.firstElementChild.classList.add("highlight-heading");
            if (document.querySelector('.navbar').getBoundingClientRect().height !== 75) {
                element.scrollIntoView({behavior: "smooth"});
            } else {
                const topSide = element.offsetTop;
                window.scroll({top: topSide-75, behavior: "smooth"});
            };
        } else {
            element.classList.remove("highlight");
            element.firstElementChild.classList.remove("highlight-heading");
        };
    };
}

function navbarElementClicked(event) {
    // This function activates upon click event and checks which element was clicked, deactivates all other navbar elements and toggles the one that was clicked
    event.preventDefault();
    noAutoScroll = false;
    const clickedElement = event.target;
    const parentElement = clickedElement.parentElement;
    const wasClicked = clickedElement.classList.contains("highlight");
    for (const child of parentElement.children) {
        child.classList.remove("highlight")
    };
    if (wasClicked === false) {
        clickedElement.classList.add("highlight");
    };
    selectRelevantCard(clickedElement,wasClicked);
    setTimeout(() => {noAutoScroll = true}, 800);
}

document.addEventListener("DOMContentLoaded", setupNavbar());
window.addEventListener("scroll", () => {
    // inline definition because it wouldn't work conistently with calling an external function -> would have been a performance issue?
    // This function checks which cars are scrolled into viewport and hightlights them and their corresponding link in the navbar
    if(noAutoScroll){
        const elements = document.querySelectorAll(".card");
        let topGap = 75;
        if (document.querySelector('.navbar').getBoundingClientRect().height !== 75) {
            topGap = 0;
        };
        for (const element of elements) {
            const titleText = element.firstElementChild.textContent;
            const listElements = document.querySelector('ul');
            if ((element.getBoundingClientRect().top-topGap > 0 & element.getBoundingClientRect().bottom <= window.innerHeight) | (topGap == 75 & (element.getBoundingClientRect().top-topGap > -1000 & element.getBoundingClientRect().bottom <= 2000))) {
                element.classList.add("highlight");
                element.firstElementChild.classList.add("highlight-heading");
                for (const listElement of listElements.children) {
                    if (listElement.textContent === titleText) {
                        listElement.classList.add("highlight");
                    };
                };
            } else {
                element.classList.remove("highlight");
                element.firstElementChild.classList.remove("highlight-heading");
                for (const listElement of listElements.children) {
                    if (listElement.textContent === titleText) {
                        listElement.classList.remove("highlight");
                    };
                };
            };
        };
    };
});