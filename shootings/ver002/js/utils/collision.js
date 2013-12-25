"use strict"
// require: vector.js
var collisionTest = {
    circleAndCircle: function(circle1, circle2) {
        var d, r;
        d = Vector.sub(circle1, circle2).norm();
        r = circle1.radius + circle2.radius;
        return d <= r;
    },
    circleAndSegment: function(circle, segment) {
        var r, p, q, d;
        r = circle.radius;
        p = circle.sub(segment.s);
        q = circle.sub(segment.e);
        d = Math.abs(segment.cross(p) / segment.norm());

        if(d <= r) {
            if(segment.dot(p) * segment.dot(q) <= 0) {
                return true;
            } else if(r > p.norm() || r > q.norm()) {
                return true;
            }
        }
        return false;
    }
};
