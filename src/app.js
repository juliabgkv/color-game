import './styles.scss';
import confetti from 'canvas-confetti';

const RGB_MAX_VALUE = 255;
let squares = document.getElementsByClassName('square');
const currentColorDisplay = document.getElementById('currentColorDisplay');
const header = document.getElementById('header');
const defaultColor = header.style.backgroundColor;
const stripeContainer = document.getElementById('stripeContainer');
const newColorsBtn = document.getElementsByClassName('new-colors-btn')[0];
const gameMessageBox = document.getElementById('gameMessageBox');
const levelBtns = document.getElementsByClassName('level-btn');
let currentColor = null;
let rightAnswerIndex = null;
let wrongAnswerMessages = [
    'Nope',
    'Try Again...',
    'Wrong',
];

generateNewColors();

stripeContainer.addEventListener('click', onStripeContainerClick);
document.getElementById('squaresContainer').addEventListener('click', onSquaresContainerClick);

function onStripeContainerClick(e) {
    const targetClassList = e.target.classList;
    if(targetClassList.contains('main-btn')) {
        e.preventDefault();

        if(targetClassList.contains('level-btn')) {
            Array.prototype.map.call(levelBtns, item => item.classList.remove('selected'));
            targetClassList.add('selected');
            const squareRows = document.getElementsByClassName('row');

            if(targetClassList.contains('hard-level')) {
                squareRows[1].style.visibility = 'visible';
                squares = document.getElementsByClassName('square');
            } else if(targetClassList.contains('easy-level')) {
                squareRows[1].style.visibility = 'hidden';
                squares = squareRows[0].children;
            }
        }
        Array.prototype.map.call(squares, square => square.classList.remove('unaviable'));
        newColorsBtn.innerText = 'New colors';
        gameMessageBox.innerText = '';
        setStyle(header, defaultColor);
        resetSquares();
        generateNewColors();
    }
}

function onSquaresContainerClick(e) {
    if(e.target.classList.contains('square') && !e.target.classList.contains('unaviable')) {
        e.stopPropagation();

        if(e.target.style.backgroundColor === currentColor) {
            confettiLaunch();
            gameMessageBox.innerText = 'Correct!';
            newColorsBtn.innerText = 'Play Again?';
            setStyle(header, currentColor);
            Array.prototype.map.call(squares, item => {
                setStyle(item, currentColor);
                item.classList.add('unaviable');
            });
            resetSquares();
        } else {
            gameMessageBox.innerText = wrongAnswerMessages[getRandomNum(0, 2)];
            e.target.classList.add('hidden');
        }
    }
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
        red: getRandomNum(0, RGB_MAX_VALUE),
        green: getRandomNum(0, RGB_MAX_VALUE),
        blue: getRandomNum(0, RGB_MAX_VALUE)
    };

    return `rgb(${color.red}, ${color.green}, ${color.blue})`;
}

function getRandomNum(from, to) {
    return Math.floor(Math.random() * to) + from;
}

function setStyle(element, color) {
    element.style.backgroundColor = color;
}

function confettiLaunch() {
    confetti({
        particleCount: 200,
        angle: 60,
        spread: 100,
        origin: { x: 0 }
    });
    confetti({
        particleCount: 200,
        angle: 120,
        spread: 100,
        origin: { x: 1 }
    });
}