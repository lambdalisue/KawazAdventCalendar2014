var displayDebugInfo = function(g) {
    // FPS
    g.ctx.fillText('FPS: ' + g.chronus.fps, 0, 10);
    // Collision circle
    g.ctx.beginPath();
    g.ctx.strokeStyle = 'cyan';
    g.ctx.arc(g.player.cx, g.player.cy, g.player.radius, 0, Math.PI*2);
    g.ctx.stroke();
    for(var i=0; i<g.enemies.length; i++) {
        var enemy = g.enemies[i];
        if(!enemy.isAlive()) {
            continue;
        }
        g.ctx.beginPath();
        g.ctx.strokeStyle = 'cyan';
        g.ctx.arc(enemy.cx, enemy.cy, enemy.radius, 0, Math.PI*2);
        g.ctx.stroke();
    }
    // Collision segments
    for(var i=0; i<g.enemies.length; i++) {
        var enemy = g.enemies[i];
        if(!enemy.isAlive()) {
            continue;
        }
        for(var j=0; j<g.player.arms.bullets.length; j++) {
            var bullet = g.player.arms.bullets[j];
            if(!bullet.isAlive()) {
                continue;
            }
            var circle = new Circle(enemy.cx,
                                    enemy.cy,
                                    enemy.radius);
            var segment = new Segment(bullet.cpx,
                                      bullet.cpy,
                                      bullet.cx,
                                      bullet.cy);
            var r, p, q, d;
            r = circle.radius;
            p = circle.sub(segment.s);
            q = circle.sub(segment.e);

            g.ctx.beginPath();
            g.ctx.strokeStyle = 'green';
            g.ctx.moveTo(segment.s.x, segment.s.y);
            g.ctx.lineTo(segment.s.x + p.x, segment.s.y + p.y);
            g.ctx.stroke();

            g.ctx.beginPath();
            g.ctx.strokeStyle = 'blue';
            g.ctx.moveTo(segment.e.x, segment.e.y);
            g.ctx.lineTo(segment.e.x + q.x, segment.e.y + q.y);
            g.ctx.stroke();

            g.ctx.beginPath();
            g.ctx.strokeStyle = 'red';
            g.ctx.moveTo(segment.s.x, segment.s.y);
            g.ctx.lineTo(segment.s.x+segment.x, segment.s.y+segment.y);
            g.ctx.stroke();

            g.ctx.beginPath();
            g.ctx.strokeStyle = 'gray';
            g.ctx.moveTo(0, 0);
            g.ctx.lineTo(segment.s.x, segment.s.y);
            g.ctx.stroke();
            g.ctx.beginPath();
            g.ctx.strokeStyle = 'gray';
            g.ctx.moveTo(0, 0);
            g.ctx.lineTo(segment.e.x, segment.e.y);
            g.ctx.stroke();
        }
    }
};
