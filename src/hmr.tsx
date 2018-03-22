// tslint:disable-next-line:no-unused-variable
//require('marko/node-require');
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

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
