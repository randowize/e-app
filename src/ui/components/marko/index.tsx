import * as React from 'react';

//const marko = require('../marko/hello');
export interface AppProps {
}


export interface AppProps {
}

class App extends React.Component<AppProps, any> {
  node: HTMLDivElement;

  componentDidMount() {
    // marko.renderSync({}).appendTo(this.node);
  }
  render() {
    return (
      <div ref={(node: HTMLDivElement) => this.node = node}>

      </div>
    );
  }
}

export default App;
