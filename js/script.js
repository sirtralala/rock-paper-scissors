const items = ['paper', 'rock', 'scissors'];
var score;


if (localStorage.getItem("score")) {
    score = localStorage.getItem("score");
    document.querySelector('.header__score--points').innerText = score;
}
else {
    score = 0;
}
    

clearPlayfield = () => {
    document.querySelector('.playfield').style.display = 'none';
    document.querySelector('.container').style.background = 'none';
}


getPlayerItem = itemName => {
    return `<div class="playfield__${itemName}">
                <div class="playfield__${itemName}--bg">
                    <img src="./images/icon-${itemName}.svg" alt="${itemName}" class="playfield__${itemName}--icon">
                </div>
            </div>`;
}


getRandomItem = () => {
    let randomNumber = Math.floor((Math.random() * 3));
    return [`<div class="playfield__${items[randomNumber]}">
                <div class="playfield__${items[randomNumber]}--bg">
                    <img src="./images/icon-${items[randomNumber]}.svg" alt="${items[randomNumber]}"
                    class="playfield__${items[randomNumber]}--icon">
                </div>
            </div>`, randomNumber];
}


insertItems = (playerItem, cpuItem) => {
    let html = `<div class='result'>
                    <div class='result__player'>
                        <p class='result__player--picked'>You picked</p>
                        <div class='result__player--icon'></div>
                    </div>
                    <div class='result__game'><p class='result__game--text'></p></div>
                    <div class='result__cpu'>
                        <p class='result__cpu--picked'>The house picked</p>
                        <div class='result__cpu--icon'></div>
                        <div class='result__cpu--circle'></div>
                    </div>
                </div>`;

    document.querySelector('.container').insertAdjacentHTML('afterbegin', html);
    document.querySelector('.result__player--icon').insertAdjacentHTML('afterbegin', playerItem);
    document.querySelector('.result__cpu--icon').insertAdjacentHTML('afterbegin', cpuItem);

    setTimeout(() => {
        document.querySelector('.result__cpu--icon').style.opacity = '1';
    }, 1000);
}


insertResult = result => {
    document.querySelector('.result__game--text').insertAdjacentText('afterbegin', result);
    let button = `<button class='result__game--btn' onclick='playAgain()'>Play again</button>`;
    document.querySelector('.result__game').insertAdjacentHTML('beforeend', button);

    setTimeout(() => {
        document.querySelector('.result__game').style.opacity = '1';
    }, 1500);

    if (result != 'Draw game') {
        document.querySelector('.result__game--text').style.animation = 'pulsate 1s infinite';
    }
}


insertCircleBackground = winner => {
    let circle = document.createElement('DIV');
    circle.classList.add('winner');
    setTimeout(() => {
        document.querySelector(`.result__${winner}--icon`).appendChild(circle);
    }, 1500);
}


identifyWinner = (playerItemNumber, cpuItemNumber) => {
    if (playerItemNumber == cpuItemNumber) {
        insertResult('Draw game');
    }
    else if (playerItemNumber != 2 && (playerItemNumber + 1) == cpuItemNumber) {
        insertResult('You win');
        insertCircleBackground('player');
        score++;
    }
    else if ((playerItemNumber - 2) == cpuItemNumber) {
        insertResult('You win');
        insertCircleBackground('player');
        score++;
    }
    else {
        insertResult('You lose');
        insertCircleBackground('cpu');
        score--;
    }
}


startRound = itemName => {
    let playerItem = getPlayerItem(itemName);
    let cpuItemArr = getRandomItem();

    clearPlayfield();
    insertItems(playerItem, cpuItemArr[0]);
    identifyWinner(items.indexOf(itemName), cpuItemArr[1]);

    setTimeout(() => {
        document.querySelector('.header__score--points').innerText = score;
        localStorage.setItem("score", score);
    }, 1500);
}


playAgain = () => {
    document.querySelector('.result').style.display = 'none';
    document.querySelector('.playfield').style.display = 'flex';
    document.querySelector('.container').style.background = `url("../images/bg-triangle.svg") center ${window.innerWidth > 400 ? '' : '/contain'} no-repeat`;
}


toggleGame = () => {
    let game = document.querySelector('.result__game');

    if (game.style.display == 'flex') {
        game.style.display = 'none';
    }
    else {
        game.style.display = 'flex';
    }
}