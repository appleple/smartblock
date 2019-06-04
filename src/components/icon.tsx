import * as React from 'react';
import Svg from 'react-svg';

interface Props {
  width: number,
  height: number,
  src: string
}

export default (props: Props) => {
  return (<Svg src={props.src} beforeInjection={
    (svg) => {
      svg.setAttribute('style', `width: ${props.width}px; height: ${props.height}px`);
    }} 
  />);
}