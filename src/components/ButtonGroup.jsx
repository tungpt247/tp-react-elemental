import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

const propTypes = {
  children: PropTypes.node.isRequired,
  className: React.PropTypes.string
}
const ButtonGroup = (props) => {
  console.log('---------::', props)

  var componentClass = classnames('ButtonGroup', props.className)

  return (<div {...this.props} className={componentClass}/>)
}

ButtonGroup.propTypes = propTypes

export default ButtonGroup
