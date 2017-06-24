import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
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
if (module.hot) {
  module.hot.accept(render);
}
