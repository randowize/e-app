import * as React from 'react';
import * as ucompose from 'ucompose';
import styled from 'styled-components';

import { selectProps } from '../../../utils/props-selector';
import Layout from './layout';

import * as client from '../../../services/client-tcp';
import { LedDrawerManager } from '../../../utils/led-matrix/led/store';
import Form from '../form';
import { baseObservable } from '../../../shared/streams/base-observable';
import DomToCanvas from '../dom-to-img/dom-to-img';
import PanelContentEditor from '../panel-content-editor/rdwysiwyg';

const Content = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

export type colsOrRows = 'cols' | 'rows';

export interface IState {
  text?: string;
  src?: string;
  [index: string]: any;
}

class Playground extends React.Component<any, IState> {
  state: IState = { src: '' };
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

  processImage = src => {
    this.setState({ src });
  };

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
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={() => client.reconnect()}>reconnect</button>
            <button onClick={() => client.close()}>disconnect</button>
          </div>
        </div>
        <Content>
          <PanelContentEditor processImage={this.processImage} />
          <DomToCanvas src={this.state.src} />
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
        </Content>
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
