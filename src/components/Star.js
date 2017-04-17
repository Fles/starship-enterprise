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
    this.speed = 0.1;
    this.inertia = 0.99;
    this.size = args.size;
    this.create = args.create;
    this.warp = null;
  }
  accelerate(val){
    this.velocity.y += randomNumBetween(0, 0.1) * this.speed;
  }
  decelerate(val) {
    this.velocity.y -= Math.cos(-this.rotation*Math.PI/180) * this.speed;
    this.warp = null;
  }

  setWarp(lvl) {
    this.warp = lvl;
  }

  render(state){
    if (!!this.warp) this.velocity.y += randomNumBetween(0, 0.2) * this.speed * this.warp;

    if(state.keys.up) this.accelerate(1);
    if(state.keys.space) this.decelerate(1);
    if(state.keys.w1) this.setWarp(1);
    if(state.keys.w2) this.setWarp(2);
    if(state.keys.w3) this.setWarp(3);
    if(state.keys.w4) this.setWarp(4);
    if(state.keys.w5) this.setWarp(5);
    if(state.keys.w6) this.setWarp(6);
    if(state.keys.w7) this.setWarp(7);

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