import firebase from '../firebase'

import { getDocStartAt, questionWithAnswersAndUpvotes } from '../firebase.utils'

const postQuestion = async ({
	uid,
	displayName,
	photoURL,
	question,
	category,
	discipline,
	tags,
}) => {
	await firebase.firestore().collection('questions').add({
		uid,
		displayName,
		photoURL,
		question,
		category,
		discipline,
		tags,
		createdAt: Date.now(),
	})
}

const fetchQuestion = async questionId => {
	try {
		const questionDoc = await firebase
			.firestore()
			.doc(`/questions/${questionId}`)
			.get()
		const question = questionWithAnswersAndUpvotes(questionDoc)
		return question
	} catch (err) {
		console.log(err)
		return null
	}
}

const searchQuestions = async (searchTerm = '') => {
	const questions = []
	try {
		let questionsRef = firebase
			.firestore()
			.collection('questions')
			.orderBy('createdAt', 'asc')
		if (searchTerm.length !== 0) {
			questionsRef = questionsRef
				.where('tags', 'array-contains', searchTerm)
				.limit(20)
		} else {
			questionsRef = questionsRef.limit(20)
		}
		let questionsCollection = await questionsRef.get()
		await Promise.all(
			questionsCollection.docs.map(async questionDoc => {
				const question = await questionWithAnswersAndUpvotes(
					questionDoc,
					true
				)
				questions.push(question)
			})
		)
		return questions
	} catch (err) {
		console.log(err)
		return []
	}
}

const fetchQuestions = async (start = 0) => {
	const questions = []
	const limit = 5
	const [newVisible, allLoaded] = await getDocStartAt(
		'questions',
		start,
		limit
	)
	try {
		let questionsRef
		if (newVisible) {
			questionsRef = await firebase
				.firestore()
				.collection('questions')
				.orderBy('createdAt', 'desc')
				.startAt(newVisible)
				.limit(limit)
				.get()
		} else {
			questionsRef = await firebase
				.firestore()
				.collection('questions')
				.orderBy('createdAt', 'desc')
				.limit(limit)
				.get()
		}

		for (let questionDoc of questionsRef.docs) {
			const question = await questionWithAnswersAndUpvotes(
				questionDoc,
				true
			)
			questions.push(question)
		}
		return { questions, allLoaded }
	} catch (err) {
		console.log(err)
		return { questions: [], allLoaded }
	}
}

const fetchQuestionsByUid = async (uid, start = 0) => {
	const questions = []
	const limit = 5
	const [newVisible, allLoaded] = await getDocStartAt(
		'questions',
		start,
		limit,
		uid
	)
	try {
		let questionsRef
		if (newVisible) {
			questionsRef = await firebase
				.firestore()
				.collection('questions')
				.where('uid', '==', uid)
				.orderBy('createdAt', 'desc')
				.startAt(newVisible)
				.limit(limit)
				.get()
		} else {
			questionsRef = await firebase
				.firestore()
				.collection('questions')
				.where('uid', '==', uid)
				.orderBy('createdAt', 'desc')
				.limit(limit)
				.get()
		}
		for (let questionDoc of questionsRef.docs) {
			const question = await questionWithAnswersAndUpvotes(questionDoc)
			questions.push(question)
		}
		return { questions, allLoaded }
	} catch (err) {
		console.log(err)
		return { questions: [], allLoaded }
	}
}

const updateQuestionFirebase = async ({
	id,
	question,
	category,
	discipline,
	tags,
}) => {
	try {
		await firebase.firestore().collection('questions').doc(id).set(
			{
				question,
				category,
				discipline,
				tags,
			},
			{ merge: true }
		)
		const questionDoc = await firebase
			.firestore()
			.doc(`/questions/${id}`)
			.get()
		const updatedQuestion = await questionWithAnswersAndUpvotes(questionDoc)
		return updatedQuestion
	} catch (err) {
		return null
	}
}

const deleteQuestionFirebase = async questionId => {
	try {
		await firebase.firestore().doc(`/questions/${questionId}`).delete()
		const answers = await firebase
			.firestore()
			.collection(`answers`)
			.where('questionId', '==', questionId)
			.get()
		const upvotes = await firebase
			.firestore()
			.collectionGroup('upvotes')
			.where('questionId', '==', questionId)
			.get()

		if (!upvotes.empty) {
			await Promise.all(
				upvotes.docs.map(async upvoteDoc => {
					await upvoteDoc.ref.delete()
				})
			)
		}
		if (!answers.empty) {
			await Promise.all(
				answers.docs.map(async answerDoc => {
					await answerDoc.ref.delete()
				})
			)
		}
	} catch (err) {
		console.log(err)
	}
}

const upvoteQuestion = async (uid, questionId) => {
	if (!uid || !questionId) {
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
					questionId,
				},
				{ merge: true }
			)
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
			id: questionId,
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
			id: questionId,
			upvotes,
		}
	} catch (err) {
		console.log(err)
		return null
	}
}

export {
	postQuestion,
	fetchQuestions,
	searchQuestions,
	fetchQuestionsByUid,
	fetchQuestion,
	updateQuestionFirebase,
	deleteQuestionFirebase,
	upvoteQuestion,
	deUpvoteQuestion,
}
