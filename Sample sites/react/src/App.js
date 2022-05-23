import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route, Redirect, NavLink } from "react-router-dom";
import AnonymousPage from "./pages/Anonymous";
import PersonalizedPage from "./pages/Personalized";
import Login from "./pages/Login";
import { SuccessPage } from "./pages/Success";
import { SuccessUpdatePage } from "./pages/SuccessUpdate";
import { FailurePage } from "./pages/Failure";
import { ProfileInformation } from "./pages/ProfileInformation";
import { ProfileInformationXMPL } from "./pages/ProfileInformationXMPL";
import { ProfileInformationXMPLAndJS } from "./pages/ProfileInformationXMPLAndJS";
function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' width='100' />
				<div className='App-link'>
					<NavLink to='/anonymous'>Anonymous page</NavLink>
					<NavLink to='/personalized?rid=Allison.White'>Personalized page</NavLink>
					<NavLink to='/login?rid=Allison.White'>Login Page</NavLink>
				</div>
			</header>
			<section className={"App-body"}>
				<Switch>
					<Route path='/anonymous'>
						<AnonymousPage />
					</Route>
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='/personalized'>
						<PersonalizedPage />
					</Route>
					<Route path='/success'>
						<SuccessPage />
					</Route>
					<Route path='/success-update'>
						<SuccessUpdatePage />
					</Route>
					<Route path='/failure'>
						<FailurePage />
					</Route>
					<Route path='/profile-information'>
						<ProfileInformation />
					</Route>
          			<Route path='/profile-information-xmpl'>
						<ProfileInformationXMPL />
					</Route>
					<Route path='/profile-information-xmpl-js'>
						<ProfileInformationXMPLAndJS />
					</Route>
					<Redirect to='/anonymous' />
				</Switch>
			</section>
			<footer className='App-footer'></footer>
		</div>
	);
}

export default App;
