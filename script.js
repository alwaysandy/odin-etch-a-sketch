function addBoard() {
    let size;
    while (typeof size !== 'number' || size < 1 || size > 64) {
        size = parseInt(prompt("What size grid? Max 64"));
    }

    const board = document.querySelector('.board');
    const boardStyle = window.getComputedStyle(board);
    const boardWidth = parseInt(boardStyle.width);
    const boardHeight = parseInt(boardStyle.height);
    
    for (let i = 0; i < size * size; i++) {
        let tile = document.createElement('div');
        tile.classList.add('tile');
        tile.style.width = `${boardWidth / size}px`;
        tile.style.height = `${boardHeight / size}px`;
        tile.style.backgroundColor = 'white';
        board.appendChild(tile);
    }
}

function changeBackgroundColor(e, color) {
    if (e.target.style.backgroundColor === 'white')
    {
        e.target.style.backgroundColor = color;
        e.target.style.border = '0';
    }// else {
    //    e.target.style.backgroundColor = 'white';
    //    e.target.style.border = '1px solid lightgray';
    //}
}

function resetBackgroundColors() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile) => {
        tile.style.backgroundColor = 'white';
        tile.style.border = '1px solid lightgray';
    });
}

function addEventHandlers() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile) => {
        tile.addEventListener('mouseover', (e) => {
            changeBackgroundColor(e, 'skyblue');
        });
    });
}

function removeBoard() {
    document.querySelector('.board').innerHTML = '';
}

function createNewBoard() {
    removeBoard();
    addBoard();
    addEventHandlers();
}

const newBoardBtn = document.querySelector('.new-board');
newBoardBtn.addEventListener('click', createNewBoard);

const reset = document.querySelector('.reset');
reset.addEventListener('click', resetBackgroundColors);

createNewBoard();