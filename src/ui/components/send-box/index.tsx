import * as React from 'react';
import * as client from '../../../services/client-tcp';
import { ipcRenderer } from 'electron';
import { ipcMessageSenderFactory } from '../../../shared/streams/rx-ipc';

let sendIpcMessage = ipcMessageSenderFactory(ipcRenderer);

export interface AppProps {
  [key: string]: any;
}

class App extends React.Component<AppProps, any> {

   input: HTMLInputElement | null;

  send = () => {
   sendIpcMessage('refresh', 1, 2, 3);
   if (this.input) {
         client.sendValue(this.props.val + '#' + this.input.value);
   }
  }
  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gridGap: '10px',
          marginTop: '20px'
        }}
      >
        <input type='text' ref={input => this.input = input}/>
        <span className='fa fa-stack fa-lg' onClick={this.send}>
          <i className='fa fa-server fa-stack-2x' style={{color: 'green'}}></i>
          <i className='fa fa-send fa-stack-1x' ></i>
        </span>
      </div>
    );
  }
}

export default App;
