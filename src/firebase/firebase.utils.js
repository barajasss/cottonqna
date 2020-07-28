import firebase from './firebase'

const getDocStartAt = async (collection, options) => {
	const { start = 0, limit = 5, id } = options
	let totalDocs
	if (id) {
		totalDocs = (
			await firebase
				.firestore()
				.collection(collection)
				.where(id.name, '==', id.value)
				.get()
		).docs.length
	} else {
		totalDocs = (await firebase.firestore().collection(collection).get())
			.docs.length
	}
	let allLoaded = false
	let newVisible, first
	if (start !== 0) {
		if (id) {
			first = await firebase
				.firestore()
				.collection(collection)
				.where(id.name, '==', id.value)
				.orderBy('createdAt', 'desc')
				.limit(start + 1)
				.get()
		} else {
			first = await firebase
				.firestore()
				.collection(collection)
				.orderBy('createdAt', 'desc')
				.limit(start + 1)
				.get()
		}
		newVisible = first.docs[first.docs.length - 1]
	}
	if (totalDocs <= start + limit) {
		allLoaded = true
	}
	return [newVisible, allLoaded]
}

const questionWithAnswersAndUpvotes = async (
	questionDoc,
	getFirstAnswer = false
) => {
	if (!questionDoc.exists) {
		return null
	}
	let answers = await firebase
		.firestore()
		.collection('answers')
		.where('questionId', '==', questionDoc.id)
		.get()
	let upvotesCollection = await firebase
		.firestore()
		.collection(`/questions/${questionDoc.id}/upvotes`)
		.get()
	if (upvotesCollection.empty) {
		upvotesCollection = []
	} else {
		upvotesCollection = upvotesCollection.docs
	}
	const question = {
		id: questionDoc.id,
		...questionDoc.data(),
		upvotes: upvotesCollection,
		firstAnswer: null,
		answerCount: answers.docs.length,
	}
	if (getFirstAnswer && !answers.empty) {
		let firstAnswerUpvotes = await firebase
			.firestore()
			.collection(`/answers/${answers.docs[0].id}/upvotes`)
			.get()
		if (firstAnswerUpvotes.empty) {
			firstAnswerUpvotes = []
		} else {
			firstAnswerUpvotes = firstAnswerUpvotes.docs
		}
		question.firstAnswer = {
			id: answers.docs[0].id,
			...answers.docs[0].data(),
			upvotes: firstAnswerUpvotes,
		}
	}
	return question
}

const answerWithUpvotes = async answerDoc => {
	let upvotes = await firebase
		.firestore()
		.collection(`/answers/${answerDoc.id}/upvotes`)
		.get()
	if (upvotes.empty) {
		upvotes = []
	} else {
		upvotes = upvotes.docs
	}
	const answer = {
		id: answerDoc.id,
		...answerDoc.data(),
		upvotes,
	}
	return answer
}

export { getDocStartAt, questionWithAnswersAndUpvotes, answerWithUpvotes }
