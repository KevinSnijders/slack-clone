import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Spinner from './components/Loading/Spinner';
import * as serviceWorker from './serviceWorker';

import firebase from './firebase';

import { ThemeProvider } from 'styled-components/macro';
import { GlobalStyle } from './theme/global';
import { light } from './theme/theme';
import 'semantic-ui-css/semantic.min.css';

import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/index';
import { setUser, setTheme } from './actions/index';

const store = createStore(rootReducer, composeWithDevTools());

class Root extends Component {
	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.props.setUser(user);
				this.props.history.push('/');
			}
		});
	}

	setCurrentTheme(theme) {
		const themeObj = this.props.setTheme(theme);
		return themeObj.payload.theme;
	}

	render() {
		console.log(this.props.isLoading);
		return this.props.isLoading ? (
			<Spinner />
		) : (
			<ThemeProvider theme={this.setCurrentTheme(light)}>
				<GlobalStyle />
				<Switch>
					<Route exact path='/' component={App} />
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
				</Switch>
			</ThemeProvider>
		);
	}
}

const mapStateToProps = state => ({
	isLoading: state.user.isLoading,
});

const RootWithAuth = withRouter(connect(mapStateToProps, { setUser, setTheme })(Root));

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<RootWithAuth />
		</Router>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
