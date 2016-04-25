import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

const ALERT_TYPES = [
  'danger',
  'error',
  'info',
  'primary',
  'success',
  'warning'
  ]

export class Alert extends Component {
  static PropTypes = {
    type: PropTypes.oneOf(ALERT_TYPES).isRequired
  }

  render() {
    var componentClass = classNames('Alert', `Alert--${this.props.type}`, this.props.className)

    return (<div className={componentClass}>{this.props.children}</div>)
  }
}
