import React, { Component } from 'react'
import {Alert} from '../../src/components/Alert'

export class AlertDemo extends Component {

  render() {
    return(
       <div>
        <Alert type="warning">
          <h4>Heading</h4>
          <strong>Error:</strong> You need to take action, something has gone terribly wrong!
        </Alert>
      </div>
    )
  }

}
