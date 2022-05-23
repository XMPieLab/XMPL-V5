/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useXmpl } from "./utils";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
	useXmpl()
	return (
		<div xmp-personalized-controller={''} xmp-load-ador-timeout="2000" xmp-no-caching={''} xmp-tracking-page-name='Personalized page react' xmp-cloak={''} >
			<p  className="title">
				Welcome <span xmp-text="xmp.r['FirstName']"></span> <span xmp-text="xmp.r['LastName']"></span>!
			</p>
			<p>1 <span xmp-text="xmp.r.FirstName"></span></p>
			<p>2 <span xmp-text="xmp.r['FirstName']"></span></p>
			<p>3 <span xmp-text="xmp['r']['FirstName']"></span></p>
			<p>4 <span xmp-text="xmp['r'].FirstName"></span></p>
			<p>5 <span xmp-text="{{xmp.r.FirstName}}"></span></p>
			<p><button xmp-success-url="/success" xmp-signout={''}> Sign Out Now </button></p>

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
				<div>
					<h2>xmp-async</h2>
					<p>The <b>xmp-async</b> help you control whether certain ADORs are be fetched asynchronously.</p>
					<img title="xmp.r['FirstName']" xmp-image-asset="xmp.r['MyImage']" alt="Person" xmp-async={''} />
				</div>
				<div>
					<h3>xmp-load-ador</h3>
					<div xmp-load-ador="FirstName,MyImage"></div> 
				</div>
				<div>
					<h2>xmp-clicked-trigger</h2>
					<p> <b>xmp-clicked-trigger</b> attribute can be placed on a clickable element to trigger email sending when that element is clicked.</p>
					<button xmp-clicked-triggered-email="E2">I Like! </button>
					<p> or update an email and send multiple emails</p>
					<form xmp-update={''}>
						Email: <input type="text" xmp-write-ador="xmp.r.Email" /><br/>
						<input className="btn-primary" type="submit" 
							value="Update" xmp-tracking-action="form submitted" 
							xmp-success-trigger="E2" />
					</form> 
				</div>
				<div>
					<h3>xmp-update-on-page-load</h3>
					<p>update values for a recipient as soon as the page loads.</p>
				<div xmp-update-on-page-load={''} xmp-ador="xmp.r['State']" xmp-value="1"></div>
				</div>
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
			<div>
				<h3>xmp-refer</h3>
				<p>The xmp-refer attribute can be used in form element to extend your recipient base</p>
				<form xmp-refer={''} >
				<input referrer-id={''} type="text" xmp-write-ador="xmp.referredRecipient.ReferedByID" />
				<div className="form__section">
					<div className="form__group-title">First Name:</div>
					<div className="form__group">
					<input className="input__element" type="text" size="30" xmp-write-ador="xmp.referredRecipient['First Name']" />
					</div>
				</div>

				<div className="form__section">
					<div className="form__group-title">Last Name:</div>
					<div className="form__group">
					<input className="input__element" type="text" size="30" xmp-write-ador="xmp.referredRecipient['Last Name']" />
					</div>
				</div>     		
				<button className="btn btn__primary" type="submit">
					<span className="btn__content" >Save</span>
				</button>
				</form>
			</div>
			<div>
				<h3>xmp-repeat</h3>
				<p>The xmp-repeat attribute is intended to be used with Table ADORs. Table ADOR values are arrays of items, where each item is a dictionary containing keys for the table columns, with matching values for the items.</p>
				<ul>
				<div xmp-repeat="item in xmp.r.Kids">
					<li>
					(<span xmp-repeat-value="item['Kid ID']"></span>)
					<span xmp-repeat-value="item['Kid name']"></span>
					<span xmp-repeat-value="item['FirstName']"></span> [Game: <span xmp-repeat-value="item['Favorite Game']"></span>]
					</li>
				</div>
				</ul>
			</div>
			<div>
				<h4>xmp-tracking-action</h4>
				<p>Tracking for an XMPL page </p>
				<form xmp-update={''} xmp-success-track-action="update" xmp-failure-track-action="update failure">
					Click submit to trigger tracking
				<input className="btn-primary" type="submit" 
								value="save" xmp-success-url="/success" xmp-tracking-action="form submitted:CTA" />
				</form> 
			</div>
			<div>
				<h3>xmp-unsubscribe</h3>
				<p>The xmp-unsubscribe is used by the recipient to opt-out from getting further email.</p>
				<ul>
				<li> Example 1: 
					<p> 
						<a href="#" className="button special" xmp-unsubscribe="true" xmp-success-url="/success" 
						xmp-failure-url="/failure" >Unsubscribe</a>
					</p>
				</li>
				<li> Example 2: 
					<p> 
					<a href="" className="button" xmp-unsubscribe="false" xmp-success-js="alert('action completed successfully');" 
					xmp-failure-js="alert('action could not succeed');">Subscribe</a>
					</p>
				</li>
				</ul>
			</div>
		</div>
	);
};
