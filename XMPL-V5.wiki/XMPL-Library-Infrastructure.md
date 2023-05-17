>### XMPL V5

This entry discusses several elements of a personalized site that are required for its setup:
* the XMPL library
* the xmpcfg.js configuration file
* the xmpProvider


# XMPL Library

**xmp.min.js** - a Javascript file defining the custom HTML tags and attributes used by the library.

# The xmpcfg.js File

The file downloaded from a Circle project contains a JavaScript definition of the connection data to the Circle project (and through it to the uProduce campaign supporting it). A typical xmpcfg.js file looks like this:

````javascript
var xmpcfg = {
	access: { 
		accessToken: 'A KEY', 
		url: 'A URL'
	}
};
````

(Other keys may be defined under `access`, but are irrelevant to the functionality of the library).

The file defines an xmpcfg object with a single 'access' key. In it are two keys: 
* `accessToken` - An identifier of the Circle project for the XMPL server to use in order to identify this project/campaign, out of the available projects/campaigns.
* `url` - The URL of the XMPL server to use for this webpage.

# xmpProvider
XMPL provides simple access to the XMPL methods. To get access to these methods use the global `xmpProvider` variable.  

`XmpProvider` is an entry point to the library. It includes the render method which we use to update HTML elements. XmpProvider has getters such as API, store, trackEvent, and bind.

## API
A service that provides access to the API call methods. In order to use the API call, use the following methods: 

### addRecipient(adors) 

- adors - an array of requested ADORs. 

### getAdorValues(params) 

Params - is object that includes:
* accessToken - string - config accessToken.
* rid - string - ID of the recipient for whom the ADORs are fetched.
* isLogin - boolean - set value to "true" to eliminate the need to make two calls (one login, and one for ADOR fetching).
* adors - array - the array of requested ADORs.
* resolved[optional] - array - the array of ADOR names. ADORs in this list should go through asset resolving. Note that it may be that "resolved" will appear but "adors" will not.
* async[optional] - boolean - the async parameter, if passed, makes the request asynchronous. It is intended to be used in cases where fetching the ADORs is expected to take a long time. An async request will start a query job on the server, and return with a job ID. If not passed, the async parameter returns recipient data as an object { key: value },
* noCache - bool - check if there should be no caching done for GET requests.

### updateAdors(adors) 

- adors - an array of requested ADORs. 

### trigger(touchPointID, customizations) 

- touchPointID - touchpoint friendly id. 

### unsubscribe(accessToken, rid, isUnsubscribe) 

* accessToken - accessToken from the config file.
* rid - string - ID of the recipient for whom the ADORs are fetched.
* isUnsubscribe - boolean - set the subscription status to true or false.

### events(accessToken, options) 

* accessToken - accessToken from the config file.
* options - contains additional data about the event and access data.  
    * sync - defaults to false. If true, the method call becomes synchronous and returns only when the HTTP request is complete. This is generally a bad idea unless you are tracking a page leave event, in which case if you don't use it the event recording may not happen. 
    * type - can be either Page Visit, Clicked, or Page Leave.
    * recipientID - the recipient for which the event is tracked. At this point, tracking is only enabled for cases where the page is personalized, and so recipientID is actually mandatory. 
    * PageName - can be any string (Link name, Button name). 
    * ActionName - can be any string (Link name, Button name).
    * date - current date string.

    Optional parameters that are generated on the client:
    * ScreenResolution - client window resolution.
    * Browser - browser name and version.
    * Platform - OS name and version.
    * HumanLanguage - browser language.
    * ReferringPageURI - page URL for the page that lead to this page, if relevant.
    * PageParamы - page query string parameters.
    * JavaEnabled  - JavaScript enabled on the page. For this solution it will always be true (value: 'true').
    * ISLandingPage - indication of the landing page. Will be added by uCreate XM Server (value: 'TBD').
    * ClientIP - will be added by the server (value: 'TBD').
    * UserSession - server session ID. Will be added by server (value: 'TBD').

### getAsyncRequestId({accessToken, adors, rid}) 

* accessToken - accessToken from the config file.
* rid - string - ID of the recipient for whom the ADORs are fetched.
* adors - array - an array of requested ADORs.

Initially, the call to getAsyncRequestId will return the job ID to start tracking, unless the status is already no longer no progress.

### checkStatus(accessToken, requestId)

checkStatus should be used after a call to getAsyncRequestId where async ADOR was passed, starting an asynchronous job retrieving ADOR values.

## Bind  

A service that takes `document.body`, goes to the HTML, reads all HTML elements in the body, checks which elements should be deleted, and binds necessary elements. Then renders again. 

## Store 

A service that can return recipient ID and ADORs. To get recipient ID use  the `window.xmpProvider.store.xmp.recipientID` variable. To get the ADOR (e.g., FirstName), use `window.xmpProvider.store.xmp.r.FirstName`. 

## TrackEvent 

A service that creates tracking events. The methods of the service are: 
* trackingVisit - send an event when a user visits the page.
* trackingLeave - send an event when a user leaves the page.
* browserParams – list parameters that can send information about the current browser. 

### TrackingLeave 

The TrackEvent service provides access to the methods that track page entry and exit. These methods will be called when we have on the page the `xmp-tracking-page-name` attribute. 

If your website is a SPA (single page application) and the user changes the router path to trigger page leave event, use `trackEvent.trackingLeave()`. This method can be called manually in the component unmount hook.