import React, { Component } from 'react'
import Progress from '../../src/components/Progress'

class ProgressDemo extends Component {

  render() {
    return(
        <Progress percent={20} />
    )
  }

}

module.exports = ProgressDemo
