import React, { Component } from 'react';
import { Header, Segment, Input, Icon } from 'semantic-ui-react';

class MessageHeader extends Component {
	render() {
		return (
			<Segment clearing>
				<Header fluid='true' as='h2' floated='left' style={{ marginBottom: 0 }}>
					<span>
						# {this.props.channel ? this.props.channel.name : ''}
						<Icon name='star outline' color='black' />
					</span>
					<Header.Subheader>2 Users</Header.Subheader>
				</Header>
				<Header floated='right'>
					<Input size='mini' icon='search' name='searchTerm' placeholder='Search' />
				</Header>
			</Segment>
		);
	}
}

export default MessageHeader;
