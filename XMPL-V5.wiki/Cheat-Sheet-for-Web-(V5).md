>### XMPL V5

This page is intended for developers who are familiar with the **XMPL V5** language. This page acts as a quick reminder for the website creation workflow, and as a source for code snippets that can be easily copied and pasted.

# Download the Config File
1. In Circle, open the project that you wish to connect to.
1. Download the XMPL configuration file for the project: **Build > Library > Website > Configuration file**. The downloaded file name should be `xmpcfg.js`.
1. Copy it to the root folder of your website.

# Head
Add the following references to your HTML file, the XMPL library JavaScript and the configuration file:
````html
<head>
    <!-- XMPie XMPL library -->
    <script src="./xmpcfg.js"></script>
    <script src="https://ajax.xmcircle.com/ajax/libs/XMPL-V5/5.0/xmpl.min.js"></script>
</head>
````
The first link includes the `xmpcfg.js` file that was downloaded from Circle. This file includes the connection data for the project. XMPL uses it to connect to the XMPL server and fetch the particular project data. 

The second link includes the XMPL library. Note that the xmpcfg.js file should be initialized before the XMPL library.  

# Body or div
Add the following attributes to the body or div tag of the section that needs to be personalized.

Personalized landing pages (the page you link to with the recipient ID):
````html
<body xmp-personalized-controller
      xmp-cloak
      xmp-clear-all-cookies-onload
      xmp-tracking-page-name="Landing">
YOUR PERSONAL CONTENT HERE
</body>
````
Personalized internal pages (pages that follow the landing page):
````html
<body xmp-personalized-controller
      xmp-cloak
      xmp-tracking-page-name="Page2">
YOUR PERSONAL CONTENT HERE
</body>
````
To use a custom failure page, add `xmp-failure-url="error.html"` to the list of attributes, where error.html is your failure page.

# ADORs
#### Text 
To add personalized text, use the `xmp-text` attribute on an HTML element that can contain text, for example, a span, div, td, or li tag. The value of the attribute is the name of a Text ADOR from your Circle project.

ADOR name formats can be one of: 
* xmp.r.ador 
`<span xmp-text="xmp.r.FirstName"></span>`
* xmp.r['ador']
`<span xmp-text="xmp.r['FirstName']"></span>` 
* xmp['r']['ador'] 
`<span xmp-text="xmp['r']['FirstName']"></span>`
* xmp['r'].ador 
`<span xmp-text="xmp['r'].FirstName"></span>
`

**Note:** If the ADOR name contains a space, you must use one of:
* xmp.r['ador']
`<span xmp-text="xmp.r['First Name']"></span>` 
* xmp['r']['ador'] 
`<span xmp-text="xmp['r']['First Name']"></span>`

#### Graphic (Image)
Use `xmp-image-asset` with an image element to set it's source with an image that is an asset in the Circle project. The value of the `xmp-image-asset` attribute is the name of a graphic ADOR, which has a value that sets the name of an asset to use for each recipient. Use this directive outside the form element.  

For example, the following sets the image element with an asset which is the value of the xmp.r.MyAdor graphic ADOR: 
```html
<img xmp-image-asset="xmp.r.MyAdor"/> 
```

If you prefer to have the images in the website folder, in an image element you can use the path to the images together with the `xmp-src` attribute and the name of a graphic ADOR. For example:
```html
<img xmp-src="images/{{xmp.r['image_offer']}}" /> 
```
The above HTML declaration defines an image object whose source is an image in the site images folder, the name of which is determined by the image_offer graphic ADOR. For instance, if for the viewing recipient the value is goat.jpg, then the displayed image would be from images/goat.jpg.


#### Style 
When the style ADOR value is the class name:
````html
<p xmp-class="xmp.r.FirstName" class="base">Text</p> 
````
In this case, make sure to add all possible ADOR values as class definitions in your site's CSS.

