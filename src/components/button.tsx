import * as React from 'react';
import classNames from 'classnames';

type ButtonProps = {
  active?: boolean;
  color?: 'black' | 'white';
  disabled?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
  type?: 'submit' | 'button';
  tag?: 'label';
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button(props: ButtonProps) {
  if (props.tag === 'label') {
    return (
      <label
        style={props.style}
        className={classNames(props.className, 'smartblock-btn', {
          'is-active': props.active,
          'is-black': props.color === 'black',
          'is-disabled': props.disabled,
        })}
      >
        {props.children}
      </label>
    );
  }

  return (
    <button
      type={props.type}
      style={props.style}
      onClick={props.onClick}
      className={classNames(props.className, 'smartblock-btn', {
        'is-active': props.active,
        'is-black': props.color === 'black',
        'is-disabled': props.disabled,
      })}
    >
      {props.children}
    </button>
  );
}
