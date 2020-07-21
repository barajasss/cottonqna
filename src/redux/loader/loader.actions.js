import LoaderActionTypes from './loader.types'

const setLoading = () => ({
	type: LoaderActionTypes.SET_LOADING,
})

const unsetLoading = () => ({
	type: LoaderActionTypes.UNSET_LOADING,
})

export { setLoading, unsetLoading }
