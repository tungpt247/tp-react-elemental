import React, { Component } from 'react'
import {Slider} from '../../src/components/Slider'

export class SliderDemo extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      value: 30,
      min: 0,
      max: 100,
      step: 1,
      limit: 100
    }
  }

  handleChange = (value) => {
    this.setState({value: value})
  }

  render() {
    let { value, min, max, step, limit } = this.state
    return(
      <div>
        <Slider value={value} min={min} max={max} step={step} limit={limit}
        orientation="horizontal"
        onChange={this.handleChange}
        />
        Value: {value}

        <Slider value={value} min={min} max={max} step={step} limit={limit}
        orientation="vertical"
        onChange={this.handleChange}
        />
      </div>
    )
  }

}
