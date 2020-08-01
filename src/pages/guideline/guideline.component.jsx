import React from 'react'
import { Helmet } from 'react-helmet'
import './guideline.styles.scss'

class GuidelinePage extends React.Component {
	render() {
		return (
			<div>
				<Helmet>
					<title>Guidelines Cotton Q & A</title>
				</Helmet>
				<h3>Guidelines and Usage</h3>
				<p>
					These guidelines are meant to help everyone and avoid
					troubles and problems.
				</p>
				<ol className='pl-4 guidelines'>
					<li>
						Please don't use any disrespectful words in your
						answer/questions.
					</li>
					<li>
						Always ask meaningful and helpful questions related to
						Cotton University.
					</li>
					<li>
						You are a part of this community so, ask questions that
						you don't know and answer those that you know.
					</li>
					<li>
						You can find edit/delete options for your questions and
						answers from menu option.
					</li>
					<li>
						You can find edit and delete options for your questions
						and answers from menu option.
					</li>
					<li>
						Use the search feature to find the question you are
						looking for.
					</li>
					<li>
						This is a Progressive Web App. Click "Add to homescreen"
						from three dots at the top right to install it and get
						app like experience.
					</li>
					<li>
						For any troubles or queries report to{' '}
						<b>barajaswargiary4444@gmail.com</b>
					</li>
				</ol>
			</div>
		)
	}
}

export default GuidelinePage
