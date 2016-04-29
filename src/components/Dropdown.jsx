import React, {Component, PropTypes} from 'react'
import blacklist from 'blacklist'
import classNames from 'classnames'
import Button from './Button'

const ESC_KEYCODE = 27
const NO_OP = () => undefined

export class Dropdown extends Component {

  static propTypes = {
    items: PropTypes.array,
    onSelect: PropTypes.func
  }

  static defaultProps = {
    onSelect: NO_OP
  }

  constructor(props) {
    super(props)

    this.state = {
      isOpen: this.props.isOpen || false
    }

    this.closeDropdown = this.closeDropdown.bind(this)
    this.openDropdown = this.openDropdown.bind(this)
    this.renderButton = this.renderButton.bind(this)
  }

  openDropdown() {
    this.setState({isOpen: true})
  }

  closeDropdown() {
    this.setState({isOpen: false})
  }

  handleKeyDown(e) {
    if (e.keyCode === ESC_KEYCODE) {
      this.closeDropdown()
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (typeof window === 'undefined') {
      return
    }

    if (nextState.isOpen) {
      window.addEventListener('keydown', this.handleKeyDown)
    } else {
      window.removeEventListener('keydown', this.handleKeyDown)
    }
  }

  onClick(selectedItem) {
    this.setState({
      isOpen: !this.state.isOpen
    })

    this.props.onSelect(selectedItem)
  }

  renderButton() {
    var disclosureArrow = <span className='disclosure-arrow' />
    return (<Button
        className="Dropdown-toggle"
        type="default"
        onClick={this.state.isOpen ? this.closeDropdown : this.openDropdown}>
        {this.props.buttonLabel}
        {disclosureArrow}
      </Button>)
  }

  renderDropdownMenu() {
    var self = this
    if (!this.state.isOpen) { return null }

    var dropdownMenuItems = this.props.items.map(function(item, i) {
      var menuItem

      if (item.type === 'header') {
        menuItem = <li key={'item-' + i} clasname="Dropdown-menu__header">{item.label}</li>
      } else if (item.type === 'divider') {
        menuItem = <li key={'item-' + i} className="Dropdown-menu__divider" />
      } else {
        menuItem = (
          <li key={'item-' + i} className='Dropdown-menu__item'>
            <span className="Dropdown-menu__action" onClick={self.onClick.bind(self, item)}>{item.label}</span>
          </li>
        )
      }
      return menuItem
    })

    return (
      <ul key="Dropdown-menu" className="Dropdown-menu" role="menu">
        {dropdownMenuItems}
      </ul>
    )
  }

  renderChildren() {}

  render() {
    var dropdownClass = classNames('Dropdown', {
      'is-open': this.state.isOpen
    }, this.props.className)

    var props = blacklist(this.props, 'buttonLabel', 'buttonType', 'className', 'isOpen', 'items')

    console.log('-------------', props)
    return (
      <span className={dropdownClass} {...props}>
        {this.renderButton()}
        {this.renderDropdownMenu()}
      </span>
    )

  }
}
