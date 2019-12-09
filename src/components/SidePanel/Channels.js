import React, { Component } from 'react';
import firebase from '../../firebase';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import styled from 'styled-components';

const MenuItem = styled(Menu.Item)`
	padding: 0 !important;
`;

class Channels extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: this.props.currentUser,
			channels: [],
			channelsRef: firebase.database().ref('channels'),
			channel: {
				name: '',
				description: '',
			},
			showModal: false,
			canSubmit: false,
			error: '',
		};
	}

	componentDidMount() {
		this.addListeners();
	}

	addListeners = () => {
		let loadedChannels = [];
		const { channelsRef } = this.state;
		channelsRef.on('child_added', snap => {
			loadedChannels.push(snap.val());
			this.setState({ channels: loadedChannels });
		});
	};

	openModal = () => this.setState({ showModal: true });

	closeModal = () => this.setState({ showModal: false, error: '' });

	addChannel = () => {
		console.log('add channel');
		const { user, channelsRef } = this.state;
		const { name, description = '' } = this.state.channel;
		const key = channelsRef.push().key;

		const newChannel = {
			id: key,
			name,
			description,
			createdBy: {
				name: user.displayName,
				avatar: user.photoURL,
			},
		};

		console.log(newChannel);

		channelsRef
			.child(key)
			.update(newChannel)
			.then(() => {
				this.setState({ channel: { name: '', description: '' } });
				this.closeModal();
				console.log('channel created');
			})
			.catch(error => console.error(error));
	};

	handleChange = event => {
		this.setState({ channel: { [event.target.name]: event.target.value } }, () => {
			this.validateInputField(this.state.channel);
		});
	};

	handleKeyDown = event => {
		// No spaces are allowed in the channel name
		const spaceKey = 32;
		if (event.keyCode === spaceKey) {
			event.preventDefault();
			return false;
		}
	};

	handleSumbit = event => {
		event.preventDefault();
		if (this.state.canSubmit) {
			this.addChannel();
		}
	};

	validateInputField = ({ name, description }) => {
		//TODO fix validation for fields instead of a field
		if (name) {
			this.setState({ canSubmit: true, error: '' });
		} else {
			this.setState({ canSubmit: false });
			this.handleChannelNameErrors(name);
		}
	};

	handleChannelNameErrors = name => {
		if (name !== undefined && name.length === 0) {
			this.handleInputError('Don’t forget to name your channel');
		}
	};

	handleInputError = message => {
		this.setState({
			error: message,
		});
	};

	displayChannels = channels =>
		channels.length > 0 &&
		channels.map(channel => (
			<MenuItem key={channel.id} name={channel.name} style={{ opacity: 0.7 }}>
				# {channel.name}
			</MenuItem>
		));

	render() {
		const { channels, showModal, canSubmit, error } = this.state;
		return (
			<>
				<Menu.Menu style={{ paddingBottom: '2rem' }}>
					<MenuItem onClick={this.openModal}>
						<span>Channels</span>
						<Icon name='plus circle' />
					</MenuItem>
					{this.displayChannels(channels)}
				</Menu.Menu>
				<Modal size='tiny' open={showModal} onClose={this.closeModal}>
					<Modal.Header>
						<strong>Create a Channel</strong>
					</Modal.Header>
					<Modal.Content>
						<p>
							Channels are where your team communicates. They’re best when organized around a topic
							— #marketing, for example.
						</p>
						<Form>
							<Form.Field>
								<label>
									<strong>Name</strong> {!canSubmit ? <span>{error}</span> : ''}
								</label>
								<Input
									iconPosition='left'
									placeholder='e.g. plan-budget'
									name='name'
									onChange={this.handleChange}
									onKeyDown={this.handleKeyDown}
								>
									<Icon name='hashtag' />
									<input />
								</Input>
							</Form.Field>
							<Form.Field>
								<label>
									<strong>Description</strong> <span>(optional)</span>
								</label>
								<Input name='description' onChange={this.handleChange} />
							</Form.Field>
						</Form>
					</Modal.Content>
					<Modal.Actions>
						<Button disabled={!canSubmit} onClick={this.handleSumbit}>
							Create
						</Button>
					</Modal.Actions>
				</Modal>
			</>
		);
	}
}

export default Channels;
