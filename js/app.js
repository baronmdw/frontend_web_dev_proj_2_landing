function setupNavbar() {
    // After initiating the DOM this function collects all card-headings and adds a navbar element for each
    let t1 = performance.now();
    const chapters = document.querySelectorAll(".card");
    const navbarWrapper = document.querySelector(".navbar");
    // TODO: Performance optimization
    let navBarList = document.createElement("ul");
    for (const chapter of chapters) {
        let addingElement = document.createElement("li");
        addingElement.classList.add("navbar-element");
        addingElement.innerText = chapter.firstElementChild.textContent
        navBarList.appendChild(addingElement);
        addingElement.addEventListener('click',navbarElementClicked);
    };
    navbarWrapper.appendChild(navBarList);
    let t2 = performance.now();
    console.log(t2-t1);
}

function selectRelevantCard(clickedElement,wasClicked) {
    // This function highlights the card corresponding to the clicked section and de-highlights if not selected
    const t1 = performance.now();
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
    const t2 = performance.now();
    console.log(t2-t1);
}

function navbarElementClicked(event) {
    // This function checks which element was clicked, deactivates all other navbar elements and toggles the one that was clicked
    event.preventDefault();
    const t1 = performance.now()
    const clickedElement = event.target;
    const parentElement = clickedElement.parentElement;
    const wasClicked = clickedElement.classList.contains("highlight");
    // TODO: Performance optimization
    for (const child of parentElement.children) {
        child.classList.remove("highlight")
    };
    if (wasClicked === false) {
        clickedElement.classList.add("highlight");
    };
    selectRelevantCard(clickedElement,wasClicked);
    let t2 = performance.now();
    console.log(t2-t1);
}

document.addEventListener('DOMContentLoaded', setupNavbar());