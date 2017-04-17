import { randomNumBetween } from '../common/helpers';

export default class Asteroid {
  constructor(args) {
    this.position = args.position
    this.velocity = {
      x: 0,
      y: randomNumBetween(0, 1.5)
    }
    this.rotation = 30;
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

    this.drawStar(this.position.x, this.position.y, 5, 2.5, 4.2, state.context);
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