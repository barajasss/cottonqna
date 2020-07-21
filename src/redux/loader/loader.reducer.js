import LoaderActionTypes from './loader.types'

const initialLoaderState = false

const loaderReducer = (state = initialLoaderState, action) => {
	switch (action.type) {
		case LoaderActionTypes.SET_LOADING:
			return true

		case LoaderActionTypes.UNSET_LOADING:
			return false
		default:
			return state
	}
}

export default loaderReducer
