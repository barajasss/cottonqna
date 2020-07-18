import UserActionTypes from './user.types'

const initialUserState = {
	displayName: '',
	email: '',
	photoURL: '',
	isLoggedIn: false,
}

const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case UserActionTypes.SET_USER:
			return {
				...state,
				...action.payload,
				isLoggedIn: true,
			}
		case UserActionTypes.UNSET_USER:
			return {
				...initialUserState,
			}
		default:
			return state
	}
}

export default userReducer
