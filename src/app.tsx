import * as React from 'react';
import UI from './ui';
import { Provider } from 'mobx-react';
import Store from './ui/store';
import {ipcRenderer} from 'electron';


export class App extends React.Component<undefined, undefined> {

  componentDidMount() {
   // ipcRenderer.on('ok', console.log);
    const limit = f => i => (cb: () => void = () => null) => {
      if (i <= 0) {
        cb();
        return;
      }
      i -= 1;
      f();
    };
    const ti = setInterval(
      limit(() => {
        const data = Math.floor(Math.random() * 45);
       // console.log(`sendig ${data}...`);
        ipcRenderer.send('data', data);
      })(1),
      1500,
      () => {
        console.log(`clearing timer ${ti}`);
        clearInterval(ti);
      }
    );
  }
  render() {
    return (
      <Provider store={new Store()}>
        <UI />
      </Provider>
    );
  }
}
