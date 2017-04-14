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
    this.size = args.size;
    this.create = args.create;
  }
  render(state){
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

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