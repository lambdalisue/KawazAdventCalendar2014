"use strict"
var NOF_ENEMIES = 7;
var displayDebugInfo = null;

var Shooting = function(canvas) {
    Game.call(this, canvas, FPS, WIDTH, HEIGHT);
    this.player = new Player(this);
    this.enemies = new Array(NOF_ENEMIES);
    for(var i=0; i<this.enemies.length; i++) {
        this.enemies[i] = new Enemy(this);
    }

    var _blinker = 0;
    Object.defineProperty(this, 'blinker', {
        get: function() { return _blinker; },
        set: function(value) {
            _blinker = value > 0 ? value : 30;
        }
    });
    this.delay = 30;
};
Shooting.prototype = Object.create(Game.prototype);
Shooting.prototype.constructor = Shooting;

Shooting.prototype.killed = function() {
    var count = 0;
    for(var i=0; i<this.enemies.length; i++) {
        if(!this.enemies[i].isAlive()) {
            count++;
        }
    }
    return count;
};
Shooting.prototype.mainloop = function() {
    // update state
    this.player.update(this);
    for(var i=0; i<this.enemies.length; i++) {
        this.enemies[i].update(this);
    }

    // hit check
    for(var i=0; i<this.enemies.length; i++) {
        if(this.player.isColliding(this.enemies[i])) {
            this.player.damage(1);
            this.enemies[i].damage(1);
        }
    }
    for(var i=0; i<this.enemies.length; i++) {
        for(var j=0; j<this.player.arms.bullets.length; j++) {
            if(this.player.arms.bullets[j].isColliding(this.enemies[i])) {
                this.enemies[i].damage(1);
                this.player.arms.bullets[j].damage(1);
            }
        }
    }
    for(var i=0; i<this.enemies.length; i++) {
        for(var j=0; j<this.enemies[i].arms.bullets.length; j++) {
            if(this.enemies[i].arms.bullets[j].isColliding(this.player)) {
                this.player.damage(1);
                this.enemies[i].arms.bullets[j].damage(1);
            }
        }
    }

    // draw
    this.player.draw(this);
    for(var i=0; i<this.enemies.length; i++) {
        this.enemies[i].draw(this);
    }

    // draw status
    this.ctx.strokeStyle = 'white';
    this.ctx.fillStyle = 'white';
    for(var i=0; i<10; i++) {
        this.ctx.beginPath();
        this.ctx.arc(10 + i*10, this.canvas.height-20, 2, 0, Math.PI*2);
        this.ctx.stroke();
        this.ctx.fill();
    }
    this.ctx.fillStyle = 'red';
    for(var i=0; i<this.player.hitPoint; i++) {
        this.ctx.beginPath();
        this.ctx.arc(10 + i*10, this.canvas.height-20, 2, 0, Math.PI*2);
        this.ctx.stroke();
        this.ctx.fill();
    }

    // gameclear or gameover
    if(this.killed() == this.enemies.length) {
        // game clear
        if(this.delay > 0) {
            this.delay -= 1;
        } else {
            this.blinker -= 1;
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fill();
            this.ctx.strokeStyle = 'white';
            this.ctx.fillStyle = 'white';
            this.ctx.font = '20px sans-serif';
            var r, x, y;
            r = this.ctx.measureText('Game clear');
            x = (this.canvas.width - r.width) / 2;
            y = this.canvas.height / 2;
            this.ctx.fillText('Game clear', x, y-15);
            if(this.blinker > 15) {
                this.ctx.fillStyle = 'gray';
                this.ctx.font = '15px sans-serif';
                r = this.ctx.measureText('Hit F5 to restart');
                x = (this.canvas.width - r.width) / 2;
                this.ctx.fillText('Hit F5 to restart', x, y+15);
            }
            this.ctx.restore();
        }
    } else if(!this.player.isAlive()) {
        // game clear
        if(this.delay > 0) {
            this.delay -= 1;
        } else {
            this.blinker -= 1;
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fill();
            this.ctx.strokeStyle = 'white';
            this.ctx.fillStyle = 'red';
            this.ctx.font = '20px sans-serif';
            var r, x, y;
            r = this.ctx.measureText('Game over');
            x = (this.canvas.width - r.width) / 2;
            y = this.canvas.height / 2;
            this.ctx.fillText('Game over', x, y-15);
            if(this.blinker > 15) {
                this.ctx.fillStyle = 'gray';
                this.ctx.font = '15px sans-serif';
                r = this.ctx.measureText('Hit F5 to restart');
                x = (this.canvas.width - r.width) / 2;
                this.ctx.fillText('Hit F5 to restart', x, y+15);
            }
            this.ctx.restore();
        }
    }
    if(DEBUG && displayDebugInfo) {
        displayDebugInfo(this);
    }
};
