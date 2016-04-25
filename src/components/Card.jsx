import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

export class Card extends Component {

  constructor() {
    super(...arguments)

    const {innerWidth, innerHeight} = window

    this.state = {
      innerWidth: innerWidth,
      innerHeight: innerHeight,
      style: null,
      mouseLeave: false,
      ax: 0,
      ay: 0
    }
  }

  componentDidMount() {
    const card = this.refs.card
    card.addEventListener('mousemove', this.handleMouseMove)
    card.addEventListener('mouseleave', this.handleMouseLeave)
  }

  componentWillUnmount() {
    const card = this.refs.card
    card.removeEventListener('mousemove', this.handleMouseMove)
    card.addEventListener('mouseleave', this.handleMouseLeave)
  }

  handleMouseLeave = (e) => {
    this.setState({mouseLeave: true})
    console.log('handleMouseLeave')

    // if (this.mouseLeave) {
      this.reset()
    // }
  }

  handleNoop = (evt) => {
    evt.stopPropagation()
    evt.preventDefault()
  }

  handleMouseMove = (e) => {
    // console.log('e.pageX====', e.pageX)
    const {innerWidth, innerHeight} = this.state
    const card = this.refs.card
    const bounding = card.getBoundingClientRect()
    const w = bounding.width
    const h = bounding.height
    console.log('bounding:', bounding.width, bounding.height)

    var ax = -(w/2- e.pageX)/50
    var ay = (h/2- e.pageY)/40
    console.log(ax, ay)

    var style = {
      'transform': 'rotateY(' + ax + 'deg) rotateX(' + ay + 'deg)'
    }

    this.setState({ style })
  }

  reset() {
    console.log('reset')

    var style = {
      'transform': 'rotateY(0deg) rotateX(0deg)'
    }

    this.setState({ ax: 0, ay: 0, style: style })
  }

  render() {
    return (
      <div className="Card" ref="card" style={this.state.style} onMouseOver={this.handleMouseOver}>
        <div className="Card__content">
          <h1>Just hover around</h1>
          <p>
            <small>by <a href="http://ariona.net" target="_blank">Ariona, Rian</a></small>
          </p>
          <p className="related">
            <strong>See also: </strong>
            <a href="http://codepen.io/ariona/details/LVZLGP/" target="_blank">Staged dropdown animation</a>
          </p>
        </div>
      </div>
    )
  }

}