Alternatively, you can use an expression to determine the CSS class name to use:
````html
<p xmp-class="{'gold': xmp.r['FirstName'] === 'David', 'plain': xmp.r.LastName === 'IncorrectLastName' }" class="base">Text</p> 
````
Again, make sure to add the class definitions to your site CSS.

#### Visibility 
Show an element only if the visibility ADOR expression is true:
````html
<div xmp-show="xmp.r['IsFemale']">Content for female recipients.</div>
````
Show an element only if the text ADOR expression is a case-sensitive match:
````html
<div xmp-show="xmp.r['ClubLevel']=='Premier'">You are a Premier club member!</div>
````
Show an element if the text ADOR expression is NOT a case-sensitive match:
````html
<div xmp-show="xmp.r['ClubLevel']!='Gold'">You are a Bronze or Silver club member!</div>
````

#### Link
Create a link to an address supplied by a link or text ADOR.
````html
<a xmp-href="{{xmp.r['Blog']}}">users blog</a>
<a xmp-href="{{xmp.r['Suppliers']}}" xmp-tracking-action="Clicked Suppliers:CTA">List of Suppliers</a>
````

**Note 1:** Clicks of links and buttons can be tracked in Circle Analytics by adding the `xmp-tracking-action` parameter to the tag. 

**Note 2:** If your page has many links and buttons to track, you can add ":CTA" to the end of the action name on the button or link which is the page's main Call To Action. In Circle Analytics you can then choose to report on clicks of all page links, or on only the main Call To Action.

#### PDF on Demand
Creates a link to a PDF on Demand touchpoint in the Circle project.
````html
<a xmp-href="{{xmp.r['XMPie.PDF.P1']}}">View the PDF</a>
<a xmp-href="{{xmp.r['XMPie.PDF.P2']}}">Get your coupons</a>
````
**Note:** The ID of the PDF on Demand touchpoint from the Circle project diagram is required as the last parameter - P1 or P2 in the above examples. Also, the personalized content of the PDF on Demand document will show the recipient data that is available at the time the link is clicked.

#### Table 
Displays an HTML table or a list with the values from a table ADOR.

The `xmp-repeat` attribute is added to the HTML element that should be repeated for each row in the table ADOR. The value of the attribute should set the name of an object that will contain properties for each of the table column values, the keyword "in", and the name of the table ADOR.

Inside the element which is repeated, the table column values can be displayed by using the `xmp-repeat-value` attribute on a span element. The value of the attribute should be the object name defined by the xmp-repeat and name of a column that is available in the table ADOR.
````html
<table>
   <tr>
	<th>First Name</th>
	<th>Last Name</th> 
   </tr>
   <tr xmp-repeat="department in xmp.r['Departments']">
 	<td xmp-repeat-value="department['FirstName']"></td>
 	<td xmp-repeat-value="department['LastName']"></td>
   </tr>
</table>
````
Or
````html
<ul>
    <li xmp-repeat="item in xmp.r['Courses']">
      <span xmp-repeat-value="item['Hours']"></span> hours
    </li>
</ul>
````

# Website Referral Source and Media Parameters

#### xmp-tracking-action

````html
<a xmp-href="{{xmp.r['XMPie.PDF.P1']}}" xmp-tracking-action="List of Suppliers:CTA">View the PDF</a>
````
Сlicks of links and buttons can be tracked in Circle Analytics by adding the `xmp-tracking-action` parameter to the tag. If your page has many links and buttons to track, you can add ":CTA" to the end of the action name on the button or link which is the page's main Call To Action. In Circle Analytics you can then choose to report on clicks of all page links, or on only the main Call To Action.

**Note!** This attribute works if page has `xmp-tracking-page-name`

