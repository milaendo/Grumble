import React, { Component } from 'react'
import harold from '../images/grump3.jpg'
import { Card, Icon, Image } from 'semantic-ui-react'


class Harold extends Component {
	render () {
		return (
			<div className='haroldCard'>
				<Card>
					<img id='harold'src={harold} alt='harold'/>
						<Card.Content>
							<Card.Header>Harold</Card.Header>
							<Card.Meta><span>Oct 13 2017</span></Card.Meta>
							<Card.Header>Get off my lawn!!</Card.Header>
						</Card.Content>
				</Card>
			</div>
		)
	}
}

export default Harold
