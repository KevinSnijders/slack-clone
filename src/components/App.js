import React from 'react';
import { Grid } from 'semantic-ui-react';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';

import { connect } from 'react-redux';
const App = ({ currentUser, currentChannel }) => {
	return (
		<Grid columns='equal' className='app' style={{ background: '#eee' }}>
			<SidePanel
				key={currentUser && currentUser.uid}
				currentUser={currentUser}
				activeChannel={currentChannel && currentChannel.id}
			/>
			<Grid.Column style={{ marginLeft: '19rem' }}>
				<Messages
					key={currentChannel && currentChannel.id}
					currentChannel={currentChannel}
					currentUser={currentUser}
				/>
			</Grid.Column>
		</Grid>
	);
};

const mapStateToProps = state => ({
	currentUser: state.user.currentUser,
	currentChannel: state.channel.currentChannel,
});
export default connect(mapStateToProps)(App);
