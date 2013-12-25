"use strict"
var Aimgun = function(owner, img, v, target) {
    Arms.call(this, owner, img);
    this._v = v;
    this.target = target;
    this.INTERVAL = 50;
};
Aimgun.prototype = Object.create(Arms.prototype);
Aimgun.prototype.constructor = Aimgun;

Aimgun.prototype._calc = function(g) {
    var a, b, c;
    a = this.target.cx - this.owner.cx;
    b = this.target.cy - this.owner.cy;
    c = Math.sqrt(a*a + b*b);
    return [a, b, c / this._v];
};
Aimgun.prototype.vx = function(g) {
    var p = this._calc(g);
    return p[0] / p[2];
};
Aimgun.prototype.vy = function(g) {
    var p = this._calc(g);
    return p[1] / p[2];
};
