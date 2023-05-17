>### HTML V5

The following provides a full reference to all markup that you can add to your webpage when using XMPL.

# Setup

Setup related attributes. For more information on setting up an XMPL page, refer to [[Your First Personalized Page]].

### ng-app

Not supported

### ng-controller
Not supported

### xmp-personalized-controller
The topmost div element contains the `xmp-personalized-controller` attribute. This means that we create a page for personalized webpages where the personalization content is set up by the URL, which contains the recipient ID. 
````html
<div xmp-personalized-controller xmp-cloak > 
  Welcome <span xmp-text="xmp.r['FirstName']"></span><span xmp-text="xmp.r['LastName']"></span>! 
<div> 
````

### xmp-anonymous-controller 
Once you set up a page to be an anonymous page, it does not initially load data. 


````html
<body xmp-anonymous-controller xmp-cloak ></body> 
````


# Basics

### xmp-text 
To add text content use the `xmp-text` attribute, where the value of the attribute is an ADOR. Available ADOR Formats are: 

* xmp.r.ador 
* xmp.r['ador'] 
* xmp['r']['ador'] 
* xmp['r'].ador

````html
Welcome <span xmp-text="xmp.r['FirstName']"></span><span xmp-text="xmp.r['LastName']"></span>! 
````

### xmp-src
The `xmp-src` attribute can be used in an img element to declare a variable image URL. The attribute value may contain ADOR references to provide the image variability. For example:  
 
````html
<img xmp-src="images/{{xmp.r['image_offer'}}" /> 
````

The HTML declaration defines an image object whose source is an image in the site images folder, the name of which is determined by the `image_offer` ADOR. For instance, if for the viewing recipient the value is `goat.jpg`, then the displayed image would be from `images/goat.jpg`.


### xmp-href
The `xmp-href` attribute can be used in an (anchor) element to declare a variable target URL (href). The attribute value may contain ADOR references to provide the URL variability. For example: 

````html
<a xmp-href="{{xmp.r['offer_page']}}">click here</a> 
<a xmp-href="offers/{{xmp.r['offer_page']}}">click here</a>
<a xmp-href="xmp.r['XMPie.PDF.P1']">View the PDF</a>
````

This example shows three methods of using `xmp-href`. In the first, the ADOR contains the full URL to the target page, and in the second, the ADOR contains part of the URL to the target page. In the third, the ADOR is the automatic ADOR for a PDF on Demand touchpoint and the ADOR contains the full URL to the target page.

### xmp-class

xmp-class can be used to determine the css classes applied to an HTML element. For example: 

````html
<p xmp-class="xmp.r.FirstName" class="base">Text</p> 
<p xmp-class="{'gold': xmp.r['FirstName'] === 'David', 'plain': xmp.r.LastName === 'IncorrectName' }" class="base">Text</p> 
````

The second form determines the class name, either gold or plain, based on a condition that uses the xmp.r.Member ADOR. 

### xmp-show

`xmp-show` attribute can be added to any HTML element to determine whether it is visible or not. The attribute value should be an ADOR name, whose value is true or false. 

````html
<div xmp-show="xmp.r['IsFemale']"></div>
````

### xmp-repeat
````html
<ul>
    <li xmp-repeat="item in xmp.r['Courses']">
      <span xmp-repeat-value="item['Hours']"></span> hours
    </li>
</ul>
````

# Assets

Assets are content elements, such as images and text files, that are uploaded to the Circle campaign. You can use these assets in your HTML by adding assets-specific attributes, such as `xmp-image-asset`, and providing as their values ADORs that when personalized, will have the name of those assets.

### xmp-image-asset
Use `xmp-image-asset` with an image element to set it with an image that is an asset from the Circle project. The value of the `xmp-image-asset` attribute is an ADOR reference, whose value for a recipient will be an asset name. Use this directive outside the form element.  

For example, the following sets the image with an asset which is the value of the xmp.r.MyAdor ADOR: 

