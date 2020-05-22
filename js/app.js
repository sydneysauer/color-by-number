//TODO turn blocks white on restart + can we change the selection color? maybe add above grid (branch!!!!!)

var boxes = document.querySelectorAll(".section");

// Box panel functions
for (const box of boxes) {   
    box.addEventListener("click", function selectBox(e) {
        console.log(e.target);
        e.target.classList.add("selected");       
    });  
}

// Form functions
const saveButton = document.querySelector("#save");
saveButton.addEventListener("click", function saveData() {
    const nameField = document.getElementById("name");
    const colorField = document.getElementById("color");
    var name = nameField.value;
    var color = colorField.value;
    var selectedDivs = document.querySelectorAll(".selected");
    selectedDivs.forEach(function setProperties(item) {
        if (!item.classList.contains("submitted")) {
            item.style.background = color;
            //item.innerHTML = "<span class=\"highlight\">" + name + "</span>";
            var nameText = document.createElement("P");
            nameText.innerHTML = "<span class=\"highlight\">" + name + "</span>";
            item.appendChild(nameText);
            item.classList.add("submitted");         
        }
        item.classList.remove("selected");
    });
    console.log(selectedDivs);


    // Reset fields to default
    nameField.value = "";
    colorField.value = "#000000";    
});

const restartButton = document.querySelector('#restart');
restartButton.addEventListener("click", function deselectAll() {
    window.location.reload();
    /*
    for (const box of boxes) {
        box.classList.remove("selected");
        box.classList.remove("submitted");
        box.innerHTML = "";   
        boxes.forEach(function(item) {
            item.style.background = "white";
        }); 
    }
    */
});


    