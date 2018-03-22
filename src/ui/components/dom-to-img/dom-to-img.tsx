import * as React from 'react';
import styled from 'styled-components';
import * as domimg from 'dom-to-image';

const { Fragment } = React;

const Div = styled.div`
  border: solid 2px red;
  display: block !important;
  width: 160px;
  height: 160px;
  background: black;
  & span {
    border: solid 5px white;
    display: inline-block;
    border-radius: 10px;
    margin: 5px;
    padding: 5px;
    font-size: 16px;
    color: white;
    i {
      transform: rotate(20deg);
      display: inline-block;
      text-decoration: underline;
    }
  }
  & ~ canvas {
    border: solid 1px;
    background: rgba(30, 45, 67, 0.5);
  }
  & ~ img,
  & ~ canvas {
    width: 300px;
    height: 300px;
  }
`;

export interface DomToCanvasProps {}

export default class DomToCanvas extends React.Component<
  DomToCanvasProps,
  any
> {
  state = {
    src: ''
  };
  divRoot;
  componentDidMount() {
    domimg
      .toPng(this.divRoot)
      .then(dataUrl => {
        this.setState({ src: dataUrl });
      })
      .catch(function(error) {
        console.error('oops, something went wrong!', error);
      });
  }
  render() {
    return (
      <Fragment>
        <Div
          innerRef={node => {
            this.divRoot = node;
          }}
        >
          <span>
            <i>Hel</i>lo
          </span>{' '}
          <span>👪</span>
        </Div>
        <img src={this.state.src} alt="view dom" />
        <canvas height={16 * 4} width={32 * 4} />
      </Fragment>
    );
  }
}
