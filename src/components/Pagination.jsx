import React, { Component, PropTypes }  from 'react'
import classNames                       from 'classnames'

class Page extends Component {

	static propTypes =  {
		children: PropTypes.node,
		label: PropTypes.string,
		onSelect: PropTypes.func,
		page: PropTypes.number,
		selected: PropTypes.bool
	}

	constructor() {
		super(...arguments)
		this.onSelect = this.onSelect.bind(this)
	}

	onSelect() {
		this.props.onSelect(this.props.page)
	}

	render () {
		const { children, selected, label } = this.props
		const className = classNames('Pagination__list__item', {
			'is-selected': selected
		})

		return (
			<button className={className} onClick={this.onSelect}>
				{children}
			</button>
		)
	}
}


class Pagination extends Component {
	constructor() {
		super(...arguments)
		this.onPageSelect = this.onPageSelect.bind(this)
	}

  renderCount() {
  	let count = ''
	let { currentPage, pageSize, plural, singular, total } = this.props

	if (!total) {
		count = 'No ' + (plural || 'records')
	} else if (total > pageSize) {
		let start = (pageSize * (currentPage - 1)) + 1
		let end = Math.min(start + pageSize - 1, total)
		count = `Showing ${start} to ${end} of ${total}`
	} else {
		count = 'Showing ' + total
		if (total > 1 && plural) {
			count += ' ' + plural
		} else if (total === 1 && singular) {
			count += ' ' + singular
		}
	}

  	return (
		<div className="Pagination__count">{count}</div>
    )
  }

  onPageSelect(page) {
  	if (this.props.onPageSelect) {
  		this.props.onPageSelect(page)
  	}
  }

  renderPages() {
	if (this.props.total <= this.props.pageSize) {return null}

	let pages = []
	let { currentPage, pageSize, total, limit } = this.props
	let totalPages = Math.ceil(total / pageSize)
	let minPage = 1
	let maxPage = totalPages

	if (limit && (limit < totalPages)) {
		let rightLimit = Math.floor(limit / 2)
		let leftLimit =  rightLimit + (limit % 2) - 1
		minPage = currentPage - leftLimit
		maxPage = currentPage + rightLimit

		if (minPage < 1) {
			maxPage = limit
			minPage = 1
		}
		if (maxPage > totalPages) {
			minPage = totalPages - limit + 1
			maxPage = totalPages
		}
	}
	if (minPage > 1) {
		pages.push(<Page key="page_start" onSelect={this.onPageSelect} page={1}>...</Page>)
	}
	for (let page = minPage; page <= maxPage; page++) {
		let selected = (page === currentPage)
		pages.push(<Page key={'page_' + page} selected={selected} onSelect={this.onPageSelect} page={page}>{page}</Page>)
	}
	if (maxPage < totalPages) {
		pages.push(<Page key="page_end" onSelect={this.onPageSelect} page={totalPages}>...</Page>)
	}
	return (
		<div className="Pagination__list">
			{pages}
		</div>
	)
  }

  render() {
    const className = classNames('Pagination', this.props.className)

    return(
      <div className={className} style={this.props.style}>
        {this.renderCount()}
        {this.renderPages()}
      </div>
    )
  }
}

export default Pagination
