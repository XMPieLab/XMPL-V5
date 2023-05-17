>### XMPL V5

XMPL's `xmp-refer` attribute provides the ability to extend your recipient base by adding a recipient via a Refer-a-friend webpage form.
     
You do this by creating a "refer" form on a webpage. The refer form functionality is similar to the update and registration forms. These forms update the current recipient. The Refer-a-friend form allows the current recipient to add another recipient (a friend). Once the form is submitted and the referred recipient is added to the database, the page may redirect to a thank you page or remain on the same page and suggest that you recommend another friend.      

XMPL isolates the recipient data from the referred recipient data, so you can use both in the same page.

The following section discusses the creation of "refer" forms and what can be done with them.    

# Set Up a Refer Form

To add a refer form to your page use a plain HTML form and add to it the `xmp-refer` attribute. It includes input fields with xmp-write-ador reference.
The following is an example of a simple refer form:    

````html
<form xmp-refer xmp-success-url="success.html">
  <div class="form__section">
    <div class="form__group-title">First Name:</div>
    <div class="form__group">
      <input class="input__element" type="text" size="30" xmp-write-ador="xmp.referredRecipient['firstname']" />
    </div>
  </div>

  <div class="form__section">
    <div class="form__group-title">Last Name:</div>
    <div class="form__group">
       <input class="input__element" type="text" size="30" xmp-write-ador="xmp.referredRecipient['lastname']" />
     </div>
   </div>     		
   <button class="btn btn__primary" type="submit">
      <span class="btn__content" >Save</span>
   </button>
</form>		
````

The form tag contains the following attributes:    
1. `xmp-refer` - marks this form as a refer form. When submitted, the values in the form, together with their respective ADOR references, are collected and a new referred recipient is created.
2. `xmp-success-url` - similarly to other forms, the `xmp-success-url` attribute can be used to define a redirection URL once the form is submitted. This attribute is optional.

All other attributes that are common for XMPL forms are available in the [Updating Recipient Data](https://github.com/XMPieLab/XMPL-V5/wiki/Updating-Recipient-Data#other-attributes) page. 

Similar to other forms, the association between ADORs and form fields is carried out using `xmp-write-ador`. However, there is a critical difference. The reference to a referred recipient uses `xmp.referredRecipient[XXXXX]` instead of `xmp.r[XXXXX]`. This is because we want to affect the *referred recipient* data and not the *viewing recipient* data. This isolation allows us to use both entities on the same page, as we will see later when defining reference thank you pages. 

Other than this, ADOR usage is the same. The name of the ADOR should be provided, and it should refer to a written ADOR in the plan.

# Post Submit Behavior

Once the form is submitted using a plain submit button, the XMPL infrastructure sends a recipient addition request to the XMPL server. This is very similar to how registration works. An addition request about the referred recipient is saved in `xmp.referredRecipient`. In addition, the referred recipient ID is saved in `xmp.referredID`.

At this point, you can either choose to stay on the same page, transition to a "thank you" page which allows to refer another recipient, or just navigate to another personalized or non-personalized page.

# Redirecting to a Thank You Page

When navigating to another page after submitting the form, the referred recipient ID is saved in a cookie and transferred to the next page. This means that if the next page contains any references to the referred recipient's ADORs, they will be loaded with data once the page loads, similarly to how recipient data is loaded in a personalized page.

This allows you to create a thank you page.

````html
<body xmp-personalized-controller>
  <div class="section-title">
    <p>
      <span id="firstName">
        <span xmp-text="Thanks {{xmp.r['firstname']}}. "></span>
      </span>
      <span id="referredRecipient">
        <span xmp-text="We will be with {{xmp.referredRecipient['firstname']}} {{xmp.referredRecipient['lastname']}} soon."></span>
      </span>
    </p>
  </div>
</body>
````

Note how both entities are used on the same page - the `xmp.r` entity is used for its `First Name` ADOR, and the `xmp.referredRecipient` entity is used for its `First Name` and `Last Name` ADORs.
When XMPL scans the page for ADOR references of either entities, based on the provided data of recipient and referred recipient IDs, it retrieves it from the server.

# Transitioning to "Thank You" on the Same Page

You can choose to stay on the same page by not providing the `xmp-success-url`. If you wish to transition the page to a stage that is aware of the referred recipient data after the form has been submitted, use a similar method to the one used in registration, described [here](https://github.com/XMPieLab/XMPL-NG/wiki/Adding-New-Recipients-through-Registration#transitioning-an-anonymous-page-to-a-personalized-page).

To stay on the page after the form has been submitted and show/hide relevant sections upon successful submission, check if `referredID` is available and set relevant css styles. The referred recipient ID becomes available only after submission, and therefore can control the visibility of the different areas.

# Using an Anonymous Page

Although usually you would use a refer form on a personalized page (using an `xmp-personalized-controller` attribute), you can definitely use it also on an anonymous page (using `xmp-anonymous-controller`). The usage method is identical.

# Adding the referrer ID

It is common to want to know who referred the new recipient into the campaign. In order to identify the recipient who referred their friend, you can follow these steps:
* add a new field into the database to capture the ID of the referrer.
* add a new recipient schema field in the plan for the new database field.
* create read and write ADORs for the new database field.
* add a hidden form field to the refer-a-friend form to hold the recipient ID of the user currently viewing the page.
* add some custom JavaScript to add the recipient ID into the hidden field.

The code sample below shows a simple example:

````html
<html>
<head>
    <title>Refer a friend</title>
    <!-- XMPie XMPL library -->
    <script src="./xmpcfg.js"></script>
    <script src="https://ajax.xmcircle.com/ajax/libs/XMPL-V5/5.0/xmpl.min.js"></script>
</head>
<body xmp-personalized-controller xmp-cloak xmp-tracking-page-name="Refer">
    <h2>Thanks, <span xmp-text="xmp.r.firstName"></span>!</h2>
    <p>Enter the details of a friend:</p>
    <form name="referralForm" xmp-refer>
        <input name="firstname"xmp-write-ador="xmp.referredRecipient.firstName" type="text" placeholder="Firstname">
        <input name="lastname"xmp-write-ador="xmp.referredRecipient.lastName" type="text" placeholder="Lastname"><br>
        <input name="email"xmp-write-ador="xmp.referredRecipient.email" type="text" placeholder="Email"><br>
        <input type="hidden" id="referrer-id" xmp-write-ador="xmp.referredRecipient.referredBy">
        <input type="submit" class="special" value="Invite" xmp-success-url="thanks.html">
    </form>
    <script>
    function onLoad() {
        const getRecipientInfo = () => {
            if (window.xmpProvider.store.xmp.recipientID) {
              document.getElementById('referrer-id').setAttribute('value', window.xmpProvider.store.xmp.recipientID)
            }
        }
        window.xmpProvider.store.subscribe(getRecipientInfo)
    }
    window.addEventListener('load', onLoad)
    </script>
</body>
</html>
````

# Next

Another method of adding more recipients to your campaign is by means of social media. To learn how to add social media sharing to your webpage using XMPL, refer to [[Social Media Tags]].
