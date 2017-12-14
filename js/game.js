var mainCanvas;
var mainCanvasContext;

var currentBlockCanvas;
var currentBlockCanvasContext;
var sizeOfBlock = 30;

var linesCount = 550 / sizeOfBlock;
var columnsCount = 300 / sizeOfBlock;
var currentShape = [];

var shapesArray = [];

var generateNew = true;

var stop = 0;

var interval;

var score = 0;
var type = '';
var startGame = function () {
    score = 0;
    stop = 0;
    shapesArray = [];
    currentShape = [];
    mainCanvas = $("#mainCanvas");
    mainCanvasContext = mainCanvas[0].getContext("2d");

    currentBlockCanvas = $("#currentBlockCanvas");
    currentBlockCanvasContext = currentBlockCanvas[0].getContext("2d");

    // createSquare(sizeOfBlock * 4, 0, currentBlockCanvasContext);
    createGWord(sizeOfBlock * 4, 0, currentBlockCanvasContext);
    type = 'gWord';
    moveCurrentShape();
};

var createSquare = function (x, y, ctx) {
    currentShape = [];
    ctx.beginPath();
    ctx.rect(x, y, sizeOfBlock, sizeOfBlock);
    ctx.rect(x + sizeOfBlock, y, sizeOfBlock, sizeOfBlock);
    ctx.rect(x, y + sizeOfBlock, sizeOfBlock, sizeOfBlock);
    ctx.rect(x + sizeOfBlock, y + sizeOfBlock, sizeOfBlock, sizeOfBlock);
    ctx.fillStyle = 'black';
    ctx.fill();
    currentShape.push({x: x, y: y,});
    currentShape.push({x: x + sizeOfBlock, y: y,});
    currentShape.push({x: x, y: y + sizeOfBlock,});
    currentShape.push({x: x + sizeOfBlock, y: y + sizeOfBlock,});
};

var createLine = function (x, y, ctx) {
    currentShape = [];
    ctx.beginPath();
    ctx.rect(x, y, sizeOfBlock, sizeOfBlock);
    ctx.rect(x, y + sizeOfBlock, sizeOfBlock, sizeOfBlock);
    ctx.rect(x, y + sizeOfBlock * 2, sizeOfBlock, sizeOfBlock);
    ctx.fillStyle = 'black';
    ctx.fill();
    currentShape.push({x: x, y: y});
    currentShape.push({x: x, y: y + sizeOfBlock});
    currentShape.push({x: x, y: y + sizeOfBlock * 2});
};

var createGWord180 = function (x, y, ctx) {
    currentShape = [];
    ctx.beginPath();
    ctx.rect(x, y, sizeOfBlock, sizeOfBlock);
    ctx.rect(x, y + sizeOfBlock, sizeOfBlock, sizeOfBlock);
    ctx.rect(x, y + sizeOfBlock * 2, sizeOfBlock, sizeOfBlock);
    ctx.rect(x - sizeOfBlock, y + sizeOfBlock * 2, sizeOfBlock, sizeOfBlock);
    currentShape.push({x: x, y: y,});
    currentShape.push({x: x, y: y + sizeOfBlock});
    currentShape.push({x: x, y: y + sizeOfBlock * 2});
    currentShape.push({x: x - sizeOfBlock, y: y + sizeOfBlock * 2});
    ctx.fillStyle = 'black';
    ctx.fill();
};
var createGWord90 = function (x, y, ctx) {
    currentShape = [];
    ctx.beginPath();
    ctx.rect(x, y, sizeOfBlock, sizeOfBlock);
    ctx.rect(x, y + sizeOfBlock, sizeOfBlock, sizeOfBlock);
    ctx.rect(x + sizeOfBlock, y + sizeOfBlock, sizeOfBlock, sizeOfBlock);
    ctx.rect(x + sizeOfBlock * 2, y + sizeOfBlock, sizeOfBlock, sizeOfBlock);
    currentShape.push({x: x, y: y,});
    currentShape.push({x: x, y: y + sizeOfBlock});
    currentShape.push({x: x + sizeOfBlock, y: y + sizeOfBlock});
    currentShape.push({x: x + sizeOfBlock * 2, y: y + sizeOfBlock});
    ctx.fillStyle = 'black';
    ctx.fill();
};
var createGWord270 = function (x, y, ctx) {
    currentShape = [];
    ctx.beginPath();
    ctx.rect(x, y, sizeOfBlock, sizeOfBlock);
    ctx.rect(x + sizeOfBlock, y, sizeOfBlock, sizeOfBlock);
    ctx.rect(x + sizeOfBlock * 2, y, sizeOfBlock, sizeOfBlock);
    ctx.rect(x + sizeOfBlock * 2, y + sizeOfBlock, sizeOfBlock, sizeOfBlock);
    currentShape.push({x: x, y: y,});
    currentShape.push({x: x + sizeOfBlock, y: y});
    currentShape.push({x: x + sizeOfBlock * 2, y: y});
    currentShape.push({x: x + sizeOfBlock * 2, y: y + sizeOfBlock});
    ctx.fillStyle = 'black';
    ctx.fill();
};
var createGWord = function (x, y, ctx) {
    currentShape = [];
    ctx.beginPath();
    ctx.rect(x, y, sizeOfBlock, sizeOfBlock);
    ctx.rect(x + sizeOfBlock, y, sizeOfBlock, sizeOfBlock);
    ctx.rect(x, y + sizeOfBlock, sizeOfBlock, sizeOfBlock);
    ctx.rect(x, y + sizeOfBlock * 2, sizeOfBlock, sizeOfBlock);
    currentShape.push({x: x, y: y,});
    currentShape.push({x: x + sizeOfBlock, y: y});
    currentShape.push({x: x, y: y + sizeOfBlock});
    currentShape.push({x: x, y: y + sizeOfBlock * 2});
    ctx.fillStyle = 'black';
    ctx.fill();
};

