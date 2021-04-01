var mycanvas = document.getElementById('the-game');
var ctx = mycanvas.getContext('2d');
var snakeSize = 10;
var w = 600;
var h = 600;
var score = 0;
var snake;
var food;
var gameloop;
var direction = 'down';
var speed = 1000

/* 

create elements draw

*/




var drawModule = (function() {

    var bodySnake = function(x, y) {
        ctx.fillStyle = 'green';
        ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    }

    var pizza = function(x, y) {
        ctx.fillStyle = 'red';
        ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
        ctx.fillStyle = 'black';
        ctx.fillRect(x * snakeSize + 1, y * snakeSize + 1, snakeSize - 2, snakeSize - 2);
    }

    /* 
    display score
    */

    var scoreText = function() {
            var score_text = "Score: " + score;
            ctx.fillStyle = 'blue';
            ctx.fillText(score_text, 145, h - 5);
        }
        /* 
        create snake
        */
    var drawSnake = function() {
            var length = 4;
            snake = [];
            for (var i = length - 1; i >= 0; i--) {
                snake.push({ x: 0, y: i });
            }
        }
        /* 

        create move for game play

        */
    var move = function() {
        ctx.fillStyle = '#D3D3D3';
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0, 0, w, h);

        btn.setAttribute('disabled', true);

        var snakeX = snake[0].x;
        var snakeY = snake[0].y;
        console.log(direction)
        console.log(speed)


        if (direction == 'right') {
            snakeX++;
        } else if (direction == 'left') {
            snakeX--;
        } else if (direction == 'up') {
            snakeY--;
        } else if (direction == 'down') {
            snakeY++;
        }

        if (snakeX == -1 || snakeX == w / snakeSize || snakeY == -1 || snakeY == h / snakeSize || checkCollision(snakeX, snakeY, snake)) {
            //restart game
            btn.removeAttribute('disabled', true);
            ctx.clearRect(0, 0, w, h);
            gameloop = clearInterval(gameloop);
            return;
        }

        if (snakeX == food.x && snakeY == food.y) {
            var tail = { x: snakeX, y: snakeY }; //Create a new head instead of moving the tail
            score++;
            speed -= 50;
            createFood(); //Create new food
        } else {
            var tail = snake.pop(); //pops out the last cell
            tail.x = snakeX;
            tail.y = snakeY;
        }
        //The snake can now eat the food.
        snake.unshift(tail); //puts back the tail as the first cell

        for (var i = 0; i < snake.length; i++) {
            bodySnake(snake[i].x, snake[i].y);
        }

        pizza(food.x, food.y);
        scoreText();
        setTimeout(function() {

            requestAnimationFrame(move);
        }, speed)
    }




    var createFood = function() {
        food = {
            x: Math.floor((Math.random() * 30) + 1),
            y: Math.floor((Math.random() * 30) + 1)
        }

        for (var i = 0; i > snake.length; i++) {
            var snakeX = snake[i].x;
            var snakeY = snake[i].y;

            if (food.x === snakeX && food.y === snakeY || food.y === snakeY && food.x === snakeX) {
                food.x = Math.floor((Math.random() * 30) + 1);
                food.y = Math.floor((Math.random() * 30) + 1);
            }
        }
    }

    /* 
    
    check snake border
    */

    var checkCollision = function(x, y, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].x === x && array[i].y === y) {
                return true;
            }
        }
        return false;
    }

    var init = function() {
        drawSnake();
        createFood();
        //gameloop = setInterval(move, 180);
        setTimeout(function() {

            requestAnimationFrame(move);
        }, speed)
    }


    return {
        init: init
    };


}());


/* 

start game

*/
(function(window, document, drawModule) {

    document.onkeydown = function() {
        keyCode = window.event.keyCode;
        console.log(keyCode)
        switch (keyCode) {

            case 37:
                if (direction != 'right') {
                    direction = 'left';
                }
                console.log('left');
                break;

            case 39:
                if (direction != 'left') {
                    direction = 'right';
                }
                console.log('right');
                break;

            case 38:
                if (direction != 'down') {
                    direction = 'up';
                }
                console.log('up');
                break;

            case 40:
                if (direction != 'up') {
                    direction = 'down';
                }
                console.log('down');
                break;
        }
    }

    var btn = document.getElementById('btn');
    btn.addEventListener("click", function() { drawModule.init(); });



})(window, document, drawModule);