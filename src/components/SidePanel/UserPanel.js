import React, { Component } from 'react';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';
import firebase from '../../firebase';
class UserPanel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: this.props.currentUser,
		};
	}

	dropdownOptions = () => [
		{
			key: 'user',
			text: (
				<span>
					Signed in as <strong>{this.state.user.displayName}</strong>
				</span>
			),
			disabled: true,
		},
		{
			key: 'avatar',
			text: <span>Change Avatar</span>,
		},
		{
			key: 'signOut',
			text: <span onClick={this.handleSignOut}>Sign Out</span>,
		},
	];

	handleSignOut = () => {
		firebase
			.auth()
			.signOut()
			.then(() => console.log('Signed out'))
			.catch(error => console.log(error));
	};
	render() {
		const { user } = this.state;
		return (
			<Grid style={{ background: '#3F0E40' }}>
				<Grid.Column>
					<Header style={{ padding: '1rem 0' }} as='h4' inverted>
						<Dropdown trigger={<span>Front-end</span>} options={this.dropdownOptions()} />
					</Header>
				</Grid.Column>
			</Grid>
		);
	}
}

export default UserPanel;
