function addBoard() {
    let size;
    do {
        size = parseInt(prompt("What size grid? Max 64"));
        console.log(size);
    } while (isNaN(size) || size < 1 || size > 64);

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

function removeBoard() {
    document.querySelector('.board').innerHTML = '';
}

function addTileEventHandlers() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile) => {
        tile.addEventListener('mouseover', changeTileColor);
        tile.addEventListener('click', (e) => {
            globalDrawBool = !globalDrawBool
            changeTileColor(e);
        });
    });
}

function selectColor(e) {
    let colorSelector = e.target;
    document.querySelector('.selected').classList.remove('selected');
    console.log(colorSelector.id);
    colorSelector.classList.add('selected');
    if (colorSelector.id === 'picker') {
        globalColor = colorSelector.value;
    } else {
        globalColor = colorSelector.id;
    }
}

function changeTileColor(e) {
    let tile = e.target;
    if (globalDrawBool) {
        tile.style.backgroundColor = globalColor;
        tile.style.border = '0';
    }
}

function resetTileColors() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile) => {
        tile.style.backgroundColor = 'white';
    });
}

function createNewBoard() {
    removeBoard();
    addBoard();
    addTileEventHandlers();
}

const newBoardBtn = document.querySelector('.new-board');
newBoardBtn.addEventListener('click', createNewBoard);

const reset = document.querySelector('.reset');
reset.addEventListener('click', resetTileColors);

const colorSelectors = document.querySelectorAll('.color');
colorSelectors.forEach((colorSelector) => {
    colorSelector.addEventListener('click', selectColor);
});

const picker = document.querySelector('#picker');
picker.addEventListener('input', () => {
    globalColor = picker.value;
});

let globalColor = 'skyblue';
let globalDrawBool = false;

createNewBoard();