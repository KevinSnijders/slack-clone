import React, { Component } from 'react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { setCurrentChannel, setPrivateChannel } from '../../actions/index';
import { Menu, Icon } from 'semantic-ui-react';

class DirectMessages extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: this.props.currentUser,
			users: [],
			usersRef: firebase.database().ref('users'),
			connectedRef: firebase.database().ref('.info/connected'),
			presenceRef: firebase.database().ref('presence'),
		};
	}

	componentDidMount() {
		if (this.state.user) {
			this.addEventListener(this.state.user.uid);
		}
	}

	addEventListener = currentUserId => {
		this.userRefListener(currentUserId);
		this.connectedRefListener(currentUserId);
		this.presenceRefListener(currentUserId, 'child_added');
		this.presenceRefListener(currentUserId, 'child_removed');
	};

	userRefListener = currentUserId => {
		let loadUsers = [];
		this.state.usersRef.on('child_added', snap => {
			if (currentUserId !== snap.key) {
				let user = snap.val();
				user['uid'] = snap.key;
				user['status'] = 'offline';
				loadUsers.push(user);
				this.setState({ users: loadUsers });
			}
		});
	};

	connectedRefListener = currentUserId => {
		this.state.connectedRef.on('value', snap => {
			if (snap.value === true) {
				const isOnline = this.state.presenceRef.child(currentUserId);
				isOnline.set(true);
				isOnline.onDisconnect().remove(err => {
					if (err !== null) {
						console.error(err);
					}
				});
			}
		});
	};

	presenceRefListener = (currentUserId, action) => {
		this.state.presenceRef.on(action, snap => {
			const removeAction = 'child_remove';
			if (currentUserId !== snap.key) {
				this.addStatusToUser(snap.key, action === removeAction ? false : '');
			}
		});
	};

	addStatusToUser = (userId, connected = true) => {
		const updatedUsers = this.state.users.reduce((acc, user) => {
			if (user.uid === userId) {
				user['status'] = `${connected} ? 'online' : 'offline'`;
			}
			return acc.concat(user);
		}, []);
		this.setState({ users: updatedUsers });
	};

	isUserOnline = user => user.state === 'online';

	changeChannel = user => {
		const channelId = this.getChannelId(user.uid);
		const channelData = {
			id: channelId,
			name: user.name,
		};
		console.log(channelId);
		console.log(channelData);
		this.props.setCurrentChannel(channelData);
		this.props.setPrivateChannel(true);
	};

	getChannelId = userId => {
		const currentUserId = this.state.user.uid;
		return userId < currentUserId ? `${userId}/${currentUserId}` : `${currentUserId}/${userId}`;
	};

	render() {
		const { users } = this.state;
		return (
			<Menu.Menu className='menu'>
				<Menu.Item>
					<span>Direct Messages</span>
				</Menu.Item>

				{users.map(user => (
					<Menu.Item
						key={user.uid}
						active={`${user.uid}/${this.state.user.uid}` === this.props.activeChannel}
						onClick={() => this.changeChannel(user)}
					>
						<Icon name='circle' color={this.isUserOnline(user) ? 'green' : 'red'} />
						{user.name}
					</Menu.Item>
				))}
			</Menu.Menu>
		);
	}
}

export default connect(null, { setCurrentChannel, setPrivateChannel })(DirectMessages);
