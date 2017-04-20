import React, { Component } from 'react';
import { Ship, Star, Point, BlackHole } from './components';
import * as H from './common/helpers';

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
      inGame: false,
      starCount: 150,
      pointCount: 5,
      holeCount: 1,
      collectedPoints: 0,
      pointValue: 10,
      damage: 0,
      lastSizeDeduction: Date.now(),
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
      }
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
    let { keys, warp } = this.state;
    if(e.keyCode === KEY.LEFT) keys.left = value;
    if(e.keyCode === KEY.RIGHT) keys.right = value;
    if(e.keyCode === KEY.UP) keys.up = value;
    if(e.keyCode === KEY.DOWN) keys.down = value;
    if(e.keyCode === KEY.SPACE) {
      keys.space = !keys.space;
      warp > 1 && warp--;
    }
    this.setState({ keys, warp });
  }

  handleTouch() {
    let { keys, warp } = this.state;
    keys.space = !keys.space;
    warp > 1 && warp--;
    this.setState({ keys, warp });
  }

  handleMotion(ev) {
    let { keys } = this.state;
    let acc = ev.accelerationIncludingGravity;
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
    this.intersection(this.ship, this.points);
    this.intersection(this.ship, this.holes);
    this.intersection(this.holes, this.points);

    // render or remove items
    this.updateObjects(this.space, 'space');
    this.updateObjects(this.holes, 'holes');
    this.updateObjects(this.points, 'points');
    this.updateObjects(this.ship, 'ship');

    context.restore();

    // next frame
    requestAnimationFrame(() => this.update());
  }

  addScore(points){
    let score = this.state.score + points;
    let collectedPoints = this.state.collectedPoints + 1;
    let warp = collectedPoints % 10 === 0 ?
      this.state.warp + 1 : this.state.warp;
    if(this.state.inGame){
      this.setState({ score, collectedPoints, warp, pointValue: points });
    }
  }

  reduceSize(){
    if(Date.now() - this.state.lastSizeDeduction > 100){
      if (this.state.damage > 0.95) return;
      let damage = this.state.damage + 0.05;
      this.setState({ damage, lastSizeDeduction: Date.now() });
    }
  }

  startGame(){
    this.setState({
      inGame: true,
      score: 0,
      collectedPoints: 0,
      warp: 1,
      pointValue: 10,
      damage: 0
    });

    // create ship
    this.ship = [];
    let ship = new Ship({
      position: {
        x: this.state.screen.width / 2,
        y: this.state.screen.height / 2
      },
      radius: 25,
      create: this.createObject.bind(this),
      onDestroy: this.gameOver.bind(this),
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

  gameOver(){
    if (this.state.damage < 0.95) return;
    this.setState({ inGame: false });
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
    let { screen } = this.state;
    let ship = this.ship[0];
    let posX = ship.position.x;
    let D = ship.radius * 2;
    let i = 0;

    for (i; i < howMany; i++) {
      let point = new Point({
        radius: H.randomNumBetween(3, 5),
        position: {
          x: H.randomNumBetweenExcluding(0, screen.width, posX - D, posX + D),
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
    let { screen } = this.state;
    let ship = this.ship[0];
    let posX = ship.position.x;
    let D = ship.radius * 2;
    let radius = H.randomNumBetween(screen.width / 20, screen.width / 15);
    let i = 0;

    for (i; i < howMany; i++) {
      let point = new BlackHole({
        radius,
        position: {
          x: H.randomNumBetweenExcluding(0, screen.width, posX - D, posX + D),
          y: -radius,
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

  intersection(items1, items2){
    let a = items1.length - 1;
    let b;
    for(a; a > -1; --a){
      b = items2.length - 1;
      for(b; b > -1; --b){
        let item1 = items1[a];
        let item2 = items2[b];

        // item must have radius
        let r1 = item1.radius;
        let r2 = item2.radius;
        let X1minusX2 = item1.position.x - item2.position.x;
        let Y1minusY2 = item1.position.y - item2.position.y;

        let intersected = Math.hypot(X1minusX2, Y1minusY2) <= (r1 + r2);

        if(intersected){
          item1.intersected(this.state.warp, item2);
          item2.intersected(this.state.warp, item1);
        }
      }
    }
  }

  render(){
    let { width, height, ratio } = this.state.screen;
    return (
      <div>
        {
          !!this.state.inGame ? null :
            <div className="endgame">
              <p>Game over!</p>
              <p>Your score is: {this.state.score}</p>
              <button onClick={ this.startGame.bind(this) }>Try again?</button>
            </div>
        }
        <div className="console">
          <span className="score" >Score { this.state.score }</span>
          <span className="warp" >Warp { this.state.warp }</span>
          <span className="damage" >Damage { +this.state.damage.toFixed(1) * 100 }%</span>
        </div>
        <canvas ref='canvas' width={width * ratio} height={height * ratio} />
      </div>
    );
  }
}

export default App;
