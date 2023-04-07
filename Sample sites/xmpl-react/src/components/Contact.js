import { useState } from 'react'
import { useXmpl } from '../helpers/utils'

export const Contact = () => {
	const [isShowThanksBlog, setIsShowThanksBlog] = useState(false)
  useXmpl()

	window.hideForm = () => {
		setIsShowThanksBlog(true)
    window.xmpProvider.bind(document.body).render()
	}
	return (
		<section id='contact'>
			<div className='inner'>
				<section>
					<h2>Interested? Like more information?</h2>
						<div style={{display: !isShowThanksBlog ? 'block' : 'none'}}>
							<p>Confirm your contact details below:</p>
							<form xmp-update='true'>
								<div className='fields'>
									<div className='field half'>
										<label htmlFor='firstname'>First Name</label>
										<input
											type='text'
											name='firstname'
											id='firstname'
											xmp-write-ador='xmp.r.firstname'
										/>
									</div>
									<div className='field half'>
										<label htmlFor='lastname'>Last Name</label>
										<input
											type='text'
											name='lastname'
											id='lastname'
											xmp-write-ador='xmp.r.lastname'
										/>
									</div>
									<div className='field'>
										<label htmlFor='email'>Email</label>
										<input
											type='text'
											name='email'
											id='email'
											xmp-write-ador='xmp.r.email'
										/>
									</div>
									<input
										type='hidden'
										id='followup'
										name='followup'
										xmp-write-ador='xmp.r.followup'
										xmp-default-value='true'
									/>
								</div>
								<ul className='actions'>
									<li>
										<input
											type='submit'
											value='Send me more information'
											className='primary'
											xmp-success-js='hideForm()'
											xmp-tracking-action='Requested Follup:CTA'
										/>
									</li>
								</ul>
							</form>
						</div>
						<div style={{display: isShowThanksBlog ? 'block' : 'none'}}>
							<h4>Thanks! </h4>
							<p>
								We have received your request for more information <br />
								and one of our <span xmp-text='xmp.r.preference'></span>{' '}
								specialists <br />
								will be in contact as soon as possible.
							</p>
						</div>
				</section>
				<section className='split'>
					<section>
						<div className='contact-method'>
							<span className='icon solid alt fa-envelope'></span>
							<h3>Email</h3>
							<a
								href='mailto:information@untitled.tld'
								xmp-tracking-action='Clicked Email Link'
							>
								information@untitled.tld
							</a>
						</div>
					</section>
					<section>
						<div className='contact-method'>
							<span className='icon solid alt fa-phone'></span>
							<h3>Phone</h3>
							<span>(000) 000-0000 x12387</span>
						</div>
					</section>
					<section>
						<div className='contact-method'>
							<span className='icon solid alt fa-home'></span>
							<h3>Address</h3>
							<span>
								1234 Somewhere Road #5432
								<br />
								Nashville, TN 00000
								<br />
								United States of America
							</span>
						</div>
					</section>
				</section>
			</div>
		</section>
	)
}
