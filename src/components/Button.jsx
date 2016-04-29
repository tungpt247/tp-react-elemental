import React, { cloneElement, Component, PropTypes } from 'react'
import {Tag} from 'react-dom'
import classnames from 'classnames'
import blacklist from 'blacklist'

const  defaultProps = {
  type: 'default',
  tag: 'button'
}

class Button extends Component {

  constructor(props) {
    super(props)
    console.log('---------------::', this.props)
  }

  render() {
    let {tag: Tag} = this.props

      var componentClass = classnames(
        'Button',
        'Button--' + this.props.type,
        (this.props.size ? 'Button--' + this.props.size : null),
        {
          'Button-block': this.props.block,
          'is-active': this.props.isActive
        },
        this.props.className
      )

      var props = blacklist(this.props, 'type', 'size', 'component', 'className')

      props.className = componentClass

      Tag = 'button'
      props.type = this.props.submit ? 'submit' : 'button'

    return (<Tag {...props} className={componentClass} />)
  }
}

Button.defaultProps = defaultProps

export default Button
