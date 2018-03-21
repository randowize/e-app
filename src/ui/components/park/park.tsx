import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

const pulse = keyframes`
  0%{
  
    border: solid 10px transparent;
  }
  50%{
    opacity:0.4;
    border: solid 5px black;
  }
  100%{
    border: solid 0px transparent;
  }
`;

const Container = styled.div`
    display: grid;
    /*background: #237588;*/
    font-weight: bold;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    text-align: start;
    border-radius: 5px;
    border-bottom: solid 1px #ddd;
    margin: 10px;
    padding: 5px;
    color: black;
    .fa:before{
      transition: all 0.5s ease;
      border: solid 1px white;
      display: flex;
      border: solid 1px;
      width:32px;
      height:32px;
      animation: ${pulse + 1} 2s  infinite;
      justify-content: center;
      align-items: center;
      border-radius: 50px;
    }
    .circle-container{
      width:64px;
      height: 64px;
      grid-row: 1/-1;
      grid-column: 2/-1;
      transform: translateX(50%);
    }
    .caption-text{
      font-weight: bold;
      font-size: 20px;
    }
    button{
      grid-column: 2/-1;
    }
}
`;

export interface IProps {
  [key: string]: any;
  parks: any[];
}

function Park(props) {
  let percent = 100 - Math.floor(props.park.bos / props.park.kapasite * 100);
  let color = percent < 40 ? 'green' : percent < 80 ? 'yellow' : 'red';
  return (
    <Container>
      <div className="konum">
        <i className="fa fa-map-marker" /> {props.park.konum}
      </div>
      <div> Kapasite: {props.park.kapasite}</div>
      <div> Boş: {props.park.bos}</div>
      <div className="circle-container">
        <span style={{ color }}>{percent + '%'}</span>
        {/*
        <Circle percent={percent} strokeWidth="6" strokeColor={color}>
        <Caption
        text={}
            x="50"
            y="50"
            textAnchor="middle"
            className="caption-text"
          />
          <Caption
            text={'Dolu'}
            x="50"
            y="75"
            textAnchor="middle"
            className="caption-text"
          />
        </Circle>
      */}
      </div>
      <button onClick={props.onSelect}>LED'E ÇEVİR</button>
    </Container>
  );
}

export default class Parks extends React.Component<IProps, any> {
  handlePark = id => {
    this.props.handlePark(id);
  };
  render() {
    return (
      <Scrollbars style={{ height: 200 }}>
        {this.props.parks
          .slice(0)
          .map(p => (
            <Park key={p.id} park={p} onSelect={() => this.handlePark(p.id)} />
          ))}
      </Scrollbars>
    );
  }
}
