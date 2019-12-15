import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import UserPanel from './UserPanel';
import Channels from './Channels';
import DirectMessaging from './DirectMessages';

class SidePanel extends Component {
	render() {
		const { currentUser, activeChannel } = this.props;
		return (
			<Menu size='large' inverted fixed='left' vertical style={{ background: '#3F0E40' }}>
				<UserPanel currentUser={currentUser} />
				<Channels currentUser={currentUser} activeChannel={activeChannel} />
				<DirectMessaging currentUser={currentUser} activeChannel={activeChannel} />
			</Menu>
		);
	}
}

export default SidePanel;
