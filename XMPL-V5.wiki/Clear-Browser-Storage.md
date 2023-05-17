>### XMPL V5

When a recipient lands on a personalized page, XMPL saves the recipient ID in cookie, so that when the recipient navigates to another page in the same website, the recipient ID information is remembered and it does not have to be passed again in the URL.

In some situations you may want to work with multiple recipients in the same browser, to do this, you can clear browser cookies using one of the following methods:

#### Option 1

You can clear all XMPL cookies when the web page loads by adding the `xmp-clear-all-cookies-onload` attribute to the body tag: 

````html
<body class="is-preload" xmp-personalized-controller
  xmp-cloak
  xmp-clear-all-cookies-onload
  xmp-tracking-page-name="Landing Page">
...
</body>
````
NOTE: if the page uses the `xmp-anonymous-controller` attribute, XMPL will automatically clear the recipient ID cookie, and adding the `xmp-clear-all-cookies-onload` attribute is not needed.

#### Option 2

You can provide an option for the user to clear the cookie by clicking a link or button:

````html
<p>
  Not <span xmp-text="xmp.r.FirstName"></span>? 
  <button xmp-clear>Clear</button>
</p>
````
