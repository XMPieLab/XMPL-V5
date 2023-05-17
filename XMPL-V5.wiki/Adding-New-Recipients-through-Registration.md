>### XMPL V5

One method of adding new recipients to your database is by providing a registration page through which new viewers can register themselves and become recipients.

The XMPL library allows you to define pages that start as anonymous pages, lacking personalization, and define in them registration forms. When a user submits a registration form, the page can redirect to a personalized page per the initial data provided by the user and the calculated data that became available. You can also stay on the same page and only alter its view to become personalized.

In this entry, we will look into anonymous pages and registration forms.

# Anonymous Pages

So far, in [[Webpage Personalization]] and [[Updating Recipient Data]] we saw personalized pages. This means that when a page loads, the recipient ID is realized from the URL or a passed cookie. Data is then retrieved from the database based on the requirements of the page, and personalized data is presented.

There are other scenarios where we will want to use XMPL HTML tags and attributes that do not involve the initial loading of a recipient. For example, we may want to create a registration form in which initially there is no recipient, but only after the user submits the data we direct him/her to a personalized page (or not). There are scenarios where we will want to use XMPL outside of a viewer (recipient paradigm).
All these scenarios cannot use the regular personalization schema. 

For these cases, we have the Anonymous page controller. To set it up on a page use the same steps used with a personalized page, described [here](https://github.com/XMPieLab/XMPL-NG/wiki/Webpage-Personalization#setup), but with two differences:

1. Define the anonymous page controller as `xmp-anonymous-controller`.
2. There is no need to access the page with a `rid` parameter at the URL, as there is no **r**, meaning a recipient.

The body tag for an anonymous page:
````html
<body xmp-anonymous-controller xmp-cloak>
      YOUR PERSONAL CONTENT HERE
</body> 
````

Once you set up a page to be an anonymous page, it means that it does not initially load data. You can still use all personalization tags, wherever it makes sense. For example, you can create a registration form, as we will soon, and use the same ADOR references as you did with the update form, to indicate which fields should be used to create the initial values for a recipient.

Later in this entry, we will also review how to create a transition on the same page from an anonymous state to a personalized state, once registration is complete.

Using the library HTML tags and attributes you can perform such a transition in the registration form scenario.

# Registration Form 

To save data about user between anonymous and personalized page you must use `xmp-remember-recipient` directive.

````html
<body xmp-anonymous-controller xmp-cloak xmp-remember-recipient="true">
      YOUR PERSONAL CONTENT HERE
</body> 
````

A common paradigm for using anonymous pages for which there is support in the XMPL HTML tags and attributes is a registration page. As part of your site, you can create a page that has a registration form. A page visitor can fill in this form and thus be added to your customer database. You can later complete the experience by redirecting to a personalized page or adding a transition to the page itself.  

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

In order to mark an input as a password field in the registration form, use the XMPie.Web.NewPassword fixed ADOR name. For example:  

```html
<form xmp-register> 
  <input type="password" xmp-write-ador="xmp.r['XMPie.Web.NewPassword']"> 
</form> 
```
 
### Confirm Password  

In the registration form, you can add a confirm user password input, in which case the user will need to enter the password twice to register.    
Add the `xmp-password` attribute to the password input that is connected to the XMPie.Web.NewPassword writes ADOR.  
Add the `xmp-confirm-password` attribute to the second input where the user will re-enter the password. 

# Transitioning an Anonymous Page to a Personalized Page
Let's assume that you don't want to redirect the page to another URL. You prefer to transition the page to become personalized once the registration form is submitted. It is possible to do so since once a form is submitted, all ADORs used in the page (even if currently hidden) are retrieved for the newly created recipient, as well as its fresh recipient ID. 

In [registration-and-update-page.html](https://github.com/XMPieLab/XMPL-NG/blob/main/Sample%20sites/jquery/pages/registration-and-update-page.html) you will find an example of such a page. 

To implement the "before" and "after" cases the page uses display: none styles for the existing recipient info. And when we have rid in our store use it.  

So far, we have only seen the xmp data structure used in the ADOR reference, such as xmp.r["First Name"] which is used to refer to the First Name ADOR of a recipient. However, xmp has a little more than that. For example, you can get the recipient ID, if available, by `window.xmpProvider.store.xmp.recipientID`. We can show or hide parts of the page based on whether `window.xmpProvider.store.xmp.recipientID` exists or not.  

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

This DOM content will be hidden. After we get ADORS the information we will show content. 

To include content that should be shown once the page becomes personalized, use the information from the xmpProvider store. For example, if you want to change the page to an update form after the registration form is submitted, use the following code: 

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

# Next

There is another paradigm for adding recipients that are supported by XMPL HTML tags and attributes. It is carried out by a recipient referring a friend. We will look into it in [[Refer a Friend]].