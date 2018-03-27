import * as React from 'react';
import styled from 'styled-components';
import '../global-styles';

const Container  = styled.div `
  display: grid;
  transition: all 0.5s ease;
  grid-template-columns: 48px[options-end] 1fr[content-end];

`;

export default Container;