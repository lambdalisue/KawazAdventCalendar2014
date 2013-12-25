"use strict"
var Keyboard = function() {
    this.KEY_LEFT  = 37;
    this.KEY_RIGHT = 39;
    this.KEY_UP    = 38;
    this.KEY_DOWN  = 40;
    this.KEY_SPACE = 32;
    this.keys = new Array(256);
    var self = this;
    document.addEventListener('keydown', function(e) {
        self.keys[e.keyCode] = true;
    }, false);
    document.addEventListener('keyup', function(e) {
        self.keys[e.keyCode] = false;
    }, false);
}
Keyboard.prototype = {
    isPress: function(key) {
        return this.keys[key];
    }
};
