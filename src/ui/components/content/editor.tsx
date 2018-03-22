import * as React from 'react';
import * as ucompose from 'ucompose';
import { selectProps } from '../../../utils/props-selector';

//import LedPanel from './led-panel';
import FontSelector from './select-font';
import TextEditor from './textEditor';
// import Logo from '../logo';
//import Incdecr from "./indecr";
import Layout from './layout';
import ColorPicker from './color-picker';
//import { HText } from './hoc';
import CanvasRenderer from '../canvas-renderer';
import * as client from '../../../services/client-tcp';
import { LedDrawerManager } from '../../../utils/led-matrix/led/store';
// import { close } from '../../../tcp-client';
import Form from '../form';
import { baseObservable } from '../../../shared/streams/base-observable';
import Parks from '../park';
import DomToCanvas from '../dom-to-img/dom-to-img';

export type colsOrRows = 'cols' | 'rows';

// tslint:disable:typedef-whitespace
export interface IState {
  text?: string;
  [index: string]: any;
}

class Playground extends React.Component<any, IState> {
  state: IState;
  store: LedDrawerManager;
  hzm: number = 1;
  vtm: number = 1;
  pixelSizeModifier: any;
  marginModifier: any;
  constructor(props) {
    super(props);
    this.pixelSizeModifier = props.propModifier('pixelSize');
    this.marginModifier = props.propModifier('margin');
  }

  componentDidMount() {
    client
      .connect()
      .then(console.log)
      .catch(console.error);
    baseObservable
      .filter(e => e.type === 'refresh')
      .map(d => d.data[1])
      .subscribe(mt =>
        this.setState({
          mt
        })
      );
  }
  render() {
    return (
      <Layout className={this.props.menuType}>
        <div className="options">
          <FontSelector />
          <hr />
          {/* <Slider
            min={1}
            step={1}
            max={5}
            tooltip={false}
            onChange={this.props.setColScale}
            value={this.props.colScale}
          />
          <Slider
            min={1}
            step={1}
            max={4}
            tooltip={false}
            onChange={this.props.setRowScale}
            value={this.props.rowScale}
            <hr />
            <ColorPicker />
          />*/}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={() => client.reconnect()}>reconnect</button>
            <button onClick={() => client.close()}>disconnect</button>
          </div>
        </div>
        <div className="content">
          {/*
          <div>
            <TextEditor color={this.props.color} />
            <Parks
              parks={this.props.parks}
              handlePark={this.props.handlePark}
            />
          </div>
            <div className='3d-wrapper'>
            <div className='led-panel-viewer'>
              <LedPanel
                x={this.props.cols}
                y={this.props.rows}
                data={this.props.data}
                changes={this.props.changes}
              />
              <Logo src='' />
              </div>
              <CanvasRenderer
              text={this.props.text}
              processData={this.props.processData}
              width={this.props.cols}
              height={this.props.rows}
              font={this.props.font}
              color={this.props.colorRGBA}
              matrix={this.props.data}
              sendIpcMessage={this.props.sendIpcMessage}
              />
            </div>*/}
          <DomToCanvas />
          <div>
            <Form update={this.props.addPark} />
            <span />
            <button
              onClick={() => {
                this.props.sendIpcMessage('toggle-preview');
              }}
            >
              Ön İzle
            </button>
            <button
              onClick={() => {
                client.sendMatrix(this.state.mt);
              }}
            >
              Sunucuya Gönder
            </button>
          </div>
        </div>
      </Layout>
    );
  }
}
const props = [
  'addPark',
  'onePanel',
  'xm',
  'ym',
  'color',
  'colorRGBA',
  'rowScale',
  'colScale',
  'setRowScale',
  'setColScale',
  'setColor',
  'toggleGlow',
  'cols',
  'rows',
  'dataP',
  'data',
  'toggleAnimation',
  'propModifier',
  'getPanelsAtRow',
  'choosePic',
  'getMatrices',
  'text',
  'changes',
  'parks',
  'handlePark',
  { activeFont: 'font' },
  { processDataFromCanvas: 'processData' }
];

const injectors = [
  selectProps('sendIpcMessage')(),
  selectProps('menuStore')('menuType'),
  selectProps('ledStore')(...props)
];
export default ucompose(injectors)(Playground);

const a = 'lamine';

const obj = {
  $data: {},
  get [a]() {
    return this.$data[a];
  },
  set [a](v: string) {
    this.$data[a] = v.length < 5 ? v : v.slice(0, 5) + '...';
  }
};
obj.lamine = 'this is cool';
console.log(obj);
