let order = [];
let clickedOrder = [];
let score;
let level;

// 0 = green
// 1 = red
// 2 = amarelo
// 3 = blue

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const green = document.querySelector('.green');

const scoreDisplay = document.querySelector('#score');
const levelDisplay = document.querySelector('#level');

let shuffleOrder = ()=> {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

let lightColor = (element, number)=> {
    number = number * 500;

    setTimeout(()=> {
        element.classList.add('selected');
    }, number - 250);

    setTimeout(()=> {
        element.classList.remove('selected')
    }, number)
}

let checkOrder = ()=> {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        nextLevel();
    }
}

let click = (color)=> {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(()=> {
        createColorElement(color).classList.remove('selected');
        checkOrder()
    },250)
}

let createColorElement = (color)=> {
    switch(color) {
        case 0:
            return green;
        case 1:
            return red;
        case 2:
            return yellow;
        case 3:
            return blue;
        default:
            break;
    }
}

let nextLevel = ()=> {
    score++;
    level++;

    updateDisplay();

    shuffleOrder()
}

let updateDisplay = ()=> {
    scoreDisplay.innerHTML = `${score}`;
    levelDisplay.innerHTML = `${level}`;
}

let playGame = ()=> {
    alert('Bem vindo ao Genesis! Iniciando novo jogo!');
    score = -1;
    level = 0;
    
    updateDisplay();
    
    nextLevel();
}

let gameOver = ()=> {
    order = [];
    clickedOrder = [];
    alert(`Pontuação: ${score}\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo.`);

    playGame();
}

green.onclick = ()=> click(0);
red.onclick = ()=> click(1);
yellow.onclick = ()=> click(2);
blue.onclick = ()=> click(3);

playGame();