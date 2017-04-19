import { randomNumBetween } from '../common/helpers';

export default class Point {
  constructor(args) {
    this.position = args.position
    this.velocity = {
      x: 0,
      y: randomNumBetween(0, 0.2),
    }
    this.radius = args.radius;
    this.speed = 0.1;
    this.inertia = 0.99;
    this.create = args.create;
    this.remove = args.remove;
    this.addScore = args.addScore;
    this.score = 10;
  }

  intersected(warp) {
    this.addScore(this.score * warp);
    this.remove();
  }

  render({ context, screen, warp}){

    // move
    this.position.y += this.velocity.y;
    this.velocity.y += randomNumBetween(0, 0.2) * this.speed  * warp;
    this.velocity.y *= this.inertia;

    // check edges
    if(this.position.x > screen.width + this.radius) this.position.x = -this.radius;
    else if(this.position.x < -this.radius) this.position.x = screen.width + this.radius;
    if(this.position.y > screen.height + this.radius) this.position.y = -this.radius;
    else if(this.position.y < - this.radius) this.position.y = screen.height + this.radius;

    // draw
    this.drawStar(this.position.x, this.position.y, 5, this.radius, this.radius / 2, context);

    // remove out of screen
    if(this.position.y > screen.height - this.radius) this.remove();
  }

  drawStar(cx, cy, spikes, outerRadius, innerRadius, context) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    context.strokeSyle = "#000";
    context.beginPath();
    context.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      context.lineTo(x, y)
      rot += step

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      context.lineTo(x, y)
      rot += step
    }
    context.lineTo(cx, cy - outerRadius);
    context.closePath();
    context.lineWidth=3;
    context.strokeStyle='yellow';
    context.stroke();
    context.fillStyle='red';
    context.fill();
  }
}