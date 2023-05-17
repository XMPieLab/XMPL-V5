>### XMPL V5

User Authentication protects unauthorized users from accessing private recipient information which is stored in ADORs.

User Authentication is used to increase online security. Protecting your Personalized URLs (PURLs) in this way is an important step toward GDPR compliance, and is typically used in conjunction with HTTPS and SecureID.

When using User Authentication, the system prompts the recipient, when trying to access a personalized URL, to sign in via a login page. The recipient must enter a password (or a user name and password, depending on the setup). If the password is correct, the recipient is granted access to the PURL. Access to read/write ADOR values will always be protected until the recipient signs in. Event tracking will not work until the user is signed in.

Once User Authentication is enabled in Circle, all XMPL Rest API calls will require a security token for the project, and the site will not work without user login.

IMPORTANT: SecURL is not supported in Template-Instance and Campaign-on-Demand (uStore). XMPL 3.0 is a prerequisite.

See:

* Video: [Authentication on personalized websites](http://campus.xmpie.com/DocVideo.aspx?id=bba3c526-481d-417f-a601-8976b45768f3&auth=247171117022079038241252218022082235067146166182)

* [SecURL FAQs](https://github.com/XMPieLab/XMPL-SDK/wiki/SecURL-FAQs)

# Initial Setup
To add User Authentication to your webpage, you must first [**Enable User Authentication for your Circle project**](https://help.xmpie.com/Circle/Help/en/Build/Security/Circle_Security.htm), and install the latest XMPL version.
 
# Sign-In
Sign-in allows the user to gain access to secured pages by providing a username and password.
One option to sign in the user is by providing an interactive form. You can define an HTML form, let the user type in the authentication data, and use the XMPL tags to associate both username and password with these values. Consider the following example: 
````html
<body xmp-personalized-controller xmp-clear-all-cookies-onload> 
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
The form tag has the following attributes:
1. `xmp-signin` - marks the form for sign-in. When the form is submitted upon a submit button click, the username and password are sent to the server.
If the username and password match the recipient, the server returns a security token ````securityToken```` that is saved in a local storage.
2. `xmp-success-url` - provides the URL to navigate to after the form is successfully submitted. You may omit this attribute to remain in the same page after the form is submitted.
3. `xmp-failure-js` – provides the Javascript function to run upon failure.

All attributes from the Update form apply here as well: the method of defining a redirect URL for success and running Javascript functions upon success and failure. If you are not familiar with these, refer to [[Updating Recipient Data]].


Additional points:
* `xmp-signin` can be used only in a personal page (that requires a recipient ID), therefore it must be under `xmp-clear-all-cookies-onload`
* Username is optional – you can select whether to use it in Circle.
* Sign-In form calls Sign-In API: POST v1/projects/auth/signIn.
* The API returns a `securityToken`.

# Sign-Out
Sign-out allows the user to sign out from his/her authentication session.
Consider the following example:
````html
<input type="submit" value="Sign-Out" xmp-success-url="login.html?rid={{xmp.recipientID}}" xmp-signout>
````

You can use ````xmp-signout```` to mark an input or link as the sign-out controller that will sign out the user from the authentication session.

Additional points:
* The ````securityToken```` is deleted from the local storage.
* The Sign-out form calls Sign-out API: POST v1/projects/auth/signOut
* The API deletes the security token on the server side.
 
# Password Field in Registration Form
In order to mark an input as a password field in the Registration form, use the ````XMPie.Web.NewPassword```` fixed ADOR name. For example:
````html
<form xmp-register>
    <input type="password" xmp-write-ador="xmp.r['XMPie.Web.NewPassword']"> 
</form>
````

Additional points:
* When Authentication is enabled, a new user must create a password for himself/herself.
* A new user must also enter a username only if the Username ADOR is selected in Circle. Use the username ADOR name selected in Circle.
* XMPL protects the password ADOR and never passes/exposes it. You cannot use the Password ADOR name.
* Password (and optionally Username) is also mandatory in the Refer-a-Friend form (xmp-refer). 

# Password Field in Update Form
You can allow the user to change his/her password after authentication.
In order to mark an input as the new password field in the Update form, use the ````XMPie.Web.NewPassword```` fixed ADOR name.
In order to mark an input as the existing password field in the Update form, use the ````XMPie.Web.ExistingPassword```` fixed ADOR name.
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

# Automatic Sign-In of New Registered User
On the Registration form you can set newly registered users to be automatically signed in using 
````xmp-signin-auto="true"````. For example:
````html
<form xmp-register xmp-signin-auto="true"></form>
````

# Setting up the xmpcustom.js File
Using the xmpcustom.js file, you set all personal pages to automatically redirect to the login page if the user is not authenticated.
1. Using any text editor, create a file named ````xmpcustom.js```` in the root directory of your website.
2. In this file create a link to the login page in the following format:
````html
var xmpcustom = {
  loginUrl: 'https://Domain/Site/login.html'
}
````

3.	In all pages, add a link to the ````xmpcustom.js```` file using the following:
````html
<script src="xmpcustom.js" type="text/javascript"></script>
````
If you don’t set this option, if the user is not authenticated, he/she will be prompted with an error message and will not be redirected to the login page.

If you do set this message but do not want to display the error message, add ````xmp-prevent-default-error-handle```` to the body tag.

# Confirm Password
In the Registration and Refer-a-friend forms you can add a confirm user password input, in which case the user will need to enter the password twice in order to register.
1.	Add the ````xmp-password attribute```` to the password input that is connected to the ````XMPie.Web.NewPassword```` write ADOR.
2.	Add the ````xmp-confirm-password```` attribute to the second input where the user will re-enter the password.
3.	In addition, add ````xmp-failure-js```` to set the error function. You can either create your own error function and call it, or display an alert. 
Example:

Start by adding the following line:
````html
<input type="password" xmp-password xmp-write-ador="xmp.r['XMPie.Web.NewPassword']">
````
Continue with confirmation fields. One option is to use a function that you created (the "onConfirmError" is an example of a function that you created):
````html
<input type="password" xmp-confirm-password xmp-failure-js="onConfirmError()" >
````

Another option is to display an alert: 
````html
<input type="password" xmp-confirm-password xmp-failure-js="alert('Passwords do not match!')" >
````
When an error occurs, a CSS class ````xmp-confirm-error```` is added to the confirm password input, and the function set in ````xmp-failure-js```` is called.
