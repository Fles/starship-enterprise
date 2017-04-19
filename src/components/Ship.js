export default class Ship {
  constructor(args) {
    this.type = "Ship";
    this.create = args.create;
    this.position = args.position;
    this.radius = args.radius;
    this.velocity = {
      x: 0,
      y: 0
    };
    this.speed = 0.15;
    this.inertia = 0.99;
    this.shipColor = 'black';
    this.onDestroy = args.onDestroy;
  }

  setDrift(dir) {
    if (dir === 'LEFT') this.velocity.x -= this.speed;
    if (dir === 'RIGHT') this.velocity.x += this.speed;
  }

  intersected(warp, target) {
    if (target.type === "BlackHole") {
      this.onDestroy();
    } else {
      this.shipColor = 'yellow';
      setTimeout(() => {
        this.shipColor = 'black';
      }, 150);
    }
  }

  accelerate() { this.velocity.y -= this.speed }
  decelerate() { this.velocity.y += this.speed }
  lockY() { this.velocity.y = 0 }

  render({ screen, context, keys, shipSize }) {

    // controls
    if(keys.up) this.accelerate();
    if(keys.down) this.decelerate();
    if(keys.space) this.lockY();
    if(keys.left) this.setDrift('LEFT');
    if(keys.right) this.setDrift('RIGHT');

    // move
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.x *= this.inertia;
    this.velocity.y *= this.inertia;

    // check edges
    if(this.position.x > screen.width) this.position.x = 0;
    else if(this.position.x < 0) this.position.x = screen.width;
    if(this.position.y > screen.height) this.position.y = 0;
    else if(this.position.y + this.radius * 2 < 0) this.position.y = screen.height;

    context.save();
    context.translate(this.position.x, this.position.y);

    this.getShipPath(context, keys, +shipSize.toFixed(1));
  }

  getShipPath(context, keys, size) {
    context.beginPath();
    context.globalAlpha = 1.0;
    context.lineCap = 'round';
    context.miterLimit = 4;
    context.lineWidth = 0.200000;
    context.fillStyle = this.shipColor;
    context.moveTo(0, 0);
    context.rotate(0.000000);
    context.scale(size, size);
    context.scale(1, 1);
    context.arc(0.000000, 0.000000, 23.990818, -0.000000, 1.57079641, 0);
    context.scale(1.000000, 1.000000);
    context.rotate(-0.000000);
    context.translate(-314.182132, -459.208012);
    context.translate(314.182128, 459.208012);
    context.rotate(0.000000);
    context.scale(1.000000, 1.000000);
    context.arc(0.000000, 0.000000, 23.990818, 1.570796, 3.14159274, 0);
    context.scale(1.000000, 1.000000);
    context.rotate(-0.000000);
    context.translate(-314.182128, -459.208012);
    context.translate(314.182128, 459.208008);
    context.rotate(0.000000);
    context.scale(1.000000, 1.000000);
    context.arc(0.000000, 0.000000, 23.990818, 3.141593, 4.71238906, 0);
    context.scale(1.000000, 1.000000);
    context.rotate(-0.000000);
    context.translate(-314.182128, -459.208008);
    context.translate(314.182132, 459.208008);
    context.rotate(0.000000);
    context.scale(1.000000, 1.000000);
    context.arc(0.000000, 0.000000, 23.990818, -1.570796, 0.00000008, 0);
    context.scale(1.000000, 1.000000);
    context.rotate(-0.000000);
    context.translate(-314.182132, -459.208008);
    context.fill();

    // #path5435
    context.beginPath();
    context.lineJoin = 'miter';
    context.strokeStyle = 'rgb(0, 0, 0)';
    context.lineCap = 'butt';
    context.lineWidth = 0;
    context.fillStyle = `rgb(${keys.up ? '110, 110, 110' : '0, 0, 0'})`;
    context.moveTo(308.044940, 481.804020);
    context.lineTo(308.881830, 490.312390);
    context.lineTo(301.070870, 496.031130);
    context.lineTo(300.233980, 486.825360);
    context.lineTo(297.583830, 485.151580);
    context.lineTo(294.933680, 485.988470);
    context.lineTo(294.933680, 494.915280);
    context.lineTo(294.933680, 514.442690);
    context.lineTo(300.233980, 514.303220);
    context.lineTo(301.628790, 507.608110);
    context.lineTo(305.952720, 501.889370);
    context.lineTo(309.579240, 495.752180);
    context.lineTo(311.531980, 501.191960);
    context.lineTo(313.205760, 504.679000);
    context.lineTo(315.297980, 504.400030);
    context.lineTo(318.785010, 496.310110);
    context.lineTo(327.851310, 509.142400);
    context.lineTo(327.851310, 515.279590);
    context.lineTo(333.849020, 513.884770);
    context.lineTo(334.127980, 487.243810);
    context.lineTo(331.198870, 484.733140);
    context.lineTo(328.548720, 486.964840);
    context.lineTo(328.269760, 496.728550);
    context.bezierCurveTo(328.269760, 496.728550, 319.342940, 489.475510, 319.761390, 488.778100);
    context.bezierCurveTo(320.179830, 488.080700, 321.295680, 480.967140, 321.295680, 480.967140);
    context.lineTo(314.182130, 482.640920);
    context.fill();
    context.stroke();

    // #path5437-3
    context.beginPath();
    context.globalAlpha = 1.0;
    context.lineCap = 'round';
    context.miterLimit = 4;
    context.lineWidth = 2;
    context.fillStyle = `rgb(${keys.space || keys.down ? 256 : 0}, 0, 0)`;
    context.moveTo(330.865690, 515.365251);
    context.bezierCurveTo(331.932392, 515.365251, 332.797124, 516.332052, 332.797124, 517.524660);
    context.bezierCurveTo(332.797124, 518.717268, 331.932392, 519.684069, 330.865690, 519.684069);
    context.bezierCurveTo(329.798988, 519.684069, 328.934256, 518.717268, 328.934256, 517.524660);
    context.bezierCurveTo(328.934256, 516.332052, 329.798988, 515.365251, 330.865690, 515.365251);
    context.fill();

    // #path5437
    context.beginPath();
    context.globalAlpha = 1.0;
    context.lineCap = 'round';
    context.miterLimit = 4;
    context.lineWidth = 2;
    context.fillStyle = `rgb(${keys.space || keys.down ? 256 : 0}, 0, 0)`;
    context.moveTo(297.740170, 515.686111);
    context.bezierCurveTo(298.806872, 515.686111, 299.671604, 516.652912, 299.671604, 517.845520);
    context.bezierCurveTo(299.671604, 519.038128, 298.806872, 520.004929, 297.740170, 520.004929);
    context.bezierCurveTo(296.673468, 520.004929, 295.808736, 519.038128, 295.808736, 517.845520);
    context.bezierCurveTo(295.808736, 516.652912, 296.673468, 515.686111, 297.740170, 515.686111);
    context.fill();

    // #path5203-0
    context.beginPath();
    context.strokeStyle = 'rgb(0, 0, 0)';
    context.miterLimit = 4;
    context.lineWidth = 0.001;
    context.fillStyle = 'rgb(229, 229, 229)';
    context.moveTo(332.955840, 521.506650);
    context.bezierCurveTo(332.621870, 521.674010, 331.758040, 521.810270, 331.036220, 521.809440);
    context.bezierCurveTo(329.196200, 521.807440, 327.973760, 521.092400, 327.104000, 519.509700);
    context.bezierCurveTo(326.804670, 518.965020, 326.716590, 517.984570, 326.689740, 514.898640);
    context.lineTo(326.655640, 510.979350);
    context.lineTo(323.087720, 505.089690);
    context.bezierCurveTo(321.125360, 501.850380, 319.434480, 499.147050, 319.330220, 499.082300);
    context.bezierCurveTo(319.217380, 499.012200, 318.899900, 499.830680, 318.545850, 501.104420);
    context.bezierCurveTo(317.838480, 503.649270, 317.240920, 504.832520, 316.231450, 505.687280);
    context.bezierCurveTo(314.815420, 506.886280, 313.328140, 506.700440, 311.967450, 505.154480);
    context.bezierCurveTo(311.302900, 504.399440, 311.059930, 503.879700, 310.277440, 501.539370);
    context.bezierCurveTo(309.774820, 500.036050, 309.304760, 498.868240, 309.232890, 498.944240);
    context.bezierCurveTo(309.160990, 499.020240, 307.522160, 501.760030, 305.590990, 505.032690);
    context.lineTo(302.079780, 510.982980);
    context.lineTo(302.045180, 514.899660);
    context.bezierCurveTo(302.009180, 518.972300, 301.882280, 519.567670, 300.824520, 520.625300);
    context.bezierCurveTo(299.210940, 522.238670, 296.187460, 522.238470, 294.574100, 520.624930);
    context.bezierCurveTo(293.351460, 519.402130, 293.381160, 519.828350, 293.356950, 503.159140);
    context.bezierCurveTo(293.343850, 494.107420, 293.434950, 487.211220, 293.572860, 486.824330);
    context.bezierCurveTo(294.350330, 484.643110, 296.796860, 483.468370, 299.082610, 484.178750);
    context.bezierCurveTo(300.151500, 484.510940, 301.499620, 485.811900, 301.818480, 486.818910);
    context.bezierCurveTo(301.939040, 487.199660, 302.044260, 489.057360, 302.052290, 490.947120);
    context.lineTo(302.066890, 494.383040);
    context.lineTo(304.681140, 491.769130);
    context.lineTo(307.295400, 489.155210);
    context.lineTo(306.987660, 486.080310);
    context.lineTo(306.679910, 483.005420);
    context.lineTo(305.454120, 482.538820);
    context.bezierCurveTo(303.892010, 481.944200, 301.888710, 480.902620, 300.202460, 479.808320);
    context.bezierCurveTo(298.335200, 478.596540, 294.934000, 475.182700, 293.654980, 473.236500);
    context.bezierCurveTo(288.628980, 465.588770, 287.969480, 456.296410, 291.881220, 448.243870);
    context.bezierCurveTo(293.270530, 445.383880, 294.296160, 443.964330, 296.735220, 441.525590);
    context.bezierCurveTo(299.171740, 439.089390, 300.582410, 438.069920, 303.462640, 436.663810);
    context.bezierCurveTo(310.309040, 433.321440, 318.623480, 433.341670, 325.360760, 436.717110);
    context.bezierCurveTo(328.375390, 438.227470, 329.594290, 439.109200, 332.010020, 441.527070);
    context.bezierCurveTo(333.595200, 443.113750, 334.401070, 444.046990, 335.087160, 445.090970);
    context.bezierCurveTo(343.884940, 458.477940, 338.552720, 476.232450, 323.924350, 482.259410);
    context.bezierCurveTo(323.061210, 482.615030, 322.278090, 482.963880, 322.184100, 483.034650);
    context.bezierCurveTo(322.090100, 483.105450, 321.859140, 484.485970, 321.670860, 486.102540);
    context.lineTo(321.328510, 489.041780);
    context.lineTo(323.991960, 491.705570);
    context.lineTo(326.655400, 494.369360);
    context.lineTo(326.691000, 490.693550);
    context.bezierCurveTo(326.718800, 487.824670, 326.810000, 486.865810, 327.106490, 486.325650);
    context.bezierCurveTo(327.974730, 484.743830, 329.197660, 484.028470, 331.040030, 484.024670);
    context.bezierCurveTo(333.032100, 484.020670, 334.561280, 485.079990, 335.163360, 486.881350);
    context.bezierCurveTo(335.465110, 487.784160, 335.470810, 517.928100, 335.169360, 518.883370);
    context.bezierCurveTo(334.877490, 519.808430, 333.802530, 521.082350, 332.955760, 521.506690);
    context.moveTo(332.479310, 517.502140);
    context.bezierCurveTo(332.479400, 516.210340, 330.903800, 515.549970, 329.993420, 516.460240);
    context.bezierCurveTo(329.458050, 516.995540, 329.457980, 518.008340, 329.993280, 518.543710);
    context.bezierCurveTo(330.528580, 519.079080, 331.541380, 519.079150, 332.076760, 518.543850);
    context.bezierCurveTo(332.330480, 518.290160, 332.479280, 517.905090, 332.479310, 517.502140);
    context.moveTo(332.532410, 500.438800);
    context.bezierCurveTo(332.528410, 488.859300, 332.490810, 487.703820, 332.102330, 487.315280);
    context.bezierCurveTo(331.530620, 486.743490, 330.543430, 486.743580, 329.971450, 487.315460);
    context.bezierCurveTo(329.582440, 487.704430, 329.544650, 488.857140, 329.540360, 500.465630);
    context.lineTo(329.535360, 513.189460);
    context.lineTo(330.954640, 513.215560);
    context.bezierCurveTo(331.735240, 513.229860, 332.410420, 513.218560, 332.455040, 513.188960);
    context.bezierCurveTo(332.499640, 513.159960, 332.534340, 507.422420, 332.532140, 500.438810);
    context.moveTo(326.673930, 501.749320);
    context.lineTo(326.677930, 498.559080);
    context.lineTo(323.702880, 495.583640);
    context.bezierCurveTo(322.066600, 493.947160, 320.703410, 492.671680, 320.673560, 492.749270);
    context.bezierCurveTo(320.643660, 492.826870, 320.518240, 493.284340, 320.394730, 493.765910);
    context.lineTo(320.170170, 494.641490);
    context.lineTo(322.829080, 499.014190);
    context.bezierCurveTo(324.291480, 501.419180, 325.716370, 503.773780, 325.995490, 504.246650);
    context.bezierCurveTo(326.274620, 504.719510, 326.540540, 505.068860, 326.586420, 505.022990);
    context.bezierCurveTo(326.632320, 504.977090, 326.671720, 503.503960, 326.673920, 501.749320);
    context.moveTo(315.234050, 501.829120);
    context.bezierCurveTo(316.589090, 498.022520, 318.383930, 489.552110, 318.938570, 484.346360);
    context.lineTo(318.997470, 483.793180);
    context.lineTo(317.406950, 483.986600);
    context.bezierCurveTo(315.382960, 484.232750, 313.352550, 484.232200, 311.321580, 483.985600);
    context.lineTo(309.720690, 483.790710);
    context.lineTo(309.784790, 484.740870);
    context.bezierCurveTo(310.152170, 490.181120, 312.483280, 500.322160, 314.002200, 503.087850);
    context.bezierCurveTo(314.224130, 503.491950, 314.291820, 503.514390, 314.539910, 503.266150);
    context.bezierCurveTo(314.696010, 503.109970, 315.008330, 502.463580, 315.233950, 501.829750);
    context.moveTo(299.143750, 517.499940);
    context.bezierCurveTo(299.143840, 516.208140, 297.568250, 515.547770, 296.657860, 516.458040);
    context.bezierCurveTo(296.122490, 516.993340, 296.122430, 518.006140, 296.657730, 518.541510);
    context.bezierCurveTo(297.193030, 519.076880, 298.205830, 519.076950, 298.741200, 518.541650);
    context.bezierCurveTo(298.994930, 518.287960, 299.143730, 517.902890, 299.143750, 517.499940);
    context.moveTo(299.196850, 500.436600);
    context.bezierCurveTo(299.192850, 488.857100, 299.155250, 487.701620, 298.766780, 487.313080);
    context.bezierCurveTo(298.195070, 486.741290, 297.207870, 486.741380, 296.635900, 487.313260);
    context.bezierCurveTo(296.246880, 487.702230, 296.209100, 488.854940, 296.204810, 500.463430);
    context.lineTo(296.199810, 513.187260);
    context.lineTo(297.619090, 513.213360);
    context.bezierCurveTo(298.399690, 513.227660, 299.074870, 513.216360, 299.119490, 513.186760);
    context.bezierCurveTo(299.164090, 513.157760, 299.198790, 507.420220, 299.196590, 500.436610);
    context.moveTo(305.174720, 499.991320);
    context.bezierCurveTo(306.753380, 497.334110, 308.111700, 495.034720, 308.193210, 494.881580);
    context.bezierCurveTo(308.322510, 494.638640, 308.110910, 493.012140, 307.925990, 492.827160);
    context.bezierCurveTo(307.888690, 492.789860, 306.553330, 494.063840, 304.958620, 495.658350);
    context.lineTo(302.059150, 498.557440);
    context.lineTo(302.063150, 501.808960);
    context.bezierCurveTo(302.065150, 503.597300, 302.120350, 505.006960, 302.185790, 504.941560);
    context.bezierCurveTo(302.251190, 504.876160, 303.596370, 502.648540, 305.175020, 499.991320);
    context.moveTo(332.185800, 472.213490);
    context.bezierCurveTo(336.363400, 466.553760, 337.538000, 458.934640, 335.285110, 452.109580);
    context.bezierCurveTo(331.554170, 440.806780, 319.268540, 434.544120, 307.809820, 438.103920);
    context.bezierCurveTo(300.845290, 440.267540, 295.557350, 445.537180, 293.324250, 452.539360);
    context.bezierCurveTo(291.214140, 459.155860, 292.443060, 466.639220, 296.554750, 472.211180);
    context.bezierCurveTo(305.416940, 484.220750, 323.322060, 484.221920, 332.185800, 472.213180);
    context.moveTo(318.221140, 465.457800);
    context.bezierCurveTo(317.190120, 466.074740, 315.323380, 466.553260, 314.136460, 466.504860);
    context.bezierCurveTo(313.526740, 466.479960, 312.451060, 466.253640, 311.746040, 466.001860);
    context.bezierCurveTo(310.585270, 465.587280, 310.346720, 465.426560, 309.220460, 464.300150);
    context.bezierCurveTo(308.046600, 463.126140, 307.948770, 462.973640, 307.479140, 461.585880);
    context.bezierCurveTo(306.879840, 459.814960, 306.895740, 458.322700, 307.532940, 456.538580);
    context.bezierCurveTo(307.946960, 455.379320, 308.109060, 455.138440, 309.227890, 454.019750);
    context.bezierCurveTo(310.346720, 452.901070, 310.587620, 452.739000, 311.746940, 452.325130);
    context.bezierCurveTo(313.531140, 451.688160, 315.023400, 451.672460, 316.794250, 452.272030);
    context.bezierCurveTo(318.183620, 452.742410, 318.333380, 452.838650, 319.515040, 454.020450);
    context.bezierCurveTo(320.696690, 455.202260, 320.792920, 455.352050, 321.263120, 456.741470);
    context.bezierCurveTo(322.163460, 459.401950, 321.644700, 462.009830, 319.814830, 464.022290);
    context.bezierCurveTo(319.286210, 464.603660, 318.569050, 465.249650, 318.221140, 465.457830);
    context.moveTo(318.299340, 461.169250);
    context.bezierCurveTo(318.803340, 460.242690, 318.803480, 458.085210, 318.299530, 457.158580);
    context.bezierCurveTo(317.486740, 455.663850, 316.285770, 454.918900, 314.538980, 454.825970);
    context.bezierCurveTo(311.988640, 454.690290, 310.034640, 456.557260, 310.008790, 459.154390);
    context.bezierCurveTo(309.984090, 461.635260, 311.898670, 463.549560, 314.381530, 463.526400);
    context.bezierCurveTo(316.112550, 463.510300, 317.470240, 462.693400, 318.299320, 461.169200);
    context.fill();
    context.stroke();
    context.restore();
    context.restore();
  }
}