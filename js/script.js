const items = ['paper', 'rock', 'scissors'];
var score = 0;

clearPlayfield = () => {
    document.querySelector('.playfield').style.display = 'none';
}

resetPlayfield = () => {
    document.querySelector('.result').style.display = 'none';
    document.querySelector('.playfield').style.display = 'flex';
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
                    <img src="./images/icon-${items[randomNumber]}.svg" alt="${items[randomNumber]}" class="playfield__${items[randomNumber]}--icon">
                </div>
            </div>`, randomNumber];
}

insertItems = (playerItem, cpuItem) => {
    let html = `<div class='result'>
                    <div class='result__player'>
                        <p class='result__player--picked'>You picked</p>
                        <div class='result__player--icon'></div>
                    </div>
                    <div class='result__game'></div>
                    <div class='result__cpu'>
                        <p class='result__cpu--picked'>The house picked</p>
                        <div class='result__cpu--icon'></div>
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
    document.querySelector('.result__game').insertAdjacentText('afterbegin', result);

    let button = `<button class='result__game--btn' onclick='playAgain()'>Play again</button>`;
    document.querySelector('.result__game').insertAdjacentHTML('beforeend', button);

}

identifyWinner = (playerItemNumber, cpuItemNumber) => {
    if (playerItemNumber == cpuItemNumber) {
        insertResult('Draw game');
    }
    else if (playerItemNumber != 2 && (playerItemNumber + 1) == cpuItemNumber) {
        insertResult('You win');
        score++;
    }
    else if ((playerItemNumber - 2) == cpuItemNumber) {
        insertResult('You win');
        score++;
    }
    else {
        insertResult('You lose');
        score--;
    }
}

startRound = itemName => {
    let playerItem = getPlayerItem(itemName);
    let cpuItemArr = getRandomItem();

    clearPlayfield();
    insertItems(playerItem, cpuItemArr[0]);

    setTimeout(() => {
        identifyWinner(items.indexOf(itemName), cpuItemArr[1]);
        document.querySelector('.header__score--points').innerText = score;
    }, 1500);
}

playAgain = () => {
    resetPlayfield();
}