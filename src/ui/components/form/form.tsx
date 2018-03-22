import * as React from 'react';
import styled from 'styled-components';

const Container = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin:0;
  justify-content: center;
  grid-gap:5px;
  color: black;
  border: solid 1px #ccc;
  padding: 9px;
  box-sizing: border-box;
  border-radius: 10px;
  button{
    position:relative;
    grid-column:1/-1;
    bottom: -10px;
    width: 100%;
  }
`;
export interface AppProps {
  [key: string]: any;
}

class Form extends React.Component<AppProps, any> {
  konum : HTMLInputElement;
  kapasite : HTMLInputElement;
  constructor(props){
    super(props);
  }
  update = (e) => {
    e.preventDefault();
    // tslint:disable-next-line:no-unused-expression
    this.props.update && this.props.update({konum: this.konum.value, kapasite: this.kapasite.value});
  }
  render() {
    return (
      <Container onSubmit={this.update}>
        <input placeholder='Konum' type='text' ref={(node: HTMLInputElement) => this.konum = node}/>
        <input placeholder='Park Kapasitesi' type='number'ref={(node: HTMLInputElement) => this.kapasite = node}/>
        <button type='submit'>Veritabanına Kaydet</button>
      </Container>
    );
  }
}

export default Form;
