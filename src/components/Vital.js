import React, { Component } from 'react'

class Vital extends Component {

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
    const {innerWidth, innerHeight} = this.state
    const card = this.refs.card
    const w = card.offsetWidth
    const h = card.offsetHeight
    var ax = -(w/2- e.offsetX)/5
    var ay = (h/2- e.offsetY)/5

    var style = {
      'transform': 'rotateY(' + ax + 'deg) rotateX(' + ay + 'deg)'
    }

    this.setState({ style })
  }

  reset() {
    var style = {
      'transform': 'rotateY(0deg) rotateX(0deg)'
    }

    this.setState({ ax: 0, ay: 0, style: style })
  }

  render() {
    return (
      <div className="Vital" ref="card" style={this.state.style} onMouseOver={this.handleMouseOver}>
        <div className="Vital__content">
          <img src="./images/card.png" alt=""/>
          <img src="./images/card.png" alt=""/>
          <img src="./images/card.png" alt=""/>
        </div>
      </div>
    )
  }

}

module.exports = Vital
