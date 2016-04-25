import React, { Component } from 'react'
import Pagination from '../../src/components/Pagination'

export class PaginationDemo extends Component {

  constructor() {
    super(...arguments)

    this.state = {
      currentPage: 1,
      pageSize: 10,
      plural: 'Chickens',
      singular: 'Chicken',
      total: 123,
      limit: 5
    }

    this.handlePageSelect = this.handlePageSelect.bind(this)
  }

  handlePageSelect(page) {
    this.setState({
      currentPage: page
    })
  }

  render() {
    return (
      <div>
        <Pagination
          currentPage={this.state.currentPage}
          onPageSelect={this.handlePageSelect}
          pageSize={this.state.pageSize}
          plural={this.state.plural}
          singular={this.state.singular}
          total={this.state.total}
          limit={this.state.limit}
        />
      </div>
    )
  }
}
