import React, { Component } from 'react'
import {Dropdown}           from '../../src/components/Dropdown'

const DROPDOWN_OPTIONS = [
	{ label: 'Action' },
	{ label: 'Another action' }
]

export class DropdownDemo extends Component {
	constructor(props) {
		super(props)
	}

  onSelect(item) {
    console.log('Selected item:', item)
  }

  render() {
    return(<Dropdown items={DROPDOWN_OPTIONS} buttonLabel="Default Trigger" onSelect={this.onSelect.bind(this)} />)
  }

}
