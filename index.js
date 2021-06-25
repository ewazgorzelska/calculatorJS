
// buttons
const digitsButtons = document.querySelectorAll('.digits');
const screenInput = document.getElementById('screen');
const operatorsButtons = document.querySelectorAll('.operators');
const clearButton = document.querySelector('.clear');
const equalsButton = document.querySelector('.digits[value="="]');

//variables helpers
const localStorage = window.localStorage;

//array helpers
const arrOfDigits = [];
const arrOfSecondDigits = [];

//function helpers
function setInputValue(event) {
    screenInput.value = event.target.value;
}

function setResultAsInputValue(result) {
    screenInput.value = result;
}

const math_it_up = {
    '+': function (number, newNumber) { return number + newNumber },
    '-': function (number, newNumber) { return number - newNumber },
    '*': function (number, newNumber) { return number * newNumber },
    '/': function (number, newNumber) { return number / newNumber },
}

for (let i = 0; i < digitsButtons.length; i++) {
    digitsButtons[i].addEventListener('click', function(event) {
        const enteredValue = event.target.value;

        if (localStorage.getItem('action')) {
            setInputValue(event);
            arrOfSecondDigits.push(enteredValue);
            setInputValue(event);
            screenInput.value = arrOfSecondDigits.join().replaceAll(",",'');
            localStorage.setItem('secondNumber', `${screenInput.value}`);
        } else {
            arrOfDigits.push(event.target.value);
            setInputValue(event);
            screenInput.value = arrOfDigits.join().replaceAll(",",'');
            localStorage.setItem('number', `${screenInput.value}`);
        }
    })
};

for (let i = 0; i < operatorsButtons.length; i++) {
    operatorsButtons[i].addEventListener('click', function(event) {
        localStorage.setItem('action', `${event.target.value}`);
    });
}

equalsButton.addEventListener('click', function(event) {
    let number = parseInt(localStorage.getItem('number'));
    let secondNumber = parseInt(localStorage.getItem('secondNumber'));
    let action = localStorage.getItem('action');

    switch (action) {
        case '+':
            result = math_it_up['+'](number, secondNumber);
            setResultAsInputValue(result);
            break;
        case '-':
            result = math_it_up['-'](number, secondNumber);
            setResultAsInputValue(result);
            break;
        case '*':
            result = math_it_up['*'](number, secondNumber);
            setResultAsInputValue(result)
            break;
        case '/':
            result = math_it_up['/'](number, secondNumber);
            setResultAsInputValue(result);
            break;
        default:
            screenInput.value = 'Error';
            break;
    }   
})

clearButton.addEventListener('click', function() {
    window.localStorage.clear();
    location.reload();
});

