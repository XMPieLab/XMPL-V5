>### XMPL V5

# Anonymous Controller
An anonymous controller is used for web pages that are generic -- that are not aware of the recipient visiting them.    Note that during the visit of an anonymous controller the recipient might be revealed (by registration of the recipient, or bypassing the recipient as a parameter from an external source).  Once the recipient is identified the page becomes a personalized page. This is commonly used in corporate websites.

# Corporate Website
The following methods and attributes add the corporate website functionality to the anonymous controller.

1. `xmp-remember-recipient` – if set, after xmp-register the recipient is stored in a cookie, and following visits to the page will remember the recipient and show personalized info.

    For example:
    ````html
    <div
      xmp-remember-recipient
      xmp-anonymous-controller >
    ````

2. use localStorage to save recipient ID

    ````html
    localStorage.setItem('xmpRecipientID', store.xmp.recipientID)
    ````
Every time when `xmp-anonymous-controller` is used, all information inside localStorage is removed.

# Conditional Rendering
Sometimes you need to toggle the behavior based on whether the user is still anonymous or has identified. In the former case, there is no RecipientID, while in the latter there is. An example of how you can do it you can find [here](https://github.com/XMPieLab/XMPL-V5/wiki/Adding-New-Recipients-through-Registration#transitioning-an-anonymous-page-to-a-personalized-page).
