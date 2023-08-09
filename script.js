let runningTotal = 0;
let buffer = '0';
let previousOperator;

const MAX_DISPLAY_LENGTH = 12;

const screen = document.querySelector('.screen');

const buttonClick = value => {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value)
    }
    screen.innerText = buffer;
}


const handleSymbol = symbol => {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '-':
            handleMath(symbol);
        case 'x':
            handleMath(symbol);
        case '÷':
            handleMath(symbol);
        case '+':
            handleMath(symbol);
    }
}

const handleMath = symbol => {
    if (buffer === '0') {
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

const flushOperation = intBuffer => {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer;
    } else if (previousOperator === 'x') {
        runningTotal *= intBuffer;
    }
}
const handleNumber = numberString => {
    if (buffer === '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
};

const init = () => {
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();