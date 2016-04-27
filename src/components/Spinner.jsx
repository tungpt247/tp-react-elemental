import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

const types = ['default', 'primary', 'inverted']
const sizes = ['sm', 'md', 'lg']

export class Spinner extends Component {
  render() {
    var componentClass = classNames('Spinner', 'Spinner--' + this.props.type, this.props.className)

    return(
      <div className={componentClass}>
        <span className="Spinner_dot Spinner_dot--first" />
        <span className="Spinner_dot Spinner_dot--second" />
        <span className="Spinner_dot Spinner_dot--third" />
      </div>
    )
  }
}
