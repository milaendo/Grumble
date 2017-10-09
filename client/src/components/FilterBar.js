import React, { Component } from 'react'
import { getGrumbs, getPositiveGrumbs, getNegativeGrumbs, getPopularGrumbs, getRecentGrumbs } from '../actions/action'
import { Menu } from 'semantic-ui-react'


class FilterBar extends Component {
	state = {}

	handleItemClick = (e, { name }) => {
		this.setState({ activeItem: name })
		switch(name) {
			case 'All':
				getGrumbs()
				break;
			case 'positive':
				getPositiveGrumbs()
				break;
			case 'Negative':
				getNegativeGrumbs()
				break;
			case 'Popular':
				getPopularGrumbs()
				break;
			case 'MostRecent':
				getRecentGrumbs()
		}
	}

	render() {
		const { activeItem } = this.state
    return (
    	<div className="filterBar">
				<Menu tabular>
	    		<Menu.Item name='All' active={activeItem === 'All'} onClick={this.handleItemClick} />
	    		<Menu.Item name='positive' active={activeItem === 'positive'} onClick={this.handleItemClick} />
	    		<Menu.Item name='Negative' active={activeItem === 'Negative'} onClick={this.handleItemClick} />
	    		<Menu.Item name='Popular' active={activeItem === 'Popular'} onClick={this.handleItemClick} />
	    		<Menu.Item name='MostRecent'active={activeItem === 'MostRecent'}  onClick={this.handleItemClick} />
				</Menu>
    	</div>
    )
  }
}

export default FilterBar
