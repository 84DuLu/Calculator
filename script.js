let memoryNum = 0;
let memoryOperator = ''
let processedNum = null;
let operator = '';
let displayValue = `${memoryNum}`;
let euqalActive = false;
let isRestricted = true;

const screen = document.querySelector(".screen");
const topDisplay = document.getElementById("topDisplay");
const bottomDisplay = document.getElementById('bottomDisplay');
const clearBtn = document.getElementById('clearBtn');
const deleteBtn = document.getElementById('deleteBtn');
const dotBtn = document.getElementById('dotBtn');
const equalBtn = document.getElementById('equalBtn');
const numberBtns = document.querySelectorAll(".numberBtn");
const operatorBtns = document.querySelectorAll(".operatorBtn");

clearBtn.addEventListener('mousedown', clear);
deleteBtn.addEventListener('mousedown', del);
dotBtn.addEventListener('mousedown', dotDisplay);
equalBtn.addEventListener('mousedown', equalBtnClick);
numberBtns.forEach((numberBtn) => numberBtn.addEventListener('mousedown', screenDisplay));
operatorBtns.forEach((operatorBtn) => operatorBtn.addEventListener('mousedown', operatorBtnClick));
document.body.addEventListener('mousedown', () => {
  if (topDisplay.textContent.length > 25) {
    topDisplay.style.fontSize = '1rem';
  } else {
    topDisplay.style.fontSize = '1.5rem';
  }

  if (bottomDisplay.textContent.length > 14) {
    bottomDisplay.style.fontSize = '2rem';
  } else {
    bottomDisplay.style.fontSize = '3rem';
  }
});

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
  if (!Number.isInteger(num1) || !Number.isInteger(num2) || (num1 % num2)) {
    return Math.round(result * 10000) / 10000;
  }
  return result;
}

function operatorBtnClick(e) {
  operator = e.target.textContent;
  screen.style.flexDirection = "column-reverse";
  screen.style.justifyContent = "space-around";
  euqalActive = false;
  isRestricted = false;

  if (processedNum !== null) {
    processedNum = +displayValue;
    memoryNum = operate(memoryNum, processedNum, memoryOperator);
    if (memoryNum > 10 ** 20) {
      memoryNum = memoryNum.toPrecision(6);
    }
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
    if (memoryNum > 10 ** 20) {
      memoryNum = memoryNum.toPrecision(6);
    }
    topDisplay.textContent = `${oldMemoryNum} ${operator} ${processedNum} = ${memoryNum}`;
    processedNum = null;
    displayValue = `${memoryNum}`;
    bottomDisplay.textContent = displayValue;
    euqalActive = true;
    isRestricted = false;
  }
}

function screenDisplay (e) {
  if (isRestricted === true && displayValue.length > 10 ) {
    return;
  }
  isRestricted = true;

  if (displayValue === '0') {
    displayValue = '';
  }

  if (memoryOperator !== '' && processedNum === null) {
    if (euqalActive === true) {
      euqalActive = false;
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
  euqalActive = false;
  isRestricted = false;  
  bottomDisplay.textContent = displayValue;
  topDisplay.textContent = '';
  screen.style.flexDirection = "column";
  screen.style.justifyContent = "flex-end";
}

function dotDisplay () {
  if (memoryOperator !== '' && processedNum === null) {
    if (euqalActive === true) {
      euqalActive = false;
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
  if (euqalActive === true) {
    return;
  }

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