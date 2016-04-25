import React, { Component } from 'react'
import  AlertDemo from './components/Alert'
import PaginationDemo from './components/Pagination'
import ProgressDemo from './components/Progress'
import SliderDemo from './components/Slider'
import CardDemo from './components/Card'
import VitalDemo from './components/Vital'

class AppDemo extends Component {

  render() {
    return(
      <div>
      <AlertDemo />
      <VitalDemo />
      <CardDemo />
      <PaginationDemo />
      <SliderDemo />
      <ProgressDemo />
      </div>
    )
  }
}

module.exports = AppDemo
