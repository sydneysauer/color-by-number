// Next time: condense color selection -- add option to "add new" which shows and hides adding grid
// Create grid
var startBtn = document.querySelector("#start");
startBtn.addEventListener("click", function buildGrid() {
    // Hide initial options
    const grid = document.querySelector(".creator");
    grid.classList.remove("hidden");
    grid.classList.add("vertical");
    const startScreeen = document.querySelector(".initial-options");
    startScreeen.classList.remove("initial-options");
    startScreeen.classList.add("hidden");

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

// Save new color functions
const saveButton = document.querySelector("#save");
saveButton.addEventListener("click", function saveData() {
    const nameField = document.getElementById("name");
    const colorField = document.getElementById("color");
    var name = nameField.value;
    var color = colorField.value;
    addToColorList(color, name);


    // Reset fields to default
    nameField.value = "";
    colorField.value = "#000000";    
});

// Add color 
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
    const groupName = "colorList";
    colorDesc.classList.add("horizontal");
    colorDesc.innerHTML = `<input type="radio" name="${groupName}" value="${color}">
    <label style="border-bottom: 3px solid ${color};"> ${label} </label>`;
    choices.appendChild(colorDesc);
    console.log(colors);
}

// Apply color to boxes
const colorBtn = document.querySelector("#select");
colorBtn.addEventListener("click", function selectColor() {
    const color = document.querySelector('input[name="colorList"]:checked').value;
    console.log("Current color: " + color);
    var selectedDivs = document.querySelectorAll(".selected");
    selectedDivs.forEach(function setProperties(item) {
        if (!item.classList.contains("submitted")) {
            item.style.backgroundColor = `${color}`;
            //item.innerHTML = "<span class=\"highlight\">" + name + "</span>";
            item.classList.add("submitted");         
        }
        item.classList.remove("selected");
    });
})



// Restart button
const restartButton = document.querySelector('#restart');
restartButton.addEventListener("click", function deselectAll() {
    window.location.reload();
});

// Finished button 
const finishButton = document.querySelector("#finish");
finishButton.addEventListener("click", function saveDrawing() {
    const boxes = document.querySelectorAll(".section");
    boxes.forEach(box => {
        var colorId = ""; //Makes white boxes empty
        if (box.style.backgroundColor) {
            console.log(box.style.backgroundColor);
            const boxColor = rgbToHex(box.style.backgroundColor);
            const colorObj = colors.find(function(element) {
                return element.color == boxColor;
            });
            colorId = colors.indexOf(colorObj) + 1;
        }
        
        console.log(colorId);
        // Put the colorId inside each box
        box.innerHTML = colorId;
        // Make all boxes white
        box.style.backgroundColor = "white";
    })

    // Hide/fade out side elements
    const sideBar = document.querySelector(".options");
    sideBar.style.display = "none";
    
    // Add color list vertically aligned
    var colorkey = "";
    if (colors.length > 0) {

        colors.forEach(color => {
            colorkey += `<div class="horizontal center">
            <span class="color-chunk" style="border: 10px solid ${color.color}">${colors.indexOf(color)}</span>
            </div>`;
        });
    }

    const key = document.querySelector(".colorkey");
    key.classList.remove("hidden");
    key.innerHTML = colorkey;
    document.querySelector(".finish-page").classList.add("vertical");

    // Print button / reminder /etc
    window.print();
})

function rgbToHex(col)
{
    if(col.charAt(0)=='r')
    {
        col=col.replace('rgb(','').replace(')','').split(',');
        var r=parseInt(col[0], 10).toString(16);
        var g=parseInt(col[1], 10).toString(16);
        var b=parseInt(col[2], 10).toString(16);
        r=r.length==1?'0'+r:r; g=g.length==1?'0'+g:g; b=b.length==1?'0'+b:b;
        var colHex='#'+r+g+b;
        return colHex;
    }
}