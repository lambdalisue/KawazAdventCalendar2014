"use strict"
var Player = function(g) {
    var BULLET_SPEED = -20;
    var cimg, bimg;
    cimg = document.getElementById('pl_player1');
    bimg = document.getElementById('pl_p1bullet');

    var x, y;
    x = (g.canvas.width - cimg.width) / 2;
    y = (g.canvas.height - cimg.height * 2);
    Character.call(this, cimg, x, y);

    var _arms;
    _arms = new Machinegun(this, bimg, 0, BULLET_SPEED);
    Object.defineProperty(this, 'arms', {
        get: function() { return _arms; }
    });

    this.hitPoint = 10;
    this._capture_in_canvas = true;
};
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(g) {
    this.arms.update(g);
    Character.prototype.update.call(this, g);
};
Player.prototype.draw = function(g) {
    this.arms.draw(g);
    Character.prototype.draw.call(this, g);
};
Player.prototype.move = function(g, capture) {
    if(this.isAlive()) {
        // Accel
        if(g.keyboard.isPress(g.keyboard.KEY_LEFT)) {
            this.vx -= 0.2;
        }else if(g.keyboard.isPress(g.keyboard.KEY_RIGHT)) {
            this.vx += 0.2;
        }
        // Fire
        if(g.keyboard.isPress(g.keyboard.KEY_SPACE)) {
            this.arms.fire(g);
        }
    }
    Character.prototype.move.call(this, g, capture);
};
