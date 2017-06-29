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
import CanvasRenderer from '../canvas-renderer';
import {getMatrixTest} from '../../../tasks/matrix';

import { LedDrawerManager } from '../../../utils/led-matrix/led/store';

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
        </div>
        <div className='content'>
          <div className='3d-wrapper'>
            <div className='led-panel-viewer'>
              <LedPanel
                x={this.props.cols}
                y={this.props.rows}
                data={this.props.data}
              />
            </div>
            <CanvasRenderer
              text={this.props.text}
              processData={this.props.processData}
              width={this.props.cols}
              height={this.props.rows}
              font={this.props.font}
            />
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
          <div>
            <div> 
                <button
                    onClick={this.props.choosePic}
                >
                    select image
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
                  'test': getMatrixTest
                }}
              />
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
   {activeFont: 'font'},
  {processDataFromCanvas: 'processData'}
];

const injectors = [
  selectProps('menuStore')('menuType'),
  selectProps('ledStore')(...props)
];
export default ucompose(injectors)(Playground);
