import * as React from 'react';
declare type ButtonProps = {
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
declare const _default: (props: ButtonProps) => JSX.Element;
export default _default;
