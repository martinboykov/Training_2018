"use strict";
var drawPoint = function (point) {
    console.log(point.x, point.y);
};
var getDistance = function (point) {
    console.log(point.x - point.y);
};
drawPoint({
    x: 1,
    y: 2
});
getDistance({
    x: 1,
    y: 2
});
