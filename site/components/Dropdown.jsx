import React, { Component } from 'react'
import {Dropdown} from '../../src/components/Dropdown'

const DROPDOWN_OPTIONS = [
	{ label: 'Action' },
	{ label: 'Another action' },
	{ label: 'Something else here' },
	{ type: 'divider' },
	{ type: 'header', label: 'Dropdown header' },
	{ label: 'Separated link' }
];

export class DropdownDemo extends Component {
  onSelect(item) {
    console.log('xxx', item)
  }
  render() {
    return(
       <div>
        <Dropdown items={DROPDOWN_OPTIONS} buttonLabel="Default Trigger" onSelect={this.onSelect}/>
      </div>
    )
  }

}
