import React from 'react'
import PropTypes from 'prop-types'

const StatelessComponentwithProps = props => {
  const classes = `sample ${props.extraClasses}`
  return (
    <div className='button-container'>
      <button className={classes} onClick={props.onClick.bind(this, props.label)} value={props.label}>{props.label}</button>
    </div>
  )
}

StatelessComponentwithProps.defaultProps = {
  extraClasses: '',
}
StatelessComponentwithProps.propTypes = {
  label: PropTypes.string.isRequired,
  extraClasses: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export default StatelessComponentwithProps
