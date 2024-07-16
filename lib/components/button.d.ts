import * as React from 'react';
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
declare const _default: (props: ButtonProps) => React.JSX.Element;
export default _default;
