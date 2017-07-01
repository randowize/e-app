import * as React from 'react';

import { LedMatrix, IMatrix, ILedMatrixOptions } from  '../../utils/led-matrix';

export interface IState {
  data?: IMatrix;
  options?: ILedMatrixOptions;
}

export interface IProps extends ILedMatrixOptions {
  data: IMatrix;
  [key: string]: any;
}

class Simulator extends React.Component<IProps, IState> {
  canvas: HTMLCanvasElement;
  led: LedMatrix;

  constructor(props: IProps) {
    super(props);
    const { data, children, ...options } = props;
    this.state = {
      data,
      options
    };
  }

  componentDidMount() {
    this.led = new LedMatrix(this.canvas, this.state.options);
    if (this.state.data) {
        this.led.setData(this.state.data);
    }
    this.draw();
  }

  componentWillReceiveProps(nextProps: IProps) {
    const { data, children, ...options } = nextProps;
    if (options !== this.state.options) {
      //this.led.setNewOptions(options);
      //this.setState({options});
    }
 
    /*if (data !== this.state.data) {
      // console.log(data);
      //console.log (this.state.data);

      this.led.setData(data);
      this.setState({data}, this.draw);
    }*/
    if (nextProps.changes.length > 0) {
      console.log(nextProps.changes.length);
      console.log(nextProps.changes.filter(o => !o.on));
      this.led.update(nextProps.changes);
    }
  }

  draw = () => {
    this.led.render();
    //this.led.update(this.props.changes);
  }

  render() {
    return (
      <canvas ref={canvas => this.canvas = canvas as HTMLCanvasElement} />
    );
  }
}

export default Simulator;