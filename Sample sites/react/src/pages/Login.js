import React from "react";
import { useXmpl } from "./utils";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
	useXmpl();

	window.onLoginError = (message) => {
		alert(message);
	}
	

	return (
		<div xmp-personalized-controller={''} xmp-turn-off-default-error={''} className='container'> 
			<div className='grid grid--column'>
				<div>
					<h3 className="title">Sign in form</h3>
					<form xmp-signin={''} xmp-signin-auto={''} xmp-success-url="/success" xmp-failure-js="onLoginError">
						<div className="form__section">
							<div className="form__group-title">Username </div>
							<div className="form__group">
								<input className="input__element" type="text" size="30" xmp-username={''} />
							</div>
						</div>
						<div className="form__section">
							<div className="form__group-title">Password:</div>
							<div className="form__group">
								<input className="input__element" type="password" size="30" xmp-password={''} />
							</div>
						</div> 
						<button className="btn btn__primary" type="submit" >
							<span className="btn__content" >Sign in</span>
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
