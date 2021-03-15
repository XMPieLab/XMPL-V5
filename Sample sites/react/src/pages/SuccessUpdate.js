import React, { useEffect } from "react";
import { Navigation } from "../components/Navigation";
import { useXmpl } from "./utils";

export const SuccessUpdatePage = () => {
	useXmpl();
	useEffect(() => {
		return () => {
			window.xmpProvider.trackEvent.trackingLeave()
		}
	}, [])
	return (
		<div>
			<div className='container' xmp-personalized-controller={""} xmp-tracking-page-name={'Success page update react'}>
				<div className='grid'>
					<div>
						<h3 className='title'>
							Thanks, <br />
							<span xmp-text="xmp.r['FirstName']"></span>{" "}
							<span xmp-text="xmp.r['LastName']"></span>!
						</h3>
						<p>Profile updated successfully</p>
					</div>
					<div>
						<img src='/assets/success.jpg' alt='Update' />
					</div>
				</div>
				<Navigation />
			</div>
		</div>
	);
};
