const createTags = string => {
	let tags = string
		.toLowerCase()
		.replace('?', '')
		.split(/\s+/g)
		.filter(el => el !== '')

	// append next arrays to each element
	// tags = ["a", "b", "c"]
	// outputTags = ["a", "b", "c", "a b", "b c", "a b c"]

	let processedTags = []
	for (let i = 1; i <= tags.length; i++) {
		for (let j = 0; j < tags.length; j++) {
			if (j + i <= tags.length) {
				const reducedTag = tags.slice(j, j + i).join(' ')
				processedTags.push(reducedTag)
			}
		}
	}
	return processedTags
}

export { createTags }
