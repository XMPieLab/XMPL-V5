# Registration Form 

A common paradigm for using anonymous pages for which there is support in the XMPL HTML tags and attributes is a registration page. As part of your site, you can create a page that has a registration form. A page visitor can fill in this form and thus be added to your customer database. You can later complete the experience by redirecting to a personalized page, or a transition in the page itself. We will look into both methods.  

Inside Sample site you can find [full example](https://github.com/XMPieLab/XMPL-NG-SDK/blob/main/Sample%20sites/jquery/pages/registration.html).

We will start with defining such a form. Assuming that we have the `xmp-anonymous-controller` value set up, it is quite simple. Consider the following example of such a form: 

```html
<form xmp-register xmp-success-url="index.html"> 
  <ul>
    <li>First Name : <input type="text" xmp-write-ador="xmp.r['First Name']"  size="30" /></li> 
    <li>Last Name : <input type="text" xmp-write-ador="xmp.r['Last Name']"  size="30" /></li> 
  </ul> 
  <input class="btn-primary" type="submit" value="save"> 
</form> 
```

### Password Field in Registration Form  

In order to mark an input as a password field in the Registration form, use the XMPie.Web.NewPassword fixed ADOR name. For example:  

```html
<form xmp-register> 
  <input type="password" xmp-write-ador="xmp.r['XMPie.Web.NewPassword']"> 
</form> 
```
 
### Confirm Password  

In the registration form, you can add a confirmed user password input, in which case the user will need to enter the password twice in order to register.    
Add the `xmp-password` attribute to the password input that is connected to the XMPie.Web.NewPassword writes ADOR.  
Add the `xmp-confirm-password` attribute to the second input where the user will re-enter the password. 

# Updating Recipient Data 

Inside Sample site you can find [full example](https://github.com/XMPieLab/XMPL-NG-SDK/blob/main/Sample%20sites/jquery/pages/update-profile-xmpl-syntax.html).

You can define an HTML form, let the user type in the data you wish them to update, and use the XMPL tags to both associates write ADORs with these values and ensure they get submitted to the server. Consider the following example: 

```html
<form xmp-update xmp-success-url="index.html"> 
  <ul> 
    <li>First Name: 
      <input type="text" xmp-write-ador="xmp.r['First Name']"> 
    </li> 
    <li>Last Name: 
      <input type="text" xmp-write-ador="xmp.r['Last Name']"> 
    </li> 
  </ul> 
  <input class="btn-primary" type="submit" value="save"> 
</form> 
```
The form tag has two attributes:  

**xmp-update** - marks the form for updating ADORs. When the form is submitted upon a submit button click, all ADORs that are associated with it (via the xmp-write-ador attribute in the contained elements) are collected with their respective form values and sent to the server to update the recipient data.  

**xmp-success-url** - provides the URL to navigate to after the form is successfully submitted. You may omit this attribute to remain in the same page after the form is submitted.  

Input tags may be used to implement user input. To create a tie between an input field and the matching ADOR, add the xmp-write-ador attribute to the input element, and as its value provide an ADOR reference. For example, the following is a field that sets the First Name ADOR:  

```html
<input type="text" xmp-write-ador="xmp.r['First Name']"> 
```

Note that when you place an ADOR reference using `xmp-write-ador`, then a two-way connection is created. This means that when the page loads if the ADOR has also a "read" expression, the field is populated with its value. In case the value of retrieved ADOR is empty, you can use a xmp-default-value attribute which will be used to define an initial value to the referred write ADOR. If you want the field to be empty always, use an ADOR that has only a written expression.    

Finally, submit the form using a plain submit button. There is no need to provide any special attribute to the submit button for it to submit the form when clicked. 

### Password Field in Update Form  

You can allow the user to change the password. In order to mark an input as the new password field in the Update form, use the XMPie.Web.NewPassword fixed ADOR name. In order to mark an input as the existing password field in the Update form, use the XMPie.Web.ExistingPassword fixed ADOR name. For example:    

```html
<form xmp-update> 
  <ul> 
    <li>Username: 
      <input type="text" xmp-write-ador="xmp.r['UsernameAdor']"> 
    </li> 
    <li>Existing Password: 
      <input type="password" xmp-write-ador="xmp.r['XMPie.Web.ExistingPassword']"> 
    </li> 
    <li>New Password: 
      <input type="password" xmp-write-ador="xmp.r['XMPie.Web.NewPassword']"> 
    </li> 
  </ul> 
  <input type="submit" value="Update" /> 
</form> 
```
 
## Hidden Fields and Initial Values  

Sometimes you will want to automatically set values if a form is submitted. This behavior is common with regular forms, and for this purpose, hidden input fields are normally used.    

XMPL acts on this practice and allows you to use hidden input fields. Normally for these kinds of practices, you will want to provide a set value, instead of relying on an existing ADOR value in the database. To do this, set the value attribute to the desired value. Consider the following example:    

```html
<input type="hidden" xmp-write-ador="xmp.r['Update Form Submitted']" xmp-default-value="true"> 
```

In this example, we have an input field that is placed inside a form that will cause the ADOR Update Form Submitted to have the value of true if the form is submitted.  

## Other Attributes  

It is possible to place other attributes on an update form:  

**xmp-success-url** and **xmp-failure-url** - redirect to the URL provided as a value in case of form success or fails to submit  

**xmp-success-trigger** can be added to trigger an email or external touchpoint to be sent when an activity completes successfully. The attribute value can be an Email Touchpoint ID to use for sending the email. 

**xmp-success-js** and **xmp-failure-js** - javascript code (normally function calls) to run in case of success or failure to submit the form.  

Inside Sample site you can find [example](https://github.com/XMPieLab/XMPL-NG-SDK/blob/main/Sample%20sites/jquery/pages/update-profile-xmpl-and-js-syntax.html) how to use these attributes. 

# Adding New Recipients through Registration 

One method of adding new recipients to your database is by providing a registration page through which new viewers can register themselves and become recipients.  

The XMPL library allows you to define pages that start off as anonymous pages, lacking personalization, and define them in registration forms. When a user submits a registration form, the page can redirect to a personalized page per the initial data provided by the user and the calculated data that became available. You can also stay on the same page and only alter its view to become personalized.  

In this entry we will look into anonymous pages and registration forms. 

# Transitioning an Anonymous Page to a Personalized Page 

In [registration-and-update-page.html](https://github.com/XMPieLab/XMPL-NG-SDK/blob/main/Sample%20sites/jquery/pages/registration-and-update-page.html) you will find an example of such a page. 
Let's assume that you don't want to redirect the page to another URL. You prefer to transition the page to become personalized once the registration form is submitted. It is possible to do so since once a form is submitted, all ADORs used in the page (even if currently hidden) are retrieved for the newly created recipient, as well as its fresh recipient ID. 

To implement the "before" and "after" cases the page uses display: none styles for the existing recipient info. And when we have rid in our store use it.  

So far, we have only seen the xmp data structure used in the ADOR reference, such as xmp.r["First Name"] which is used to refer to the First Name ADOR of a recipient. However, xmp has a little more than that. For example, you can get the recipient ID, if available, by `window.xmpProvider.store.xmp.recipientID`. We can show or hide parts of the page based on `window.xmpProvider.store.xmp.recipientID` exists or not.  

Take a look at the following example: 
```html
<div id="form-registration"> 
  <h3 class="title">Registration form</h3> 
  <form xmp-register> 
    <ul> 
      <li>First Name: 
        <input type="text"xmp-write-ador="xmp.r['FirstName']" /> 
      </li> 
      <li>First Name: 
        <input type="text"xmp-write-ador="xmp.r['LastName']" /> 
      </li> 
    </ul> 
    <button type="submit">Log in</button> 
  </form> 
</div> 
```

This DOM content will be visible by initial. This is the initial case, where the page is still anonymous.  

```html
<div id="form-recipient" style="display: none;" > 
  <h3 class="title">Registration form</h3> 
  <form xmp-update xmp-success-url="success-update.html"> 
    <ul> 
      <li>First Name: 
        <input type="text"xmp-write-ador="xmp.r['FirstName']" /> 
      </li> 
      <li>First Name: 
        <input type="text"xmp-write-ador="xmp.r['LastName']" /> 
      </li> 
    </ul> 
    <button type="submit">Log in</button> 
  </form> 
</div>
```

This DOM content will be hidden. After we get adors information we will show content. 

To include content that should be shown once the page becomes personalized, use the information from xmpProvider store. For example, if you want to change the page to an update form after the registration form is submitted, use the following code: 

```javascript
function onLoad() { 
  const getRecipientInfo = () => { 
    if (window.xmpProvider.store.xmp.recipientID) { 
      const recipientData = document.getElementById('form-recipient'); 
      const registrationForm = document.getElementById('form-registration'); 
      recipientData.style.display = 'block'; 
      registrationForm.style.display = 'none'; 
    } 
  } 
window.xmpProvider.store.subscribe(getRecipientInfo) 
} 
window.addEventListener('load', onLoad)
```