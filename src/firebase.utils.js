import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { findAllByTestId } from '@testing-library/react'

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

const fetchUserById = async uid => {
	const userDoc = await firebase
		.firestore()
		.collection('users')
		.doc(uid)
		.get()
	if (userDoc.exists) {
		return userDoc.data()
	}
	return null
}

const postQuestion = async ({
	uid,
	displayName,
	photoURL,
	question,
	category,
	discipline,
}) => {
	await firebase.firestore().collection('questions').add({
		uid,
		displayName,
		photoURL,
		question,
		category,
		discipline,
		createdAt: Date.now(),
	})
}

const fetchQuestions = async (start = 0) => {
	const questions = []
	try {
		const questionsRef = await firebase
			.firestore()
			.collection('questions')
			.orderBy('createdAt')
			.startAfter(start)
			.limit(20)
			.get()
		await Promise.all(
			questionsRef.docs.map(async questionDoc => {
				let upvotes = await firebase
					.firestore()
					.collection(`/questions/${questionDoc.id}/upvotes`)
					.get()
				if (upvotes.empty) {
					upvotes = []
				} else {
					upvotes = upvotes.docs
				}
				const question = {
					id: questionDoc.id,
					...questionDoc.data(),
					upvotes,
				}
				questions.push(question)
			})
		)
		return questions
	} catch (err) {
		console.log(err)
		return []
	}
}

const fetchQuestion = async questionId => {
	try {
		const questionDoc = await firebase
			.firestore()
			.doc(`/questions/${questionId}`)
			.get()
		let upvotesCollection = await firebase
			.firestore()
			.collection(`/questions/${questionId}/upvotes`)
			.get()
		if (upvotesCollection.empty) {
			upvotesCollection = []
		} else {
			upvotesCollection = upvotesCollection.docs
		}
		if (!questionDoc.exists) {
			return null
		}
		const question = {
			id: questionDoc.id,
			...questionDoc.data(),
			upvotes: upvotesCollection,
		}
		return question
	} catch (err) {
		console.log(err)
		return null
	}
}

const upvoteQuestion = async (uid, questionId) => {
	if (!uid) {
		return
	}
	try {
		await firebase
			.firestore()
			.collection(`/questions/${questionId}/upvotes`)
			.doc(uid)
			.set(
				{
					uid,
				},
				{ merge: true }
			)
		const questionDoc = await firebase
			.firestore()
			.doc(`/questions/${questionId}`)
			.get()
		let upvotes = await firebase
			.firestore()
			.collection(`/questions/${questionId}/upvotes`)
			.get()
		if (upvotes.empty) {
			upvotes = []
		} else {
			upvotes = upvotes.docs
		}
		return {
			id: questionDoc.id,
			...questionDoc.data(),
			upvotes,
		}
	} catch (err) {
		console.log(err)
		return null
	}
}

const deUpvoteQuestion = async (uid, questionId) => {
	try {
		await firebase
			.firestore()
			.collection(`/questions/${questionId}/upvotes`)
			.doc(uid)
			.delete()
		const questionDoc = await firebase
			.firestore()
			.doc(`/questions/${questionId}`)
			.get()
		let upvotes = await firebase
			.firestore()
			.collection(`/questions/${questionId}/upvotes`)
			.get()

		if (upvotes.empty) {
			upvotes = []
		} else {
			upvotes = upvotes.docs
		}
		return {
			id: questionDoc.id,
			...questionDoc.data(),
			upvotes,
		}
	} catch (err) {
		console.log(err)
		return null
	}
}

export {
	firebase,
	googleSignIn,
	googleSignOut,
	fetchUserById,
	postQuestion,
	fetchQuestions,
	fetchQuestion,
	upvoteQuestion,
	deUpvoteQuestion,
}
