>### XMPL V5

We have an exciting campaign, with flashing graphics and astounding interactivity, and of course, it is personalized.    

We now need to analyze it. For example, we want to learn how many people reached the important pages and what did they do on them; does user behavior differ according to age group; do certain users want to receive a specific type of offering, while others a different one. 

We can perform such analysis using XMPie's Circle Analytics, and the ability of XMPL-based sites to gather information.

![Alt](https://github.com/xmpieLab/XMPL-SDK/blob/master/Images/CircleAnalytics.jpg "Circle Web Analytics")

Performing analysis with XMPie's Circle Analytics is very useful because you can use all the information from the user database. This means presenting it in reports as well as making queries based on it. This is a result of having the recipient data available, *in addition* to the website behavior data.

In this entry, we will discuss how to gather website behavior data to generate interesting reports.

The options for tracking are as follows:

1. Track page entry and exit.
2. Track success and failure to submit update, registration, and referral forms.
3. Track interaction with various page elements.

An example page that utilized most of the tracking options is [index.html](https://github.com/XMPieLab/XMPL-V5/blob/main/Sample%20sites/xmpl-jquery/index.html#L21).

# The Basics

To set up tracking for an XMPL page you must start with defining an `xmp-tracking-page-name` for the top-level XMPL element. This would be the element for which you defined `xmp-personalized-controller`. 

The value of `xmp-tracking-page-name` should be a meaningful name. You can use the webpage file name, or any logical name that would indicate its functionality in a report.    

For example, in [index.html](https://github.com/XMPieLab/XMPL-V5/blob/main/Sample%20sites/xmpl-jquery/index.html#L21) the name "Landing Page" is used:
 
```html
<div xmp-personalized-controller xmp-tracking-page-name="Landing Page" xmp-cloak></div> 
```

The tracking page name will be used as the page name parameter for all tracking activity that occurs on the page.  

In addition, defining a name automatically triggers tracking of page entry and page exit events, using "Page Load" and "Page Leave" as default action names. Action names provide a method for deciphering one activity from another.   

**Note:** Only personalized pages are tracked. Google Analytics or other tools can be used to track anonymous pages. 

# Track Action Success and Failure

You can define an alternative action name for the "Page Load" event by defining an `xmp-success-track-action` attribute, with the value of the alternative action name.

The same attribute, if defined for one of the form types - update, register, refer - will cause the success of the submitted form to be tracked as an event, with the action name as the value of the form. For example:

````html
<form xmp-update xmp-success-track-action="update">
````
Success in updating with the update form will trigger tracking an `update` activity.

You can also track failure for the form submits, or page load, using an `xmp-failure-track-action` with a relevant action name that represents that failure, such as `update failure`.

Like other features on forms, it is fine to define overriding attributes for these properties on multiple submit buttons, if such exist. This will cause different activity names to be tracked based on which submit button is clicked.

# Tracking General Activity on the Page

You can track `click` or `change` HTML events on various elements on the page.
To do this, add to the element that you want to track an `xmp-tracking-action` attribute:

````html
<input type="text" 
       xmp-write-ador="xmp.r['firstname']"  
       size="30" 
       xmp-tracking-action="first name edited">
````

When the user finishes to type in this field and moves to another field, or to another area on the page, an HTML `change` event is triggered. This will trigger an XMPL track event, where the name of the action is per the value of the `xmp-tracking-action` attribute, in this case - `first name edited`.

On any input element which is not of type `image`, `submit`, `button` or `reset`, the event triggering tracking would be the HTML change event. The same would be if you place an `xmp-tracking-action` on a `select` or `option` element. On an anchor (`a`) element, it would be the `mouseup` event. For all other cases, the `click` event.

When used like in the example, the value (e.g. `first name edited`) denotes the action name for the tracking event.

You can also use this parameter to determine the event type that will be registered for tracking, and some additional parameters. You do this by setting the value of the `xmp-tracking-action` attribute to one, two or three strings separated by a comma (,). For example:

````html
<input type="text" 
       xmp-write-ador="xmp.r['firstname']"  
       size="30" 
       xmp-tracking-action="first name edited,value edited,hello world:CTA">
````

The value for the `xmp-tracking-action` has three parameters separated by a comma, and an optional parameter at the end `:CTA` to identify the action as the primary call to action on the page:

1. The first parameter has the action name for tracking. It is a logical name for the action. If omitted (attribute has an empty value), XMPL will use a logical name for the element, such as `Checkbox` if the element is a checkbox, or `Textbox` if the element is a text box.
2. The second parameter defines the event type name. This is a generic logical name for the type of event that occurred. If omitted, the default event name will be `Performed Action`, unless the element on which the attribute is placed is an anchor (`a` element), in which case the name will be `Navigated`.
3. The third parameter is another optional parameter that provides a miscellaneous parameter. It can help you further separate different activities on the page. If omitted, null is passed for this parameter tracking action.
4. Adding `:CTA` to the end of the xmp-tracking-action will identify the action as the main call to action on the page. While your web page can have many links and buttons that you are tracking, usually, the page will have one main purpose or call to action. For example, to get the customer to buy a product, register to attend an event, or to download a brochure. In Circle Analytics you can then choose to report on clicks of all page links, or on only the main Call To Action.

# Tracking Referral Source and Media
Circle Web analytics can be enhanced by tracking the source which referred traffic to the website, so that you can assess which of your campaign touchpoints, or media performed best. For example, the source could be the touchpoint from which the web URL is clicked in order to arrive at the website (e.g., E1-Invitation), and the media is the type of touchpoint media (email, SMS, webpage, social media, print document's QR Code). 

![Alt](https://github.com/xmpieLab/XMPL-SDK/blob/master/Images/CircleAnalyticsReferrals.jpg "Referral source and media shown in Circle Web Analytics")

If you have PersonalEffect 10.2 or later, you can use Web ADORs (shown below in the Circle Email Editor) which are created automatically and will include referral tracking parameters in the web URL by default. 

![Alt](https://github.com/xmpieLab/XMPL-SDK/blob/master/Images/pe10WebAdors.jpg "Special Web ADORs shown in the Circle Email Editor")

If you do not yet have PersonalEffect 10.2 or later, you can still track the referral source and media information by including these parameters in the web URL: `xmpmedia` for the media type and `xmpsrc` for the name. 

Examples:
````html
https://mycompanydomain.com/mycampaign/MyRecipientKey?xmpmedia=SocialMedia&xmpsrc=Facebook
https://mycompanydomain.com/mycampaign/index.html?rid=MyRecipientKey&xmpmedia=Web&xmpsrc=CompanySite
https://mycompanydomain.com/mycampaign?xmpsrc=E1
````

Notes:
* The parameters can be added to friendly or unfriendly URLs
* If you are using the Circle Touchpoint ID, you only need to add the `xmpsrc` parameter. The media is automatically identified by the touchpoint type.
* Custom values can be added for either source or media parameters. For example `SocialMedia` shown in the above Circle Analytics image does not correspond to a Circle Touchpoint media type.