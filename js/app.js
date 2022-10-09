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

function navbarElementClicked(event) {
    // This function checks which element was clicked, deactivates all other navbar elements and toggles the one that was clicked
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
    let t2 = performance.now();
    console.log(t2-t1);
}

setupNavbar();