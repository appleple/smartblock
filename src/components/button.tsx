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
        color: #014CC5;
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
`;

export default Button;