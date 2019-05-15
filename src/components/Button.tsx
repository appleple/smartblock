import styled from 'styled-components';

export default styled.button`
  ${props => {
    if (props.active) {
      return `
        color: blue;
      `;
    } else {
      return `
      color: #777;
      `
    }
  }}
  ${props => {
    if (props.disabled) {
      return `
        opacity: .4;
      `;
    }
  }}
  background: #fff;
  border: none;
  appearance: none;
  -webkit-appearance: none;
  font-size: 20px;
  cursor: pointer;
  padding: 5px 10px;
  margin-right: 5px;
  text-align: center;
`;