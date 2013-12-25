"use strict"
/*
* Chronus -- Time keeper
*
* It will call `callback` function continueously in same frequency
*
*/
var Chronus = function(FPS) {
    this.fps = 0;
    this._startTime = null;
    this._mspf = 1000 / FPS;
    this._enable = false;
};
Chronus.prototype.run = function(callback) {
    this._callback = callback;
    this._enable = true;
    this._run();
};
Chronus.prototype._run = function() {
    this.update();
    this._callback(this);
    var delta, interval;
    delta = (new Date()) - this._startTime;
    interval = this._mspf - delta > 0 ? this._mspf - delta : 0;
    if(this._enable){
        var self = this;
        setTimeout(function(){self._run();}, interval);
    }
};
Chronus.prototype.stop = function() {
    this._enable = false;
};
Chronus.prototype.update = function() {
    var now = new Date();
    this.fps = 1000 / (now - this._startTime);
    this._startTime = now;
};
