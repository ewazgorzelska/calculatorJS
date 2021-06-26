
// buttons
const digitsButtons = document.querySelectorAll('.digits');
const screenInput = document.getElementById('screen');
const operatorsButtons = document.querySelectorAll('.operators');
const clearButton = document.querySelector('.clear');
const equalsButton = document.querySelector('.digits[value="="]');
const floatingPoint = document.querySelector('.digits[value="."]');
const allButtons = document.querySelectorAll('button');

//helpers - variables
const localStorage = window.localStorage;
const operations = {
    '+': function (number, secondNumber) { return number + secondNumber },
    '-': function (number, secondNumber) { return number - secondNumber },
    '*': function (number, secondNumber) { return number * secondNumber },
    '/': function (number, secondNumber) { return number / secondNumber },
}
const arrOfDigits = [];
const arrOfSecondDigits = [];
let floatingPointClicked = false;

//helpers - functions
function setInputValue(event) {
    screenInput.value = event.target.value;
};

function setResultAsInputValue(result) {
    screenInput.value = result;
};

const filterFloatingPoints = arr => arr.filter(el => el === '.');

function noDoubleFloatingPoint (array) {
    if (floatingPointClicked && filterFloatingPoints(array).length > 1) {
        alert('Wrong input. Clear the memory!');
        array.pop();
    };
};

function addZeroBeforeFloatingPoint(array) {
    if (floatingPointClicked) {
        array.unshift('0');
    }
};

function setFloatingPointState() {
    if (screenInput.value ==='.') {
        floatingPointClicked = true;
    }; 
};

screenInput.disabled = true;

for (let i = 0; i < digitsButtons.length; i++) {
    digitsButtons[i].addEventListener('click', function(event) {
        
        const enteredValue = event.target.value;

    if (localStorage.getItem('action')) {   
            setFloatingPointState();
            setInputValue(event);
            arrOfSecondDigits.push(enteredValue);
            setInputValue(event);
            noDoubleFloatingPoint(arrOfSecondDigits);
            addZeroBeforeFloatingPoint(arrOfSecondDigits);
            screenInput.value = arrOfSecondDigits.join().replaceAll(",",'');
            localStorage.setItem('secondNumber', `${screenInput.value}`);      
    } else {
            setFloatingPointState();
            arrOfDigits.push(event.target.value);
            setInputValue(event);
            noDoubleFloatingPoint(arrOfDigits);
            addZeroBeforeFloatingPoint(arrOfDigits);
            screenInput.value = arrOfDigits.join().replaceAll(",",'');
            localStorage.setItem('number', `${screenInput.value}`);
        };
    });
};

for (let i = 0; i < operatorsButtons.length; i++) {
    operatorsButtons[i].addEventListener('click', function(event) {
        localStorage.setItem('action', `${event.target.value}`);
    });
};

equalsButton.addEventListener('click', function() {
    let number = parseFloat(localStorage.getItem('number'));
    let secondNumber = parseFloat(localStorage.getItem('secondNumber'));
    let action = localStorage.getItem('action');

    switch (action) {
        case '+':
            result = operations['+'](number, secondNumber);
            setResultAsInputValue(result);
            break;
        case '-':
            result = operations['-'](number, secondNumber);
            setResultAsInputValue(result);
            break;
        case '*':
            result = operations['*'](number, secondNumber);
            setResultAsInputValue(result)
            break;
        case '/':
            result = operations['/'](number, secondNumber);
            setResultAsInputValue(result);
            break;
        default:
            screenInput.value = 'Error';
            break;
    }   
});

clearButton.addEventListener('click', function() {
    localStorage.clear();
    location.reload();
});

