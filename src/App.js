import React, { Component } from 'react';
import Ship from './components/Ship';
import Star from './components/Star';
import { randomNumBetween } from './common/helpers';

const KEY = {
  LEFT:  37,
  RIGHT: 39,
  UP: 38,
  A: 65,
  D: 68,
  W: 87,
  SPACE: 32
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      context: null,
      starCount: 300,
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
    if(e.keyCode === KEY.LEFT   || e.keyCode === KEY.A) keys.left  = value;
    if(e.keyCode === KEY.RIGHT  || e.keyCode === KEY.D) keys.right = value;
    if(e.keyCode === KEY.UP     || e.keyCode === KEY.W) keys.up    = value;
    if(e.keyCode === KEY.SPACE) keys.space = value;
    this.setState({
      keys : keys
    });
  }

  componentDidMount() {
    window.addEventListener('keyup',   this.handleKeys.bind(this, false));
    window.addEventListener('keydown', this.handleKeys.bind(this, true));
    window.addEventListener('resize', this.handleResize.bind(this, false));
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
      let count = this.state.starCount + 1;
      this.setState({ starCount: count });
      this.generateSpace(count)
    }

    this.updateObjects(this.space, 'space')
    this.updateObjects(this.ship, 'ship');

    context.restore();

    requestAnimationFrame(() => {this.update()});
  }

  startGame(){
    let ship = new Ship({
      position: {
        x: this.state.screen.width / 2,
        y: this.state.screen.height / 2
      },
      create: this.createObject.bind(this)
    });
    this.createObject(ship, 'ship');
    this.space = [];
    this.generateSpace(this.state.starCount)
  }

  generateSpace(howMany){
    for (let i = 0; i < howMany; i++) {
      let star = new Star({
        size: randomNumBetween(0.2, 2),
        position: {
          x: randomNumBetween(0, this.state.screen.width),
          y: randomNumBetween(0, this.state.screen.height)
        },
        create: this.createObject.bind(this)
      });
      this.createObject(star, 'space');
    }
  }

  createObject(item, group){
    this[group].push(item);
  }

  updateObjects(items, group){
    let index = 0;
    for (let item of items) {
      if (item.delete) {
        this[group].splice(index, 1);
      }else{
        items[index].render(this.state);
      }
      index++;
    }
  }

  render() {
    let { width, height, ratio } = this.state.screen;
    return (
      <div>
        <canvas ref='canvas' width={width * ratio} height={height * ratio} />
      </div>
    );
  }
}

export default App;
