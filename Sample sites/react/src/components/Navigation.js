import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => (
	<div className='grid'>
			<Link className='link' to='/profile-information'>
				Show profile using react syntax
			</Link>
			<Link className='link' to='/profile-information-xmpl'>
				Show profile using XMPL syntax
			</Link>
			<Link className='link' to='/profile-information-xmpl-js'>
				Show profile using XMPL and JS
			</Link>
	</div>
);
