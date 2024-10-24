const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const gridSize = 550/12
const cols = canvas.width / gridSize
const rows = canvas.height / gridSize


// inicializa o grid quadrado com todos os elementos 0 (não pintado)
const grid = Array.from({ length: cols }, () => Array(rows).fill(0));
let x, y = 0

function drawGrid() {
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {    
            ctx.lineWidth = 4;    
            ctx.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize)
            if (grid[x][y] === 1 ){
                ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize)
            } else {
                ctx.clearRect(x * gridSize, y * gridSize, gridSize, gridSize)
            }

        }
    
    }            
            

}
drawGrid()

// const socket = io()

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const gridX = Math.floor(mouseX / gridSize);
    const gridY = Math.floor(mouseY / gridSize);
    
    grid[gridX][gridY] = grid[gridX][gridY] === 0 ? 1 : 0; // se o grid[x][y] for 0, então ele será 1, se não 0
    drawGrid()

    // Envia a atualização do grid para o servidor
    socket.emit('updateGrid', grid)
});

/*
// Atualiza o grid ao receber uma atualização do servidor
socket.on('updateGrid', (updatedGrid) => {
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            grid[x][y] = updatedGrid[x][y] // Atualiza o grid local com o grid do servidor atualizado
        }
    }
    drawGrid();
})
*/


