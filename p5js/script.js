let inputString = "Little red riding hood went to the forest and ";
let index = 0;
let delay = 0;
let interval;
let button;
let outputText = "";

function setup() {
  createCanvas(400, 400);
  textSize(20);
  
  button = createButton("Generate Text");
  button.position(10, height - 50);
  button.mousePressed(generateText);
}

async function generateText() {
  const response = await fetch("http://localhost:3000/generate", { 
    method: "POST",
    body: JSON.stringify({text: inputString})
  });
  const data = await response.json();
  inputString = data.text;
  outputText = "";
  delay = Math.floor(Math.random() * 200) + 50;
  index = 0;
  interval = setInterval(function() {
    outputText += inputString.charAt(index);
    index++;
    if (index > inputString.length) {
      clearInterval(interval);
    }
  }, delay);
}

function draw() {
  background(220);
  text(inputString, 10, height/2 - 20);
  text(outputText, 10, height/2 + 20);
}