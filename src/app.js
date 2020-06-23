import './styles.scss';

const squares = document.getElementsByClassName('square');
const currentColorDisplay = document.getElementById('currentColorDisplay');
const header = document.getElementById('header');
const defaultColor = header.style.backgroundColor;
const stripeContainer = document.getElementById('stripeContainer');
const newColorsBtn = document.getElementsByClassName('new-colors-btn')[0];
const gameMessageBox = document.getElementById('gameMessageBox');
let currentColor = null;
let rightAnswerIndex = null;

init();

stripeContainer.addEventListener('click', onStripeContainerClick);
document.getElementById('squaresContainer').addEventListener('click', onSquaresContainerClick);

function onStripeContainerClick(e) {
    if(e.target.classList.contains('new-colors-btn')) {
        newColorsBtn.innerText = 'New colors';
        gameMessageBox.innerText = '';
        setStyle(header, defaultColor);
        resetSquares();
        generateNewColors();
    }
}

function onSquaresContainerClick(e) {
    if(e.target.classList.contains('square')) {
        e.stopPropagation();
        if(e.target.style.backgroundColor === currentColor) {
            gameMessageBox.innerText = 'Correct!';
            newColorsBtn.innerText = 'Play Again?';
            setStyle(header, currentColor);
            Array.prototype.map.call(squares, item => {
                setStyle(item, currentColor);
            });
            resetSquares();
        } else {
            gameMessageBox.innerText = 'Try Again';
            e.target.classList.add('hidden');
        }
    }
}

function init() {
    generateNewColors();
}

function resetSquares() {
    Array.prototype.map.call(squares, item => {
        item.classList.remove('hidden');
    });
}

function generateNewColors() {
    currentColor = getNewColor();
    showGameMessage(currentColor.toUpperCase());
    rightAnswerIndex = getRandomNum(squares.length - 1, 0);
    colorSquares(rightAnswerIndex);
}

function showGameMessage(text) {
    currentColorDisplay.innerText = text;
}

function colorSquares(rightSquareIndex) {
    for(let i = 0; i < squares.length; i++) {
        const color = getNewColor();
        if(i !== rightSquareIndex) {
            setStyle(squares[i], color);
        } else {
            setStyle(squares[i], currentColor);
        }
    }
}

function getNewColor() {
    const color = {
        red: getRandomNum(0, 255),
        green: getRandomNum(0, 255),
        blue: getRandomNum(0, 255)
    };

    return `rgb(${color.red}, ${color.green}, ${color.blue})`;
}

function getRandomNum(from, to) {
    return Math.floor(Math.random() * to) + from;
}

function setStyle(element, color) {
    element.style.backgroundColor = color;
}