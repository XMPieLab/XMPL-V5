import React from "react";
import { useXmpl } from "./utils";

export default () => {
	useXmpl();

	return (
		<div xmp-anonymous-controller={""} className='container'>
			<h3 className='title'>Registration form</h3>
			<div className='grid grid--column'>
				<div>
					<form
						xmp-register={""}
						xmp-signin-auto='true'
            xmp-success-url='/success'
            xmp-failure-url='/failure'
					>
						<div className='form__section'>
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
						<div className='form__section'>
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
						<div className='form__section'>
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
						<div className='form__section'>
							<div className='form__group-title'>Password (Age):</div>
							<div className='form__group'>
								<input
									className='input__element'
									type='password'
									size='30'
									xmp-write-ador="xmp.r['XMPie.Web.NewPassword']"
									xmp-password={''}
								/>
							</div>
						</div>
						<div className='form__section'>
							<div className='form__group-title'>Password 2 (Age):</div>
							<div className='form__group'>
								<input
									className='input__element'
									type='password'
									size='30'
									xmp-confirm-password={''}
									xmp-failure-js="alert('error confirm')"
								/>
							</div>
						</div>
						<button className='btn btn__primary' type='submit'>
							<span className='btn__content'>Log in</span>
						</button>
					</form>
				</div>
				<div>
					<img src='/assets/registration.jpg' alt='Registration' />
				</div>
			</div>
		</div>
	);
};
