import * as React from 'react';
import * as ucompose from 'ucompose';
import styled, { css } from 'styled-components';

import { EditorState } from 'draft-js';

import { convertDomNodeToImage } from '../dom-to-img/dom-to-img';

import { selectProps } from '../../../utils/props-selector';
import Layout from './layout';

import * as client from '../../../services/client-tcp';
import { LedDrawerManager } from '../../../utils/led-matrix/led/store';
import Form from '../form';
import { baseObservable } from '../../../shared/streams/base-observable';
import DomToCanvas from '../dom-to-img/dom-to-img';
import PanelContentEditor from '../panel-content-editor/rdwysiwyg';

const loop_mixin = (times, fn) => {
  const  result: any = [];
  for (let i = 0; i < times; i++ ) {
    result.push(...fn(i));
  }
  return result;
};

const Content = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: 1fr 1fr;
  padding: 10px;
  grid-gap: 20px;
`;

const Footer: any = styled.div`
  grid-column: 1/-1;
  display: grid;
  grid-template-areas:
    'form form from'
    'button1 button2 button3';
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 4fr 1fr;
  grid-gap: 10px;
  align-items: flex-end;
  ${(props: any) => loop_mixin(props.buttonCount, i => {
    return css`
     &>button:nth-of-type(${i + 1}){
       grid-area:button${i + 1}
     }
   `;
  })
  };
`;
export type colsOrRows = 'cols' | 'rows';

export interface IState {
  text?: string;
  src?: string;
  editorState?: EditorState;
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

  editorRef;

  getEditorReference = ref => {
    this.editorRef = ref;
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
  rasterizeEditorState = async () => {
    const { editorRef } = this;
    if (editorRef) {
      const src = await convertDomNodeToImage(editorRef.editorContainer);
      this.setState({ src });
    }
  };
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
          <PanelContentEditor
            getInnerDraftEditorRef={this.getEditorReference}
          />
          <DomToCanvas src={this.state.src} />
          <Footer buttonCount={3}>
            <Form update={this.props.addPark} />
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
            <button onClick={this.rasterizeEditorState}>Rasterize</button>
          </Footer>
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
