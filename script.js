document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const result = document.getElementById('result');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return gameBoard.includes('') ? null : 'T'; // T for tie
    }

    function handleClick(index) {
        if (!gameBoard[index] && gameActive) {
            gameBoard[index] = currentPlayer;
            renderBoard();
            const winner = checkWinner();
            if (winner) {
                gameActive = false;
                displayResult(winner);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function renderBoard() {
        board.innerHTML = '';
        gameBoard.forEach((value, index) => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = value;
            cell.addEventListener('click', () => handleClick(index));
            board.appendChild(cell);
        });
    }

    function displayResult(winner) {
        if (winner === 'T') {
            result.textContent = "It's a Tie!";
        } else {
            result.textContent = `${winner} wins!`;
        }
    }

    renderBoard();
});
