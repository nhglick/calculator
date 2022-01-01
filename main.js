const upperDisplay = document.querySelector('#last-result');
const lowerDisplay = document.querySelector('#typing-area');

const operations = {
    'add': (a, b) => a + b,
    'subtract': (a, b) => a - b,
    'divide': (a, b) => a / b,
    'multiply': (a, b) => a * b,
};

const operationSymbols = {
    'add' : '+',
    'subtract': '-',
    'divide': '/',
    'multiply': 'x'
}

let operandQueue = '';
let operand1 = 0;
let operand2 = 0;

let operatorSelected = false;

let currentOperator = operations['add']
let queuedOperator = null;

function evaluate(a, b, c) {
    return c(a, b);
}

// adding the functionality to the buttons

const numberButtons = new Array(10);
for (let i=0; i<10; i++) {
    if (!operatorSelected) {
        operand1 = 0;
        currentOperator = operations['add'];
    }

    numberButtons[i] = document.querySelector(`#button-${i}`);
    numberButtons[i].addEventListener('click', () => {
        operandQueue += numberButtons[i].textContent;

        operand2 = parseFloat(operandQueue);
        lowerDisplay.textContent = `${operand2}`;
    });
}


const deleteButton = document.querySelector('#delete');
deleteButton.addEventListener('click', () => {
    operandQueue.length === 1 ? operandQueue = '0' : 
            operandQueue = operandQueue.substring(0, operandQueue.length - 1);
    operand2 = parseFloat(operandQueue);
    lowerDisplay.textContent = `${operand2}`;
});


const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
    if (operandQueue==='0') {
        operand1 = 0;
        operand2 = 0;

        upperDisplay.textContent = '0';
        lowerDisplay.textContent = '0';
    }
    else {
        operandQueue = '0';
        operand2 = 0;
        lowerDisplay.textContent = '0';
    }
});


const decimalButton = document.querySelector('#decimal');
decimalButton.addEventListener('click', () => {
    operandQueue += '.';
    lowerDisplay.textContent = operandQueue;
    decimalButton.disabled = true;
});


const evaluateButton = document.querySelector('#evaluate');
evaluateButton.addEventListener('click', () => {
    if (!currentOperator)
        currentOperator = add;

    upperDisplay.textContent = evaluate(operand1, operand2, currentOperator);
    lowerDisplay.textContent = upperDisplay.textContent;

    operand1 = 0;
    operand2 = 0;
    operandQueue = '0';

    currentOperator = operations.add;
    queuedOperator = null;

    decimalButton.disabled = false;
    operatorSelected = false;
});


const operatorButtons = Array.from(document.querySelectorAll('.operator'));
for (const operator of operatorButtons) {
    operator.addEventListener('click', () => {
        queuedOperator = operations[operator.id];

        operand1 = evaluate(operand1, operand2, currentOperator);
        operand2 = 0;
        operandQueue = '';
        currentOperator = queuedOperator;
        
        upperDisplay.textContent = `${operand1} ${operationSymbols[operator.id]}`;
        lowerDisplay.textContent = parseFloat(operand1);

        decimalButton.disabled = false;
        operatorSelected = true;
    });
}