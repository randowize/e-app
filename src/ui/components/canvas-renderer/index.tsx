import * as React from 'react';
import * as  Rx from 'rxjs';
import { CanvasRenderer } from './canvas-renderer';
import * as webfont from 'webfontloader';
import { remote } from 'electron';
import { resolve } from 'path';

const Tasks = remote.require(resolve(__dirname, '..', '..', '..', 'tasks'));

export interface IProps {
  [key: string]: any;
}

class Container extends React.Component<IProps, any> {
  canvas: HTMLCanvasElement;
  state = {
    src: '',
    text: '😠↪🚐✈😎⏰⌛',
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

  componentWillReceiveProps(nextProps) {
    this.setState({
      text: nextProps.text
    }, this.draw);
  }

  draw = () => {
    const ctx = this.canvas.getContext('2d');
    if (ctx) {
      //ctx.fillRect(0, 0, 100, 100);
      ctx.clearRect(0, 0 , this.canvas.width, this.canvas.height);
      ctx.font = ' normal  30px Arial';
      const lineHeight = ctx.measureText('M').width;
      ctx.fillStyle = 'white';
      const text = this.state.text;
      text.split(/\n/).forEach((chunk , i) => {
        ctx.fillText(chunk, 0,  lineHeight * (i + 1) + 20 );
        //ctx.fillText(" let's see!", 0,  ctx.measureText('M').width * 2 + 30);
      });
      const src = this.canvas.toDataURL();
      const base64Img = src.replace('data:image/png;base64,', '');
      Tasks.send(base64Img).then((d) => {
        this.props.processData(d);

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
