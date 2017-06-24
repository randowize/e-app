import * as React from 'react';
import Simulator from './simulator';
import { createStore, hexToRGB } from '../utils/led-matrix';
import { shapes, colors } from './shape';

function shapeToMatrix(shapeName: string) {
  const c = hexToRGB(colors[Math.floor(Math.random() * (colors.length - 1))]);
  const shape = shapes[shapeName];
  const len = shape.length;
  const width = Math.sqrt(len);
  const store = createStore(width, width);

  for (let i = 0; i < len; i += 1) {
    const y = Math.floor(i / width);
    const x = i - (y * width);
      if (shapes[shapeName][i] === 1) {
        store.fill(x, y, c[0], c[1], c[2], c[3]);
      }
  }

  return store.matrix;
}

export interface State {
  shape?: string;
  data?: any;
}

class Symbols extends React.Component<any, State> {

  constructor() {
    super();
    this.state = {
      shape: 'cross',
      data: shapeToMatrix('cross')
    };
  }

  handleShapeChange(shape: string) {
    this.setState({
      shape,
      data: shapeToMatrix(shape)
    });
  }

  render() {
    return (
      <div className='row'>
        <div className='column'>
          {Object.keys(shapes).map(shapeName =>
            <label>
              <input
                type='radio'
                value={shapeName}
                checked={shapeName === this.state.shape}
                onChange={() => this.handleShapeChange(shapeName)}
                /> {shapeName}
            </label>
          )}
        </div>
        <div className='column column-60'>
          <div className='led'>
            <Simulator
              data={this.state.data}
              x={11}
              y={11}
              pixelHeight={20}
              pixelWidth={20}
              glow={true}
              />
          </div>
        </div>
      </div>
    );
  }
}

export default Symbols;