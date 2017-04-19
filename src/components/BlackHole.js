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
    this.create = args.create;
    this.remove = args.remove;
    this.thieve = args.thieve;
  }

  intersected(warp) {
    this.thieve();
    //this.remove();
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
    context.strokeStyle = '#111';
    context.fillStyle = 'rgb(0, 0, 0)';
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