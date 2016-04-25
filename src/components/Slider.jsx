import _                      from 'lodash'
import React, { Component }   from 'react'
import { findDOMNode }        from 'react-dom'
import classNames             from 'classnames'

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.substr(1)
}

function maxmin(pos, min, max) {
  if (pos < min) { return min }
  if (pos > max) { return max }
  return pos
}

const ORIENTATION_TYPES = {
  orientation: {
    horizontal: {
      dimension: 'width',
      direction: 'left',
      coordinate: 'x',
    },
    vertical: {
      dimension: 'height',
      direction: 'top',
      coordinate: 'y',
    }
  }
}

export class Slider extends Component {

  constructor(props) {
    super(props)

    this.state = {
      min: 0,
      max: 0,
      step: 1,
      value: 0,
      limit: 0,
      grab: 0,
      orientation: 'horizontal'
    }
  }

  componentDidMount() {
    this.initialize()

    window.addEventListener('resize', _.throttle(this.handleResizeWindow), 300)
  }

  initialize = () => {
    let { orientation } = this.props
    let dimension = capitalize(ORIENTATION_TYPES.orientation[orientation].dimension)
    const sliderPos = this.refs.slider['offset' + dimension]
    const handlePos = this.refs.handle['offset' + dimension]

    this.setState({
      limit: sliderPos - handlePos,
      grab: handlePos / 2,
    })
  }

  handleResizeWindow = (e) => {
    this.initialize()
  }

  getPositionFromValue(value) {
    let percentage, pos
    let { limit } = this.state
    let { min, max } = this.props

    percentage = (value - min) / (max - min)
    pos = Math.round(percentage * limit)

    return pos
  }

  getValueFromPosition(pos) {
    let percentage, value
    let { limit } = this.state
    let { orientation, min, max, step } = this.props

    percentage = (maxmin(pos, 0, limit) / (limit || 1))

    if (orientation === 'horizontal') {
      value = step * Math.round(percentage * (max - min) / step) + min
    } else {
      value = max - (step * Math.round(percentage * (max - min) / step) + min)
    }

    return value
  }

  coordinates(pos) {
    let value, fillPos, handlePos
    let { limit, grab } = this.state
    let { orientation } = this.props

    value = this.getValueFromPosition(pos)
    handlePos = this.getPositionFromValue(value)

    if (orientation === 'horizontal') {
      fillPos = handlePos + grab
    } else {
      fillPos = limit - handlePos + grab
    }

    return {
      fill: fillPos,
      handle: handlePos
    }
  }

  position(e) {
    let pos, value, { grab } = this.state
    let { orientation } = this.props
    const node = this.refs.slider
    const coordinateStyle = ORIENTATION_TYPES.orientation[orientation].coordinate
    const directionStyle = ORIENTATION_TYPES.orientation[orientation].direction
    const coordinate = e['client' + capitalize(coordinateStyle)] // get client{direction}
    const direction = node.getBoundingClientRect()[directionStyle]

    pos = coordinate - direction - grab
    value = this.getValueFromPosition(pos)

    return value
  }

  handleNoop = (evt) => {
    evt.stopPropagation()
    evt.preventDefault()
  }

  handleSliderMouseDown = (e) => {
    this.onValueChange(e)
  }

  handleDrag = (e) => {
    this.onValueChange(e)
  }

  onValueChange(e) {
    let value, { onChange } = this.props

    if (!onChange) {return}

    value = this.position(e)
    onChange && onChange(value)
  }

  handleDragEnd = () => {
    document.removeEventListener('mousemove', this.handleDrag)
    document.removeEventListener('mouseup', this.handleDragEnd)
  }

  handleKnobMouseDown = () => {
    document.addEventListener('mousemove', this.handleDrag)
    document.addEventListener('mouseup', this.handleDragEnd)
  }

  render() {
    let dimension, direction, position, coords, fillStyle, handleStyle
    let { value, orientation } = this.props

    dimension = ORIENTATION_TYPES.orientation[orientation].dimension
    direction = ORIENTATION_TYPES.orientation[orientation].direction
    position = this.getPositionFromValue(value)
    coords = this.coordinates(position)

    fillStyle = {[dimension]: `${coords.fill}px`}
    handleStyle = {[direction]: `${coords.handle}px`}

    var className = classNames('Slider', 'Slider-' + orientation, className)

    return(
      <div ref="slider"
        className={className}
        onClick={this.handleNoop}
        onMouseDown={this.handleSliderMouseDown}>
        <div ref="fill" className="Slider__fill" style={fillStyle} />
        <div ref="handle"
          className="Slider__handle"
          style={handleStyle}
          onClick={this.handleNoop}
          onMouseDown={this.handleKnobMouseDown} />
      </div>
    )
  }
}
