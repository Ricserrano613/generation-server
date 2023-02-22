let r = 0;
let g = 0;
let b = 25;
let t = 10;

let inputString = "";
let index = 0;
let delay = 100;
let promptInput;
let generatedText = "";
let button;


function setup() {
  createCanvas(400, 400);
  fill(255);
  stroke(0);
  strokeWeight(2);
  textSize(32);
  getTextFromAPI();
  promptInput = createInput("");
  promptInput.position(20,20);
  let generateButton = createButton("Generate Text");
  generateButton.position(promptInput.x + promptInput.width, 20);
  // generateButton.mousePressed(generateText);
  // button = createButton("Push Me!");
}

function draw() {
  background(r,g,b,t);
  textAlign(CENTER,CENTER);
  let displayString = "";
  let words = inputString.split(" ");
  let currentLine = "";
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    if (textWidth(currentLine + word) < width - 50) {
      currentLine += word + " ";
    } else {
      displayString += currentLine + "\n";
      currentLine = word + " ";
    }
  }
  displayString += currentLine;
  let lines = displayString.split("\n");
  let lineHeight = textAscent() + textDescent();
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let y = (height + lineHeight) / 2 + lineHeight * i;
    text(line, 50, y);
  }
  let stars = {
    locationX: random(height),
    locationY: random(width),
    size: random(1,6)
  }
  ellipse(stars.locationX,stars.locationY,stars.size);
}

let interval;
async function getTextFromAPI() {
  const response = await fetch("http://localhost:3000/generate", 
  {method: "post", body: {text:"We flew into space and "}});
  const data = await response.json();
  inputString = data.text;
  delay = Math.floor(Math.random() * 200) + 50;
  interval = setInterval(function() {
    index++;
    if (index > inputString.length) {
      clearInterval(interval);
    }
  }, delay);
}

// function generateText() {
//   let prompt = promptInput.value();
//   httpPost(
//     "/openai",
//     "prompt=" + prompt,
//     function(response) {
//       generatedText = response.generated_text;
//     }
//   );
// }
