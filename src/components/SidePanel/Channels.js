import React, { Component } from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import styled from 'styled-components';

const MenuItem = styled(Menu.Item)`
	padding: 0 !important;
`;

class Channels extends Component {
	constructor(props) {
		super(props);

		this.state = {
			channels: [],
			channel: {
				name: '',
				description: '',
			},
			showModal: false,
		};
	}

	openModal = () => this.setState({ showModal: true });

	closeModal = () => this.setState({ showModal: false });

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { channels, showModal } = this.state;
		return (
			<>
				<Menu.Menu style={{ paddingBottom: '2rem' }}>
					<MenuItem>
						<span>Channels</span>
						<Icon name='plus circle' onClick={this.openModal} />
					</MenuItem>
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
									<strong>Name</strong>
								</label>
								<Input
									iconPosition='left'
									placeholder='e.g. plan-budget'
									name='channelName'
									onChange={this.handleChange}
								>
									<Icon name='hashtag' />
									<input />
								</Input>
							</Form.Field>
							<Form.Field>
								<label>
									<strong>Description</strong> <span>(optional)</span>
								</label>
								<Input name='channelDetails' onChange={this.handleChange} />
							</Form.Field>
						</Form>
					</Modal.Content>
					<Modal.Actions>
						<Button>Create</Button>
					</Modal.Actions>
				</Modal>
			</>
		);
	}
}

export default Channels;
