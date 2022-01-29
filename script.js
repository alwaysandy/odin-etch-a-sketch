function addBoard() {
    let size;
    do {
        size = parseInt(prompt("What size grid? Max 64"));
        console.log(size);
    } while (typeof size !== 'number' || isNaN(size) || size < 1 || size > 64);

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

function addEventHandlers() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile) => {
        tile.addEventListener('mouseover', (e) => {
            changeBackgroundColor(e);
        });

        tile.addEventListener('click', () => {
            if (globalDrawBool) {
                globalDrawBool = false;
            } else {
                globalDrawBool = true;
            }
        });
    });
}

function selectBackgroundColor(color) {
    document.querySelector('.selected').classList.remove('selected');
    console.log(color.id);
    color.classList.add('selected');
    if (color.id === 'picker') {
        globalColor = color.value;
    } else {
        globalColor = color.id;
    }
}

function changeBackgroundColor(e) {
    if (globalDrawBool) {
        e.target.style.backgroundColor = globalColor;
        e.target.style.border = '0';
    }
}

function resetBackgroundColors() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile) => {
        tile.style.backgroundColor = 'white';
        //tile.style.border = '1px solid lightgray';
    });
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

const colors = document.querySelectorAll('.color');
colors.forEach((color) => {
    color.addEventListener('click', () => {
        selectBackgroundColor(color);
    });
});

const picker = document.querySelector('#picker');
picker.addEventListener('input', () => {
    globalColor = picker.value;
});

let globalColor = 'skyblue';
let globalDrawBool = false;

createNewBoard();