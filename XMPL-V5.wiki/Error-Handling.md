>### XMPL V5

By default, all errors are displayed to the user on a full error page. To control the error display on the page, use `xmp-failure-js` on the form and `xmp-turn-off-default-error="true"` in the body tag.  

```html
 <body xmp-personalized-controller xmp-turn-off-default-error="true"> 
```

`xmp-turn-off-default-error` prevents the default error page from being displayed when an error occurs. 

```javascript
<form xmp-update xmp-success-js="onSuccess()" xmp-failure-js="onError()"></form> 

<script> 
  function OnError() { 
    const resposeData = window.XMPLLastHttpError;
    const errorCode = resposeData.ErrorCode;
    const displayMessage = resposeData.DisplayMessage;
    alert(displayMessage);
  } 
</script>
```

**Note:** ````XMPLLastHttpError```` includes the error code and the display message. For more details about XMPL error codes, refer to XMPL Rest API help. You can access the XMPL Rest API help from Circle > Library > Website area.
