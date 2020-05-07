const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(operator, a, b){
    switch (operator){
        case "+":
            return add(a, b);
            break;
        case "-":
            return subtract(a, b);
            break;
        case "*":
            return multiply(a, b);
            break;
        case "/":
            return divide(a, b);
            break;
    }
}

let operator = ""; 
let currentNumber = ""; 
let result; 

const screen = document.querySelector(".calculator-screen");
const operatorButtons = document.querySelectorAll(".operator");
const numberButtons = document.querySelectorAll(".number");

numberButtons.forEach((numberButton) => 
    numberButton.addEventListener("click", () => updateScreen(numberButton.value)));

function updateScreen(numberValue){
    currentNumber += numberValue;
    screen.value = twelveDigit(currentNumber);
}

operatorButtons.forEach((operatorButton) => 
    operatorButton.addEventListener("click", function(){
        updateValues(operatorButton.value);
    })); 

function updateValues(input){
    if (operator === "/" && currentNumber == 0){
        clearAll();
        return;
    } else if (operator === "" || operator === "="){ 
        result = Number(screen.value); 
    } else{
        result = operate(operator, result, Number(currentNumber));
    }
    operator = input;
    screen.value = twelveDigit(result);
    currentNumber = "";
}

function twelveDigit(number){ 
    number = Number(number); 
    numberString = String(number);

    if (numberString.length <= 12) return number;

    if (number % 1 !== 0){ 
        let digitsBeforeDecimal = numberString.indexOf('.');
        let spaceLeft = 11 - digitsBeforeDecimal;
        numberString = number.toFixed(spaceLeft);
        return Number(numberString);
    }

    numberString = numberString.substr(0,12);
    return Number(numberString);
}

const clearButton = document.querySelector(".all-clear");
clearButton.addEventListener("click", clearAll);

function clearAll(){
    operator = ""; 
    currentNumber = "";
    result = '';
    screen.value = "0";
}

const backspace = document.querySelector(".backspace");
backspace.addEventListener("click", undo);

function undo(){
    if (currentNumber.length == 0) return;
    currentNumber = currentNumber.slice(0,currentNumber.length - 1);
    screen.value = currentNumber;
}