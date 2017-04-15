import { randomNumBetween } from '../common/helpers';

export default class Star {
  constructor(args) {
    this.position = args.position
    this.velocity = {
      x: 0,
      y: randomNumBetween(0, 1.5)
    }
    this.rotation = 0;
    this.radius = 5;
    this.speed = 0.15;
    this.inertia = 0.99;
    this.size = args.size;
    this.create = args.create;
  }
  accelerate(val){
    this.velocity.y += randomNumBetween(0, 0.1) * this.speed;
  }

  render(state){
    if(state.keys.space){
      this.accelerate(1);
    }

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
    context.fillRect(0,0,this.size, this.size);
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
  }


}