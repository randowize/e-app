import * as React from 'react';
//import { CanvasRenderer } from './canvas-renderer';
import * as webfont from 'webfontloader';
import Tasks from '../../../services/tasks';
import {
  textStream,
  nextTextEvent,
  refreshPreview
} from '../../../shared/streams/process-text';
//import {ipcRenderer} from 'electron';

export interface IProps {
  [key: string]: any;
}

class Container extends React.Component<IProps, any> {
  canvas: HTMLCanvasElement;
  cnvrenderer: HTMLCanvasElement | null;
  state = {
    src: '',
    src2: '',
    srcdsk: 'resources/nimg.bmp',
    text: '',
    loaded: false,
    font: ''
  };
  constructor(props) {
    super(props);
    // refreshStream.take(1).subscribe(this.draw);
  }

  componentDidMount() {
    textStream
      .startWith(nextTextEvent(this.props.text))
      .map(o => o.text)
      .map(this.extractPayload)
      .debounceTime(1000)
      .do(p => this.props.sendIpcMessage('process-img', p))
      .switchMap(payload => Tasks.processImgBuffer(payload))
      .subscribe((d: any) => refreshPreview(d.url, d.mtcp));
    webfont.load({
      google: {
        families: ['Droid Sans', 'Droid Serif', 'Bungee Shade']
      },
      loading() {
        console.log('loaded');
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    let props = ['text', 'font'];
    const cond = this.shouldCanvasUpdate(nextProps, props);
    if (cond.update) {
      this.setState(cond.state, () => {
        this.extractPayload(nextProps.text);
      });
    }
  }
  private shouldCanvasUpdate(props, propsNames: any[]) {
    return propsNames.reduce(
      (acc, key) => {
        acc.update = acc.update || props[key] !== this.state[key];
        Object.assign(acc.state, { [key]: props[key] });
        return acc;
      },
      { update: false, state: {} }
    );
  }

  private extractPayload = (textv: string) => {
    const ctx = this.canvas.getContext('2d');
    const odata = this.canvas.toDataURL();
    const width = this.props.width;
    const height = this.props.height;
    if (ctx) {
      //ctx.fillRect(0, 0, 100, 100);
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      let font = `normal 100px ${this.state.font}`;
      ctx.font = font;
      //const lineHeight = ctx.measureText('M').width;
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'green';
      // const text = this.state.text;
      const text = textv;
      /*text.split(/\n/).forEach((chunk, i) => {
        const dy = i ? 40 : 20;
        ctx.fillText(chunk, 0, lineHeight * (i + 1) + dy);
        ctx.strokeText(chunk, 0, lineHeight * (i + 1) + dy);
      });*/
      this.wrapText({
        ctx,
        text,
        maxWidth: 0.8 * this.canvas.width,
        y: 15,
        x: 20,
        lineHeight: 20
      })
      const ndata = this.canvas.toDataURL();
      this.setState({
        src: ndata
      });
      const payload = {
        data: ndata,
        width,
        height,
        odata,
        color: this.props.color,
        omatrix: this.props.matrix
      };
      return payload;
    }
  }
  draw = d => {
    console.log(d);
  }
  render() {
    return (
      <div style={{ gridTemplateColumns: '1fr', gridGap: '20px' }}>
        <canvas
          ref={(node: HTMLCanvasElement) => { this.canvas = node; }}
          width={300}
          style={{ background: 'rgba(6,6,6,1)', display: 'inherit' }}
        />
        <img
          src={this.state.src}
          alt='canvas generated'
          height={`${this.props.height}px`}
          width={`${this.props.width}px`}
          style={{ height: '100%', width: '100%', display: 'none' }}
        />
        <canvas
          ref={node => (this.cnvrenderer = node)}
          height={`${this.props.height}px`}
          width={`${this.props.width}px`}
          style={{
            height: '100%',
            width: '100%',
            display: 'none',
            background: 'rgba(255,255,255,0)'
          }}
        />
      </div>
    );
  }
  wrapText({ ctx, text, maxWidth, x, y, lineHeight }) {
    let words = text.split(' ');
    let line = '';
    let testLine;
    let metrics;
    let testWidth;

    for (let n = 0; n < words.length; n++) {
      testLine = line + words[n] + ' ';
      metrics = ctx.measureText(testLine);
      testWidth = metrics.width;
      console.log(testWidth);
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
  }

}

export default Container;
