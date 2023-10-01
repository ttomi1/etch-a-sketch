const fieldSize = document.querySelector(".size");
const rainbowButton = document.querySelector(".rainbow");
const colorButton = document.querySelector(".color");
let colorPicker = document.querySelector('#favcolor');
const sketch = document.querySelector(".sketch");
const removeButton = document.querySelector(".remove");
const buttons = document.querySelectorAll("button");
let fieldNumber;
let selectedColor;
const array = [];

rainbowButton.addEventListener("click", () =>{
  colorButton.classList.remove("active");
  rainbowButton.classList.add("active");
  rainbowButton.classList.add("playing");
})

colorButton.addEventListener("click", () =>{
  rainbowButton.classList.remove("active");
  colorButton.classList.add("active");
  colorButton.classList.add("playing");
})

for(let i = 0; i < (16*16); i++){
    let div = document.createElement("div");
    const cellWidth = "calc(640px / 16)"; 
    div.style.width = cellWidth;
    div.style.height = cellWidth;
    div.classList.add("basic");
    array.push(div);
    sketch.appendChild(array[i]);
}

function checkDiv(){
  if (sketch.hasChildNodes()) {
    while (sketch.firstChild) {
      sketch.removeChild(sketch.firstChild);
    }
  }
}

function remove(){
  const block = getBlock();
  block.forEach(div => {
    div.style.backgroundColor = `white`;
  });
}

fieldSize.addEventListener("click", () =>{
  remove();
  fieldSize.classList.add("playing");
  fieldNumber = +prompt("Enter");
  if(fieldNumber != 0 ){
    checkDiv();
  for(let i = 0; i < (fieldNumber*fieldNumber); i++){
    let div = document.createElement("div");
    const cellWidth = `calc(640px / ${fieldNumber})`; 
    div.style.width = cellWidth;
    div.style.height = cellWidth;
    div.classList.add("basic");
    sketch.appendChild(div);
  }
}
})

function getBlock(){
  return document.querySelectorAll(".basic")
}

colorPicker.addEventListener('input', () => {
  selectedColor = colorPicker.value;
});

function getRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  const color = `rgb(${red}, ${green}, ${blue})`;

  return color;
}

function draw(){
    const block = getBlock();
    block.forEach(element => {
      element.addEventListener("mouseover", () =>{
        if(colorButton.classList.contains("active")){
          element.style.backgroundColor = selectedColor;
        }
        if(rainbowButton.classList.contains("active")){
          element.style.backgroundColor = getRandomColor();
        }
      })
    }); 
}

sketch.addEventListener("mouseover", () =>{
    draw();
})

removeButton.addEventListener("click", ()=>{
  remove();
  removeButton.classList.add("playing");
})

function removeTransition(e){
  if(e.propertyName !== "transform") return;
    this.classList.remove("playing");
}

buttons.forEach(element => {
  element.addEventListener("transitionend", removeTransition)
});