````html
<img xmp-image-asset="xmp.r.MyAdor"/> 
```

### xmp-text-asset
Use `xmp-text-asset` with an HTML element to set its internal text to be the content of a text asset. The text asset is hosted on the Circle project, and the value of the attribute is an ADOR name. When the page is loaded, The ADOR is evaluated for the recipient and the result value is an asset name. The asset is then fetched, and the text becomes the element text.

### xmp-html-asset
Use `xmp-html-asset` with an HTML element to set its inner HTML to be the content of an HTML asset. The HTML asset is hosted on the Circle project, and the value of the attribute is an ADOR name. When the page is loaded, The ADOR is evaluated for the recipient and the result value is an asset name. The asset is then fetched, and the HTML content becomes the element internal HTML.

# Forms
There are several built-in forms that XMPL provides. The forms can be used to register a new recipient or update the data of an existing recipient. Each form contains multiple input fields that are connected to matching ADORs (write ADORs) using the `xmp-write-ador` attribute. When the form is submitted by clicking a submit button in the form (there is no need to define a click event or target, this is done automatically), the relevant activity is carried out (e.g. create a new recipient). As a result of the activity, you may want to redirect the viewer to another page or run a method. 

### xmp-write-ador
Use xmp-write-ador in an XMPL form to associate an input field with an ADOR. The attribute should be placed on an HTML input or selected element and its value should be an ADOR reference. The ADOR must have a written expression (meaning it has to be a write ADOR). For example, the following binds the input field to xmp.r.Fname:   

````html
<input type="text" xmp-write-ador="xmp.r.Fname" />
````

### xmp-default-value
When using an xmp-write-ador you can, in addition, provide an `xmp-default-value` attribute which will be used to define an initial value to the referred write ADOR. In case the value of the retrieved ADOR is empty, the default value will be assigned (update form). In case the ADOR does not exist yet, the default value will be assigned (the registration form) 

````html
<input type="text" xmp-write-ador="xmp.r.Fname" xmp-default-value="John" /> 
````

### xmp-update
`xmp-update` is an XMPL attribute that you can add to a form element. When the form submit button is clicked, the recipient data is updated. Use this form to provide editing capabilities to the recipient data. `xmp-write-ador` attributes determine the specific ADORs that are affected by this form. 

### xmp-register
`xmp-register` is an XMPL attribute that you can add to a form element. When the form submit button is clicked, a new recipient is added with the form data as its initial values, per the defined `xmp-write-ador` attribute inputs. Use this form to register a new recipient.  

The form should be used in the context of an `xmp-anonymous-controller`. 

### xmp-refer
`xmp-refer` is very similar to `xmp-register` in that it creates a form that can be used to register a new recipient. However, this form is filled by an existing recipient, to recommend the website/webpage to another person. The `xmp-write-ador` attributes now refer to `xmp.referredRecipient` as receptors of the ADOR values, and when submitted the form creates a new recipient based on them. For example:

````html
<form xmp-refer>
  First Name: <input type="text" 
                     xmp-write-ador="xmp.referredRecipient.Fname">
  <input class="btn-primary" type="submit" 
         value="save" xmp-success-url="thanks.html">
</form> 
````

The form definition has `xmp-refer`, making it a refer form. The only input field refers to the `Fname` ADOR of the referred recipient via `xmp-write-ador="xmp.referredRecipient.Fname"`.

### xmp-password
The password input connected to the XMPie.Web.NewPassword write ADOR. 

### xmp-confirm-password
The confirm password input where the user re-enters the password. 

# Success/Failure Behavior Modifiers
The attributes described in this section determine the behavior of the page in three possible scenarios:  

* Page load  
* Refer form submit
* Register form submit  
* Update form submit  

In each of these cases, the action may succeed or fail, and you have the ability to define how the page will behave as a result. There are several attributes to do that. For example, xmp-success-url determines a location to navigate to on successful completion of the activity.  

Particularly to forms, you may choose to define the attributes on the submit button(s) instead of on the form. Using this method, you can define different behaviors for multiple submit buttons in the same form.

### xmp-success-trigger
xmp-success-trigger can be added to trigger an email or external touchpoint to be sent when an activity completes successfully. The attribute value can be an Email Touchpoint ID to use for sending the email. 

### xmp-success-url
When `xmp-success-url` is added to an element and the action completes successfully, the viewer will be navigated to a new website. The URL is defined by the value of the attribute. 

### xmp-failure-url
When `xmp-failure-url` is added to an element and the action fails to complete, the viewer will be navigated to a new website. The URL is defined by the value of the attribute.   

### xmp-success-js
Add `xmp-success-js` to run JavaScript code upon successful completion of the activity. The attribute value should be JavaScript code to run (similarly to the onclick attribute). 

### xmp-success-ng
Not supported

### xmp-failure-js
Add `xmp-failure-js` to run JavaScript code when the activity fails. The attribute value should be JavaScript code to run (similarly to the onclick attribute). 

### xmp-failure-ng
Not supported

# Tracking

### xmp-tracking-page-name
`xmp-tracking-page-name` attribute should be placed on the top-level element, containing the controller element. This would be the element for which you defined xmp-personalized-controller. Its value is the page name for purposes of tracking.   

### xmp-tracking-action
`xmp-tracking-action` can be used on a button, input field, or any other type of HTML element to create a tracked event if clicked or edited. The value of the attribute is the action name with optional extra parameters. You can read more about this activity [here](https://github.com/XMPieLab/XMPL-NG/wiki/Web-Analytics).

# Social Media Share

### xmp-facebook-share

Contact [product@xmcircle.com](mailto:product@xmcircle) if you need this attribute.

### xmp-twitter-share

Contact [product@xmcircle](mailto:product@xmcircle) if you need this attribute.

# Email

Email sending may be triggered by placing the `xmp-clicked-trigger` attribute on areas where a click triggers the sending of an email, as well as defining `xmp-success-trigger` on the form/page controller. The attributes below control email sending.

### xmp-email

Contact [product@xmcircle](mailto:product@xmcircle) if you need this attribute.

### xmp-clicked-trigger

Depricated

### xmp-unsubscribe
The `xmp-unsubscribe` is used by the recipient to opt-out from getting further emails.

The unsubscribe page is a regular XMPL personalized page.  However, this unsubscribe page must not be called from the website itself, but rather from the Account Settings.  Set the URL to the page in  Circle > Build > Connect > uProduce Account > Edit > Email Settings > Unsubscribe Web address > Custom.  On the page itself `xmp-unsubscribe` attribute should be placed on clickable content in an unsubscribe page. When the content is clicked it changes the email subscription status for the current recipient. Its value, `true` or `false`,
sets it to unsubscribe or resubscribe respectively. 

Example 1
````html
<li>
    <a
      href=""
      class="button special"
      xmp-unsubscribe="true"
      xmp-success-url="unsubscribed.html" 
      xmp-failure-url="unsuscribedFailed.html">
       Unsubscribe
   </a>
</li>
`````

