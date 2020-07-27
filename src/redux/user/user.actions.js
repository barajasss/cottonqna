import firebase from '../../firebase/firebase'
import UserActionTypes from './user.types'

const setUser = user => ({
	type: UserActionTypes.SET_USER,
	payload: user,
})

const unsetUser = () => ({
	type: UserActionTypes.UNSET_USER,
})

const updateUser = user => async dispatch => {
	if (!user) {
		return dispatch(unsetUser())
	}
	const { uid, displayName, photoURL, email } = user
	const userData = {
		uid,
		displayName,
		photoURL,
		email,
	}
	await firebase
		.firestore()
		.collection('users')
		.doc(user.uid)
		.set(
			{
				...userData,
			},
			{
				merge: true,
			}
		)
	dispatch(setUser(userData))
}

export { setUser, unsetUser, updateUser }
