>### XMPL V5

This page acts as a quick reminder for the email creation workflow, and as a source for code snippets that can be easily copied and pasted.

Note: Email clients do not support all features which are supported by web browsers. Therefore, XMPL for email only supports that subset of the XMPL language which the email clients support.

- Example 1: Email clients do not support JavaScript, therefore XMPL for email does not support JavaScript.

- Example 2: Email clients do not support external CSS files but do support inline styles, therefore XMPL for email does not support external CSS files but does support inline styles.

Emails can be in HTML and/or Text formats. Both formats support the nesting of XMPL code.

About Text emails: Due to the limitations of text emails, some HTML email features are not supported in Text emails. For example, Style and Graphic ADORs are not supported in Text emails.

About HTML email testing: After defining the HTML email body, you can test the HTML page in your browser before uploading it to the email touchpoint. To test the email page in your browser, you have to download the Config file and add the web tags in the Head and Body/Div tags. Note that the XMPL email interpreter will ignore the web tags. 

# HTML Email
#### Text ADOR 

````html
{{xmp.r['My TextAdor']}}
{{xmp.r["My TextAdor"]}}
{{xmp.r.MyTextAdor}}
````

#### XMPieRecipientKey ADOR

````html
{{xmp.r.XMPieRecipientKey}}
````



#### Graphic (Image)
Using graphic assets and a Graphic ADOR:
````html
<img xmp-image-asset="xmp.r.MyAdor"/>  
````
Using a URL in Text ADOR:
````html
<img xmp-image-asset="xmp.r.MyAdor"/>
<img src="{{xmp.r.MyAdor}}"/>
````

#### Style 
To switch the class of an HTML element based on the Style ADOR, have the Style ADOR return the value of the desired class.  In the example below ````MaleStyle```` or ````FemaleStyle```` or ````NoGenderStyle```` are the value set for the Style ADOR.  Set the ````xmp-class```` to the ADOR.  Note that email supports only class selectors (no expressions). 
````html
<html>
<head>
<style xmp-email-style="true">
  .MaleStyle {color: blue;}
  .FemaleStyle {color: red;}
  .NoGenderStyle {color: black;}
</style>		
</head>

<body>
 <h2>Style</h2>
 <div xmp-class="xmp.r.GenderStyle">Text style varies per recipient</div>
</body>
````



#### Visibility 
Emails sent with XMPie Email Services (XES) can contain Visibility ADORs. Visibility can be used on either div or span tags. The ADOR must by a Visibility ADOR, and the value can only be true or false. Expressions are not allowed.
````html
<div xmp-show="xmp.r['IsStudent']">Show if IsStudent is 'true'.
</div>
````
Or
````html
<span xmp-show="xmp.r['IsStudent']">Show if IsStudent is 'true'.
</span>
````

#### Link
Create a link to an address supplied by an ADOR.
````html
<a xmp-href="{{xmp.r['Blog']}}">users blog</a>
````

#### Link Tracking Name
Requires XES version 3.5 and above. Circle automatically assigns each link a tracking name. If you wish you may define your own tracking name to easily identify specific links in your email. 
````html
<a xmp-tracking-action="ViewInBrowser" href="{{XMPie.Email.ViewInBrowser}}">View in browser</a>
````
Link tags can include the numbers 0–9, the letters A–Z (both uppercase and lowercase, English only), hyphens (-), and underscores (_).
Spaces and special characters are not allowed.

#### Disable Link Tracking
Requires XES version 3.5 and above. If tracking email activity is enabled, all links in the email are tracked. To prevent tracking of a specific link, add
````html
<a xmp-no-track="1" href="{{XMPie.Email.ViewInBrowser}}">View in Browser</a>
````
Note that "1" indicates no tracking and it is not a customizable value.

#### View in Browser

````html
<a xmp-href="{{XMPie.Email.ViewInBrowser}}">View in browser</a>
````


#### XMPie RURL

````html
<a xmp-href="{{xmp.r.XMPieRURL}}">Visit the website</a>
````

#### Email Footer (for anti-spam legislation e.g. CAN SPAM act)

````html
<div style="font-size: 9px; color: #6b6b6b;">UNSUBSCRIBE<br />
If you do not wish to receive future email publication from us please <a xmp-href="{{XMPie.Email.Commercial.UnsubscribeURL}}">click here</a>.<br />
<br />
CONTACT US<br />
You can reply to this email, or contact us via postal mail at:<br />
{{XMPie.Email.Sender.BusinessName}}<br />
{{XMPie.Email.Sender.Address}} {{XMPie.Email.Sender.City}}, {{XMPie.Email.Sender.State}}, {{XMPie.Email.Sender.ZIPCode}} {{XMPie.Email.Sender.Country}}</div>
````

Note that all these ADORs use the following format:
````html
{{XMPie.Email.Sender.Address}}
````


#### Unsubscribe

````html
<a xmp-href="{{XMPie.Email.Commercial.UnsubscribeURL}}">Unsubscribe</a>
````


#### PDF on Demand
Create a link to a PDF on Demand touchpoint (where P1 is the touchpoint Friendly ID).
The PDF on Demand shows the data available at the time the email was sent. 

````html
<a xmp-href="{{xmp.r['XMPie.PDF.P1']}}">View the PDF</a>
````


#### Table ADOR

````html
<table>
   <tr>
	<th>First Name</th>
	<th>Last Name</th> 
   </tr>
   <tr xmp-repeat="Department in xmp.r.Departments">
 	<td>{{Department.FirstName}}</td>
	<td>{{Department.LastName}}</td>
   </tr>
</table>
````
Or
````html
<ul>
    <li xmp-repeat="item in xmp.r['Fuel Consumption']">
        {{item.Date}}:  {{item.Liter}} Liters                       
    </li>
</ul>
````


# Text Email

#### Text ADOR
Same as with HTML.
````html
{{xmp.r.myTextAdor}}
````

#### Visibility

````html
<text xmp-show="AdorName1">Lorem Ipsum.</text>
````
The span tag also works in this case.

#### Style ADOR
Not supported in Text emails.

#### Graphic ADOR
Not supported in Text emails.

#### Table ADOR

````html
<text xmp-repeat="Department in xmp.r.Departments">
	{{Department["First Name"]}}	{{Department["Last Name"]}}
</text>
````

#### Link ADOR
Link (href tag) is not available in a Text email.
To write the URL as text, use the Link ADOR as if it was a Text ADOR:

````html
{{xmp.r.XMPieRURL}}
````

#### Link Tracking
Not supported in Text emails.

#### Nesting
Nesting is allowed.

~~~~html
<text xmp-show="xmp.r['IsStudent']">">{{FirstName}} , you are entitled to 20% discount <text xmp-show ="xmp.r['IsGraduateStudent']"> and a second item for 50% discount</text> </text>
~~~~
