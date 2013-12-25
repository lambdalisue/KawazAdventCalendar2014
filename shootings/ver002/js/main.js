"use strict"
var DEBUG   = false;
var FPS     = 30;
var WIDTH   = 240;
var HEIGHT  = 320;

window.onload = function() {
    var canvas;
    canvas = document.getElementById('field');
    (new Start(canvas)).start();
};
