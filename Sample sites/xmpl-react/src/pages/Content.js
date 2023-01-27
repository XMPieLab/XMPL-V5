/* eslint-disable react/style-prop-object */
import { useEffect } from 'react'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { useXmpl } from '../helpers/utils'

export const Content = () => {
  useXmpl()

  useEffect(() => {
		return () => {
			window.xmpProvider.trackEvent.trackingLeave()
		}
	}, [])

	return (
		<div
			className='is-preload'
			xmp-personalized-controller="true"
			xmp-tracking-page-name='Content Page'
		>
			<div id='wrapper'>
				<Header />

				<div id='main' className='alt'>
					<section id='one' xmp-class='xmp.r.backgroundColor'>
						<div className='inner'>
							<header className='major'>
								<h1 style={{ textTransform: 'capitalize'}}>
									<span xmp-text='xmp.r.preference'></span> holiday destinations
								</h1>
							</header>
							<span className='image main'>
								<img
									alt=''
									xmp-image-asset='xmp.r.photo5'
								/>
							</span>
							<span xmp-text='xmp.r.promoText'></span>
						</div>
					</section>
          <Contact />
          <Footer />
				</div>
			</div>
		</div>
	)
}
