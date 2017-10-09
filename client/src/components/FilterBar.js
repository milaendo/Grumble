import React, { Component } from 'react'
import { getGrumbs, getPositiveGrumbs, getNegativeGrumbs, getPopularGrumbs, getRecentGrumbs } from '../actions/action'

class FilterBar extends Component {

	handleAll = (e) => {
		getGrumbs()
	}

	handlePositive = (e) => {
		getPositiveGrumbs()
	}

	handleNegative = (e) => {
		getNegativeGrumbs()
	}

	handlePopular = (e) => {
		getPopularGrumbs()
	}

	handleRecent = (e) => {
		getRecentGrumbs()
	}




  render() {
    return (
    	<div className="filterBar">
    		<button onClick={this.handleAll}>All</button>
    		<button onClick={this.handlePositive}>Positive</button>
    		<button onClick={this.handleNegative}>Negative</button>
    		<button onClick={this.handlePopular}>Popular</button>
    		<button onClick={this.handleRecent}>Most Recent</button>
    	</div>     
    )
  }
}

export default FilterBar