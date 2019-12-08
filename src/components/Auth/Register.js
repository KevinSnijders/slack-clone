import React, { Component } from 'react';
import firebase from '../../firebase';
import md5 from 'md5';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

const RegisterGrid = styled(Grid)`
	height: 100vh;
	background: #eee;
`;

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			error: '',
			loading: false,
			usersRef: firebase.database().ref('users'),
		};
	}
	isFormValid = () => {
		if (this.isFormEmpty(this.state)) {
			this.setState({ error: 'Fill in all fields' });
			return false;
		} else if (!this.isPasswordValid(this.state)) {
			this.setState({ error: 'Password is invalid' });
		} else {
			return true;
		}
	};

	isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
		return !username.length || !email.length || !password.length || !passwordConfirmation.length;
	};

	isPasswordValid = ({ password, passwordConfirmation }) => {
		const minimalLength = 6;
		if (password.length < minimalLength || passwordConfirmation.length < minimalLength) {
			return false;
		} else if (password !== passwordConfirmation) {
			return false;
		} else {
			return true;
		}
	};

	handleSubmit = event => {
		event.preventDefault();
		if (this.isFormValid()) {
			const { username, email, password } = this.state;
			this.setState({ error: '', loading: true });
			firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then(createdUser => {
					createdUser.user
						.updateProfile({
							displayName: username,
							photoURL: `https://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon}`,
						})
						.then(() => {
							this.saveUser(createdUser).then(() => {
								console.log('user saved');
								this.setState({ loading: false });
							});
						})
						.catch(error => {
							console.log(error);
							this.setState({ error: error.message, loading: false });
						});
				})
				.catch(error => {
					console.error(error);
					this.setState({ error: error.message, loading: false });
				});
		}
	};

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	saveUser = createdUser => {
		return this.state.usersRef.child(createdUser.user.uid).set({
			name: createdUser.user.displayName,
			avatar: createdUser.user.photoURL,
		});
	};

	handleInputError = (error, inputName) => {
		return error.toLowerCase().includes(inputName) ? 'error' : '';
	};

	render() {
		const { username, email, password, passwordConfirmation, error, loading } = this.state;
		return (
			<RegisterGrid textAlign='center' verticalAlign='middle'>
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as='h1' icon color='red' textAlign='center'>
						<Icon name='linux' color='red' />
						Register for DevChat
					</Header>
					{error.length > 0 && (
						<Message error>
							<h3>Error</h3>
							<p>{error}</p>
						</Message>
					)}
					<Form onSubmit={this.handleSubmit} size='large'>
						<Segment raised>
							<Form.Input
								fluid
								name='username'
								icon='user'
								iconPosition='left'
								placeholder='Username'
								value={username}
								onChange={this.handleChange}
								type='text'
							/>
							<Form.Input
								fluid
								name='email'
								icon='mail'
								iconPosition='left'
								placeholder='Email Address'
								value={email}
								onChange={this.handleChange}
								className={this.handleInputError(error, 'email')}
								type='email'
							/>
							<Form.Input
								fluid
								name='password'
								icon='lock'
								iconPosition='left'
								placeholder='Password'
								value={password}
								onChange={this.handleChange}
								className={this.handleInputError(error, 'password')}
								type='password'
							/>
							<Form.Input
								fluid
								name='passwordConfirmation'
								icon='repeat'
								iconPosition='left'
								placeholder='Password Confirmation'
								value={passwordConfirmation}
								onChange={this.handleChange}
								className={this.handleInputError(error, 'password')}
								type='password'
							/>
							<Button
								disabled={loading}
								className={loading ? 'loading' : ''}
								color='red'
								fluid
								size='large'
							>
								Submit
							</Button>
						</Segment>
						<Message>
							Already a user ? <Link to='/login'>Login</Link>
						</Message>
					</Form>
				</Grid.Column>
			</RegisterGrid>
		);
	}
}

export default Register;
