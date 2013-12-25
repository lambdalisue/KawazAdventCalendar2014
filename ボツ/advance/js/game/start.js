"use strict"
var Start = function(canvas) {
    Game.call(this, canvas, FPS, WIDTH, HEIGHT);

    var _blinker = 0;
    Object.defineProperty(this, 'blinker', {
        get: function() { return _blinker; },
        set: function(value) {
            _blinker = value > 0 ? value : 30;
        }
    });

    this.next_game = new Shooting(canvas);
    this.ctx.textBaseline = 'middle';

};
Start.prototype = Object.create(Game.prototype);
Start.prototype.constructor = Start;

Start.prototype.mainloop = function() {
    this.blinker -= 1;

    this.ctx.save();
    this.ctx.strokeStyle = 'white';
    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px sans-serif';
    var r, x, y;
    r = this.ctx.measureText('JavaScript shooting');
    x = (this.canvas.width - r.width) / 2;
    y = this.canvas.height / 2;
    this.ctx.fillText('JavaScript shooting', x, y-15);
    if(this.blinker > 15) {
        this.ctx.fillStyle = 'gray';
        this.ctx.font = '15px sans-serif';
        r = this.ctx.measureText('Hit space to start');
        x = (this.canvas.width - r.width) / 2;
        this.ctx.fillText('Hit space to start', x, y+15);
    }
    this.ctx.restore();

    // key check
    if(this.keyboard.isPress(this.keyboard.KEY_SPACE)) {
        this.next();
    }
};
