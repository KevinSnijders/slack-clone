import React, { Component } from 'react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { setCurrentChannel } from '../../actions/index';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

const MenuItem = styled(Menu.Item)`
	padding: 0 !important;
`;

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.max(80, "Channel names can't be longer than 80 characters")
		.required('Don’t forget to name your channel'),
	description: Yup.string().max(250, "This field can't be more than 250 characters"),
});
class Channels extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: this.props.currentUser,
			activeChannel: '',
			channels: [],
			channelsRef: firebase.database().ref('channels'),
			channel: {
				name: '',
				description: '',
			},
			showModal: false,
			firstLoad: true,
		};
	}

	componentDidMount() {
		this.addListeners();
	}

	componentWillUnmount() {
		this.removeListeners();
	}

	addListeners = () => {
		let loadedChannels = [];
		const { channelsRef } = this.state;
		channelsRef.on('child_added', snap => {
			loadedChannels.push(snap.val());
			this.setState({ channels: loadedChannels }, () => this.setFirstChannel());
		});
	};

	removeListeners = () => {
		const { channelsRef } = this.state;
		channelsRef.off();
	};

	openModal = () => this.setState({ showModal: true });

	closeModal = () => this.setState({ showModal: false, error: '' });

	addChannel = ({ name, description }) => {
		const { user, channelsRef } = this.state;
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
				this.changeChannel(newChannel);
				this.closeModal();
				console.log('channel created');
			})
			.catch(error => console.error(error));
	};

	changeChannel = channel => {
		this.setActiveChannel(channel);
		this.props.setCurrentChannel(channel);
	};

	setFirstChannel = () => {
		const { firstLoad, channels } = this.state;
		if (firstLoad && channels.length > 0) {
			const firstChannel = channels[0];
			this.props.setCurrentChannel(firstChannel);
			this.setActiveChannel(firstChannel);
		}
		this.setState({ firstLoad: false });
	};

	setActiveChannel = channel => {
		this.setState({ activeChannel: channel.id });
	};

	handleKeyDown = event => {
		// No spaces are allowed in the channel name
		const spaceKey = 32;
		if (event.keyCode === spaceKey) {
			event.preventDefault();
			return false;
		}
	};

	displayChannels = channels =>
		channels.length > 0 &&
		channels.map(channel => (
			<MenuItem
				key={channel.id}
				onClick={() => this.changeChannel(channel)}
				name={channel.name}
				style={{ opacity: 0.7 }}
				active={channel.id === this.state.activeChannel}
			>
				# {channel.name}
			</MenuItem>
		));

	render() {
		const { channels, channel, showModal } = this.state;
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
						<Formik
							initialValues={channel}
							validationSchema={validationSchema}
							onSubmit={(values, { setSubmitting, resetForm }) => {
								setSubmitting(true);
								this.addChannel(values);
								resetForm();
								setSubmitting(false);
							}}
						>
							{({
								values,
								errors,
								touched,
								handleChange,
								handleBlur,
								handleSubmit,
								isValid,
								isSubmitting,
							}) => (
								<Form onSubmit={handleSubmit}>
									<Form.Field>
										<label>
											<strong>Name</strong> &nbsp;
											<ErrorMessage name='name' />
										</label>
										<Input
											iconPosition='left'
											placeholder='e.g. plan-budget'
											name='name'
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.name}
											onKeyDown={this.handleKeyDown}
										>
											<Icon name='hashtag' />
											<input />
										</Input>
									</Form.Field>
									<Form.Field>
										<label>
											<strong>Description</strong> <span>(optional)</span> &nbsp;
											<ErrorMessage name='description' />
										</label>
										<Input
											name='description'
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.description}
											className={touched.description && errors.description ? 'error' : null}
										/>
									</Form.Field>
									<Button
										type='submit'
										disabled={isValid && values.name.length > 0 ? false : true || isSubmitting}
									>
										Create
									</Button>
								</Form>
							)}
						</Formik>
					</Modal.Content>
					<Modal.Actions></Modal.Actions>
				</Modal>
			</>
		);
	}
}

export default connect(null, { setCurrentChannel })(Channels);
