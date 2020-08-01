import React from 'react'

import './about.styles.scss'
import { Helmet } from 'react-helmet'

class AboutPage extends React.Component {
	render() {
		return (
			<div>
				<Helmet>
					<title>About Cotton Q & A</title>
				</Helmet>
				<p>
					Cotton Q & A is a site created for good people like you,
					where you can ask questions and find aswers from other
					students related to Cotton University. It is under
					continuous improvement and I am constantly working to add
					new features to it.
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
							target='_blank'
							rel='noopener noreferrer'>
							Baraja Swargiary
						</a>{' '}
						(5th sem student, CS & IT dept, Cotton University)
					</p>
					<h5 className='mt-4'>
						Thanks to our department students from Tech Club:
					</h5>
					<p>
						Reviricha Bora(Dept Representative), Daya, Sauvik Nath,
						Rohan Saikia, Abhilash Neog, Biku, Stuti Das, Ishika,
						Arnab
					</p>

					<h5 className='mt-4'>
						Thanks to Bodo Literary Society(BLS) for support:
					</h5>
					<p>Mathias Swargiary and other members.</p>
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
							help me improve and continue working on exciting
							projects like this.
						</p>
					</div>
					<p>
						UPI ID: <b>barajaswargiary4444@okicici</b>
						<br />
						Paytm Wallet: <b>8472901882</b>
					</p>
					<h5 className='text-center text-primary'>
						Thank you for visiting.
					</h5>
				</div>
			</div>
		)
	}
}

export default AboutPage
