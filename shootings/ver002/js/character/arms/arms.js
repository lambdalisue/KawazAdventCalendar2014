"use strict"
var ARMS_NOF_BULLETS = 20;
var ARMS_INTERVAL = 20;

var Arms = function(owner, img) {
    var _owner = owner, _bullets = new Array(ARMS_NOF_BULLETS);
    var _interval = 0;

    Object.defineProperty(this, 'owner', {
        get: function() { return _owner; }
    });
    Object.defineProperty(this, 'bullets', {
        get: function() { return _bullets; }
    });
    Object.defineProperty(this, 'interval', {
        get: function() { return _interval; },
        set: function(value) {
            _interval = value > 0 ? value : 0;
        }
    });

    // initialize bullets
    for(var i=0; i<_bullets.length; i++) {
        _bullets[i] = new Bullet(img, _owner.x, _owner.y, 0, 0);
    }

    this.INTERVAL = ARMS_INTERVAL;
};
Arms.prototype.update = function(g) {
    // reduce interval
    this.interval -= 1;
    // move available bullets
    for(var i=0; i<this.bullets.length; i++){
        this.bullets[i].update(g);
    }
};
Arms.prototype.x = function(g) {
    return this.owner.cx-this.bullets[0].width/2;
};
Arms.prototype.y = function(g) {
    return this.owner.cy-this.bullets[0].height/2;
};
Arms.prototype.vx = function(g) {
    return this.owner.vx;
};
Arms.prototype.vy = function(g) {
    return this.owner.vy;
};
Arms.prototype.fire = function(g) {
    if(this.interval > 0) {
        return false;
    }
    for(var i=0; i<this.bullets.length; i++) {
        if(!this.bullets[i].isAlive()) {
            this.bullets[i].set(this.x(g), this.y(g),
                                this.vx(g), this.vy(g));
            this.interval = this.INTERVAL;
            return true;
        }
    }
    return false;
};
Arms.prototype.draw = function(g) {
    // draw available bullets
    for(var i=0; i<this.bullets.length; i++){
        this.bullets[i].draw(g);
    }
};

