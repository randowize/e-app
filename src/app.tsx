import * as React from 'react';
import UI from './ui';
import { Provider } from 'mobx-react';
import Store from './ui/store';
import { refreshStream } from './ui/listeners/text-change';
import {ipcRenderer} from 'electron';

refreshStream.subscribe(d => {
  ipcRenderer.send('refresh', d);
});

export class App extends React.Component<undefined, undefined> {
  render() {
    return (
      <Provider store={new Store()}>
        <UI />
      </Provider>
    );
  }
}
