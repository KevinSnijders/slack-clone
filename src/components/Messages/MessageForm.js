import React, { Component } from 'react';
import { Segment, Input, Form } from 'semantic-ui-react';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import firebase from '../../firebase';

const validationSchema = Yup.object().shape({
	message: Yup.string()
		.min(1)
		.trim()
		.required(),
});

class MessageForm extends Component {
	createMessage = values => {
		const { user } = this.props;
		const message = {
			timestamp: firebase.database.ServerValue.TIMESTAMP,
			user: {
				id: user.uid,
				name: user.displayName,
				avatar: user.photoURL,
			},
			content: values.message,
		};

		return message;
	};

	sendMessage = values => {
		const { messagesRef, channel } = this.props;

		messagesRef
			.child(channel.id)
			.push()
			.set(this.createMessage(values))
			.then(() => {
				console.log('message created');
			})
			.catch(error => {
				console.log(error);
			});
	};

	render() {
		return (
			<Segment>
				<Formik
					initialValues={{ message: '' }}
					validationSchema={validationSchema}
					onSubmit={(values, { setSubmitting, resetForm }) => {
						if (values) {
							setSubmitting(true);
							this.sendMessage(values);
							resetForm();
							setSubmitting(false);
						}
					}}
				>
					{({ values, handleChange, handleBlur, handleSubmit }) => (
						<Form onSubmit={values.message.trim().length > 0 ? handleSubmit : null}>
							<Input
								fluid
								name='message'
								style={{ marginBottom: '0.7rem' }}
								labelPosition='left'
								placeholder={`Message #${
									this.props.channel !== null ? this.props.channel.name : ''
								}`}
								value={values.message}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</Form>
					)}
				</Formik>
			</Segment>
		);
	}
}

export default MessageForm;
