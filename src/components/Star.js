import { randomNumBetween } from '../common/helpers';

export default class Star {
  constructor(args) {
    this.position = args.position
    this.velocity = {
      x: randomNumBetween(-1.5, 1.5),
      y: randomNumBetween(-1.5, 1.5)
    }
    this.rotation = 0;
    this.radius = args.size;
    this.create = args.create;
  }
  render(state){
    // Move
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Rotation
    this.rotation += this.rotationSpeed;
    if (this.rotation >= 360) {
      this.rotation -= 360;
    }
    if (this.rotation < 0) {
      this.rotation += 360;
    }

    // Screen edges
    if(this.position.x > state.screen.width + this.radius) this.position.x = -this.radius;
    else if(this.position.x < -this.radius) this.position.x = state.screen.width + this.radius;
    if(this.position.y > state.screen.height + this.radius) this.position.y = -this.radius;
    else if(this.position.y < -this.radius) this.position.y = state.screen.height + this.radius;

    // Draw
    const context = state.context;
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation * Math.PI / 180);
    context.strokeStyle = '#FFF';
    context.lineWidth = 2;
    context.globalAlpha = 1.0;
    context.lineCap = 'round';
    context.miterLimit = 4;
    context.lineWidth = 3.000000;
    context.fillStyle = 'rgb(255, 255, 255)';
    context.arc(274.959810, 418.741670, 1.500000, 0.000000, 6.28318531, 1);
    context.fill();
    context.closePath();
    context.restore();
    context.stroke();
    context.restore();
  }


}