import React from 'react'
import './myquestion.styles.scss'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Question from '../../components/question/question.component'
import EditQuestion from '../../components/edit-question/edit-question.component'

import { fetchByUidAndUpdateQuestions } from '../../redux/question/question.actions'

class MyQuestionPage extends React.Component {
	componentDidMount = async () => {
		const {
			fetchByUidAndUpdateQuestions,
			user: { uid },
		} = this.props
		await fetchByUidAndUpdateQuestions(uid)
	}
	render() {
		const {
			questions,
			user: { isLoggedIn },
		} = this.props
		return (
			<div>
				<Helmet>
					<title>My Questions</title>
				</Helmet>
				<h3 className='pb-3 border-bottom'>My Questions</h3>
				{!isLoggedIn ? <Redirect to='/' /> : ''}
				{questions.map(question => (
					<div key={question.id}>
						<Question {...question} />
						<EditQuestion {...question} />
					</div>
				))}
			</div>
		)
	}
}

const mapStateToProps = ({ questions, user }) => ({
	questions,
	user,
})

const mapDispatchToProps = dispatch => ({
	fetchByUidAndUpdateQuestions: uid =>
		dispatch(fetchByUidAndUpdateQuestions(uid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyQuestionPage)
