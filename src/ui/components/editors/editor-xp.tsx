import * as React from 'react';
import * as ucompose from 'ucompose';
import styled, { css } from 'styled-components';

import { EditorState, convertToRaw } from 'draft-js';

import { convertDomNodeToImage } from '../dom-to-img/dom-to-img';

import { selectProps } from '../../../utils/props-selector';
import Layout from '../content/layout';

import * as client from '../../../services/client-tcp';
import { LedDrawerManager } from '../../../utils/led-matrix/led/store';
import Form from '../form';
import {
  baseObservable,
  dispatch
} from '../../../shared/streams/base-observable';
import DomToCanvas from '../dom-to-img/dom-to-img';
import PanelContentEditor from '../panel-content-editor/rdwysiwyg';

import Tasks from '../../../services/tasks';
import { registerEditorCommandShortcuts } from './commands';
import { addChar } from './commands/addSpecialChar';
import {
  editorStateChangeStream,
  refreshPreview
} from '../../../shared/streams/process-text';

const loop_mixin = (times, fn) => {
  const result: any = [];
  for (let i = 0; i < times; i++) {
    result.push(...fn(i));
  }
  return result;
};

const Content = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  align-items: center;
  padding: 10px;
  grid-gap: 20px;
`;

const Extras: any = styled.div`
  display: grid;
  grid-template-areas:
    'form form form'
    'button1 button2 button3';
  grid-template-columns: repeat(auto-fit, minmax(max-content, 1fr));
  grid-gap: 10px;
  ${(props: any) =>
    loop_mixin(props.buttonCount, i => {
      return css`
        & > button:nth-of-type(${i + 1}) {
          grid-area: button${i + 1};
        }`;
    })};
`;
export type colsOrRows = 'cols' | 'rows';

export interface IState {
  text?: string;
  src?: string;
  editorState: EditorState;
  url?: string;
  [index: string]: any;
}

const PreviewWapper = styled.div`
  &.preview {
    background: #162333;
    height: 250px;
    display: grid;
    border: solid 1px;
    box-shadow: 0 0 10px 0 green;
    position: relative;
    & > img {
      width: 100%;
      height: 100%;
    }
  }
`;

const Preview = ({ src }) => {
  return (
    <PreviewWapper className="preview">
      <img src={src} />
    </PreviewWapper>
  );
};
class DraftEditorController extends React.Component<any, IState> {
  state: IState = { src: '', editorState: EditorState.createEmpty() };
  store: LedDrawerManager;
  hzm: number = 1;
  vtm: number = 1;
  pixelSizeModifier: any;
  marginModifier: any;
  editorContent: HTMLDivElement;
  constructor(props) {
    super(props);
    this.pixelSizeModifier = props.propModifier('pixelSize');
    this.marginModifier = props.propModifier('margin');
  }

  editorRef;
  imgRef;

  notify = () => {
    const __html = this.editorRef.editorContainer.innerHTML.replace(
      'contenteditable="true"',
      ''
    );
    this.setState({ __html });
  };
  getEditorRef = ref => {
    this.editorRef = ref;
  };
  getImgRef = ref => {
    this.imgRef = ref;
  };
  getPayload = () => {
    return {
      data: this.state.src,
      width: this.imgRef.clientWidth,
      height: this.imgRef.clientHeight,
      odata: this.state.src,
      color: {
        r: 0,
        g: 0,
        b: 0,
        a: 1
      }
    };
  };

  onEditorStateChange = (editorState: EditorState) => {
    this.notify();
    console.log(convertToRaw(editorState.getCurrentContent()));
    this.setState({ editorState });
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
    this.sendImageStream();
    const { editorContainer } = this.editorRef;
    this.editorContent = editorContainer.firstElementChild.firstElementChild;

    const registerCommand = registerEditorCommandShortcuts(editorContainer)(
      () => this.state.editorState,
      this.onEditorStateChange
    );
    registerCommand('t', addChar());

  }
  sendImageStream = () => {
    return editorStateChangeStream
      .debounceTime(1000)
      .map(o => this.state.src || '')
      .filter(o => !!o)
      .map(this.getPayload)
      .distinctUntilChanged()
      .do(p => this.props.sendIpcMessage('process-img', p))
      .switchMap(payload => Tasks.processImgBuffer(payload))
      .do(d => this.setState({ url: d.url }))
      .subscribe((d: any) => refreshPreview(d.url, d.mtcp));
  };
  rasterizeEditorState = async () => {
    const { editorContent }  = this;
    if (editorContent) {
      const {left: x, top: y, width, height} = editorContent.getBoundingClientRect();
      console.log(x, y, width, height);
      const src = await convertDomNodeToImage(editorContent);
      const __html = editorContent.innerHTML;
      this.setState({ src, __html }, () => dispatch('editor-state-change')());
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
            getInnerDraftEditorRef={this.getEditorRef}
            editorState={this.state.editorState}
            onEditorStateChange={this.onEditorStateChange}
          />
          <Extras buttonCount={3}>
            <Form update={this.props.addPark} />
            <button
              onClick={() => {
                this.props.sendIpcMessage('toggle-preview');
              }}
            >
              Ön İzle
            </button>
            <button onClick={this.rasterizeEditorState}>Rasterize</button> 
            <button
              onClick={() => {
                client.sendMatrix(this.state.mt);
              }}
            >
              Sunucuya Gönder
            </button>
          </Extras>
          <Preview src={this.state.url} />
          <DomToCanvas src={this.state.src} innerRef={this.getImgRef} />
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
  'sendIpcMessage',
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
export default ucompose(injectors)(DraftEditorController);

/**
 * Hoşgeldiniz

😍😗🤗🤔😣

₺ € $
 */
