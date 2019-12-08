import React from 'react';
import { Grid } from 'semantic-ui-react';
import SidePanel from './SidePanel/SidePanel';

import { connect } from 'react-redux';
const App = ({ currentUser }) => {
	return (
		<Grid columns='equal' className='app' style={{ background: '#eee' }}>
			<SidePanel currentUser={currentUser} />
		</Grid>
	);
};

const mapStateToProps = state => ({
	currentUser: state.user.currentUser,
});
export default connect(mapStateToProps)(App);
