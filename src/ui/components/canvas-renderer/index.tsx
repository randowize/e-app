import * as React from 'react';
import * as  Rx from 'rxjs';
import { CanvasRenderer } from './canvas-renderer';
import * as webfont from 'webfontloader';
import { remote } from 'electron';
import { resolve } from 'path';

const Tasks = remote.require(resolve(__dirname, '..', '..', '..', 'tasks'));

export interface IProps {
}

class Container extends React.Component<IProps, any> {
  canvas: HTMLCanvasElement;
  state = {
    src: '',
    loaded: false
  };
  getRef = (ref: HTMLCanvasElement) =>  {
    this.canvas = ref;
  }

  componentDidMount() {
    const draw = this.draw;
    webfont.load({
      google: {
        families: ['Droid Sans', 'Droid Serif', 'Bungee Shade']
      },
      loading() {
        draw();
        console.log('loaded');
      }
    });
  }

  draw = () => {
    const ctx = this.canvas.getContext('2d');
    if (ctx) {
      //ctx.fillRect(0, 0, 100, 100);
      const text = '↗🚐✈😎⏰⌛';
      ctx.font = ' normal  75px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText(text, 5,  ctx.measureText('M').width * 1 + 10);
      ctx.fillText(" let's see!", 0,  ctx.measureText('M').width * 2 + 30);
      console.log(ctx.measureText(text));
      const src = this.canvas.toDataURL();
      const bf = src.replace('data:image/png;base64,', '');
      // console.log(bf);
      Tasks.send(bf).then((d) => {
        console.log(d);

      }).catch(console.log);
      this.setState({
        src: src
      });
    }
  }
  render() {
    return (
     <div>
      <CanvasRenderer
        getRef={this.getRef}
        width={300}
        style={{background: 'rgba(125,15,125,0.75)'}}
      />
        <img
          src={this.state.src}
          alt='canvas generated'
          height = '32px'
          width = '160px'
        />
     </div>
    );
  }
}

export default Container;
