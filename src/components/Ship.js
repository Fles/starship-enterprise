export default class Ship {
  constructor(args) {
    this.position = args.position;
    this.velocity = {
      x: 0,
      y: 0
    }
    this.rotation = 0;
    this.speed = 0.15;
    this.inertia = 0.99;
    this.create = args.create;
  }

  drift(dir){
    if (dir === 'LEFT') {
      this.velocity.x -= Math.cos(-this.rotation*Math.PI/180) * this.speed;
    }
    if (dir === 'RIGHT') {
      this.velocity.x += Math.cos(-this.rotation*Math.PI/180) * this.speed;
    }
  }

  accelerate(val){
    this.velocity.x -= Math.sin(-this.rotation*Math.PI/180) * this.speed;
    this.velocity.y -= Math.cos(-this.rotation*Math.PI/180) * this.speed;
  }

  render(state) {
    if(state.keys.space){
      this.accelerate(1);
    }
    if(state.keys.left){
      this.drift('LEFT');
    }
    if(state.keys.right){
      this.drift('RIGHT');
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.x *= this.inertia;
    this.velocity.y *= this.inertia;

    if(this.position.x > state.screen.width) this.position.x = 0;
    else if(this.position.x < 0) this.position.x = state.screen.width;
    if(this.position.y > state.screen.height) this.position.y = 0;
    else if(this.position.y < 0) this.position.y = state.screen.height;

    const context = state.context;
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation * Math.PI / 180);
    context.strokeStyle = 'rgb(0, 0, 0)';
    context.fillStyle = 'rgb(255, 255, 255)';
    context.lineWidth = 0;
    this.shipPath(context);
    context.fill();
    context.stroke();
    context.restore();
  }

  shipPath(context) {
    context.beginPath();
    context.moveTo(37.120241, 74.704492);
    context.bezierCurveTo(35.847552, 75.309632, 33.968817, 74.955542, 32.930440, 73.914832);
    context.bezierCurveTo(31.980595, 72.962842, 31.820019, 72.246982, 31.781831, 68.794232);
    context.lineTo(31.745641, 65.522272);
    context.lineTo(28.723625, 60.514702);
    context.bezierCurveTo(27.061516, 57.760542, 25.648062, 55.507082, 25.582618, 55.507012);
    context.bezierCurveTo(25.517178, 55.507012, 25.335251, 55.956102, 25.178345, 56.505142);
    context.bezierCurveTo(24.490830, 58.910882, 24.069977, 59.906862, 23.418155, 60.670712);
    context.bezierCurveTo(22.611562, 61.615952, 21.840722, 61.930012, 20.833427, 61.723812);
    context.bezierCurveTo(20.207400, 61.595662, 20.043422, 61.484392, 19.362107, 60.725412);
    context.bezierCurveTo(18.671175, 59.955722, 18.527474, 59.665992, 17.909177, 57.796112);
    context.bezierCurveTo(17.531785, 56.654802, 17.174602, 55.672472, 17.115433, 55.613162);
    context.bezierCurveTo(16.956141, 55.453512, 16.656675, 55.915752, 13.701825, 60.882092);
    context.lineTo(11.002659, 65.418692);
    context.lineTo(10.954349, 68.723752);
    context.bezierCurveTo(10.915059, 71.411372, 10.839023, 72.164722, 10.547310, 72.756302);
    context.bezierCurveTo(9.842603, 74.185382, 8.786167, 74.883442, 7.253236, 74.932902);
    context.bezierCurveTo(5.630271, 74.985302, 4.424398, 74.249912, 3.668961, 72.747202);
    context.bezierCurveTo(3.336045, 72.084962, 3.303610, 70.791262, 3.317960, 58.747342);
    context.bezierCurveTo(3.332300, 46.719242, 3.368180, 45.408842, 3.701320, 44.747392);
    context.bezierCurveTo(4.450554, 43.259852, 5.505042, 42.604642, 7.146860, 42.606482);
    context.bezierCurveTo(8.790542, 42.607482, 9.853008, 43.272692, 10.578495, 44.752292);
    context.bezierCurveTo(10.862568, 45.331642, 10.941854, 46.047112, 10.967387, 48.261612);
    context.bezierCurveTo(10.985027, 49.791492, 11.031887, 51.075722, 11.071519, 51.115442);
    context.bezierCurveTo(11.111149, 51.155142, 12.091945, 50.241432, 13.251056, 49.084922);
    context.lineTo(15.358533, 46.982162);
    context.lineTo(15.251476, 46.144102);
    context.bezierCurveTo(15.192586, 45.683162, 15.079249, 44.558422, 14.999598, 43.644682);
    context.bezierCurveTo(14.919948, 42.730932, 14.791604, 41.920012, 14.714395, 41.842622);
    context.bezierCurveTo(14.637185, 41.765222, 13.895785, 41.411192, 13.066837, 41.055842);
    context.bezierCurveTo(5.277659, 37.716802, 0.331936, 30.442642, 0.010752, 21.852932);
    context.bezierCurveTo(-0.135831, 17.932742, 1.226148, 13.167242, 3.497074, 9.654452);
    context.bezierCurveTo(4.834295, 7.585972, 7.710281, 4.713122, 9.719935, 3.438392);
    context.bezierCurveTo(17.072653, -1.225518, 26.296041, -1.138648, 33.435113, 3.661732);
    context.bezierCurveTo(34.037446, 4.066742, 35.232131, 5.048452, 36.089966, 5.843322);
    context.bezierCurveTo(38.604233, 8.172992, 40.380558, 10.899702, 41.586924, 14.281302);
    context.bezierCurveTo(43.195472, 18.790272, 43.189611, 24.006862, 41.570934, 28.512212);
    context.bezierCurveTo(39.461941, 34.382282, 35.068600, 38.962042, 29.383062, 41.217232);
    context.lineTo(27.994875, 41.767852);
    context.lineTo(27.907605, 42.326702);
    context.bezierCurveTo(27.859605, 42.634072, 27.708133, 43.789292, 27.571003, 44.893862);
    context.lineTo(27.321673, 46.902182);
    context.lineTo(29.471081, 49.056432);
    context.bezierCurveTo(30.653255, 50.241262, 31.651938, 51.179282, 31.690375, 51.140942);
    context.bezierCurveTo(31.728805, 51.102542, 31.781585, 49.812332, 31.807653, 48.273702);
    context.bezierCurveTo(31.844853, 46.077692, 31.930669, 45.322822, 32.206764, 44.762912);
    context.bezierCurveTo(32.942014, 43.271882, 34.186259, 42.525082, 35.790152, 42.612112);
    context.bezierCurveTo(37.401483, 42.699512, 38.652041, 43.598012, 39.162243, 45.034812);
    context.bezierCurveTo(39.279707, 45.365612, 39.350607, 51.259392, 39.330180, 58.995262);
    context.bezierCurveTo(39.299760, 70.517732, 39.248950, 72.465032, 38.965580, 72.970382);
    context.bezierCurveTo(38.534726, 73.738752, 37.903193, 74.332212, 37.120235, 74.704492);
    context.moveTo(36.745232, 71.636042);
    context.bezierCurveTo(36.967356, 71.044112, 36.630042, 70.322782, 36.055270, 70.160562);
    context.bezierCurveTo(35.339146, 69.958472, 34.746629, 70.187662, 34.509417, 70.758542);
    context.bezierCurveTo(34.317918, 71.219392, 34.439067, 71.861642, 34.782405, 72.205752);
    context.bezierCurveTo(35.002890, 72.426732, 36.203145, 72.428072, 36.424123, 72.206752);
    context.bezierCurveTo(36.517873, 72.113252, 36.662369, 71.856022, 36.745232, 71.635192);
    context.moveTo(36.895206, 56.675002);
    context.bezierCurveTo(36.897506, 49.813532, 36.819676, 45.925292, 36.675412, 45.687572);
    context.bezierCurveTo(36.243038, 44.975092, 35.029271, 44.965562, 34.599087, 45.671172);
    context.bezierCurveTo(34.443303, 45.926722, 34.359873, 49.556292, 34.346220, 56.672062);
    context.bezierCurveTo(34.335010, 62.512782, 34.374860, 67.340682, 34.434750, 67.400712);
    context.bezierCurveTo(34.582385, 67.548692, 36.627593, 67.557992, 36.774548, 67.411412);
    context.bezierCurveTo(36.838998, 67.347112, 36.893285, 62.515722, 36.895202, 56.674972);
    context.moveTo(31.780370, 57.550832);
    context.lineTo(31.779898, 54.935642);
    context.lineTo(29.363785, 52.514092);
    context.bezierCurveTo(27.486842, 50.632932, 26.916146, 50.123992, 26.806411, 50.233482);
    context.bezierCurveTo(26.463972, 50.575152, 26.406188, 51.766802, 26.707141, 52.280562);
    context.bezierCurveTo(26.876126, 52.569022, 27.982686, 54.390102, 29.166163, 56.327392);
    context.bezierCurveTo(30.349639, 58.264692, 31.380328, 59.962592, 31.456580, 60.100492);
    context.bezierCurveTo(31.532830, 60.238392, 31.636988, 60.309562, 31.688033, 60.258632);
    context.bezierCurveTo(31.739073, 60.207732, 31.780623, 58.989182, 31.780363, 57.550832);
    context.moveTo(22.275589, 57.284972);
    context.bezierCurveTo(23.641746, 52.915812, 25.319997, 44.742792, 25.230017, 42.897012);
    context.bezierCurveTo(25.208437, 42.454402, 25.203047, 42.451192, 24.635717, 42.542002);
    context.bezierCurveTo(23.201500, 42.771592, 20.705200, 42.822112, 19.255713, 42.650862);
    context.bezierCurveTo(18.382530, 42.547682, 17.611985, 42.517322, 17.543393, 42.583362);
    context.bezierCurveTo(17.228445, 42.886522, 18.286895, 49.655522, 19.207822, 53.227672);
    context.bezierCurveTo(19.779619, 55.445612, 20.883660, 58.721402, 21.149003, 58.987342);
    context.bezierCurveTo(21.495823, 59.334932, 21.758910, 58.937442, 22.275589, 57.284982);
    context.moveTo(8.255620, 71.604032);
    context.bezierCurveTo(8.607719, 70.665742, 7.596997, 69.719132, 6.657323, 70.107132);
    context.bezierCurveTo(5.667270, 70.515912, 5.662209, 71.909222, 6.649323, 72.319382);
    context.bezierCurveTo(7.346270, 72.608992, 7.985338, 72.324382, 8.255656, 71.604032);
    context.moveTo(8.400981, 56.647612);
    context.bezierCurveTo(8.400367, 50.809392, 8.318411, 45.881462, 8.218862, 45.696632);
    context.bezierCurveTo(7.799212, 44.917472, 6.489337, 44.916002, 6.067937, 45.694632);
    context.bezierCurveTo(5.876785, 46.047652, 5.757058, 67.180702, 5.945142, 67.369212);
    context.bezierCurveTo(6.092777, 67.517182, 8.137985, 67.526472, 8.284943, 67.379912);
    context.bezierCurveTo(8.349383, 67.315612, 8.401603, 62.486282, 8.400981, 56.648082);
    context.moveTo(13.786480, 55.768692);
    context.bezierCurveTo(15.107347, 53.529532, 16.183425, 51.680512, 16.177766, 51.659752);
    context.bezierCurveTo(16.172066, 51.638952, 16.118786, 51.355022, 16.059282, 51.028682);
    context.bezierCurveTo(15.999772, 50.702342, 15.896280, 50.380402, 15.829293, 50.313272);
    context.bezierCurveTo(15.744833, 50.228672, 14.981337, 50.915732, 13.338242, 52.555142);
    context.lineTo(10.968984, 54.919082);
    context.lineTo(10.969472, 57.586512);
    context.bezierCurveTo(10.969802, 59.383932, 11.037622, 60.186422, 11.177432, 60.046922);
    context.bezierCurveTo(11.291545, 59.933072, 12.465617, 58.007862, 13.786485, 55.768692);
    context.moveTo(36.202398, 33.068812);
    context.bezierCurveTo(38.839746, 29.703232, 40.224511, 25.688972, 40.229335, 21.395242);
    context.bezierCurveTo(40.235235, 16.206142, 38.406327, 11.790572, 34.721776, 8.097742);
    context.bezierCurveTo(31.860687, 5.230212, 29.053837, 3.715322, 25.096710, 2.902962);
    context.bezierCurveTo(18.058542, 1.458122, 10.639802, 4.281292, 6.358439, 10.033762);
    context.bezierCurveTo(-1.403301, 20.462472, 3.286755, 35.271292, 15.636160, 39.328132);
    context.bezierCurveTo(22.999579, 41.747042, 31.407095, 39.188232, 36.202398, 33.068812);
    context.moveTo(24.699538, 26.756092);
    context.bezierCurveTo(22.398647, 28.134032, 19.270480, 27.845752, 17.255850, 26.070092);
    context.bezierCurveTo(13.720434, 22.954042, 14.797704, 17.115572, 19.201539, 15.525042);
    context.bezierCurveTo(20.698204, 14.984502, 21.981101, 14.972942, 23.492575, 15.486442);
    context.bezierCurveTo(24.679412, 15.889612, 24.807413, 15.972052, 25.815879, 16.982792);
    context.bezierCurveTo(26.824263, 17.993442, 26.906554, 18.121822, 27.307457, 19.309912);
    context.bezierCurveTo(28.075653, 21.586482, 27.615255, 23.879212, 26.052595, 25.558932);
    context.bezierCurveTo(25.605572, 26.039442, 24.996695, 26.578192, 24.699538, 26.756162);
    context.moveTo(24.953102, 22.552672);
    context.bezierCurveTo(25.407117, 21.143022, 25.085734, 19.831162, 24.026232, 18.769282);
    context.bezierCurveTo(22.498016, 17.237632, 20.343533, 17.235502, 18.811449, 18.764282);
    context.bezierCurveTo(17.279366, 20.292922, 17.276643, 22.447412, 18.804849, 23.979062);
    context.bezierCurveTo(20.049911, 25.226922, 21.660563, 25.455082, 23.316852, 24.618222);
    context.bezierCurveTo(23.886166, 24.330562, 24.719190, 23.279042, 24.953093, 22.552812);
    context.closePath();
  }
}