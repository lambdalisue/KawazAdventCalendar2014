"use strict"
var Character = function(img, x, y) {
    var VELOCITY_DELTA  = 0.5;
    var VELOCITY_MAX    = 10;
    Vector.call(this, x, y);
    var _img=img, _blinker=0, _hitPoint=1;
    var _radius=(img.width+img.height)/4;
    Object.defineProperty(this, 'img', {
        get: function() { return _img; }
    });
    Object.defineProperty(this, 'width', {
        get: function() { return _img.width; }
    });
    Object.defineProperty(this, 'height', {
        get: function() { return _img.height; }
    });
    Object.defineProperty(this, 'cx', {
        get: function() { return this.x + _img.width/2; }
    });
    Object.defineProperty(this, 'cy', {
        get: function() { return this.y + _img.height/2; }
    });
    Object.defineProperty(this, 'radius', {
        get: function() { return _radius; }
    });
    Object.defineProperty(this, 'blinker', {
        get: function() { return _blinker; },
        set: function(value) {
            _blinker = value > 0 ? value : 0;
        }
    });
    Object.defineProperty(this, 'hitPoint', {
        get: function() { return _hitPoint; },
        set: function(value) {
            _hitPoint = value > 0 ? value : 0;
        }
    });
    var _vx = 0, _vy = 0;
    Object.defineProperty(this, 'vx', {
        get: function() { return _vx; },
        set: function(value) {
            var abs, sign;
            abs = Math.abs(value);
            sign = value / abs;
            _vx = abs > VELOCITY_MAX ? VELOCITY_MAX * sign : value;
        }
    });
    Object.defineProperty(this, 'vy', {
        get: function() { return _vy; },
        set: function(value) {
            var abs, sign;
            abs = Math.abs(value);
            sign = value / abs;
            _vy = abs > VELOCITY_MAX ? VELOCITY_MAX * sign : value;
        }
    });
    // should be in border or not
    this._capture_in_canvas = false;
};
Character.prototype = Object.create(Vector.prototype);
Character.prototype.constructor = Character;

Character.prototype.damage = function(d) {
    var BLINKER_TIME    = 10;
    this.hitPoint -= d;
    this.blinker = BLINKER_TIME;
};
Character.prototype.update = function(g) {
    // reduce blinker value
    this.blinker -= 1;
    // call move method
    this.move(g, this._capture_in_canvas);
};
Character.prototype.move = function(g, capture, callback) {
    if(this.isAlive()) {
        // move
        this.x += this.vx;
        this.y += this.vy;

        // Border check
        var ori = g.whichBorder(this, !capture);
        if(callback) {
            callback(ori);
        } else {
            // put the character back to the canvas
            if((ori & g.BORDER_LEFT) != 0) {
                this.x = 0;
                this.vx = this.vx > 0 ? this.vx : 0;
            } else if((ori & g.BORDER_RIGHT) != 0) {
                this.x = g.canvas.width - this.width;
                this.vx = this.vx < 0 ? this.vx : 0;
            }
            if((ori & g.BORDER_TOP) != 0) {
                this.y = 0;
                this.vy = this.vy > 0 ? this.vy : 0;
            } else if((ori & g.BORDER_BOTTOM) != 0) {
                this.y = g.canvas.height - this.height;
                this.vy = this.vy < 0 ? this.vy : 0;
            }
        }
    }
};
Character.prototype.draw = function(g) {
    if(this.isAlive() && this.blinker % 2 == 0) {
        g.ctx.save();
        g.ctx.drawImage(this.img, this.x, this.y);
        g.ctx.restore();
    }
};
Character.prototype.isAlive = function() {
    return this.hitPoint > 0;
};
Character.prototype.isBlinking = function() {
    return this.blinker > 0;
};
Character.prototype.isColliding = function(obj) {
    if(!this.isAlive() || !obj.isAlive() ||
        this.isBlinking() || obj.isBlinking()) {
        return false;
    }
    return collisionTest.circleAndCircle(this, obj);
};
