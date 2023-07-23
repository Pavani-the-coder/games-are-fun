const X_class = 'x'
const CIRCLE_class = 'circle'
const cellElements = document.querySelectorAll('[data-cell]')
const winnmsgelement = document.getElementById('winningmessage')
const board = document.getElementById('board')
const restartbut = document.getElementById('restartButton')
const winnmsgtxtelement = document.querySelector('[data-winning-message-text]')
const winning_combo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]
let circleTurn

startGame()
restartbut.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
            cell.classList.remove(X_class)
            cell.classList.remove(CIRCLE_class)
            cell.removeEventListener('click', handleClick)
            cell.addEventListener('click', handleClick, { once: true })
        }) //makes sure event listner is clicked only once
    setBoardHover()
    winnmsgelement.classList.remove('show')

}




function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
        // Adds x or o to the board
}

function checkWin(currentClass) {
    return winning_combo.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHover() {
    board.classList.remove(X_class)
    board.classList.remove(CIRCLE_class)
    if (circleTurn) {
        board.classList.add(CIRCLE_class)
    } else {
        board.classList.add(X_class)
    }
}

function endGame(draw) {
    if (draw) {
        winnmsgtxtelement.innerText = 'Draw!'

    } else {
        winnmsgtxtelement.innerText = `${circleTurn ? "X's" :"O's"} Wins! 🥳🥳`
    }
    winnmsgelement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_class) ||
            cell.classList.contains(CIRCLE_class)
    })
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_class : X_class
        //place mark
    placeMark(cell, currentClass)
        //switch turns
    swapTurns()
    setBoardHover()
        //check win
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    }
    //check for draw



}