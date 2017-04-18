import React, { Component } from 'react';
import Ship from './components/Ship';
import Star from './components/Star';
import Point from './components/Point';
import { randomNumBetween, randomNumBetweenExcluding } from './common/helpers';

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
      pointCount: 3,
      collectedPoints: 0,
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
      motion: null
    }
    this.points = [];
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
    if(e.keyCode === KEY.SPACE) keys.space = value;
    this.setState({ keys });
  }

  handleTouch() {}

  handleMotion(ev) {
    let acc = ev.accelerationIncludingGravity;
    if (!!acc) {
      let keys = this.state.keys;
      let threshold = 1;
      keys.left = Math.sign(+acc.x.toFixed(0)) === 1 && acc.x > threshold;
      keys.right = Math.sign(+acc.x.toFixed(0)) === -1 && acc.x < threshold;
      keys.up = Math.sign(+acc.y.toFixed(0)) === -1 && acc.y < threshold;
      keys.down = Math.sign(+acc.y.toFixed(0)) === 1 && acc.y > threshold;;
      this.setState({ keys });
    }
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeys.bind(this, false));
    window.addEventListener('keydown', this.handleKeys.bind(this, true));
    window.addEventListener('resize', this.handleResize.bind(this, false));
    window.addEventListener("touchstart", this.handleTouch.bind(this, false));
    window.addEventListener('devicemotion', this.handleMotion.bind(this ), false);
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
    const context = this.state.context;
    context.save();
    context.scale(this.state.screen.ratio, this.state.screen.ratio);
    
    context.fillStyle = '#000';
    context.globalAlpha = 0.4;
    context.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
    context.globalAlpha = 1;

    if(!this.space.length){
      let count = this.state.starCount;
      this.setState({ starCount: count });
      this.generateSpace(count)
    }

    if(!this.points.length){
      let count = this.state.pointCount;
      this.setState({ pointCount: count });
      this.generatePoints(count);
    }

    this.onCollect(this.ship, this.points);

    this.updateObjects(this.space, 'space');
    this.updateObjects(this.points, 'points');
    this.updateObjects(this.ship, 'ship');

    context.restore();

    requestAnimationFrame(() => {this.update()});
  }

  addScore(points){
    let score = this.state.score + points;
    let collectedPoints = this.state.collectedPoints + 1;
    let warp = collectedPoints % 10 === 0 ?
      this.state.warp + 1 : this.state.warp;
    this.setState({ score, collectedPoints, warp });
  }

  startGame(){
    let ship = new Ship({
      position: {
        x: this.state.screen.width / 2,
        y: this.state.screen.height / 2
      },
      topOffset: 65,
      create: this.createObject.bind(this)
    });
    this.createObject(ship, 'ship');
    this.space = [];
    this.generateSpace(this.state.starCount);
    this.points = [];
    this.generatePoints(this.state.pointCount)
  }

  generateSpace(howMany){
    for (let i = 0; i < howMany; i++) {
      let star = new Star({
        size: randomNumBetween(0.2, 1.8),
        position: {
          x: randomNumBetween(0, this.state.screen.width),
          y: randomNumBetween(0, this.state.screen.height)
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
        size: randomNumBetween(10, 20),
        position: {
          x: randomNumBetweenExcluding(0, this.state.screen.width, ship.position.x-60, ship.position.x+60),
          y: 0,
        },
        create: this.createObject.bind(this),
        remove: function () {self.removeObject(this, 'points')},
        addScore: this.addScore.bind(this)
      });
      this.createObject(point, 'points');
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

        if(dx < 25 && dy < 25){
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
        <span className="score current-score" >Score: {this.state.score}</span>
        <span className="warp current-warp" >Warp: {this.state.warp}</span>
        <canvas ref='canvas' width={width * ratio} height={height * ratio} />
      </div>
    );
  }
}

export default App;
