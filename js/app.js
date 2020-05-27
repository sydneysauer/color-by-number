// Next time: condense color selection -- add option to "add new" which shows and hides adding grid
// Create grid
var startBtn = document.querySelector("#start");
startBtn.addEventListener("click", function buildGrid() {
    // Hide initial options
    const grid = document.querySelector(".hidden");
    grid.classList.add("vertical");
    grid.classList.remove("hidden");
    document.querySelector(".initial-options").classList.add("hidden");

    var rows = document.querySelector('#rows').value;
    var columns = document.querySelector('#columns').value;

    document.documentElement.style.setProperty("--height", ((1/rows) * 100 + "%"));
    document.documentElement.style.setProperty("--width", ((1/columns) * 100 + "%"));
    const mainBox = document.querySelector(".grid");
    for (var i = 0; i < rows; i ++) {
        const newRow = document.createElement("div");
        newRow.classList.add("row"); 
        mainBox.appendChild(newRow);
        for (var j = 0; j < columns; j++) {
            console.log("inside inner");
            const newColumn = document.createElement("div");
            newColumn.classList.add("section");
            newRow.appendChild(newColumn);
        }
    }
    
    console.log("Rows: " + rows); 
    console.log("Cols: " + columns);
    var boxes = document.querySelectorAll(".section");
    // Add box panel functions
    for (const box of boxes) {   
    box.addEventListener("click", function toggleSelected(e) {
        console.log(e.target);
        if (e.target.classList.contains("selected")) {
            e.target.classList.remove("selected");    
        } else {
            e.target.classList.add("selected");    
        }          
    });  
}   
});



const selectionColor = document.getElementById("selection-color");
selectionColor.addEventListener("change", function changeColor(e) {
    document.documentElement.style.setProperty("--selectedcolor", e.target.value);
});

// Form functions
const saveButton = document.querySelector("#save");
saveButton.addEventListener("click", function saveData() {
    const nameField = document.getElementById("name");
    const colorField = document.getElementById("color");
    var name = nameField.value;
    var color = colorField.value;
    addToColorList(color, name);
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


    // Reset fields to default
    nameField.value = "";
    colorField.value = "#000000";    
});

const restartButton = document.querySelector('#restart');
restartButton.addEventListener("click", function deselectAll() {
    window.location.reload();
});


// Color selection (Add, choose existing)
var colors = [];
const choices = document.querySelector("#all-colors");
function addToColorList(color, label) {
    if (!label) { label = color;}
    const currColor = {
        color: color,
        name: label
    };
    colors.push(currColor);

    //Update radio button list
    const colorDesc = document.createElement("div");
    const groupName = "colorList"
    colorDesc.classList.add("horizontal");
    colorDesc.innerHTML = `<input type="radio" name="${groupName}">
    <label value="${label}" style="border-bottom: 3px solid ${color};"> ${label} </label>`;
    choices.appendChild(colorDesc);
    console.log(colors);


  /*
    const groupName = "color-list";
    const newColor = document.createElement("input");
    newColor.setAttribute("type", "radio");
    newColor.setAttribute("value", label);
    newColor.setAttribute("name", groupName);
    
    const newColorLabel = document.createElement("label");
    newColorLabel.innerHTML = label;
    newColorLabel.setAttribute("style", `color: ${color}`);
    //newColorLabel.innerHTML = `<span style="background-color: ${color}" class="color-chunk"></span>${label}`;

    choices.appendChild(newColor);
    choices.appendChild(newColorLabel)
    
    */
}
