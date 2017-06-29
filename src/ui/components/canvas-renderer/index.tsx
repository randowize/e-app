import * as React from 'react';
import { CanvasRenderer } from './canvas-renderer';
import * as webfont from 'webfontloader';
import Tasks from '../../../tasks';


export interface IProps {
  [key: string]: any;
}

class Container extends React.Component<IProps, any> {
  canvas: HTMLCanvasElement;
  state = {
    src: '',
    text: '',
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
    let props = ['text', 'activefont'];
    const cond =  this.shouldCanvasUpdate(nextProps, props);
    console.log(cond);
    if (cond.res) {
      this.setState(cond.state, this.draw);
    }

  }
  private shouldCanvasUpdate(props, propsNames: any[]){
    return propsNames.reduce((acc, key) => {
       acc.res = acc.res || (props[key] !== this.state[key]);
       Object.assign(acc.state, {[key]: props[key]});
       return acc;
    }, {res: false, state: {}});
  }

  draw = () => {
    const ctx = this.canvas.getContext('2d');
    const odata =  this.canvas.toDataURL();
    const width = this.props.width;
    const height = this.props.height;
    if (ctx) {
      //ctx.fillRect(0, 0, 100, 100);
      ctx.clearRect(0, 0 , this.canvas.width, this.canvas.height);
      ctx.font = ' normal  50px Helvetica';
      const lineHeight = ctx.measureText('M').width;
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'green';
      const text = this.state.text;
      text.split(/\n/).forEach((chunk , i) => {
        const dy = i ? 40 : 20;
        ctx.fillText(chunk, 0,  lineHeight * (i + 1) + dy );
        ctx.strokeText(chunk, 0,  lineHeight * (i + 1) + dy)
        //ctx.fillText(" let's see!", 0,  ctx.measureText('M').width * 2 + 30);
      });
      const ndata = this.canvas.toDataURL();
      const payload = {
        data: ndata,
        width,
        height,
        odata
      }
      Tasks.processImgBuffer(payload).then((d) => {
        this.props.processData(d);

      }).catch(console.log);
      this.setState({
        src: ndata
      });
    }
  }
  render() {
    return (
     <div>
      <CanvasRenderer
        getRef={this.getRef}
        width={300}
        style={{background: 'rgba(125,15,125,0.75)', display: 'none'}}
      />
        <img
          src={this.state.src}
          alt='canvas generated'
          height ={`${this.props.height}px`}
          width = {`${this.props.width}px`}
          style={{height: '100%', width: '100%'}}
        />
     </div>
    );
  }
}

export default Container;
