import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyBUm7VDXmBH8HjHaOMSdvwtn_OkuQEY3GA',
	authDomain: 'cottonqna.firebaseapp.com',
	databaseURL: 'https://cottonqna.firebaseio.com',
	projectId: 'cottonqna',
	storageBucket: 'cottonqna.appspot.com',
	messagingSenderId: '674077307541',
	appId: '1:674077307541:web:215e7318e66aab12aba19c',
}

firebase.initializeApp(firebaseConfig)

const googleSignIn = () => {
	firebase
		.auth()
		.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
		.then(() => {
			const provider = new firebase.auth.GoogleAuthProvider()
			return firebase.auth().signInWithRedirect(provider)
		})
		.catch(err => {
			console.log(err)
		})
}

const googleSignOut = () => {
	console.log('signout')
	firebase.auth().signOut()
}

export { firebase, googleSignIn, googleSignOut }
