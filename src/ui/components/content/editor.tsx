import * as React from 'react';
import * as ucompose from 'ucompose';
import Slider from 'react-rangeslider';

import { selectProps } from '../../../utils/props-selector';

import LedPanel from './led-panel';
import FontSelector from './select-font';
import TextEditor from './textEditor';
import Incdecr from './indecr';
import Layout from './layout';
import ColorPicker from './color-picker';
import { HText } from './hoc';
import SendBox  from '../send-box';
import CanvasRenderer from '../canvas-renderer';
import * as client from '../../../services/client-tcp';
import { LedDrawerManager } from '../../../utils/led-matrix/led/store';
// import { close } from '../../../tcp-client';

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
    super();
    this.pixelSizeModifier = props.propModifier('pixelSize');
    this.marginModifier = props.propModifier('margin');
  }

  componentDidMount() {
    client.connect()
    .then(console.log)
    .catch(console.error);
  }
  render() {
    return (
      <Layout className={this.props.menuType}>
        <div className='options'>
          <FontSelector />
          <hr />
          <Slider
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
          />
          <hr />
          <ColorPicker />
          <SendBox val='0' label='v1'/>
          <SendBox val='1' label='v2'/>
          <SendBox val='2' label='v3'/>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <button onClick={() => client.reconnect()}>reconnect</button>
          <button onClick={() => client.close()}>disconnect</button>
          </div>
        </div>
        <div className='content'>
          <div className='3d-wrapper'>
            {/*<div className='led-panel-viewer'>
              <LedPanel
                x={this.props.cols}
                y={this.props.rows}
                data={this.props.data}
                changes={this.props.changes}
              />
            </div>*/}
            
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
          </div>
                    <div>
            <div> 
                <button onClick={() => {this.props.sendIpcMessage('toggle-preview'); }}>
                  Toggle Preview 
                 </button>
            </div>
            <TextEditor />
            <div>
              <HText
                {...{
                  'colCount': this.props.colScale,
                  'rowCount': this.props.rowScale,
                   'xm': this.props.xm,
                   'ym': this.props.ym,
                   'showMatrices': this.props.getMatrices,
                  'debug': this.props.getPanelsAtRow,
                  'test': this.props.getMatrices
                }}
              />
            </div>
          </div>
          <div>
            <div>
              <Incdecr label='Margin' ok action={this.marginModifier} />
            </div>
            <div className='panel-detail'>
                  {this.props.onePanel.map((d, i) => (
                    <LedPanel
                        key={i}
                        x={8}
                        y={16}
                        data={d}
                  />))}
                  {/*<LedPanel
                        x={8}
                        y={16}
                        data={this.props.dataP}
                  />*/}
            </div>
            <div>
              <Incdecr label='Pixel Size' action={this.pixelSizeModifier} />
            </div>
          </div>

        </div>
      </Layout >
    );
  }
}
const props = [
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
   {activeFont: 'font'},
  {processDataFromCanvas: 'processData'}
];

const injectors = [
  selectProps('sendIpcMessage')(),
  selectProps('menuStore')('menuType'),
  selectProps('ledStore')(...props)
];
export default ucompose(injectors)(Playground);
