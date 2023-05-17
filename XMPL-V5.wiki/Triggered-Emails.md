>### XMPL V5

You can have the XMPie system send emails as a response to events that occur on your XMPL webpage. For example, when a person submits a registration form you can trigger an email that will be sent to your site administrator; or you can send a thank you email when someone submits a refer-a-friend form, to thank them for recommending the site to their friend.

To trigger an email to be sent as a result of success in submitting a form, you would use an `xmp-success-trigger` attribute on your XMPL form element (be it `xmp-update` or `xmp-register` form). Use the `xmp-clicked-trigger` attribute on any clickable HTML element, to send an email when the element is clicked.

The following sections explain the attribute values and setup.

# Initial Setup

To set up the sending of emails, you must create email touchpoints in your Circle projects. The email touchpoints define email templates that will be sent when triggered. You will use their IDs in the webpage to trigger the sending of personalized emails based on them.

# Webpage Setup

Use either of the following email attributes, depending on when you wish to trigger an email to be sent:
- Add `xmp-clicked-trigger` to an element that when clicked, an email will be sent.  The attribute should be set to the email touchpoint that will be triggered.  For example:
````html
<button xmp-clicked-trigger="E2">I Like! </button>
````
- Add `xmp-success-trigger` to a form element that has the `xmp-update` or `xmp-register` attribute, to trigger an email upon the completion of a successfully submitted form. For example:
````html
<form xmp-update>
  Email: <input type="text" xmp-write-ador="xmp.r.Email"><br/>
  <input class="btn-primary" type="submit" 
      value="Update"
      xmp-success-trigger="E1,E2">
</form> 
````
The value of the attribute should be either one of the following:

1. A single ID of a touchpoint, for example, "E1". Touchpoint ID  with this id will be sent.
2. A comma-separated list of touchpoint IDs, for example, "E1,E2". This will cause all emails with the IDs to be sent.
3. The ID or IDs can be not of touchpoints, but rather of email configurations, which are defined by xmp-email elements. We will discuss this later (coming soon).

# Customizing the Email Touchpoints
Coming soon

# Shared Email Configurations
Coming soon