# Website Referral Source and Media Parameters
Circle Web analytics can be enhanced by tracking the source which referred traffic to the website, so that you can assess which of your campaign touchpoints, or media performed best. For example, the source could be the touchpoint from which the web URL is clicked in order to arrive at the website (e.g., E1-Invitation), and the media is the type of touchpoint media (email, SMS, webpage, social media, print document's QR Code).

Tracking the media and source of the website visit is achieve by using URL parameters: `xmpmedia` for the media type and `xmpsrc` for the name.

If you have PersonalEffect 10.2 or later, you can use Special Web ADORs that are created automatically and will include referral tracking parameters in the web URL by default. Alternatively, you can manually add parameters to the URL.

Examples:
````html
https://mycompanydomain.com/mycampaign/MyRecipientKey?xmpmedia=SocialMedia&xmpsrc=Facebook
https://mycompanydomain.com/mycampaign/index.html?rid=MyRecipientKey&xmpmedia=Web&xmpsrc=CompanySite
https://mycompanydomain.com/mycampaign?xmpsrc=E1
````

For more information about Web Analytics and the referral source and media parameters, refer to [Web Analytics](https://github.com/XMPieLab/XMPL-NG/wiki/Web-Analytics).


# Update
````html
<form xmp-update xmp-success-url="success.html"> 
  <ul> 
    <li>First Name: 
      <input type="text" xmp-write-ador="xmp.r['FirstName']"> 
    </li> 
    <li>Last Name: 
      <input type="text" xmp-write-ador="xmp.r['LastName']"> 
    </li> 
  </ul> 
  <input class="btn-primary" type="submit" value="save"> 
</form> 
````

Radio buttons get a slightly different form:
````html
<input type="radio" value="Sports" name="game" xmp-write-ador="xmp.r.MyAdor">Sports <br/>
<input type="radio" value="Pickup" name="game" xmp-write-ador="xmp.r.MyAdor">Pickup <br/>
<input type="radio" value="Antique" name="game" xmp-write-ador="xmp.r.MyAdor">Antique <br/>
````
# Self Registration (GURL)
The self registration requires an `xmp-anonymous-controller`:
````html
<body xmp-anonymous-controller
      xmp-cloak>
````

And the form is as follows:
````html
<form xmp-register xmp-success-url="success.html"> 
  <ul>
    <li>First Name : <input type="text" xmp-write-ador="xmp.r['FirstName']"  size="30" /></li> 
    <li>Last Name : <input type="text" xmp-write-ador="xmp.r['LastName']"  size="30" /></li> 
  </ul> 
  <input class="btn-primary" type="submit" value="save"> 
</form> 
````

# Refer a Friend
````html
<form xmp-refer>
    <span>First Name:</span>
    <input type="text" xmp-write-ador="xmp.referredRecipient.Fname">
    <input class="btn-primary" type="submit" value="save" xmp-success-url="thanks.html">
</form> 
````

# Form Validation
It is common for a form to use validation. XMPL is based on Vanilla JavaScript. 
See [[Form validation examples]]

# Triggered Touchpoint
To trigger an email or external touchpoint on submitting a form, use ````xmp-success-trigger````
````html
<form xmp-update>
  Email: <input type="text" xmp-write-ador="xmp.r.Email"><br/>
  <input
    class="btn-primary"
    type="submit" 
    value="Update" 
    xmp-success-trigger="E1">
</form> 
````

To trigger a touchpoint on page load, use ````xmp-success-trigger````
````html
<body xmp-personalized-controller 
      xmp-cloak 
      xmp-tracking-page-name="Landing"
      xmp-success-trigger="E3">
````

You can also trigger more than one touchpoint by separating them with a comma:
````html
xmp-success-trigger="E1,E2,X1"
````

# User Authentication - SecURL
#### Sign-In
````html
<body xmp-personalized-controller>
    <form xmp-signin xmp-success-url="index.html" xmp-failure-js="onError()">
        <ul>
            <li>
                Username : <input type="text" xmp-username>
            </li>
            <li>
                Password : <input type="password" xmp-password>
            </li>
        </ul>
        <input type="submit" value="Sign-In">
    </form> 

    <script>
        function onError(){
          const resposeData = window.XMPLLastHttpError;
          const errorCode = resposeData.ErrorCode;
          const displayMessage = resposeData.DisplayMessage;
          alert(displayMessage);
        }
    </script>
</body>
````

#### Sign-Out
Sign-out allows the user to sign out from his/her authentication session.
````html
<input type="submit" value="Sign-Out" xmp-signout>
````

#### Password Field in Registration Form

In order to mark an input as a password field in the Registration form, use the ````XMPie.Web.NewPassword```` fixed ADOR name. For example:
````html
<form xmp-register>
    <input type="password" xmp-write-ador="xmp.r['XMPie.Web.NewPassword']"> 
</form>
````

#### Password Field in Update Form

You can allow the user to change his/her password after authentication.
To mark an input as the new password field in the Update form, use the ````XMPie.Web.NewPassword```` fixed ADOR name.
To mark an input as the existing password field in the Update form, use the ````XMPie.Web.ExistingPassword```` fixed ADOR name.
For example:
````html
<form xmp-update>
        <ul>
            <li>
                Username : <input type="text" xmp-write-ador="xmp.r['UsernameAdor']">
            </li>
            <li>
                Existing Password : <input type="password" xmp-write-ador="xmp.r['XMPie.Web.ExistingPassword']">
            </li>
            <li>
                New Password : <input type="password" xmp-write-ador="xmp.r['XMPie.Web.NewPassword']">
            </li>
        </ul>
        <input type="submit" value="Update">
</form> 
````

#### Automatic Sign-In of New Registered User
Coming soon

#### Automatic Redirect to Login Page
You can set all personal pages to automatically redirect to the login page if the user is not authenticated.
1. Create a file named ````xmpcustom.js```` in your site folder.
2. In this file add a link (relative or absolute link) to login page in the following format:
````javascript
var xmpcustom = {
  loginUrl: 'https://Domain/Site/login.html'
}
````
3.	In all personal pages add, the following link to xmpcustom.js:
````html
<script src="xmpcustom.js" type="text/javascript"></script>
````

OR

Add <script> tag to the head of HTML with `xmpcustom` value
````html
<script>
    var xmpcustom = {
      loginUrl: 'https://Domain/Site/login.html'
    }
</script>
````
 
#### Confirm Password
In the registration form, you can add a confirmed user password input, in which case the user will need to enter the password twice in order to register.
1.	Add the ````xmp-password```` attribute to the password input that is connected to the ````XMPie.Web.NewPassword```` write ADOR.
2.	Add the ````xmp-confirm-password```` attribute to the second input where the user will re-enter the password.
Example:
````html
<input type="password" xmp-password xmp-write-ador="xmp.r['XMPie.Web.NewPassword']">
<input type="password" xmp-confirm-password>
````

# Reset Browser to Current Recipient
Use one of the following options:

Option 1


Add ````xmp-clear-all-cookies-onload```` to the body tag. On page load, the current recipient will be reset.
````html
<body xmp-anonymous-controller xmp-clear-all-cookies-onload >
````

Option 2

Add ````xmp-clear```` to the button. On button click, the current recipient will be reset.
````html
<button xmp-clear>Clear</button>
````

# Error Handling
To control the error display on your page use:
1. ````XMPLLastHttpError```` – Includes the error code and the display message. For more details about XMPL error codes, refer to XMPL Rest API help. You can access the XMPL Rest API help from Circle > Library > Web area.
2. ````xmp-turn-off-default-error```` – Prevents the default error page from being displayed when an error occurs.
````html
<body xmp-personalized-controller xmp-turn-off-default-error="true">
...
<form xmp-update xmp-success-js="onSuccess()" xmp-failure-js="onError()"></form> 
...
<script> 
  function OnError() { 
    const resposeData = window.XMPLLastHttpError;
    const errorCode = resposeData.ErrorCode;
    const displayMessage = resposeData.DisplayMessage;
    alert(displayMessage);
  } 
</script>
````

# Directive / Google Charts
Coming soon

Google Maps
To add Google Maps, you may want to use the open-source project
[https://github.com/XMPieLab/XMPL-Maps](https://github.com/XMPieLab/XMPL-Maps)
***
