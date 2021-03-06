import { randomNumBetween } from '../common/helpers';

export default class BlackHole {
  constructor(args) {
    this.type = "BlackHole";
    this.position = args.position
    this.velocity = {
      x: 0,
      y: randomNumBetween(0, 0.2),
    }
    this.radius = args.radius;
    this.speed = 0.0002;
    this.color = 'black';
    this.create = args.create;
    this.remove = args.remove;
    this.thieve = args.thieve;
  }

  intersected(warp, target) {
    if (target.type === 'Ship') this.thieve();
    this.color = 'rgb(15, 15, 15)';
    setTimeout(() => this.color = 'black', 20);
  }

  render({ context, screen, warp }){
    // move
    this.position.y += this.velocity.y;
    this.velocity.y += randomNumBetween(0, 0.1) * this.speed * warp;

    // check edges
    if(this.position.x > screen.width + this.radius) this.position.x = -this.radius;
    else if(this.position.x < -this.radius) this.position.x = screen.width + this.radius;
    if(this.position.y > screen.height + this.radius) this.position.y = -this.radius;
    else if(this.position.y < - this.radius) this.position.y = screen.height + this.radius;

    // draw
    context.lineWidth = 3;
    context.strokeStyle = '#151515';
    context.fillStyle = this.color;
    context.save();
    context.scale(1, 1);
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius * 1.5, 0, 6.283185307179586, false);
    context.stroke();
    context.fill();
    context.closePath();
    context.restore();

    // remove out of screen
    if(this.position.y > screen.height + this.radius / 2) this.remove();
  }
}