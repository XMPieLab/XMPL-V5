>### XMPL V5

The following  XMPL V5 tutorial will take you through the setup of the second getting started tutorial page.

Before you begin, you should review the [[Getting Started]] page to setup the tutorial campaign on your Circle and uProduce servers, and [[Your First Personalized Page]] to setup the content.html page.

# Objectives

On this page, we will complete the second page of the Getting started tutorial by:
* Adding the XMPL V5 library to the content.html page. 
* Adding XMPL V5 attributes to control personalized or data-driven:
  * Texts
  * Images
  * Styles (CSS classes)
* Adding XMPL V5 attributes to a web form on the page so that the recipient can update the campaign database and request additional information.
* Adding XMPL V5 tracking attributes so that Circle Analytics can report web page visits, and clicks of buttons and links on the page.
* Handling a link back to the index.html page.

To start, use your favorite text or HTML editor to open the content.html file in the "web pages - start here" folder, and follow the steps outlined below. If you get stuck, or need help, the completed page can be found in the "web pages - completed" folder.

# Head

Copy the XMPL V5 library scripts from below and add them to the head section of the content.html file.

````html
    <!-- XMPie XMPL library -->
    <script src="./xmpcfg.js"></script>
    <script src="https://ajax.xmcircle.com/ajax/libs/XMPL-V5/5.0/xmpl.min.js"></script>
````

# Body
Copy the body element below, and update the body element in your content.html file:
````html
	<body class="is-preload" xmp-personalized-controller
		xmp-cloak
		xmp-tracking-page-name="Content Page">
````
**Note:** The `xmp-clear-all-cookies-onload` attribute is generally used only on the first or landing page of a personalized website. Since this is the second page, we want to remember the recipient id from the first page, so we don't want to clear the cookies.

# Text Personalization
On line 53 you will find the static text "\_preference\_".

Copy the span tag below and paste it into the content.html file to replace the static text.
````html
<span xmp-text="xmp.r.preference"></span>
````
Lower down on line 58 you will find the static text "\_promoText\_".

Copy the span tag below and paste it into the content.html file to replace the static text and it's containing span tags.
````html
<span xmp-text="xmp.r.promoText"></span>
````
Lower down on line 95 you will find the static text "\_preference\_".

Copy the span tag below and paste it into the content.html file to replace the static text.
````html
<span xmp-text="xmp.r.preference"></span>
````

# Image Personalization
On line 56 you will find an \<img\> tag that is loading "pic05.jpg".

Copy the attribute below and add to the end of the image element:
````html
xmp-image-asset="xmp.r.photo5"
````

# Style Personalization
On line 50 you will find section one. On this section, I would like to change the background color based on the plan logic in the "backgroundColor" ADOR object. 

Copy the attribute below and add to the end of the section element:
````html
xmp-class="xmp.r.backgroundColor"
````

# Element Visibility Personalization
On line 69 is a div element that contains a web form. I want to hide this div if the recipient has already submitted the form. In the campaign plan file, there is a visibility ADOR called "showForm" that contains the logic to show or hide the form.

Copy the attribute below and add to the end of the opening div tag:
````html
xmp-show="xmp.r.showForm"
````

A little lower down on line 92 is a div element that contains a thank you message and is hidden with a `style="display:none"` attribute. When the web form is hidden, I want to show this div instead. In the campaign plan file, there is a visibility ADOR called "showThanks" that contains the logic to show or hide the thanks div.

Delete the `style="display:none"` attribute.

Copy the attribute below and add to the end of the opening div tag:
````html
xmp-show="xmp.r.showThanks"
````

# Web Form Personalization (Update form)
On line 71 you will find a web form element.

#### 1. Form type attribute
Copy the attribute below and add it to the end of the opening form element:
````html
xmp-update
````

#### 2. Bind input fields to ADORs
Copy the attribute below and add to the end of the firstname input element:
````html
xmp-write-ador="xmp.r.firstname"
````
Repeat for the lastname and email input elements, using the corresponding ADOR names.

On line 85 you will find a hidden input element. 

Copy the attributes below and add to the end of the followup hidden input element:
````html
xmp-write-ador="xmp.r.followup" xmp-default-value="true"
````

#### 3. Handling on success and on error events
On line 88 you will find the submit button.

Copy the attribute below and add to the end of the submit input element:
````html
xmp-success-js="hideForm()"
````

# Link and Button Click Tracking
While we are on the submit button, we also want to record or track the recipients who have clicked the button, so copy this additional attribute to add to the submit input element:
````html
xmp-tracking-action="Requested Follup:CTA"
````

There are several other anchor elements on the page onto which we can also add the `xmp-tracking-action` attribute to:

* Line 38, the link to the XMPie website.
* Line 39, the link to the Campus website.
* Line 104, the email link.

# Linking back to the index.html page
On lines 27 and 36, there are anchor elements that link back to the index.html page. Because the index page contains the `xmp-clear-all-cookies-onload` attribute, we need to pass the recipient id in the URL to the page.

Copy the attribute below and add to the end of the opening anchor (a) tags on lines 27 and 36:

````html
xmp-href="index.html?rid={{xmp.r['XMPieRecipientKey']}}"
````
**Note:** The href attribute on the anchor will be overridden by the xmp-href, but for clarity, you may want to remove the existing `href="index.html"`. 

# Save and test

Save your changes and test by double-clicking the content.html file to open the page in your default web browser. Remember to add `?rid=Jane.Jones` to the end of the URL. 

Test changing the recipient id to one of the other test recipients: "Jerry.Jones", "Sandra.Smith", or "Sam.Smith".

If you are testing the tutorial web pages on a web server, you should be able to navigate between the index.html and content.html pages. If you are simply double-clicking to test the pages, this link navigation will not work.

If something does not work as expected, compare your file against the content.html file provided in the "web pages - completed" folder.

**Congratulations!** You have completed both pages in this tutorial. If creating a real cross media project, you would now copy or upload the completed web site to your XMPL web server.

For more information about using XMPL V5:

* Refer to [[Webpage Personalization]] to learn more options to personalize your web pages, or 
* Refer to [[XMPL Library Infrastructure]] to learn what xmp.min.js includes and what is in the xmpcfg.js file.