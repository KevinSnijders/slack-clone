import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
	apiKey: 'AIzaSyBemKkQZEFMNzSnRJRKXGVy5FldGAul2fk',
	authDomain: 'slack-44daf.firebaseapp.com',
	databaseURL: 'https://slack-44daf.firebaseio.com',
	projectId: 'slack-44daf',
	storageBucket: 'slack-44daf.appspot.com',
	messagingSenderId: '667076450366',
	appId: '1:667076450366:web:c8d9d21684af928c90996f',
	measurementId: 'G-9H3GS2C7Y5',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
