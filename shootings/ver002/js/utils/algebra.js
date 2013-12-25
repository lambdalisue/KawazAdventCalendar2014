"use strict"

var Vector = function(x, y) {
    this.x = x;
    this.y = y;
};
Vector.norm = function(vec) {
    return Math.sqrt(vec.x*vec.x+vec.y*vec.y);
};
Vector.add = function(lhs, rhs) {
    return new Vector(lhs.x+rhs.x, lhs.y+rhs.y);
};
Vector.sub = function(lhs, rhs) {
    return new Vector(lhs.x-rhs.x, lhs.y-rhs.y);
};
Vector.mul = function(vec, scl) {
    return new Vector(lhs.x*scl, lhs.y*scl);
};
Vector.div = function(vec, scl) {
    return new Vector(lhs.x/scl, lhs.y/scl);
};
Vector.dot = function(lhs, rhs) {
    return lhs.x*rhs.x + lhs.y*rhs.y;
};
Vector.cross = function(lhs, rhs) {
    return lhs.x*rhs.y - lhs.y*rhs.x;
};
Vector.prototype.norm = function() {
    return Vector.norm(this);
};
Vector.prototype.add = function(vec) {
    return Vector.add(this, vec);
};
Vector.prototype.sub = function(vec) {
    return Vector.sub(this, vec);
};
Vector.prototype.mul = function(scl) {
    return Vector.mul(this, scl);
};
Vector.prototype.div = function(scl) {
    return Vector.div(this, scl);
};
Vector.prototype.dot = function(vec) {
    return Vector.dot(this, vec);
};
Vector.prototype.cross = function(vec) {
    return Vector.cross(this, vec);
};

// alias
var Point = Vector;

var Segment = function(x1, y1, x2, y2) {
    this.s = new Vector(x1, y1);
    this.e = new Vector(x2, y2);
    Object.defineProperty(this, 'x', {
        get: function() {
            return this.e.x - this.s.x;
        }
    });
    Object.defineProperty(this, 'y', {
        get: function() {
            return this.e.y - this.s.y;
        }
    });
};
Segment.prototype = Object.create(Vector.prototype);
Segment.prototype.constructor = Segment;

var Circle = function(x, y, radius) {
    this.radius = radius;
    Vector.call(this, x, y);
};
Circle.prototype = Object.create(Vector.prototype);
Circle.prototype.constructor = Circle;