Example 2
````html
<li>
   <a
     href=""
     class="button"
     xmp-unsubscribe="false"
     xmp-success-js="alert(‘action completed successfully');" 
     xmp-failure-js="alert('action couldn’t succeed');">
       Subscribe
   </a>
</li>
````

# Forced Async Loading

When a personalized page is loaded the ADOR references for it are scanned and later the page requests the values of these ADORs for the viewing recipient. Some ADORs, such as uImage-based image ADORs, take a long time to compute, and are therefore loaded asynchronously, automatically displaying a *loading* indicator until the image is loaded.

In some cases, you may want to control the ADOR loading so that even if the images are not uImage ADORs they are loaded asynchronously, as they take a long time to compute. The `xmp-async` and `xmp-load-async-ador` help you control whether certain ADORs are be fetched asynchronously. 

### xmp-async
The `xmp-async` attribute can be added to an element (with no value) to denote the asynchronous loading of this element. 
This attribute is used only with `xmp-image-asset`, `xmp-html-asset`, `xmp-text-asset`.

Each ADOR defined by another attribute in an element that has `xmp-async` attribute will be fetched not by the regular ADOR fetching, but rather a request is sent per `xmp-async` element for the ADORs that are referred to in its attributes.

For example:

`<img alt="Your Text Here" xmp-image-asset="xmp.r['uimage']" xmp-async />` 

Note that `xmp-async` does not affect child elements. Child elements will have their ADORs fetched with the initial load. If you want to wait for child ADORs, define them as `xmp-async` as well.

While the ADORs are loaded for the element, it will change its appearance. A `DIV` element will appear next to the element, now hidden. When loading ends the element will be removed and the original element is shown.

You can control the appearance of the loading element with two attributes that you can place on the original element (one with `xmp-async`):

- `xmp-async-busy-class` - if defined, this class name will be defined as a class for the loading element. Through this class you can control it's viewing aspects.
- `xmp-adapt-progress-size` - if defined, the dimensions of the loading object will be equal to the dimensions of the original element at loading time.

### xmp-load-async-ador
Adding `xmp-load-async-ador` attribute to your element, and providing as its value one or more ADOR names (separated by a comma), will declare these ADORs for asynchronous loading. This attribute can be used only with `xmp-personalized-controller`. These ADORs will not be loaded as part of the initial ADOR fetching for the recipient. Rather, they will be loaded using an asynchronous job. This is useful for ADORs that take long time to compute.

As opposed to using `xmp-async` attribute, using `xmp-load-async-ador` has no direct visual effect on the element that defines it (only the ADORs declared by this attribute are loaded asynchronously, not all attributes defined on this element).

# Page Load Behavior Tweaks

### xmp-cloak
When using the XMPL controllers, anonymous or personalized, the initial login or loading of ADORs may take some time. If you want to hide areas of your page until it is done, apply to them the `xmp-cloak` attribute. The styles define anything with this attribute to `display:none`. When the page is loaded the directive definition for xmp-cloak removes itself, so the areas are not shown. 

### xmp-update-on-page-load

You may want to update values for a recipient as soon as the page loads. To do this, define `xmp-update-on-page-load` elements. For example:

````html
<xmp-update-on-page-load xmp-ador="xmp.r['Visited']" xmp-value="1"/>
````
The example saves the value `1` to the `Visited` ADOR. 

Two attributes are defined:
`xmp-ador` - a reference to the ADOR for which to save the value
`xmp-value` - the value to save

Adors can be updated with JS expression
````html
<div
  xmp-update-on-page-load
  xmp-ador="xmp.r['Visited']"
  xmp-value="1 + parseInt({{xmp.r['Visited']}},10)">
</div>
```` 

### xmp-load-ador
Use `xmp-load-ador` as an attribute anywhere within the controller element to declare ADORs for loading. Its value should be a comma-separated list of ADOR references. 

### xmp-no-caching
Coming soon

### xmp-turn-off-default-error 
Prevents the default error page from being displayed when an error occurs. 