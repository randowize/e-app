import * as React from 'react';
import styled from 'styled-components';
import * as domimg from 'dom-to-image';

const Div = styled.div`
  border: solid 2px red;
  display: block !important;
  width: 160px;
  height: 160px;
  background: black;

  & img {
    width: 100%;
    height: 100%;
  }
`;

export interface DomToCanvasProps {
  src?: string;
}

export default class DomToCanvas extends React.Component<
  DomToCanvasProps,
  any
> {
  ref;
  componentDidMount() {
    console.log(this.ref.transferControlToOffscreen);
  }
  render() {
    return (
      <Div>
        <img src={this.props.src} alt="view dom" />
        <canvas
          ref={(node: HTMLCanvasElement) => {
            this.ref = node;
          }}
        />
      </Div>
    );
  }
}

const fns = {
  png: domimg.toPng
};

export function convertDomNodeToImage(node, format = 'png') {
  return fns[format](node);
}
