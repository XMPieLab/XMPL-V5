import React from "react";
import { useXmpl } from "./utils";

export const ProfileInformationXMPLAndJS = () => {
	useXmpl();

	window.handleSuccess = function () {
		alert("Success");
		window.location.pathname = "/success-update";
	};

	window.handleError = function () {
		alert("Error");
		window.location.pathname = "/failure";
	};

	return (
		<div className='container' xmp-personalized-controller={""}>
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
						xmp-update={''}
						xmp-success-js={'handleSuccess()'}
						xmp-failure-js={'handleError()'}
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
