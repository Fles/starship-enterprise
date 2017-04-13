import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1,
      }
    }
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

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this, false));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
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
