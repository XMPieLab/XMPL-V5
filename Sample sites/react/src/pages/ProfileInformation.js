import React, { useState, useEffect } from "react";
import { Navigation } from "../components/Navigation";

export const ProfileInformation = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [feedback, setFeedback] = useState("");
	const [isShowUpdateForm, setShowUpdateForm] = useState(false);

	const xmpReady = () => {
		setFirstName(window.xmpProvider.store.xmp.r.FirstName);
		setLastName(window.xmpProvider.store.xmp.r.LastName);
		setEmail(window.xmpProvider.store.xmp.r.Email);
		setFeedback(window.xmpProvider.store.xmp.r.Feedback);
	};

	useEffect(() => {
		const accessToken = localStorage.getItem("serviceToken");
		const recipientID = localStorage.getItem("xmpRecipientID");
		const adorList = ["FirstName", "LastName", "Email", "Feedback"];
		window.xmpProvider.api
			.getAdorValues({
				accessToken: accessToken, 
				rid: recipientID, 
				isLogin: true,  
				adors: adorList, 
				resolved:[], 
				async: false,
				iCached: false,
				noCache: false
			})
			.then(xmpReady);
	}, []);

	const [formValue, setFormValue] = useState({
		FirstName: "",
		LastName: "",
		Email: "",
		Feedback: "",
	});

	const handleClick = () => {
		setShowUpdateForm(true);
		setFormValue({
			FirstName: firstName,
			LastName: lastName,
			Email: email,
			Feedback: feedback,
		});
	};

	const handleUpdate = () => {
		window.xmpProvider.api.updateAdors(formValue).then(xmpReady);

		setShowUpdateForm(false);
	};

	const handleForm = (event) => {
		event.persist();
		setFormValue((state) => ({
			...state,
			[event.target.name]: event.target.value,
		}));
	};

	return (
		<div className='container'>
			<h3 className='title'>Profile</h3>
			<h4 className='title'>Welcome {firstName ? firstName : 'user'}!</h4>
			<div className='grid grid--column'>
				<div>
					<div className='form__section'>
						<div className='form__group-title'>First Name:</div>
						<div className='form__group'>
							<span>{firstName}</span>
						</div>
					</div>
					<div className='form__section'>
						<div className='form__group-title'>Last Name:</div>
						<div className='form__group'>
							<span>{lastName}</span>
						</div>
					</div>
					<div className='form__section'>
						<div className='form__group-title'>Email:</div>
						<div className='form__group'>
							<span>{email}</span>
						</div>
					</div>
					<div className='form__section'>
						<div className='form__group-title'>Feedback:</div>
						<div className='form__group'>
							<span>{feedback}</span>
						</div>
					</div>
					<button className='btn btn__primary' onClick={handleClick}>
						<span className='btn__content'>Show</span>
					</button>
				</div>
				<div>
					{isShowUpdateForm && (
						<form onSubmit={handleUpdate}>
							<div className='form__section form__section_sm'>
								<div className='form__group-title'>First Name:</div>
								<div className='form__group'>
									<input
										className='input__element'
										name='FirstName'
										type='text'
										size='30'
										value={formValue.FirstName}
										onChange={(e) => handleForm(e)}
									/>
								</div>
							</div>
							<div className='form__section form__section_sm'>
								<div className='form__group-title'>Last Name:</div>
								<div className='form__group'>
									<input
										className='input__element'
										name='LastName'
										type='text'
										size='30'
										value={formValue.LastName}
										onChange={(event) => handleForm(event)}
									/>
								</div>
							</div>
							<div className='form__section form__section_sm'>
								<div className='form__group-title'>Email:</div>
								<div className='form__group'>
									<input
										className='input__element'
										name='Email'
										type='text'
										size='30'
										value={formValue.Email}
										onChange={(event) => handleForm(event)}
									/>
								</div>
							</div>
							<div className='form__section form__section_sm'>
								<div className='form__group-title'>Feedback:</div>
								<div className='form__group'>
									<input
										className='input__element'
										name='Feedback'
										type='text'
										size='30'
										value={formValue.Feedback}
										onChange={(event) => handleForm(event)}
									/>
								</div>
							</div>
							<button className='btn btn__primary' type='submit'>
								<span className='btn__content'>Update</span>
							</button>
						</form>
					)}
				</div>
			</div>
			<Navigation />
		</div>
	);
};
