>XMPL V5

XMPL provides simple accesses for the XMPL methods. To get access to these methods uses the global variable **xmpProvider**.  

XmpProvider is an entry point to the library. xmpProvider is a class in the XMPL library that provides access to the properties and methods in XMPL. XmpProvider includes the render method which is used to update HTML elements. XmpProvider has access to the public methods for API classes, store, trackEvent, and method bind.

## API
Service which provides access to the API call methods. To use the API call, use the following methods: 

### addRecipient(adors) 

- adors - an array of requested ADORs. 

### getAdorValues(accessToken, rid, isLogin, adors, resolved, async) 

- accessToken - string - accessToken from config;
- rid - string - the recipient ID of the recipient for whom to get the ADORs;
- isLogin - boolean - set the value to "true" to eliminate the need to make two calls – one login and one ADOR fetching;
- adors - array - an array of requested ADORs;
- resolved[optional] - array - array of ador names. ADORs in this list should go through asset resolving. Note that it may be that 'resolved' will appear but 'adors' will not;
- async[optional] - boolean - if not passed, a result is returned that when complete will have the recipient data key/value object. if true, an async request will start a query job on the server, and return with a job ID.  

### updateAdors(adors) 

- adors - an array of requested ADORs. 

### trigger(touchPointID, customizations) 

- touchPointID - touchpoint friendly id 

### events(accessToken, options) 

* accessToken - accessToken from config file;
* options - options object contain extra data about the event and access data.  
    * sync - defaults to false. If true the method call becomes synchronous and will return only when the HTTP request is complete. This is generally a bad idea unless you are tracking a page leave event, in which case if you don't use it the event recording may not happen. 
    * type - can be Page Visit, Clicked, Page Leave 
    * recipientID - recipient to track this event for. At this point, tracking is only enabled for cases where the page is personalized, and so recipientID is actually mandatory., 
    * PageName - can be any string (Link name, Button name), 
    * ActionName - can be any string (Link name, Button name), 
    * date - current date string 

    Also, optional parameters that are generated on the client:
    * ScreenResolution - client window resolution,
    * Browser - browser name and version,
    * Platform - os name and version,
    * HumanLanguage - browser language,
    * ReferringPageURI - page URL for the page that lead to this page, if relevan,
    * PageParamы - page query string parameters,
    * JavaEnabled  - javascript enabled on page. for this solution it'll alwasy be true, value: 'true',
    * ISLandingPage - indication for landing page, will be added by uCreate XM Server, value: 'TBD',
    * ClientIP - will be added by server, value: 'TBD',
    * UserSession - server session ID, will be added by server, value: 'TBD' 

## Bind  

Service which takes document.body, goes to html, reads all html elements in the body, checks what elements should be deleted, and bind necessary elements. And do another render. 

## Store 

Service which can return recipient id and adors. To get rid use  window.xmpProvider.store.xmp.recipientID variable. To get ador (e.g., FirstName) use window.xmpProvider.store.xmp.r.FirstName. 

## TrackEvent 

Service which creates tracking events. Service includes methods: 
* trackingVisit - send an event when a user visits the page
* trackingLeave - send an event when user leave the page 
* browserParams – list parameters that can send information about the current browser 

### TrackingLeave 

The TrackEvent service provides access to the trackingLeave method. This method is called when on the page is the `xmp-tracking-page-name` attribute called before unload event. To trigger an event on page leave in React or Angular routing, you can use this method manually in a component unmount.  
`window.xmpProvider.trackEvent.trackingLeave()`

# XmpReady 

If you need to know when upload data was done you can subscribe to the store event using store methods:
* addPageLoadedEventListener  
* subscribe

## AddPageLoadedEventListener 

When the page is loaded and the API response is ready addPageLoadedEventListener calls callback and you can get data from the store of xmpProvider. 
```javascript
function onLoad() { 
  console.log("onLoad", window.xmpProvider) 
  function xmpReady() { 
    // show ['First Name'] ador, which was saved in store
    console.log(window.xmpProvider.store.xmp.r['First Name']) 
  }
  window.xmpProvider.store.addPageLoadedEventListener(xmpReady) 
} 
window.addEventListener('load', onLoad)
```

## Subscribe 

Subscribe to the event when the library store is updated. 
```javascript
function onLoad() { 
  function xmpReady() { 
    // show ['First Name'] ador, which was saved in store
    console.log(window.xmpProvider.store.xmp.r['First Name']) 
  } 
  window.xmpProvider.store.subscribe(xmpReady) 
} 
window.addEventListener('load', onLoad)
```