var createXLine = function (x, y, ctx) {
    currentShape = [];
    ctx.beginPath();
    ctx.rect(x, y, sizeOfBlock, sizeOfBlock);
    ctx.rect(x + sizeOfBlock, y, sizeOfBlock, sizeOfBlock);
    ctx.rect(x + sizeOfBlock * 2, y, sizeOfBlock, sizeOfBlock);
    currentShape.push({x: x, y: y});
    currentShape.push({x: x + sizeOfBlock, y: y});
    currentShape.push({x: x + sizeOfBlock * 2, y: y});
    ctx.fillStyle = 'black';
    ctx.fill();
};

var moveCurrentShape = function () {
    interval = setInterval(x => {
        clearCurrentShapeCanvas();
        if (type === 'rect') {
            createSquare(currentShape[0].x, currentShape[0].y + sizeOfBlock, currentBlockCanvasContext);
        }
        if (type === 'gWord') {
            createGWord(currentShape[0].x, currentShape[0].y + sizeOfBlock, currentBlockCanvasContext);
        }
        if (type === 'gWord90') {
            createGWord90(currentShape[0].x, currentShape[0].y + sizeOfBlock, currentBlockCanvasContext);
        }
        if (type === 'gWord180') {
            createGWord180(currentShape[0].x, currentShape[0].y + sizeOfBlock, currentBlockCanvasContext);
        }
        if (type === 'gWord270') {
            createGWord270(currentShape[0].x, currentShape[0].y + sizeOfBlock, currentBlockCanvasContext);
        }
        if (type === 'line') {
            createLine(currentShape[0].x, currentShape[0].y + sizeOfBlock, currentBlockCanvasContext);
        }
        if (type === 'xLine') {
            createXLine(currentShape[0].x, currentShape[0].y + sizeOfBlock, currentBlockCanvasContext);
        }
        stopMoving();
    }, 300);

};

var clearCurrentShapeCanvas = function () {
    currentBlockCanvasContext.clearRect(0, 0, sizeOfBlock * columnsCount, sizeOfBlock * linesCount);
};

var stopMoving = function () {
    for (let shape of currentShape) {
        if (shape.y + sizeOfBlock >= 550 - 10 || !canMove(shape)) {
            for (let shp of currentShape) {
                shapesArray.push(shp);
            }
            clearInterval(interval);
            clearCurrentShapeCanvas();
            if (type === 'rect') {
                createSquare(currentShape[0].x, currentShape[0].y, mainCanvasContext);
            }
            if (type === 'gWord') {
                createGWord(currentShape[0].x, currentShape[0].y, mainCanvasContext);
            }
            if (type === 'gWord90') {
                createGWord90(currentShape[0].x, currentShape[0].y, mainCanvasContext);
            }
            if (type === 'gWord180') {
                createGWord180(currentShape[0].x, currentShape[0].y, mainCanvasContext);
            }
            if (type === 'gWord270') {
                createGWord270(currentShape[0].x, currentShape[0].y, mainCanvasContext);
            }
            if (type === 'line') {
                createLine(currentShape[0].x, currentShape[0].y, mainCanvasContext);
            }
            if (type === 'xLine') {
                createXLine(currentShape[0].x, currentShape[0].y, mainCanvasContext);
            }
            clearFullLine();
            endGame();
            if (stop === 1) {
                showEndGame();
                startNewGame();
                return;
            }
            generateNewShape();
            return;
        }
    }
};

