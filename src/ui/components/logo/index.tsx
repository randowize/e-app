import * as React from 'react';
import * as path from 'path';

const logoUrl = path.resolve(__dirname, '../menu/logo-1.png');
export interface AppProps {
  [key: string]: any;
}

class App extends React.Component<AppProps, any> {
  render() {
    return (
      <div>
        <img src={this.props.src  || logoUrl} />
      </div>
    );
  }
}

export default App;
