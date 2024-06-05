const inputDisplay = document.querySelector("#input");
const outputDisplay = document.querySelector("#output");
const buttons = document.querySelectorAll("button");

let inputExpression = "";
let previousOutput = "";

buttons.forEach((item) => {
  item.onclick = () => {
    if (item.id == "clear") {
      inputExpression = "";
      inputDisplay.innerText = "";
      outputDisplay.innerText = "";
      previousOutput = "";
    } else if (item.id == "backspace") {
      inputExpression = inputExpression.slice(0, -1);
      inputDisplay.innerText = inputExpression;
    } else if (item.id == "equal") {
      try {
        previousOutput = eval(inputExpression);
        outputDisplay.innerText = previousOutput;
      } catch (error) {
        outputDisplay.innerText = "Error";
      }
    } else if (item.id == "click") {
      inputExpression = "";
      inputDisplay.innerText = "";
      outputDisplay.innerText = "";
    } else if (/[+\-*/%]/.test(item.id)) {
      if (outputDisplay.innerText !== "") {
        inputExpression = previousOutput.toString() + item.id;
        previousOutput = "";
      } else {
        inputExpression += item.id;
      }
      inputDisplay.innerText = inputExpression;
    } else {
      inputExpression += item.id;
      inputDisplay.innerText = inputExpression;
    }
  };
});