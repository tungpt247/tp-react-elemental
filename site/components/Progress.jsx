import React, { Component } from 'react'
import {Progress} from '../../src/components/Progress'

export class ProgressDemo extends Component {

  render() {
    return(
        <Progress percent={20} />
    )
  }

}
