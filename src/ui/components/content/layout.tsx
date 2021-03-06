import * as React from 'react';
import styled from 'styled-components';

const Container  = styled.div `
  display: grid;
  flex-grow:2;
  transition: all 0.5s ease;
  grid-template-columns: 1fr;
  height: calc(100vh - ${(props: any) => props.statusBarSize || 25}px);

  & .d-wrapper{
    perspective: 400px;
    transform-style: preserve-3d;
  }

  &.has-options{
    grid-template-columns: 1fr[options-end] 3fr[content-end];
    &> .options{
      opacity:1;
      display:initial;
      &>div{
        width: 100% !important;
      }
    }
    &>div:nth-child(2){
      grid-column: 2 / -1;
    }
  }
  &>.content{
      grid-column: 1 / -1;
      grid-row: 1;
  }
  &>.options{
    order:2;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    & div {
      box-sizing: border-box !important;
    }
    grid-row:1;
    grid-column:1;
    opacity:0;
    display:none;
  }

  grid-gap: 1px;
  grid-auto-rows: 1fr;
  padding: 2rem 0 0 0;
  color: white;
  &>div{
    display:grid;
    transition: all 1.5s ease;
    background: rgba(4, 2, 36, 0.95);
  }

  &>.content{
    order:1;
    background: rgba(124, 255, 255, 1);
     background: white;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    &>div{
      display: grid;
      &:nth-child(1){
        grid-template-columns: 2fr 1fr;
        grid-gap: 20px;
        height:200px;
        overflow-y: hidden;
        padding: 20px;
        &>div{
          background:rgba(0, 12, 15,0.00);
          display:grid;
        }
      }
      &:nth-child(2){
        grid-template-columns: 1fr 1fr ;
        grid-gap: 50px;
        div{
          background: white;
          color: black;
        }
      }
      &:nth-child(3){
        grid-template-columns: 4fr 1fr 1fr 1fr;
        /*visibility: hidden;*/
        align-items: flex-end;
        grid-gap: 30px;
        textarea{
          height:80%;
        }
        div{
          background:rgba(55, 5, 255,0.5);
          border: solid 2px rgba(0, 5, 5,0.5);
        }
        &>div:last-child{
           background:rgba(0, 5, 5,0.5);
        }
      }
    grid-gap: 25px;
    grid-auto-rows: 1fr;
    padding: 2rem;
    color: white;
    line-height: ${props => 1. / 1.6};
    text-align: center;
    .led-panel-viewer{
      height:100%;
      transform: scale(0.85);
      transition:all 1.5s ease-in;
      canvas{
        height:100%;
      }
      &.scale{
        canvas{
           transform: scale(0.5);
        }
      }
    }
    }
  }
  .panel-detail{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 60px;
    transform: scale(1,0.75);
    padding: 40px 20px;
    background: #2d3333 !important;
    box-sizing: border-box;
  }
  .Select{
    text-align:start;
  }
`;

export default Container;