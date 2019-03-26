/* eslint-disable quotes */
import * as firebase from 'firebase';
//import firestore from 'firebase/firestore';

const settings = {timestampsInSnapshots: true};

const config = {
	apiKey: "AIzaSyCG8MU8adHYFYW9R5YjbyMRasvsupwENC4",
	authDomain: "isprs-db.firebaseapp.com",
	databaseURL: "https://isprs-db.firebaseio.com",
	projectId: "isprs-db",
	storageBucket: "isprs-db.appspot.com",
	messagingSenderId: "17011336747"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
