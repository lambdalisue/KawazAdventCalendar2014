"use strict"
var Enemy = function(g) {
    var VELOCITY_MAX = 2;
    var VELOCITY_MIN = 0.1;
    var BULLET_SPEED = 3;
    var cimg, bimg;
    cimg = document.getElementById('pl_player2');
    bimg = document.getElementById('pl_p2bullet');

    var x, y;
    x = Math.random() * (g.canvas.width - cimg.width);
    y = Math.random() * (g.canvas.height - cimg.height);
    Character.call(this, cimg, x, y);

    this.vy = Math.random() * (VELOCITY_MAX - VELOCITY_MIN) + VELOCITY_MIN;

    var _arms;
    _arms = new Aimgun(this, bimg, BULLET_SPEED, g.player);
    Object.defineProperty(this, 'arms', {
        get: function() { return _arms; }
    });

    this.hitPoint = Math.random() * 5 + 1;
};
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(g) {
    this.arms.update(g);
    Character.prototype.update.call(this, g);
};
Enemy.prototype.draw = function(g) {
    this.arms.draw(g);
    Character.prototype.draw.call(this, g);
};
Enemy.prototype.move = function(g, capture) {
    if(this.isAlive()) {
        // fire or not
        if(parseInt(Math.random()*100) == 0) {
            this.arms.fire(g);
        }
    }

    var self, callback;
    self = this;
    callback = function(ori) {
        if(ori != 0) {
            self.y = -self.height;
        }
    };
    Character.prototype.move.call(this, g, capture, callback);
};
