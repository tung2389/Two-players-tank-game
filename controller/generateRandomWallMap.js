const minX = 1;
const maxX = 1360;
const minY = 1;
const maxY = 600;

const NUMBER_OF_VERTICAL_WALL = 2;
const NUMBER_OF_HORIZONTAL_WALL = 2;
const NUMBER_OF_CUSTOM_WALL = 2;

let markX1 = [], markY1 = [], markX2 = [], markY2 = [];

function generateRandomWallMap() {
    let map = [];
    for(let i = 1; i <= NUMBER_OF_VERTICAL_WALL; i++) {
        map.push(generateVerticalWall());
    }
    for(let i = 1; i <= NUMBER_OF_HORIZONTAL_WALL; i++) {
        map.push(generateHorizontalWall());
    }
    for(let i = 1; i <= NUMBER_OF_CUSTOM_WALL; i++) {
        map.push(generateCustomWall());
    }
    return map;
}

function generateVerticalWall() {
    let line = generateCoordinateBasedOnTypeOfWall('vertical');
    while(twoLinesOverLap(line) || line.y1 === line.y2) {
        line = generateCoordinateBasedOnTypeOfWall;
    }
    return line;
}

function generateHorizontalWall() {
    let line = generateCoordinateBasedOnTypeOfWall('horizontal');
    while(twoLinesOverLap(line) || line.x1 === line.x2) {
        line = generateCoordinateBasedOnTypeOfWall('horizontal');
    }
    return line;
}

function generateCustomWall() {
    let line = generateCoordinateBasedOnTypeOfWall('custom');
    while(twoLinesOverLap(line)) {
        line = generateCoordinateBasedOnTypeOfWall('custom');
    }
    return line;
}

function generateCoordinateBasedOnTypeOfWall(type,) {
    let x1 = returnRandomNumberInRange(minX, maxX);
    let y1 = returnRandomNumberInRange(minY, maxY);
    let x2 = returnRandomNumberInRange(minX, maxX);
    let y2 = returnRandomNumberInRange(minY, maxY);
    return applyConditionToCoordinateBasedOnType(type, x1, y1, x2, y2);
}

function applyConditionToCoordinateBasedOnType(type, x1, y1, x2, y2) {
    if(type === 'vertical') {
        x2 = x1;
    }
    else if(type === 'horizontal') {
        y2 = y1;
    }
    return {
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2
    }
}

function twoLinesOverLap(line) {
    if(markX1[line.x1] && markY1[line.y1] && markX2[line.x2] && markY2[line.y2]) {
        return true;
    }
    else {
        markX1[line.x1] = markY1[line.y1] = markX2[line.x2] = markY2[line.y2] = 1;
        return false;
    }
}


function returnRandomNumberInRange(min, max) {
    return Math.floor(Math.random() * max) + min;
}

module.exports = generateRandomWallMap;