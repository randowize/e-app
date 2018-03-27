import * as React from 'react';
import styled from 'styled-components';
import * as domimg from 'dom-to-image';

const Div = styled.div`
  border: solid 5px red;
  display: block !important;
  background: black;
  height: 160px;
  width: 160px;
  justify-self:center;
  align-self: center;
  & img {
    width: 100%;
    height: 100%;
  }
`;

export interface DomToCanvasProps {
  src?: string;
  innerRef?: (node: HTMLImageElement) => void;
}

export default class DomToCanvas extends React.Component<
  DomToCanvasProps,
  any
> {
  render() {
    return (
      <Div>
        <img src={this.props.src} ref={this.props.innerRef}/>
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
