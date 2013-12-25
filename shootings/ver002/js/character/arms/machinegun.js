"use strict"
var Machinegun = function(owner, img, vx, vy) {
    Arms.call(this, owner, img);
    this._vx = vx;
    this._vy = vy;
    this.INTERVAL = 5;
};
Machinegun.prototype = Object.create(Arms.prototype);
Machinegun.prototype.constructor = Machinegun;

Machinegun.prototype.vx = function(g) {
    return this.owner.vx + this._vx;
};
Machinegun.prototype.vy = function(g) {
    return this.owner.vy + this._vy;
};
