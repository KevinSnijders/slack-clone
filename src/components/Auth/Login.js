import React, { Component } from 'react';
import firebase from '../../firebase';

import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			error: '',
			loading: false,
		};
	}

	handleSubmit = event => {
		event.preventDefault();
		if (this.isFormValid(this.state)) {
			this.setState({ error: '', loading: true });
			firebase
				.auth()
				.signInWithEmailAndPassword(this.state.email, this.state.password)
				.then(signedInUses => {
					console.log(signedInUses);
				})
				.catch(error => {
					console.error(error);
					this.setState({
						error: error.message,
						loading: false,
					});
				});
		}
	};

	isFormValid = ({ email, password }) => email && password;

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleInputError = (error, inputName) => {
		return error.toLowerCase().includes(inputName) ? 'error' : '';
	};

	render() {
		const { email, password, error, loading } = this.state;
		return (
			<Grid textAlign='center' verticalAlign='middle'>
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as='h1' icon color='red' textAlign='center'>
						<Icon name='linux' color='red' />
						Login to DevChat
					</Header>
					{error.length > 0 && (
						<Message error>
							<h3>Error</h3>
							<p>{error}</p>
						</Message>
					)}
					<Form onSubmit={this.handleSubmit} size='large'>
						<Segment stacked>
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
							Don't have an account? <Link to='/register'>Register</Link>
						</Message>
					</Form>
				</Grid.Column>
			</Grid>
		);
	}
}

export default Login;
