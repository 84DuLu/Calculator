let memoryNum = 0;
let memoryOperator = ''
let processedNum = null;
let operator = '';
let displayValue = `${memoryNum}`;
let euqalActice = false;

const screen = document.querySelector(".screen");
const topDisplay = document.getElementById("topDisplay");
const bottomDisplay = document.getElementById('bottomDisplay');
const clearBtn = document.getElementById('clearBtn');
const deleteBtn = document.getElementById('deleteBtn');
const dotBtn = document.getElementById('dotBtn');
const equalBtn = document.getElementById('equalBtn');
const numberBtns = document.querySelectorAll(".numberBtn");
const operatorBtns = document.querySelectorAll(".operatorBtn");

clearBtn.addEventListener('click', clear);
deleteBtn.addEventListener('click', del);
dotBtn.addEventListener('click', dotDisplay);
equalBtn.addEventListener('click', equalBtnClick);
numberBtns.forEach((numberBtn) => numberBtn.addEventListener('click', screenDisplay));
operatorBtns.forEach((operatorBtn) => operatorBtn.addEventListener('click', operatorBtnClick));

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b == 0) {
    return NaN;
  }
  return a / b;
}

function modular(a, b) {
  return a % b;
}

function operate (num1, num2, operator) {
  let result;
  switch (operator) {
    case '+': result = add(num1, num2);
              break;
    case '-': result = subtract(num1, num2);
              break;
    case '×': result = multiply(num1, num2);
              break;
    case '÷': result = divide(num1, num2);
              break;
    case '%': result = modular(num1, num2);
              break;
  }
  return result;
}

function operatorBtnClick(e) {
  operator = e.target.textContent;
  screen.style.flexDirection = "column-reverse";
  euqalActice = false;

  if (processedNum !== null) {
    processedNum = +displayValue;
    memoryNum = operate(memoryNum, processedNum, memoryOperator);
    processedNum = null;
    displayValue = `${memoryNum}`;
    bottomDisplay.textContent = displayValue;
  } else {
    memoryNum = +displayValue;
  }

  topDisplay.textContent = `${displayValue} ${operator}`;
  memoryOperator = operator;
}

function equalBtnClick() {
  if (processedNum !== null) {
    const oldMemoryNum = memoryNum;
    processedNum = +displayValue;
    memoryNum = operate(memoryNum, processedNum, memoryOperator);
    topDisplay.textContent = `${oldMemoryNum} ${operator} ${processedNum} = ${memoryNum}`;
    processedNum = null;
    displayValue = `${memoryNum}`;
    bottomDisplay.textContent = displayValue;
    euqalActice = true;
  }
}

function screenDisplay (e) {
  if (displayValue === '0') {
    displayValue = '';
  }

  if (memoryOperator !== '' && processedNum === null) {
    if (euqalActice === true) {
      euqalActice = false;
      clear();
      displayValue = e.target.textContent;
      bottomDisplay.textContent = displayValue;
      return;
    }
    displayValue = '';
    displayValue += e.target.textContent;
    bottomDisplay.textContent = displayValue;
    processedNum = '';
  } else {
    displayValue += e.target.textContent;
    bottomDisplay.textContent = displayValue;
  }
}
  
function clear() {
  memoryNum = 0;
  memoryOperator = '';
  processedNum = null;
  operator = '';
  displayValue = `${memoryNum}`;
  bottomDisplay.textContent = displayValue;
  topDisplay.textContent = '';
  screen.style.flexDirection = "column";
}

function dotDisplay () {
  if (memoryOperator !== '' && processedNum === null) {
    if (euqalActice === true) {
      euqalActice = false;
      clear();
      displayValue = '0.';
      bottomDisplay.textContent = displayValue;
      return;
    }
    displayValue = '0.';
    processedNum = '';
  }
  if (!displayValue.includes('.')) {
    displayValue += '.';
  }
  bottomDisplay.textContent = displayValue;
}

function del() {
  if (displayValue.length === 1) {
    displayValue = '0';
  } else {
    displayValue = displayValue.slice(0, -1);
  }

  if (memoryOperator !== '' && processedNum === null) {
    memoryNum = +displayValue;
    topDisplay.textContent = `${displayValue} ${operator}`; 
  }

  bottomDisplay.textContent = displayValue;
} 