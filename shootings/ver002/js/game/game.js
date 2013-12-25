"use strict"
var Game = function(canvas, FPS, width, height) {
    this.STATE_PREPARE   = parseInt('00001', 2);
    this.STATE_RUNNING   = parseInt('00010', 2);
    this.STATE_GAMEOVER  = parseInt('00100', 2);
    this.STATE_GAMECLEAR = parseInt('01000', 2);
    this.STATE_QUIT      = parseInt('10000', 2);
    this.state = this.STATE_PREPARE;

    this.BORDER_LEFT   = parseInt('0001', 2);
    this.BORDER_RIGHT  = parseInt('0010', 2);
    this.BORDER_TOP    = parseInt('0100', 2);
    this.BORDER_BOTTOM = parseInt('1000', 2);

    this.canvas = canvas;
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = canvas.getContext('2d');

    this.chronus = new Chronus(FPS);
    Object.defineProperty(this, 'keyboard', {
        get: function() { return Game.keyboard; }
    });
};
Game.keyboard = new Keyboard();
Game.prototype = {
    start: function() {
        var self = this;
        this.state = this.STATE_RUNNING;
        this.chronus.run(function(){
            // clear canvas
            self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
            self.mainloop();
        });
    },
    next: function() {
        this.state = this.STATE_QUIT;
        this.chronus.stop();
        this.next_game.start();
    },
    prev: function() {
        this.state = this.STATE_QUIT;
        this.chronus.stop();
        this.prev_game.start();
    },
    gameOver: function() {
        this.state = this.STATE_GAMEOVER;
        this.chronus.stop();
    },
    gameClear: function() {
        this.state = this.STATE_GAMECLEAR;
        this.chronus.stop();
    },
    mainloop: function() {
        throw "Subclass must override this method."
    },
    whichBorder: function(obj, out) {
        var ori = 0;
        if(out) {
            if(obj.x < -obj.width) {
                ori |= this.BORDER_LEFT;
            } else if(obj.x > this.canvas.width) {
                ori |= this.BORDER_RIGHT;
            }
            if(obj.y < -obj.height) {
                ori |= this.BORDER_TOP;
            } else if(obj.y > this.canvas.height) {
                ori |= this.BORDER_BOTTOM;
            }
        } else {
            if(obj.x < 0) {
                ori |= this.BORDER_LEFT;
            } else if(obj.x+obj.width > this.canvas.width) {
                ori |= this.BORDER_RIGHT;
            }
            if(obj.y < 0) {
                ori |= this.BORDER_TOP;
            } else if(obj.y+obj.height > this.canvas.height) {
                ori |= this.BORDER_BOTTOM;
            }
        }
        return ori;
    }
};
