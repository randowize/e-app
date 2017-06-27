
import * as React from 'react';

export interface IProps {
  width: number;
  getRef: (node: HTMLCanvasElement) => void;
  style: any;
}

export function CanvasRenderer (props: IProps) {
    return (
      <canvas
        ref={props.getRef}
        width={props.width}
        style={props.style}
      />
    );
}