var startNewGame = function () {
    $('.menu').show();
    mainCanvasContext.clearRect(0, 0, sizeOfBlock * columnsCount, sizeOfBlock * linesCount);
    currentBlockCanvasContext.clearRect(0, 0, sizeOfBlock * columnsCount, sizeOfBlock * linesCount);
};

var showEndGame = function () {
    alert('Your score is: ' + score);
    $('.score').text('Score: ' + 0);
};

var generateNewShape = function () {
    let rand = Math.floor((Math.random() * 4) + 1);

    if (rand === 1) {
        createSquare(sizeOfBlock * 4, 0, currentBlockCanvasContext);
        type = 'rect';
        moveCurrentShape();
    } else if (rand === 2) {
        createGWord(sizeOfBlock * 4, 0, currentBlockCanvasContext);
        type = 'gWord';
        moveCurrentShape();
    } else if (rand === 3) {
        createLine(sizeOfBlock * 4, 0, currentBlockCanvasContext);
        type = 'line';
        moveCurrentShape();
    } else if (rand === 4) {
        createXLine(sizeOfBlock * 4, 0, currentBlockCanvasContext);
        type = 'xLine';
        moveCurrentShape();
    }
};

var clearFullLine = function () {
    let amount = 0;

    let linesToDelete = [];

    for (let lineY = 1; lineY <= linesCount; lineY++) {
        let temp = [];

        for (let s of shapesArray) {
            if (s.y != lineY * sizeOfBlock)
                continue;

            for (let lineX = 0; lineX <= columnsCount; lineX++) {
                if (s.x != lineX * sizeOfBlock)
                    continue;

                temp.push(s);
            }
        }
        let y;
        if (temp.length >= columnsCount) {
            mainCanvasContext.clearRect(0, 0, sizeOfBlock * columnsCount, sizeOfBlock * linesCount);
            for (let tmp of temp) {
                y = tmp.y;
                shapesArray.splice(shapesArray.indexOf(tmp), 1);
            }
            for (let shape of shapesArray) {
                if (y >= shape.y) {
                    shape.y += sizeOfBlock;
                }
                mainCanvasContext.beginPath();
                mainCanvasContext.rect(shape.x, shape.y, sizeOfBlock, sizeOfBlock);
                mainCanvasContext.fill();
                mainCanvasContext.closePath();
            }
            score += 10;
            $('.score').text('Score: ' + score);
        }
    }
};

var canMove = function (shape) {
    for (let shapes of shapesArray) {
        if (shape.y + sizeOfBlock >= shapes.y && shape.x == shapes.x) {
            return false;
        }
    }

    return true;
}

var endGame = function () {
    for (let shapes of shapesArray) {
        if (shapes.y <= 30) {
            stop = 1;
        }
    }
};

var rotateShape = function () {
    if (type === 'line') {
        type = 'xLine';
    } else if (type === 'xLine') {
        type = 'line';
    } else if (type === 'gWord') {
        type = 'gWord90';
    } else if (type === 'gWord90') {
        type = 'gWord180';
    } else if (type === 'gWord180') {
        type = 'gWord270';
    } else if (type === 'gWord270') {
        type = 'gWord';
    }
};

$(document).on('keydown', 'body', function (e) {
    if (e.keyCode == 37) { // left
        let flag = 0;
        for (shape of currentShape) {
            if (shape.x <= 0) {
                flag = 1;
            }
        }
        for (shape of currentShape) {
            if (!flag) {
                shape.x -= sizeOfBlock;
            }
        }

    }
    else if (e.keyCode == 39) { // right
        let flag = 0;
        for (shape of currentShape) {
            if (shape.x >= 270) {
                flag = 1;
            }
        }
        for (shape of currentShape) {
            if (!flag) {
                shape.x += sizeOfBlock;
            }
        }
    } else if (e.keyCode == 38) { //up
        rotateShape();
    }
});


