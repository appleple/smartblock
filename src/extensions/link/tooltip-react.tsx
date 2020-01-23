import * as React from 'react'
import CheckIcon from '../../components/icons/check'

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
    <div className="smartblock-tooltip">
      <div className="smartblock-tooltip-inner">
        <input
          className="smartblock-tooltip-input"
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
        <button 
          className="smartblock-tooltip-btn"
          onClick={() => {
            props.onClick(url);
          }} 
          style={{ paddingLeft: '7px' }}>
          <CheckIcon
            style={{ width: '24px', height: '24px', overflow: 'hidden' }}
          />
        </button>
      </div>
    </div>
  )
}

