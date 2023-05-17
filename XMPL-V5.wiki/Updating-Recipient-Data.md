>### XMPL V5

In this entry, we will look into the options for updating recipient data with XMPL V5 tags.

Two methods are available:    

1. Using forms to update data with user input
2. Automatically updating data on page load (coming soon)

See example [here](https://github.com/XMPieLab/XMPL-V5/blob/main/Sample%20sites/xmpl-jquery/index.html#L134).

# Setup

Setting up a webpage that carries out updates is done in the same way as any other personalization page. Use the steps described in [Webpage Personalization](https://github.com/XMPieLab/XMPL-V5/wiki/Webpage-Personalization#setup) to set up the required JavaScript and CSS references, and to write the basic attributes.

The project plan is an exception. You should make sure to create write ADORs that can be associated with the elements that you wish to update. As an example, you can review the SDK Sample Campaign plan.

# Updating Data through Forms

You can define an HTML form, let the user type in the data you wish him/her to update, and use the XMPL tags to associate write ADORs with these values and ensure they get submitted to the server. Consider the following example: 

```html
<form xmp-update xmp-success-url="index.html"> 
  <ul> 
    <li>First Name: 
      <input type="text" xmp-write-ador="xmp.r['firstname']"> 
    </li> 
    <li>Last Name: 
      <input type="text" xmp-write-ador="xmp.r['lastname']"> 
    </li> 
  </ul> 
  <input class="btn-primary" type="submit" value="save"> 
</form> 
```
The form tag has two attributes:  

* **xmp-update** - marks the form for updating ADORs. When the form is submitted upon a submit button click, all ADORs that are associated with it (via the xmp-write-ador attribute in the contained elements) are collected with their respective form values and sent to the server to update the recipient data.  

* **xmp-success-url** - provides the URL to navigate to after the form is successfully submitted. You may omit this attribute to remain on the same page after the form is submitted.  

Input tags may be used to implement user input. To create a tie between an input field and the matching ADOR, add the `xmp-write-ador` attribute to the input element, and as its value provide an ADOR reference. For example, the following is a field that sets the First Name ADOR:  

```html
<input type="text" xmp-write-ador="xmp.r['firstname']"> 
```

Note that when you place an ADOR reference using the `xmp-write-ador`, a two-way connection is created. This means that while the page is loads, if the ADOR also has a "read" expression, the field is populated with its value. In case the value of the retrieved ADOR is empty, you can use an `xmp-default-value` attribute which will be used to define an initial value to the referred write ADOR. If you want the field to always be empty, use an ADOR that has only a written expression.    

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

* **xmp-success-url** and **xmp-failure-url** - redirects to the URL provided as a value in case of form succeeds or fails to be submitted.

* **xmp-success-trigger** - triggers an email or external touchpoint to be sent when an activity completes successfully. The attribute value can be an email touchpoint ID. 

* **xmp-success-js** and **xmp-failure-js** - JavaScript code (normally function calls) to run in case of success or failure to submit the form.  

## Submit Button Overrides

When submitting a form you may want to carry out different activities based on the user's choices. One method to do so is to have multiple submit buttons, where each executes a slightly different action. For example, consider a form in an online shop where there are two buttons, one for submitting and continuing to browse products, and the other for immediate checkout. You can implement this by having two submit buttons, and using the XMPL ability to provide overrides to form activities, as can be seen in this example:

````html
<input type="submit" value="Add to cart" 
                     xmp-success-url="browseProducts.html">
<input type="submit" value="Add to cart and checkout" 
                     xmp-success-url="checkout.html">
````

We achieve this by adding an `xmp-success-url` with different values for each of the submit buttons. Based on the button that the user clicks when submitting the form, the attribute will override the respective form attribute (or, if there is no default, use it as the value) and act upon it.

This can be done with any of the `xmp-update` form attributes. You can provide defaults by defining the attribute on the form.

# Automatically Updating Values
Coming soon

# Recipient ID on Pages Redirect

Normally you would want to update a recipient input, not as a first page. You will also want to redirect to another page after submitting a form.

When providing redirect instructions, you DO NOT have to place the `rid` parameter in the URL as you did in the initial landing page. XMPL passes the recipient ID through cookies, so at least for the same session redirects will have the recipient ID available for them. Therefore, there is no need for `update.html?rid=XXXX` if it comes from `index.html?rid=XXXX`.

**important!** For this to work you must set up the page and run it through an http server. Use the instructions in [Getting Started](https://github.com/XMPieLab/XMPL-NG/wiki/Getting-Started#5-install-the-http-server-for-navigation-between-pages) to achieve this.

# Next
After learning how to update the data of existing recipients you may want to learn how to create registration forms to add new recipients. To learn more, go to [[Adding New Recipients Through Registration]].