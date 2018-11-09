import React from 'react'
import PropTypes from 'prop-types'

const MainButton = (props) => {
  const mainButtonStyles = {
    // background: '#ffffff',
    // border: '1px solid black',
    // borderRadius: '20px',
    // minWidth: '100px',
    // textTransform: 'uppercase',
    // lineHeight: '2.2',
    // paddingLeft: '20px',
    // paddingRight: '20px',
    // cursor: 'pointer',
    // transition: 'all 0.3s ease-in-out',
    disabled: {
      border: '1px solid #e2e2e2',
      color: '#e2e2e2'
    },
  }

  const disabled = mainButtonStyles.disabled
  let style

  if (props.disabled) {
    style = { ...mainButtonStyles, ...disabled }
  } else {
    style = mainButtonStyles
  }

  return (
    <button
      className={props.className}
      type="button"
      onClick={() => props.handleAction()}
      style={style}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  )
}

MainButton.defaultProps = {
  className: '',
  disabled: false,
}

MainButton.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  handleAction: PropTypes.func.isRequired,
}


export default MainButton
