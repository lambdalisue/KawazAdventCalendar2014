"use strict"
var Bullet = function(img, x, y, vx, vy) {
    Character.call(this, img, x, y);

    var _x = x, _y = y, _px = x, _py = y;
    Object.defineProperty(this, 'x', {
        get: function() { return _x; },
        set: function(value) {
            _px = _x;
            _x = value;
        }
    });
    Object.defineProperty(this, 'y', {
        get: function() { return _y; },
        set: function(value) {
            _py = _y;
            _y = value;
        }
    });
    Object.defineProperty(this, 'px', {
        get: function() { return _px; },
    });
    Object.defineProperty(this, 'py', {
        get: function() { return _py; },
    });
    Object.defineProperty(this, 'cpx', {
        get: function() { return _px + this.width/2; },
    });
    Object.defineProperty(this, 'cpy', {
        get: function() { return _py + this.height/2; },
    });

    // disable this bullet
    this.hitPoint = 0;
};
Bullet.prototype = Object.create(Character.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.set = function(x, y, vx, vy) {
    this.x = x;
    this.x = x;
    this.y = y;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.hitPoint = 1;
};
Bullet.prototype.isColliding = function(obj) {
    if(!this.isAlive() || !obj.isAlive() ||
        this.isBlinking() || obj.isBlinking()) {
        return false;
    }
    var circle, segment;
    circle = new Circle(obj.cx, obj.cy, obj.radius);
    segment = new Segment(this.cpx, this.cpy,
                          this.cx, this.cy);
    return collisionTest.circleAndSegment(circle, segment);
};
Bullet.prototype.move = function(g, capture) {
    var self, callback;
    self = this;
    callback = function(ori) {
        if(ori != 0) {
            self.hitPoint = 0;
        }
    };
    Character.prototype.move.call(this, g, capture, callback);
};
