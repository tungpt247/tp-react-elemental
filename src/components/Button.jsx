import React, { createElement, createClass, Component, PropTypes } from 'react'
import classNames from 'classnames'
import blacklist from 'blacklist'

const BUTTON_SIZE = ['lg', 'sm', 'xs']
const BUTTON_TYPES = [
  'default'
]

class Button extends Component {

  render() {
    var componentClass = classNames(
      'Button',
      'Button--' + this.props.type,
      (this.props.size ? 'Button--' + this.props.size : null),
      {
        'Button-block': this.props.block,
        'is-active': this.props.isActive
      },
      this.props.className
    )

    // props
    var props = blacklist(this.props, 'type', 'size', 'component', 'className')
    props.className = componentClass

    var tag = 'button'
    props.type = this.props.submit ? 'submit' : 'button'

    return createElement(tag, props, this.props.children)
  }
}

Button.defaultProps = {
  type: 'default'
}

export default Button
