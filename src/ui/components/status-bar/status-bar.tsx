import * as React from 'react';
import styled from 'styled-components';

export const Pill = styled.span`
  height: ${(props: any) => props.size || 12}px;
  width: ${(props: any) => props.size || 12}px;
  border-radius: 50%;
  display: inline-block;
  background-color: ${(props: any) => props.color || 'green'};
`;

interface StatusProps {
  children: any;
  className: string;
}

const StatusComp: React.SFC<StatusProps> = (props: StatusProps) => {
  return (
    <div className={props.className}>
      <span className="status-pills">
        <Pill color="red" />
        <Pill color="green" />
        <Pill color="yellow" />
      </span>
    </div>
  );
};
const StyledStatusComp = styled<StatusProps, any>(StatusComp)`
  width: 100vw;
  height: 25px;
  position: fixed;
  bottom: 0;
  z-index: 25;
  padding: 0 1rem;
  background-color: rgba(0,0,0,0.85);
  border-top: solid 1px;
  & .status-pills{
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 5px;
    width: 16px;
    height: 100%;
    align-items: center;
  }
`;

export default StyledStatusComp;
