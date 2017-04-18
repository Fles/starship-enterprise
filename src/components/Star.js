import { randomNumBetween } from '../common/helpers';

export default class Star {
  constructor(args) {
    this.position = args.position
    this.velocity = {
      x: 0,
      y: randomNumBetween(0, 1.1)
    }
    this.rotation = 0;
    this.radius = 5;
    this.speed = 0.1;
    this.inertia = 0.99;
    this.size = args.size;
    this.create = args.create;
  }
  accelerate(val){
    this.velocity.y += randomNumBetween(0, 0.1) * this.speed;
  }
  decelerate(val) {
    this.velocity.y -= Math.cos(-this.rotation*Math.PI/180) * this.speed;
  }

  render(state){
    this.velocity.y += randomNumBetween(0, 0.2) * this.speed;

    if(state.keys.up) this.accelerate(1);
    if(state.keys.space) this.decelerate(1);

    this.position.y += this.velocity.y;
    this.velocity.y *= this.inertia;

    if(this.position.x > state.screen.width + this.radius) this.position.x = -this.radius;
    else if(this.position.x < -this.radius) this.position.x = state.screen.width + this.radius;
    if(this.position.y > state.screen.height + this.radius) this.position.y = -this.radius;
    else if(this.position.y < -this.radius) this.position.y = state.screen.height + this.radius;

    const context = state.context;
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation * Math.PI / 180);
    context.strokeStyle = 'rgb(0, 0, 0)';
    context.fillStyle = 'rgb(255, 255, 255)';
    context.lineWidth = 0;
    context.beginPath();
    context.fillRect(0, 0, this.starSize().width, this.starSize().height);
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
  }

  starSize() {
    return {
      width: this.warp ? this.size / this.warp / 2 : this.size,
      height: this.warp ? this.size * this.warp * 5 : this.size
    }
  }
}