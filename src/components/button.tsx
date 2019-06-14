import styled from 'styled-components';

const Button = styled.button<{
  active?: boolean,
  color?: 'black' | 'white'
}>`
  ${props => {
    if (props.disabled) {
      return `
        opacity: .4;
      `;
    }
  }}
  ${props => {
    if (props.active) {
      return `
        color: #005CEE;
        opacity: 1;
        background-color: #F2F2F4;
      `;
    } else {
      return `
        color: #777;
        background: #fff;
      `
    }
  }}
  ${props => {
    if (props.color === 'black') {
      return `
        background-color: #333333 !important;
        color: #FFF;
      `
    }
  }}

  width: 36px;
  height: 36px;
  border: none;
  border-radius: 3px;
  appearance: none;
  -webkit-appearance: none;
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  margin-right: 5px;
  text-align: center;
  svg {
    fill: currentColor;
  }
  &:last-child {
    margin-right: 0;
  }
  &:not([disabled]):hover {
    color: #333;
  }
  
  &[disabled]:hover {
    cursor: not-allowed;
  }
`;

export default Button;