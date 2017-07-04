import * as React from 'react';

export const withState = (state: string, handler: string, v: any) => W => {
  return class extends React.Component<any, any> {
    constructor() {
      super();
      //this[handler] = this.addHandler(handler, state);
      this[handler] = this[handler].bind(this);
    }
    state = {
      [state]: v
    };
    [handler](value: any) {
      this.setState({
        [state]: value
      });
    }
    addHandler = (handlerName, state) => value => {
      this[handlerName] = () => {
        this.setState({
          [state]: value
        });
      };
    }
    render() {
      const b = (
        <W {...this.props} {...this.state} {...{ [handler]: this[handler] }} />
      );
      const props = Object.assign({}, b.props, {
        name: b.props.name + ' hijacked!'
      });
      const res = Object.assign({}, b, { props: props });
      return res;
    }
  };
};

const Text = ({ setName, ...rest }) =>
  <div onClick={() => setName(Math.random().toFixed(3))}>
    {/*name
    <pre style={{paddingLeft: '5px', marginLeft: '10px' }}>
      <code style={{ color: 'black', textAlign: 'start'}}>
        {JSON.stringify(rest, null, 2)}
      </code>
    </pre>*/}
    <button onClick={() => {
      // let y = Math.floor(Math.random() * rest.rowCount) + 1;
      rest.debug(1);
      rest.showMatrices();
      //rest.test().then(console.log);
    }}>
      view matrices
    </button>
  </div>;
export const HText = withState('name', 'setName', 'lamine')(Text);
