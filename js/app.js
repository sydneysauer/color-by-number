var boxes = document.querySelectorAll(".section");

// Make boxes clickable
for (const box of boxes) {   
    box.addEventListener("click", function selectBox(e) {
        console.log(e.target);
        e.target.classList.add("selected");       
    });  
}



    