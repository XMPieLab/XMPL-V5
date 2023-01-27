import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { useXmpl } from '../helpers/utils'
import ClubMemberLogo from './../assets/ClubMemberLogo.png'

/* eslint-disable jsx-a11y/anchor-is-valid */
function Main() {
	useXmpl()

	const location = useLocation()

	useEffect(() => {
		console.log('Location changed')
	}, [location])

	const [photo1, setPhoto1] = useState('')
	const [photo2, setPhoto2] = useState('')
	const [photo3, setPhoto3] = useState('')
	const [photo4, setPhoto4] = useState('')

	useEffect(() => {
		const xmpReady = () => {
			console.log(window.xmpProvider.store.xmp.r)
			setPhoto1(window.xmpProvider.store.xmp.r.photo1)
			setPhoto2(window.xmpProvider.store.xmp.r.photo2)
			setPhoto3(window.xmpProvider.store.xmp.r.photo3)
			setPhoto4(window.xmpProvider.store.xmp.r.photo4)
		}
		window.xmpProvider.addEventListener('load', xmpReady)
	}, [])

	useEffect(() => {
		return () => {
			window.xmpProvider.trackEvent.trackingLeave()
		}
	}, [])

	return (
		<div
			className='is-preload'
			xmp-personalized-controller=''
			xmp-cloak=''
			xmp-tracking-page-name='Landing Page'
		>
			<div id='wrapper'>
				<Header />

				<section id='banner' className='major'>
					<div className='inner'>
						<header className='major'>
							<h1>
								Hi <span xmp-text='xmp.r.firstname'></span>, welcome to Round
								Travel!
							</h1>
						</header>
						<div className='row'>
							<div className='content col-9 col-lg-6 col-md-12'>
								<p>
									Your personalized travel destination
									<br />
									brought to you by XMPie.
								</p>
								<ul className='actions'>
									<li>
										<a href='#one' className='button next scrolly'>
											Get Started
										</a>
									</li>
								</ul>
							</div>
							<div className='col-3 col-lg-6 col-md-12'>
								<img
									src={ClubMemberLogo}
									alt='Travel Club Member'
									xmp-show='xmp.r.isClubMember'
								/>
							</div>
						</div>
					</div>
				</section>

				<div id='main'>
					<section id='one' className='tiles'>
						<article style={{ background: `url(${photo1})` }}>
							<span className='image'>
								<img alt='' xmp-image-asset='xmp.r.photo1' />
							</span>
							<header className='major'>
								<h3>
									<Link
										to='/content'
										className='link'
										xmp-tracking-action='Clicked Content'
									>
										Excitement
									</Link>
								</h3>
								<p>Get out and about!</p>
							</header>
						</article>
						<article style={{ background: `url(${photo2})` }}>
							<span className='image'>
								<img alt='' xmp-image-asset='xmp.r.photo2' />
							</span>
							<header className='major'>
								<h3>
									<Link
										to='/content'
										className='link'
										xmp-tracking-action='Clicked Content'
									>
										Breathe
									</Link>
								</h3>
								<p>Take a break!</p>
							</header>
						</article>
						<article style={{ background: `url(${photo3})` }}>
							<span className='image'>
								<img alt='' xmp-image-asset='xmp.r.photo3' />
							</span>
							<header className='major'>
								<h3>
									<Link
										to='/content'
										className='link'
										xmp-tracking-action='Clicked Content'
									>
										Enjoy
									</Link>
								</h3>
								<p>Indulge in the best</p>
							</header>
						</article>
						<article style={{ background: `url(${photo4})` }}>
							<span className='image'>
								<img alt='' xmp-image-asset='xmp.r.photo4' />
							</span>
							<header className='major'>
								<h3>
									<a
										href='content.html'
										className='link'
										xmp-tracking-action='Clicked Content'
									>
										Relax
									</a>
								</h3>
								<p>Discover something new</p>
							</header>
						</article>
					</section>
					<section id='two' xmp-class='xmp.r.backgroundColor'>
						<div className='inner'>
							<header className='major'>
								<h2>About Round Travel</h2>
							</header>
							<p>
								At Round Travel we personalize the travel experience by offering
								the best destinations, tours and itineraries based on your
								preferences!
							</p>
							<ul className='actions'>
								<li>
									<Link
										to='/content'
										className='button next'
										xmp-tracking-action='Clicked Content'
									>
										Get Started
									</Link>
								</li>
							</ul>
						</div>
					</section>
				</div>

				<Contact />

				<Footer />
			</div>
		</div>
	)
}

export default Main
