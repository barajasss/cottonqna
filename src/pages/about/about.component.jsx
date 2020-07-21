import React from 'react'

import './about.styles.scss'

class AboutPage extends React.Component {
	render() {
		return (
			<div>
				<p>
					Cotton Q & A is a site created for good people like you,
					where you can ask questions and find aswers from other
					students related to Cotton University.
				</p>
				<p>
					It was designed to help students resolve their doubts and
					questions all in one place.
				</p>
				<div>
					<h5>Founder:</h5>
					<p>
						<a
							href='https://www.facebook.com/baraja.swargiary'
							target='_blank'>
							Baraja Swargiary
						</a>{' '}
						(5th sem student, CS & IT dept, Cotton University)
					</p>
					<h5>Email: </h5>
					<p>barajaswargiary4444@gmail.com</p>
				</div>
				<div>
					<h5>Credits:</h5>
					<ul>
						<li>CS & IT department</li>
						<li>Supporters, team members and friends.</li>
						<li>Tech Club Group, CS & IT</li>
					</ul>
				</div>
				<div>
					<h5 className='my-2'>Project Support and Donation:</h5>
					<div>
						<p>
							With every project, I have to spend hours of time
							and cost on making this possible. Any amount of
							support or donation that you provide will greatly
							help me grow and continue working on exciting
							projects like this.
						</p>
						<table className='table table-striped table-bordered'>
							<tr>
								<td>Member Supporter</td>
								<td>1 - 50 rs</td>
							</tr>
							<tr>
								<td>Team Supporter</td>
								<td>50 - 200 rs</td>
							</tr>
							<tr>
								<td>Project Supporter</td>
								<td>200 - 500 rs</td>
							</tr>
							<tr>
								<td>VIP Supporter</td>
								<td>500 rs and above</td>
							</tr>
						</table>
						<p>
							Project and VIP supporters will be listed on this
							page.
						</p>
					</div>
					<p>
						UPI ID: <b>barajaswargiary4444@okicici</b>
						<br />
						Paytm Wallet: <b>8472901882</b>
					</p>
				</div>
			</div>
		)
	}
}

export default AboutPage
