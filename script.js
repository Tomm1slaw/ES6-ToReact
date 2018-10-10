class Stopwatch extends React.Component{
  constructor(display) {
    super(display);
    this.state = {
      resultList: [],
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
    };
  }

  reset() {
    this.setState({
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    });
  }

  format() {
    return `${pad0(this.state.times.minutes)}:${pad0(this.state.times.seconds)}:${pad0(Math.floor(this.state.times.miliseconds))}`;
  }

  start() {
    if (!this.state.running) {
      this.setState({running: true});
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.state.running) return;
    this.calculate();
  }

  calculate() {
    const times = this.state.times;
    times.miliseconds += 1;
    if (times.miliseconds >= 100) {
      times.seconds += 1;
      times.miliseconds = 0;
    }
    if (times.seconds >= 60) {
      times.minutes += 1;
      times.seconds = 0;
    }
    this.setState({times});
  }

  stop() {
    this.state.running = false;
    clearInterval(this.watch);
  }

  save() {

        let newTime = this.format(this.state.times),
        resultList = [...this.state.resultList, {'time': newTime, 'id': new Date().getTime()}];
        this.setState({resultList});
    }

  clearSave() {
        this.setState({
            resultList: []
        });
    }

  render() {
    return (
      <div>
        <div className = 'controls'>
          <a href = '#' className = 'button' onClick ={this.start.bind(this)}>Start</a>
          <a href = '#' className = 'button' onClick ={this.stop.bind(this)}>Stop</a>
          <a href = '#' className = 'button' onClick ={this.reset.bind(this)}>Reset</a>
          <a href = '#' className = 'button' onClick ={this.save.bind(this)}>Lap</a>
          <a href = '#' className = 'button' onClick ={this.clearSave.bind(this)}>ClearLaps</a>
        </div> 
        <div className = 'stopwatch'>{this.format(this.state.times)}</div>
        <ol className = 'results'>
          {this.state.resultList.map(itemList => <li key={itemList.id}>{itemList.time}</li>)}
        </ol>
      </div>
    );
  }
}

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

const app = document.getElementById('app');
ReactDOM.render(<Stopwatch/>, app);