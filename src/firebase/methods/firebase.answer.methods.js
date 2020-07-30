import firebase from '../firebase'

import { answerWithUpvotes, getDocStartAt } from '../firebase.utils'

const postAnswer = async ({
	uid,
	questionId,
	displayName,
	photoURL,
	answer,
}) => {
	const answerDoc = await firebase.firestore().collection('answers').add({
		uid,
		questionId,
		displayName,
		photoURL,
		answer,
		createdAt: Date.now(),
	})
	const answerDocData = await firebase
		.firestore()
		.collection('answers')
		.doc(answerDoc.id)
		.get()
	await firebase
		.firestore()
		.collection('questions')
		.doc(questionId)
		.update({
			answerCount: firebase.firestore.FieldValue.increment(1),
		})
	const answerData = {
		id: answerDoc.id,
		...answerDocData.data(),
		upvotes: [],
	}
	return answerData
}

const fetchAnswers = async (questionId, start = 0) => {
	const answers = []
	const limit = 5
	const [newVisible, allLoaded] = await getDocStartAt('answers', {
		start,
		limit,
		id: {
			name: 'questionId',
			value: questionId,
		},
	})
	let answersRef
	try {
		if (newVisible) {
			answersRef = await firebase
				.firestore()
				.collection('answers')
				.where('questionId', '==', questionId)
				.orderBy('createdAt', 'desc')
				.startAt(newVisible)
				.limit(limit)
				.get()
		} else {
			answersRef = await firebase
				.firestore()
				.collection('answers')
				.where('questionId', '==', questionId)
				.orderBy('createdAt', 'desc')
				.limit(limit)
				.get()
		}

		for (let answerDoc of answersRef.docs) {
			const answer = await answerWithUpvotes(answerDoc)
			answers.push(answer)
		}
		return { answers, allLoaded }
	} catch (err) {
		console.log(err)
		return { answers: [], allLoaded }
	}
}

const fetchAnswersByUid = async (uid, start = 0) => {
	const answers = []
	const limit = 5
	const [newVisible, allLoaded] = await getDocStartAt('answers', {
		start,
		limit,
		id: {
			name: 'uid',
			value: uid,
		},
	})
	try {
		let answersRef
		if (newVisible) {
			answersRef = await firebase
				.firestore()
				.collection('answers')
				.where('uid', '==', uid)
				.orderBy('createdAt', 'desc')
				.startAt(newVisible)
				.limit(limit)
				.get()
		} else {
			answersRef = await firebase
				.firestore()
				.collection('answers')
				.where('uid', '==', uid)
				.orderBy('createdAt', 'desc')
				.limit(limit)
				.get()
		}

		await Promise.all(
			answersRef.docs.map(async answerDoc => {
				const answer = await answerWithUpvotes(answerDoc)
				answers.push(answer)
			})
		)
		return { answers, allLoaded }
	} catch (err) {
		console.log(err)
		return { answers: [], allLoaded }
	}
}

const updateAnswerFirebase = async ({ id, answer }) => {
	try {
		await firebase
			.firestore()
			.collection('answers')
			.doc(id)
			.set({ answer }, { merge: true })
		const answerDoc = await firebase.firestore().doc(`/answers/${id}`).get()
		const updatedAnswer = await answerWithUpvotes(answerDoc)
		return updatedAnswer
	} catch (err) {
		return null
	}
}

const deleteAnswerFirebase = async answerId => {
	try {
		const answer = await firebase
			.firestore()
			.doc(`/answers/${answerId}`)
			.get()
		await firebase
			.firestore()
			.collection('questions')
			.doc(answer.data().questionId)
			.update({
				answerCount: firebase.firestore.FieldValue.increment(-1),
			})
		await firebase.firestore().doc(`/answers/${answerId}`).delete()
		const upvotes = await firebase
			.firestore()
			.collectionGroup('upvotes')
			.where('answerId', '==', answerId)
			.get()

		if (!upvotes.empty) {
			await Promise.all(
				upvotes.docs.map(async upvoteDoc => {
					await upvoteDoc.ref.delete()
				})
			)
		}
	} catch (err) {
		console.log(err)
	}
}

const upvoteAnswer = async (uid, questionId, answerId) => {
	if (!uid || !questionId || !answerId) {
		return
	}
	try {
		await firebase
			.firestore()
			.collection(`/answers/${answerId}/upvotes`)
			.doc(uid)
			.set(
				{
					uid,
					questionId,
					answerId,
				},
				{ merge: true }
			)
		let upvotes = await firebase
			.firestore()
			.collection(`/answers/${answerId}/upvotes`)
			.get()
		if (upvotes.empty) {
			upvotes = []
		} else {
			upvotes = upvotes.docs
		}
		return {
			id: answerId,
			upvotes,
		}
	} catch (err) {
		console.log(err)
		return null
	}
}

const deUpvoteAnswer = async (uid, answerId) => {
	try {
		await firebase
			.firestore()
			.collection(`/answers/${answerId}/upvotes`)
			.doc(uid)
			.delete()
		let upvotes = await firebase
			.firestore()
			.collection(`/answers/${answerId}/upvotes`)
			.get()

		if (upvotes.empty) {
			upvotes = []
		} else {
			upvotes = upvotes.docs
		}
		return {
			id: answerId,
			upvotes,
		}
	} catch (err) {
		console.log(err)
		return null
	}
}

export {
	postAnswer,
	fetchAnswers,
	fetchAnswersByUid,
	updateAnswerFirebase,
	deleteAnswerFirebase,
	upvoteAnswer,
	deUpvoteAnswer,
}
