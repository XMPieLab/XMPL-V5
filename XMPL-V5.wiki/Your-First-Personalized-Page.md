>### XMPL V5

The following tutorial will take you through the basics of creating a personalized website with XMPL V5.

Before you begin:
* Download the [tutorial materials](https://github.com//XMPieLab/XMPL-NG/raw/main/XMPL-NG-Tutorial-materials.zip)
* Review the [[Getting Started]] page to setup the tutorial campaign on your Circle and uProduce servers.

# Objectives

On this page, we will:
* Take a basic HTML page (provided in the [tutorial materials](https://github.com//XMPieLab/XMPL-NG/raw/main/XMPL-NG-Tutorial-materials.zip)) and add the XMPL V5 library to the page. 
* Add XMPL V5 attributes to control personalized or data-driven:
  * Texts
  * Images
  * Styles (CSS classes)
  * Element visibility
* The actual images and texts displayed are determined by the rid parameter passed in the browser URL and the logic in the campaign plan file. 
* Add XMPL V5 attributes to a web form on the page so that the recipient can update the campaign database and request additional information.
* Add XMPL V5 tracking attributes so that Circle Analytics can report web page visits, and clicks of buttons and links on the page.

To start, use your favorite text or HTML editor to open the index.html file in the "web pages - start here" folder, and follow the steps outlined below. If you get stuck, or need help, the completed page can be found in the "web pages - completed" folder.

**Note:** You should already have setup your campaign and downloaded the xmpcfg.js file as described on the [[Getting Started]] page.

# Head

Copy the XMPL V5 library scripts from below and add them to the head section of the index.html file.

````html
    <!-- XMPie XMPL library -->
    <script src="./xmpcfg.js"></script>
    <script src="https://ajax.xmcircle.com/ajax/libs/XMPL-V5/5.0/xmpl.min.js"></script>
````
The first script loads the xmpcfg.js file that you downloaded from your Circle project.

The second script loads the XMPL V5 library so that the attributes we add will work.

It is necessary to define the files in the head section. Your head element should now look like this:
````html
	<head>
		<title>Round Travel Campaign</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="assets/css/main.css" />
		<noscript><link rel="stylesheet" href="assets/css/noscript.css" /></noscript>
		<!-- XMPie XMPL library -->
		<script src="./xmpcfg.js"></script>
		<script src="https://ajax.xmcircle.com/ajax/libs/XMPL-V5/5.0/xmpl.min.js"></script>
	</head>
````

# Body
#### The Controller attribute
To use the XMPL V5 library, the body element needs to include the controller attribute. Either `xmp-personalized-controller` or `xmp-anonymous-controller`.

- `xmp-personalized-controller` - for personalized webpages where the personalization content is set up by the URL, which contains the recipient ID.
- `xmp-anonymous-controller` - for pages that do not contain personalization initially, but may at a later stage. An example of this is a registration page, where the web page viewer is not initially a recipient, but only becomes one once the registration form is submitted.

In this tutorial example, we are using `xmp-personalized-controller`.

**Note:** The `xmp-personalized-controller` or `xmp-anonymous-controller` attribute can be placed at the top-level element of the HTML body, or somewhere else. It should encapsulate any XMPL attributes on the page.

#### Optional attributes 
Additional attributes that are normally added to the landing (or first) personalized page include:
- `xmp-cloak` - to hide the content until the personalized data is available. It is good practice to use this attribute.
- `xmp-clear-all-cookies-onload` - to clear the local storage of the recipient id - this is particularly helpful when testing the URL with different recipients.
- `xmp-tracking-page-name` - this attribute allows us to define the name of the page that will be displayed in Circle Analytics.

Copy the body element below, and update the body element in your index.html file:
````html
<body class="is-preload" xmp-personalized-controller
      xmp-cloak
      xmp-clear-all-cookies-onload
      xmp-tracking-page-name="Landing Page">
````

# Text Personalization
On line 51 you will find the static text "\_firstname\_":

Copy the span element below and paste it into the index.html file to replace the static text.
````html
<span xmp-text="xmp.r.firstname"></span>
````
Your line should now look like this:
![Alt](https://github.com/XMPieLab/XMPL-NG/blob/main/tutorial-images/1-text-personalization.jpg "Text Personalization")

Lower down on line 158 you will find the static text "\_preference\_".

Copy the span element below and paste it into the index.html file to replace the static text.
````html
<span xmp-text="xmp.r.preference"></span>
````

# Image Personalization
On line 75 you will find an image (img) element that is loading "pic01.jpg".

Copy the attribute below and add to the end of the image element:
````html
xmp-image-asset="xmp.r.photo1"
````
Your line should now look like this:
![Alt](https://github.com/XMPieLab/XMPL-NG/blob/main/tutorial-images/2-graphic-personalization.jpg "Graphic Personalization")

Repeat the process to add:
* photo2 on line 84, 
* photo3 on line 93, and 
* photo4 on line 102.

# Style Personalization
On line 112 you will find section two. On this section, I would like to change the background color based on the plan logic in the "backgroundColor" ADOR object. 

Copy the attribute below and add to the end of the section element:
````html
xmp-class="xmp.r.backgroundColor"
````
Your line should now look like this:
![Alt](https://github.com/XMPieLab/XMPL-NG/blob/main/tutorial-images/3-style-personalization.jpg "Style Personalization")

**Note:** This is a simple example. The CSS class can be used to control font face and size, positioning and other attributes to suit the campaign and web page design needs.

# Element Visibility Personalization
On line 62 you will find an image element that is displaying the travel club membership logo. This logo should only appear for recipients that are members of the travel club.

Copy the attribute below and add to the end of the image element:
````html
xmp-show="xmp.r.isClubMember"
````
Your line should now look like this:
![Alt](https://github.com/XMPieLab/XMPL-NG/blob/main/tutorial-images/4-visibility-personalization.jpg "Visibility Personalization")

On line 132 you will find a div element that contains a web form. I want to hide this div if the recipient has already submitted the form. In the campaign plan file, there is a visibility ADOR called "showForm" that contains the logic to show or hide the form.

Copy the attribute below and add to the end of the opening div element:
````html
xmp-show="xmp.r.showForm"
````
Your line should now look like this:
![Alt](https://github.com/XMPieLab/XMPL-NG/blob/main/tutorial-images/5-visibility-personalization2.jpg "Visibility Personalization example 2")

A little lower down on line 156 is a div element that contains a thank you message and is hidden with a `style="display:none"` attribute. When the web form is hidden, I want to show this div instead. In the campaign plan file, there is a visibility ADOR called "showThanks" that contains the logic to show or hide the thanks div.

Delete the `style="display:none"` attribute.

Copy the attribute below and add to the end of the opening div element:
````html
xmp-show="xmp.r.showThanks"
````

# Web Form Personalization (Update form)
On line 134 you will find a web form element. This form is for recipients to confirm their contact details and request additional information. There are three main steps to configure a form with XMPL V5"

#### 1. Form type attribute
Copy the attribute below and add to the end of the form element:
````html
xmp-update
````
Your line should now look like this:

![Alt](https://github.com/XMPieLab/XMPL-NG/blob/main/tutorial-images/6-form-type.jpg "Form Type")

#### 2. Binding input fields to ADORs
We want to pre-populate the form fields with the recipient's current contact details, and allow the user to update them, as well as add additional information to the database to indicate that they want followup information.

Copy the attribute below and add to the end of the firstname input element:
````html
xmp-write-ador="xmp.r.firstname"
````
Your line should now look like this:
![Alt](https://github.com/XMPieLab/XMPL-NG/blob/main/tutorial-images/7-firstname-input.jpg "Binding Firstname ADOR to Firstname Input")

Repeat for the lastname and email input elements, using the corresponding ADOR names.

On line 148 you will find a hidden input element. We want to use this form field to insert a value into the recipient database that indicates that the recipient would like to receive the followup information. Because the database currently has no value in that field, in addition to using the `xmp-write-ador` attribute to specify the ADOR to bind the input field to, we also need to use the `xmp-default-value` attribute to set a value that will be written to the database when the recipient submits the form.

Copy the attributes below and add to the end of the followup hidden input element:
````html
xmp-write-ador="xmp.r.followup" xmp-default-value="true"
````
Because of the long line length, I have added an extra row. My code now looks like this:
![Alt](https://github.com/XMPieLab/XMPL-NG/blob/main/tutorial-images/8-hidden-input.jpg "Hidden input field")

#### 3. Handling on success and on error events
On line 152 you will find the submit button. XMPie provides attributes to:

* `xmp-success-url` - Navigate to another web page after successfully updating the database.
* `xmp-success-js` - Call a JavaScript function after successfully updating the database.
* `xmp-error-url` - Navigate to another web page if there is an error updating the database.
* `xmp-error-js` - Call a JavaScript function if there is an error updating the database.

For this example, I will use the `xmp-success-js` attribute to hide the form, and show a thank you message.

Copy the attribute below and add to the end of the submit input element:
````html
xmp-success-js="hideForm()"
````
**Note:** the hideForm() function is already defined in the main.js file provided in the tutorial materials.

# Link and Button Click Tracking
While we are on the submit button, we also want to record or track the recipients who have clicked the button, so copy this additional attribute to add to the submit input element:
````html
xmp-tracking-action="Requested Follup:CTA"
````
**Note:** The "CTA" at the end of the attribute value indicates that this is the primary "call to action" on the page. The main thing we want the customer to do on the page is to indicate that they are interested by requesting more information. All other links and buttons on the page are less important for our reporting.

Again, because of the long line length, I have added an extra row. My code now looks like this:
![Alt](https://github.com/XMPieLab/XMPL-NG/blob/main/tutorial-images/9-submit-button.jpg "Submit button action and tracking")

There are several other anchor elements on the page which we can also add the `xmp-tracking-action` attribute to:

* Line 39, the link to the XMPie website.
* Line 40, the link to the Campus website.
* Lines 38, 78, 87, 96, 105, 120,  the links to the Content page.
* Line 169, the email link.

In the case of these links, you would name the tracking action identifying what the customer did, but not include the ":CTA" keyword since these links are not the main call to action on the page.

For example:
![Alt](https://github.com/XMPieLab/XMPL-NG/blob/main/tutorial-images/10-tracking-action.jpg "Tracking link clicks")

# Save and test

Save your changes and test by double-clicking the index.html file to open the page in your default web browser. Remember to add `?rid=Jane.Jones` to the end of the URL. 

Test changing the recipient id to one of the other test recipients: "Jerry.Jones", "Sandra.Smith", or "Sam.Smith".

If something does not work as expected, compare your file against the index.html file provided in the "web pages - completed" folder.

**Congratulations!** You have completed the first page in this tutorial. You can now:

* Continue to [[Second Tutorial Page]] to setup the content.html tutorial page and complete the getting started tutorial, or
* Refer to [[Webpage Personalization]] to learn more options to personalize your web pages, or 
* Refer to [[XMPL Library Infrastructure]] to learn what xmp.min.js includes and what is in the xmpcfg.js file.