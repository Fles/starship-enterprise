import React, { Component } from 'react';
import Ship from './components/Ship';
import Star from './components/Star';
import Point from './components/Point';
import BlackHole from './components/BlackHole';
import * as H  from './common/helpers';

const KEY = {
  LEFT:  37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  SPACE: 32,
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      context: null,
      score: 0,
      warp: 1,
      starCount: 150,
      pointCount: 5,
      holeCount: 1,
      collectedPoints: 0,
      pointValue: 10,
      shipSize: 1,
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1,
      },
      keys : {
        left  : 0,
        right : 0,
        up    : 0,
        down  : 0,
        space : 0,
      },
    }
    this.points = [];
    this.holes = [];
    this.ship = [];
    this.space = [];
  }

  handleResize() {
    this.setState({
      screen : {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1,
      }
    });
  }
  
  handleKeys(value, e){
    let keys = this.state.keys;
    if(e.keyCode === KEY.LEFT) keys.left = value;
    if(e.keyCode === KEY.RIGHT) keys.right = value;
    if(e.keyCode === KEY.UP) keys.up = value;
    if(e.keyCode === KEY.DOWN) keys.down = value;
    if(e.keyCode === KEY.SPACE) {
      keys.space = !keys.space;
      let { warp } = this.state;
      if (warp > 1 ) {
        warp--;
        this.setState({ warp });
      }
    }
    this.setState({ keys });
  }

  handleTouch() {
    let keys = this.state.keys;
    keys.space = !keys.space;
    let { warp } = this.state;
    if (warp > 1 ) {
      warp--;
      this.setState({ warp });
    }
    this.setState({ keys });
  }

  handleMotion(ev) {
    let acc = ev.accelerationIncludingGravity;
    let keys = this.state.keys;
    let threshold = 1;
    keys.left = Math.sign(+acc.x.toFixed(0)) === 1 && acc.x > threshold;
    keys.right = Math.sign(+acc.x.toFixed(0)) === -1 && acc.x < threshold;
    keys.up = Math.sign(+acc.y.toFixed(0)) === -1 && acc.y < threshold;
    keys.down = Math.sign(+acc.y.toFixed(0)) === 1 && acc.y > threshold;
    this.setState({ keys });
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeys.bind(this, false));
    window.addEventListener('keydown', this.handleKeys.bind(this, true));
    window.addEventListener('resize', this.handleResize.bind(this, false));
    window.addEventListener("touchstart", this.handleTouch.bind(this, false));
    if (window.DeviceMotionEvent && H.mobileAndTabletCheck()) {
      window.addEventListener('devicemotion', this.handleMotion.bind(this), false);
    }
    const context = this.refs.canvas.getContext('2d');
    this.setState({ context: context });
    this.startGame();
    requestAnimationFrame(() => {this.update()});
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleKeys);
    window.removeEventListener('resize', this.handleKeys);
    window.removeEventListener('resize', this.handleResize);
  }

  update() {
    const { context, screen } = this.state;

    context.save();
    context.scale(screen.ratio, screen.ratio);

    // motion
    context.fillStyle = '#000';
    context.globalAlpha = 0.5;
    context.fillRect(0, 0, screen.width, screen.height);
    context.globalAlpha = 1;

    // generate next points
    if(this.points.length < this.state.pointCount){
      let count = this.state.pointCount;
      this.generatePoints(count - this.points.length);
    }

    // generate next holes
    if(this.holes.length < this.state.holeCount){
      let count = this.state.holeCount;
      this.generateHoles(count - this.holes.length);
    }

    // check if point is collected
    this.onCollect(this.ship, this.points);
    this.onCollect(this.ship, this.holes);

    // render or remove items
    this.updateObjects(this.space, 'space');
    this.updateObjects(this.holes, 'holes');
    this.updateObjects(this.points, 'points');
    this.updateObjects(this.ship, 'ship');

    context.restore();

    // next frame
    requestAnimationFrame(() => {this.update()});
  }

  addScore(points){
    let score = this.state.score + points;
    let collectedPoints = this.state.collectedPoints + 1;
    let warp = collectedPoints % 10 === 0 ?
      this.state.warp + 1 : this.state.warp;
    this.setState({ score, collectedPoints, warp, pointValue: points });
  }

  reduceSize(){
    let shipSize = this.state.shipSize * 0.7;
    this.setState({ shipSize });
  }

  startGame(){
    // create ship
    let ship = new Ship({
      position: {
        x: this.state.screen.width / 2,
        y: this.state.screen.height / 2
      },
      topOffset: 65,
      create: this.createObject.bind(this)
    });
    this.createObject(ship, 'ship');

    // create holes
    this.holes = [];
    this.generateHoles(this.state.holeCount);

    // create space
    this.space = [];
    this.generateSpace(this.state.starCount);

    // create points
    this.points = [];
    this.generatePoints(this.state.pointCount);
  }

  generateSpace(howMany){
    for (let i = 0; i < howMany; i++) {
      let star = new Star({
        size: H.randomNumBetween(0.2, 1.8),
        position: {
          x: H.randomNumBetween(0, this.state.screen.width),
          y: H.randomNumBetween(0, this.state.screen.height)
        },
        create: this.createObject.bind(this)
      });
      this.createObject(star, 'space');
    }
  }

  generatePoints(howMany){
    var self = this;
    let ship = this.ship[0];
    for (let i = 0; i < howMany; i++) {
      let point = new Point({
        radius: H.randomNumBetween(3, 5),
        position: {
          x: H.randomNumBetweenExcluding(0, this.state.screen.width, ship.position.x-60, ship.position.x+60),
          y: 0,
        },
        create: this.createObject.bind(this),
        remove: function () {self.removeObject(this, 'points')},
        addScore: this.addScore.bind(this)
      });
      this.createObject(point, 'points');
    }
  }

  generateHoles(howMany){
    var self = this;
    let ship = this.ship[0];
    for (let i = 0; i < howMany; i++) {
      let point = new BlackHole({
        radius: H.randomNumBetween(100, 125),
        position: {
          x: H.randomNumBetweenExcluding(0, this.state.screen.width, ship.position.x-60, ship.position.x+60),
          y: 0,
        },
        create: this.createObject.bind(this),
        remove: function () {self.removeObject(this, 'holes')},
        thieve: this.reduceSize.bind(this)
      });
      this.createObject(point, 'holes');
    }
  }

  createObject(item, group){
    this[group].push(item);
  }

  removeObject(item, group){
    var index = this[group].indexOf(item);
    if (index > -1) {
      this[group].splice(index, 1);
    }
  }

  updateObjects(items, group){
    let index = 0;
    for (let item of items) {
      if (item.delete) {
        this[group].splice(index, 1);
      } else {
        items[index].render(this.state);
      }
      index++;
    }
  }

  onCollect(items1, items2) {
    var a = items1.length - 1;
    var b;
    for(a; a > -1; --a){
      b = items2.length - 1;
      for(b; b > -1; --b){
        var item1 = items1[a];
        var item2 = items2[b];

        let dx = Math.abs(item1.position.x - item2.position.x).toFixed(1);
        let dy = Math.abs(item1.position.y - item2.position.y).toFixed(1);

        if(dx < 20 && dy < 20){
          item1.collect(this.state.warp);
          item2.collect(this.state.warp);
        }
      }
    }
  }

  render() {
    let { width, height, ratio } = this.state.screen;
    return (
      <div>
        <div className="console">
          <span className="score" >Score: { this.state.score }</span>
          <span className="warp" >Warp: { this.state.warp }</span>
        </div>
        <canvas ref='canvas' width={width * ratio} height={height * ratio} />
      </div>
    );
  }
}

export default App;
