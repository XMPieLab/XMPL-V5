/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useXmpl } from "./utils";

export default () => {
	useXmpl()
	return (
		<div xmp-personalized-controller={''} xmp-tracking-page-name='Personalized page react' xmp-cloak={''} >
			<p  className="title">
				Welcome <span xmp-text="xmp.r['FirstName']"></span> <span xmp-text="xmp.r['LastName']"></span>!
			</p>
			<p>1 <span xmp-text="xmp.r.FirstName"></span></p>
			<p>2 <span xmp-text="xmp.r['FirstName']"></span></p>
			<p>3 <span xmp-text="xmp['r']['FirstName']"></span></p>
			<p>4 <span xmp-text="xmp['r'].FirstName"></span></p>
			<p>5 <span xmp-text="{{xmp.r.FirstName}}"></span></p>

			<p xmp-class="xmp.r.FirstName" className="base">Text</p>
			<p xmp-class="{'red': xmp.r['FirstName'] === 'Allison', 'green': xmp.r.LastName === 'NewLastName12221' }" className="base">Text</p>
			<div className="grid grid--column">
				<div>
					<h3>xmp-src</h3>
					<p>The xmp-src attribute can be used in an img element to declare a variable image URL.</p>
					<img xmp-src="{{xmp.r['MyImage']}}" alt="Person" />
				</div>
				<div>
					<h3>xmp-image-asset</h3>
					<p>Use xmp-image-asset with an img element to set it with an image which is an asset from the Circle project. </p>  
					<img title="xmp.r['MyImage']" xmp-image-asset="xmp.r['MyImage']" alt="Person" />
				</div>
			</div>
			<div>
				<h3>xmp-show</h3>
				<p>xmp-show attribute can be added to any HTML element to determine whether it is visible or not. The attribute value should be an ADOR name, whose value is true or false.</p>
				<h3>xmp-className</h3>
				<p>xmp-className can be used to determine the css classNamees applied to an HTML element.</p>
				<div xmp-show="xmp.r['IsMale']">
					<p xmp-class="xmp.r['StyleGender']">this text is shown if it is male</p>
				</div>
				<div xmp-show="xmp.r['IsFemale']">
					<p xmp-class="xmp.r['StyleGender']">this text is shown if it is female</p>
				</div>
			</div>
			<div>
				<h3>xmp-href</h3>
				<p>The xmp-href attribute can be used in an a (anchor) element to declare a variable target URL (href). </p>
				<a className="link" xmp-href="xmp.r['XMPie.PDF.P1']" target="_blank">Pdf link</a>
				<a className="link" xmp-href="offers/{{xmp.r['FirstName']}}">Multiple link</a>
			</div>
		</div>
	);
};
