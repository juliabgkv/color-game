import './styles.scss';

const squares = document.getElementsByClassName('square');
const currentColorDisplay = document.getElementById('currentColorDisplay');
const header = document.getElementById('header');
const stripeContainer = document.getElementById('stripeContainer');
let currentColor = null;
let rightAnswerIndex = null;

init();

stripeContainer.addEventListener('click', onStripeContainerClick);
document.getElementById('squaresContainer').addEventListener('click', onSquaresContainerClick);

function onStripeContainerClick(e) {
    if(e.target.classList.contains('new-colors-btn')) {
        generateNewColors();
    }
}

function onSquaresContainerClick(e) {
    if(e.target.classList.contains('square')) {
        e.stopPropagation();
        if(e.target.style.backgroundColor === currentColor) {
            document.getElementById('gameMessageBox').innerText = 'Correct!';
            setStyle(header, currentColor);
            Array.prototype.map.call(squares, elem => elem.style.backgroundColor = currentColor);
        }
    }
}

function init() {
    generateNewColors();
}

function generateNewColors() {
    currentColor = getNewColor();
    showGameMessage(currentColor.toUpperCase());
    console.log(currentColor);
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