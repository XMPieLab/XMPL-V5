>### XMPL V5

When creating your webpage you may want to access the XMPL objects from your JavaScript code. You may want to access the XMPL provides, which allow you to perform activities related to your XMPie campaign data, such as get the ADORs of a recipient, update their data, and track activities. If you have an XMPL controller on your page you may want to access it as well.

Calling the services from your code is a simple matter of including the `xmpResource` service, which should be available once you include the basic XMPL JavaScript (xmp.min.js).   

# Access the XmpProvider in a Non-XMPL Page

XMPL provides simple access to the XMPL methods. To access these methods use the `xmpProvider` global variable.

````javascript
<script>

    $(document).ready(function () {
      var accessToken = localStorage.getItem('serviceToken');
      var rid = localStorage.getItem('xmpRecipientID');
      var adorList = ['FirstName', 'LastName', 'Email', 'Feedback'];

      function setAdorsValue() {
        $("#FirstName").text(window.xmpProvider.store.xmp.r.FirstName);
        $("#LastName").text(window.xmpProvider.store.xmp.r.LastName);
        $("#Email").text(window.xmpProvider.store.xmp.r.Email);
        $("#Feedback").text(window.xmpProvider.store.xmp.r.Feedback);
      }

      function setAdorsToInput() {
        $("#FirstNameInput").val(window.xmpProvider.store.xmp.r.FirstName);
        $("#LastNameInput").val(window.xmpProvider.store.xmp.r.LastName);
        $("#EmailInput").val(window.xmpProvider.store.xmp.r.Email);
        $("#FeedbackInput").val(window.xmpProvider.store.xmp.r.Feedback);
      }

      function getAdors() {
        setAdorsValue();
        setAdorsToInput();
      }

      window.xmpProvider.api.getAdorValues({
        accessToken:accessToken, 
        rid: rid, 
        isLogin: true, 
        adors: adorList, 
        resolved: [], 
        async: false, 
        isCached: false, 
        noCache: false
      })
        .then(getAdors);

      $(' #form ').submit(function (event) {
        event.preventDefault();
        var adorsForm = {
          FirstName: $("#FirstNameInput").val(),
          LastName: $("#LastNameInput").val(),
          Email: $("#EmailInput").val(),
          Feedback: $("#FeedbackInput").val()
        }
        window.xmpProvider.api.updateAdors(adorsForm)
          .then(setAdorsValue)
      })

    });
  </script>
....
````	

* `window.xmpProvider` - object that can access the XMPL library methods.
* `window.xmpProvider.api.getAdorValues(accessToken, rid, isLogin, adors, resolved, async)` - creates a request to get a list of ADORs.
    * accessToken - config accessToken.
    * rid - ID of the recipient for whom the ADORs are fetched.
    * isLogin -  set value to "true" to eliminate the need to make two calls (one login, and one for ADOR fetching).
    * adors - the array of requested ADORs.
    * resolved - the array of ADOR names. ADORs in this list should go through asset resolving.
    * async - the async parameter, if passed, makes the request asynchronous. It is intended to be used in cases where fetching the ADORs is expected to take a long time. An async request will start a query job on the server, and return with a job ID. If not passed, the async parameter returns recipient data as an object { key: value }.

    After you get the list of ADORs you can use it in the template. For Example:
````javascript
function setAdorsValue() {
   $("#FirstName").text(window.xmpProvider.store.xmp.r.FirstName);
   $("#LastName").text(window.xmpProvider.store.xmp.r.LastName);
   $("#Email").text(window.xmpProvider.store.xmp.r.Email);
   $("#Feedback").text(window.xmpProvider.store.xmp.r.Feedback);
}
````

* `window.xmpProvider.api.updateAdors(adorsForm)` - creates a POST request to send a list of ADORs in order to update the ADORs. This request returns an updated list of ADORs. After you get the updated data you can update the template.

**Note**: For more information about the `xmpProvider` object, see [XmpProvider](https://github.com/XMPieLab/XMPL-NG/wiki/XmpProvider)