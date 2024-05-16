// Define a named function for the event listener
function handleClick() {
    console.log("hello table.js");
}

// Select the <h1> element
var h1 = document.querySelector("h1");

h1.innerText = "hello hai"
h1.addEventListener("click", handleClick)
