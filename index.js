
const digitsButtons = document.querySelectorAll('.digits');
const screenInput = document.getElementById('screen');
var numberIsClicked = false;

//callback functions
let number = 0;
let result = 0;
let action = "";
let newNumber = 0;

const math_it_up = {
    '+': function (number, newNumber) { return number + newNumber },
    '-': function (number, newNumber) { return number - newNumber },
    '*': function (number, newNumber) { return number * newNumber },
    '/': function (number, newNumber) { return number / newNumber },
}

document.addEventListener('click', function (event) {

	if (event.target.matches('.digits') 
        && !event.target.matches('.digits[value="="]') 
        && !window.localStorage.getItem('number')) {
            screenInput.setAttribute('placeholder', event.target.value);
            window.localStorage.setItem('number', `${event.target.value}`);
	    }

    if (event.target.matches('.digits') 
        && !event.target.matches('.digits[value="="]') &&
        window.localStorage.getItem('number')) {
            screenInput.setAttribute('placeholder', event.target.value);
            window.localStorage.setItem('newNumber', `${event.target.value}`);
    }

    if (event.target.matches('.operators') 
        && !event.target.matches('.digits[value="="]')) {
            window.localStorage.setItem('action', `${event.target.value}`);
            let action = window.localStorage.getItem('action');
	}
    if (event.target.matches('.digits[value="="]')) {
        let number = parseInt(window.localStorage.getItem('number'));
        let newNumber = parseInt(window.localStorage.getItem('newNumber'));
        let action = window.localStorage.getItem('action');

        switch (action) {
            case '+':
                result = math_it_up['+'](number, newNumber);
                screenInput.setAttribute('placeholder', result);
                break;
            case '-':
                result = math_it_up['-'](number, newNumber);
                screenInput.setAttribute('placeholder', result);
                break;
            case '*':
                result = math_it_up['*'](number, newNumber);
                screenInput.setAttribute('placeholder', result);
                break;
            case '/':
                result = math_it_up['/'](number, newNumber);
                screenInput.setAttribute('placeholder', result);
                break;
            default:
                screenInput.setAttribute('placeholder', 'Error')
        }

	}
    if (event.target.matches('.clear')) {
        screenInput.setAttribute('placeholder','0');
      window.localStorage.clear();
    }

}, false);
