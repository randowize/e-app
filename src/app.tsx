import * as React from 'react';
import './utils/ranges';
import UI from './ui';
import { Provider } from 'mobx-react';
import Store from './ui/store';

/*import {ipcRenderer} from 'electron';
import { addRxStreamCapabilityToIpcModule } from './shared/streams/rx-ipc';
addRxStreamCapabilityToIpcModule(ipcRenderer);*/


export class App extends React.Component<undefined, undefined> {
  render() {
    return (
      <Provider store={new Store()}>
        <UI />
      </Provider>
    );
  }
}
