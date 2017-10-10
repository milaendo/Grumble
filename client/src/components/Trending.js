import React, { Component } from 'react'
import { Card, Feed } from 'semantic-ui-react'


class Trending extends Component {
	render () {
		return (
			<div className='list'>
				<Card>
					<Card.Content>
						<Card.Header as='h1' className="trending">Trending</Card.Header>
					</Card.Content>
					<Card.Content>
						<Feed>
							<Feed.Event>
								<Feed.Content>
									<Feed.Date className='font-size' as='h1' content="Traffic" />
										<Feed.Summary>Why it sucks.</Feed.Summary>
								</Feed.Content>
							</Feed.Event>
							<Feed.Event>
								<Feed.Content>
									<Feed.Date className='font-size' as='h1' content="Coffee" />
										<Feed.Summary>Just face it, you will never drink enough.</Feed.Summary>
								</Feed.Content>
							</Feed.Event>
							<Feed.Event>
								<Feed.Content>
									<Feed.Date className='font-size' as='h1' content="Mayo" />
										<Feed.Summary>Love it or hate it, its still weird.</Feed.Summary>
								</Feed.Content>
							</Feed.Event>
							<Feed.Event>
								<Feed.Content>
									<Feed.Date className='font-size' as='h1' content="Hot air baloons" />
										<Feed.Summary>Dangerous? or a legit sport</Feed.Summary>
								</Feed.Content>
							</Feed.Event>
							<Feed.Event>
								<Feed.Content>
									<Feed.Date className='font-size' as='h1' content="Cats or Dogs" />
										<Feed.Summary>Both, Duh.</Feed.Summary>
								</Feed.Content>
							</Feed.Event>
						</Feed>
					</Card.Content>
				</Card>
			</div>
		)
	}
}

export default Trending
