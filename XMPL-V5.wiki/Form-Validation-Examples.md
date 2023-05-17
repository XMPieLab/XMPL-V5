>### XMPL V5

This page contains code samples that demonstrate form field validation techniques. 
You can use simple client-side form validation. Click [here](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation) to read more about client-side form validation.

# Input type='text'
#### Required (mandatory)
Simply add the "required" parameter to the input tag to make a text input field mandatory:
````html
<input class="input__element" type="text" size="30" xmp-write-ador="xmp.r['firstname']" required />
````

````css
.input__element:required:invalid {
  border: 1px solid red;
}

.input__element:required:valid {
  border: 1px solid green;
}
````

You can test and adjust the above sample code on a personalized or anonymous page:
[<img src="/XMPieLab/XMPL-SDK/blob/master/Images/sampleAnonymous.png" alt="Anonymous Sample">](http://codepen.io/scouch1/pen/pbGrmw)
[<img src="/XMPieLab/XMPL-SDK/blob/master/Images/samplePersonalized.png" alt="Personalized Sample">](http://codepen.io/scouch1/pen/ZOPywb?rid=Fred)
