import React, { useEffect } from "react";
import { Navigation } from "../components/Navigation";
import { useXmpl } from "./utils";

export const SuccessPage = () => {
	useXmpl();
	useEffect(() => {
		return () => {
			window.xmpProvider.trackEvent.trackingLeave()
		}
	}, [])
	return (
		<div>
			<div className='container' xmp-personalized-controller={""} xmp-tracking-page-name={'Success page react'}>
				<div className='grid'>
					<div>
						<h3 className='title'>
							Welcome, <br />
							<span xmp-text="xmp.r['FirstName']"></span>{" "}
							<span xmp-text="xmp.r['LastName']"></span>!
						</h3>
					</div>
					<div>
						<img className='img-content' src='/assets/success.jpg' alt='Registration' />
					</div>
				</div>
				<Navigation />
			</div>
		</div>
	);
};
