import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import MessagesHeader from './MessageHeader';
import MessageForm from './MessageForm';
import Message from './Message';
import styled from 'styled-components';
import Firebase from '../../firebase';

const MessagesWrapper = styled('div')`
	height: 44rem;
	overflow-y: auto;
`;

class Messages extends Component {
	constructor(props) {
		super(props);

		this.state = {
			messagesRef: Firebase.database().ref('messages'),
			channel: this.props.currentChannel,
			user: this.props.currentUser,
			messages: [],
			messagesLoading: true,
		};
	}

	componentDidMount() {
		const { channel, user } = this.state;
		if (channel && user) {
			this.addListeners(channel.id);
		}
	}

	componentWillUnmount() {
		this.removeListeners();
	}

	addListeners = channelId => {
		this.addMessageListeners(channelId);
	};

	addMessageListeners = channelId => {
		const loadedMessages = [];
		this.state.messagesRef.child(channelId).on('child_added', snap => {
			loadedMessages.push(snap.val());
			this.setState({
				messages: loadedMessages,
				messagesLoading: false,
			});
		});
	};

	removeListeners = () => {
		const { messagesRef } = this.state;
		messagesRef.off();
	};

	displayMessages = messages =>
		messages.length > 0 &&
		messages.map(message => (
			<Message key={message.timestamp} message={message} user={this.state.user} />
		));

	render() {
		const { messagesRef, user, channel, messages } = this.state;
		return (
			<>
				<MessagesHeader channel={channel} />

				<Segment>
					<MessagesWrapper>{this.displayMessages(messages)}</MessagesWrapper>
				</Segment>

				<MessageForm messagesRef={messagesRef} user={user} channel={channel} />
			</>
		);
	}
}

export default Messages;
