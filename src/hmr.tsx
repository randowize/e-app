// tslint:disable-next-line:no-unused-variable
//require('marko/node-require');
import { ipcRenderer } from 'electron';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { rxifyIpcModule } from './common/streams/rx-ipc';

rxifyIpcModule(ipcRenderer);

const mod: any = module;
function render() {
  const { App } = require('./app');
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('App')
  );
}

render();
if (mod.hot) {
  mod.hot.accept(render);
}
