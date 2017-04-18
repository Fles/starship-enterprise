import { randomNumBetween } from '../common/helpers';

export default class Star {
  constructor(args) {
    this.position = args.position
    this.velocity = {
      x: 0,
      y: randomNumBetween(0, 0.2)
    }
    this.radius = 5;
    this.speed = 0.1;
    this.inertia = 0.99;
    this.size = args.size;
    this.create = args.create;
  }

  render({ context, screen, warp }){

    // move
    this.velocity.y += randomNumBetween(0, 0.2) * this.speed  * warp;
    this.position.y += this.velocity.y;
    this.velocity.y *= this.inertia;

    // check edges
    if(this.position.x > screen.width + this.radius) this.position.x = -this.radius;
    else if(this.position.x < -this.radius) this.position.x = screen.width + this.radius;
    if(this.position.y > screen.height + this.radius) this.position.y = -this.radius;
    else if(this.position.y < -this.radius) this.position.y = screen.height + this.radius;

    // draw
    context.save();
    context.translate(this.position.x, this.position.y);
    context.strokeStyle = 'rgb(0, 0, 0)';
    context.fillStyle = 'rgb(255, 255, 255)';
    context.lineWidth = 0;
    context.beginPath();
    context.fillRect(0, 0, this.size / warp / 2, this.size * warp);
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
  }
}