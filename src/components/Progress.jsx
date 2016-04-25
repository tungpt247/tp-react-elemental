import React, { Component }     from 'react'
import classNames               from 'classnames'

const PROGRESS_TYPES = [
  'circle'
  ]

export class Progress extends Component {

  componentDidMount() {
    this.renderContent()
  }

  renderContent() {
    var percent = parseInt(this.props.percent)
    var deg = 360 * percent / 100
    var element = this.refs.progress
    element.style.transform = `rotate(-${deg}deg)`
  }

  render() {
    var percent = Math.floor(this.props.percent)
    var className = classNames('progress', { 'progress-pie-chart': true,'gt-50': percent > 50})
    console.log('className:::', className)

    return (
      <div className="progress">
        <div className={className}>
          <div className="ppc-progress">
            <div className="ppc-progress-fill" ref="progress"></div>
          </div>
          <div className="ppc-percents">
            <div className="pcc-percents-wrapper">
              <span>{percent + '%'}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
