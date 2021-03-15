import React, { useEffect } from "react";
import { useXmpl } from "./utils";

export const ProfileInformationXMPL = () => {
	useXmpl();

	useEffect(() => {
		const xmpReady = () => {
			console.log(window.xmpProvider.store.xmp.r)
		}
		window.xmpProvider.addEventListener('load', xmpReady)
		return () => {
			window.xmpProvider.trackEvent.trackingLeave()
		}
	}, [])

	return (
		<div
			className='container'
			xmp-personalized-controller={""}
			xmp-tracking-page-name={"Update Profile XMPL react"}
		>
			<h3 className='title'>Profile</h3>
			<div className='grid grid--column'>
				<div>
					<div className='form__section'>
						<div className='form__group-title'>First Name:</div>
						<div className='form__group'>
							<span xmp-text="xmp.r['FirstName']"></span>
						</div>
					</div>
					<div className='form__section'>
						<div className='form__group-title'>Last Name:</div>
						<div className='form__group'>
							<span xmp-text="xmp.r['LastName']"></span>
						</div>
					</div>
					<div className='form__section'>
						<div className='form__group-title'>Email:</div>
						<div className='form__group'>
							<span xmp-text="xmp.r['Email']"></span>
						</div>
					</div>
					<div className='form__section'>
						<div className='form__group-title'>Feedback:</div>
						<div className='form__group'>
							<span xmp-text="xmp.r['Feedback']"></span>
						</div>
					</div>
				</div>
				<div>
					<form
						xmp-update={""}
						xmp-success-url='/success-update'
						xmp-failure-url='/failure'
					>
						<div className='form__section form__section_sm'>
							<div className='form__group-title'>First Name:</div>
							<div className='form__group'>
								<input
									className='input__element'
									type='text'
									size='30'
									xmp-write-ador="xmp.r['FirstName']"
								/>
							</div>
						</div>
						<div className='form__section form__section_sm'>
							<div className='form__group-title'>Last Name:</div>
							<div className='form__group'>
								<input
									className='input__element'
									type='text'
									size='30'
									xmp-write-ador="xmp.r['LastName']"
								/>
							</div>
						</div>
						<div className='form__section form__section_sm'>
							<div className='form__group-title'>Email:</div>
							<div className='form__group'>
								<input
									className='input__element'
									type='text'
									size='30'
									xmp-write-ador="xmp.r['Email']"
								/>
							</div>
						</div>
						<div className='form__section form__section_sm'>
							<div className='form__group-title'>Feedback:</div>
							<div className='form__group'>
								<input
									className='input__element'
									type='text'
									size='30'
									xmp-write-ador="xmp.r['Feedback']"
								/>
							</div>
						</div>
						<button className='btn btn__primary' type='submit'>
							<span className='btn__content'>Update</span>
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
