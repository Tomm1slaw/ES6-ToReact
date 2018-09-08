// class Stopwatch extends React.Component {
//     constructor(display) {
//         super(display);
//         this.running = false;
//         this.display = display;
//         this.reset();
//         this.print(this.times);
//     }
//     reset() {
//         this.times = {
//             minutes: 0,
//             seconds: 0,
//             miliseconds: 0
//         };
//         this.print(); // dodanie guzika reset
//     }
//     print() {
//         this.display.innerText = this.format(this.times);
// 	}
// 	format(times) {
// 	        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
// 	}
// 	start() {
// 	    if (!this.running) {
// 	        this.running = true;
// 	        this.watch = setInterval(() => this.step(), 10);
// 	    }
// 	}
// 	step() {
// 	    if (!this.running) return;
// 	    this.calculate();
// 	    this.print();
// 	}
// 	calculate() {
//     this.times.miliseconds += 1;
//     if (this.times.miliseconds >= 100) {
//         this.times.seconds += 1;
//         this.times.miliseconds = 0;
//     }
//     if (this.times.seconds >= 60) {
//         this.times.minutes += 1;
//         this.times.seconds = 0;
//     }
// 	}
//     stop() {
//     this.running = false;
//     clearInterval(this.watch);
// 	}

// }

// // dodaje 0 do liczb jednocyfrowych 

// function pad0(value) {
//     let result = value.toString();
//     if (result.length < 2) {
//         result = '0' + result;
//     }
//     return result;
// }

// const stopwatch = new Stopwatch(
// document.querySelector('.stopwatch'));

// let startButton = document.getElementById('start');
// startButton.addEventListener('click', () => stopwatch.start());

// let stopButton = document.getElementById('stop');
// stopButton.addEventListener('click', () => stopwatch.stop());

// let resetButton = document.getElementById('reset');
// resetButton.addEventListener('click', () => stopwatch.reset());

class Stopwatch extends React.Component{
  constructor(display) {
    super(display);
    this.state = {
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

  render() {
    return (
        <div className = {'controls'}>
          <button className = {'button'} onClick = () => this.start()>Start</button>
          <button className = {'button'} onClick = () => this.stop()>Stop</button>
          <button className = {'button'} onClick = () => this.reset()>Reset</button>
        </div>  
        <div className = {'stopwatch'}>this.format()</div>
        <ul className = {'results'}>
        </ul>
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