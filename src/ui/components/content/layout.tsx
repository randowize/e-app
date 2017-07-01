import * as React from 'react';
import styled from 'styled-components';

const Container  = styled.div `
  display: grid;
  flex-grow:2;
  transition: all 0.5s ease;
  grid-template-columns: 1fr[options-end] 3fr[content-end];

  .3d-wrapper{
    perspective: 400px;
    transform-style: preserve-3d;
  }

  &.has-options{
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
    margin-top:-2rem;
    & div {
      box-sizing: border-box !important;
    }
    grid-row:1;
    grid-column:1;
    opacity:0;
    display:none;
  }

  grid-gap: 25px;
  grid-auto-rows: 1fr;
  padding: 2rem 2rem 2rem 0;
  color: white;
  line-height: 2;

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
    grid-template-rows: 1fr 1fr 3fr;
    &>div{
      display: grid;
      &:nth-child(1){
        grid-template-columns: 4fr 1fr;
        grid-gap: 20px;
        height:100%;
        &>div{
          background:rgba(0, 12, 15,0.85);
          display:grid;
        }
      }
      &:nth-child(2){
        grid-template-columns: 1fr 3fr 0.5fr;
        grid-gap: 50px;
        visibility: hidden;
        div{
          background: rgba(24, 25, 125, 1);
        }
      }
      &:nth-child(3){
        grid-template-columns: 2fr 6fr 4fr;
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
    line-height: 2;
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