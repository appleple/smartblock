import * as React from 'react'
import styled from 'styled-components'
import CheckIcon from '../../components/icons/Check'

const Tooltip = styled.div`
  color: #777;
  font-size: 16px;
  box-shadow: 0 3px 40px 8px rgba(116, 116, 116, 0.2);
  border-radius: 3px;
  width: 320px;
  line-height: 46px;
  display: block;
`

const TooltipInner = styled.div`
  display: flex;
  height: 46px;
  border-radius: 3px;
  overflow: hidden;
`

const Input = styled.input`
  border: none;
  display: block;
  padding: 0 10px;
  font-size: 16px;
  flex: 1;
  &:focus {
    outline: none;
  }
`

const Button = styled.button`
  border: none;
  background-color: #014cc5;
  width: 46px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
`

type TooltipReactProps = {
  url: string;
  onClick(url: string): void;
  editing: boolean;
}

export default (props: TooltipReactProps) => {
  const [url, setUrl] = React.useState('');
  const { editing } = props;

  React.useEffect(() => {
    setUrl(props.url);
  }, [props.url])
  
  if (!editing) {
    return null;
  }

  return (
    <Tooltip>
      <TooltipInner>
        <Input
          type="text"
          value={url}
          placeholder="https://~"
          onKeyDown={e => {
            if (e.key === 'Enter') {
              props.onClick(url);
            }
          }}
          onChange={e => {
            setUrl(e.target.value);
          }}
        />
        <Button onClick={() => {
          props.onClick(url);
        }} style={{ paddingLeft: '7px' }}>
          <CheckIcon
            style={{ width: '24px', height: '24px', overflow: 'hidden' }}
          />
        </Button>
      </TooltipInner>
    </Tooltip>
  )
}

