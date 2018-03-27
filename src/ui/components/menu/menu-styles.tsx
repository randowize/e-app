import styled from 'styled-components';

export const Ul = styled.ul`
  list-style: ${(props: any) => (props.show ? 'block' : 'none')};
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 48px;
  padding: 10px 5px;
  align-items: center;
  background-color: rgba(0, 0, 5, 0.85);
  box-shadow: 5px 0 10px 3px rgba(3, 1, 36, 0.37);
  z-index: 10;
`;

export const Li = styled.li`
  margin: 10px auto;
  font-size: 24px;
  color: #00ffff;
  transition: all 0.5s ease;
  &:hover {
    cursor: pointer;
    color: #00ffff;
    .fa {
      text-shadow: 0 0 10px #2fffff;
    }
  }
  &.active {
    color: #ff0;
  }
`;

export const VALUE = 5;
