//your code here
//your code here
const gameContainer = document.getElementById("gameContainer");
const scoreElement = document.getElementById("score");

const gridSize = 40;
const pixelSize = 10;

let snake = [{ row: 20, col: 1 }];
let direction = "right";
let food = { row: 10, col: 20 };
let score = 0;

function render() {
    gameContainer.innerHTML = "";

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const pixel = document.createElement("div");
            pixel.classList.add("pixel");

            if (row === food.row && col === food.col) {
                pixel.classList.add("food");
            }

            for (const segment of snake) {
                if (segment.row === row && segment.col === col) {
                    pixel.classList.add("snakeBodyPixel");
                }
            }

            gameContainer.appendChild(pixel);
        }
    }

    scoreElement.textContent = score;
}

function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
        case "up":
            head.row -= 1;
            break;
        case "down":
            head.row += 1;
            break;
        case "left":
            head.col -= 1;
            break;
        case "right":
            head.col += 1;
            break;
    }

    snake.unshift(head);

    if (head.row === food.row && head.col === food.col) {
        score += 10;
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food.row = Math.floor(Math.random() * gridSize);
    food.col = Math.floor(Math.random() * gridSize);
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && direction !== "down") {
        direction = "up";
    } else if (e.key === "ArrowDown" && direction !== "up") {
        direction = "down";
    } else if (e.key === "ArrowLeft" && direction !== "right") {
        direction = "left";
    } else if (e.key === "ArrowRight" && direction !== "left") {
        direction = "right";
    }
});

setInterval(() => {
    moveSnake();
    render();
}, 100);